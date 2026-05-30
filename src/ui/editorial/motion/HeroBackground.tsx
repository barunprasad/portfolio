'use client';

import { useEffect, useRef } from 'react';

// Full-bleed ambient hero backdrop: a faint engineering grid that lights up
// around the cursor like a flashlight, over a soft drifting glow. Pure
// atmosphere — never a focal object. Progressive enhancement: the server
// content stays fully readable without it; reduced-motion paints one static
// frame, touch devices get a gentle auto-drift, and the loop pauses off-screen.
export function HeroBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = ref.current;
    if (!canvasEl) return;
    const ctxMaybe = canvasEl.getContext('2d');
    const parentMaybe = canvasEl.parentElement;
    if (!ctxMaybe || !parentMaybe) return;
    const canvas = canvasEl;
    const ctx = ctxMaybe;
    const parent = parentMaybe;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const TAU = Math.PI * 2;
    const GS = 46; // grid spacing (px)

    let w = 0, h = 0, raf = 0, running = false, t = 0, last = 0;
    const m = { x: 0, y: 0 };       // eased light position
    const target = { x: 0, y: 0 };  // where the light eases toward
    let hasCursor = false;

    function resize() {
      const r = parent.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!hasCursor) { m.x = target.x = w * 0.5; m.y = target.y = h * 0.42; }
    }

    function gridLines(offX: number, offY: number) {
      ctx.beginPath();
      for (let x = offX; x < w; x += GS) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
      for (let y = offY; y < h; y += GS) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
    }

    function frame(dt: number) {
      t += dt;
      if (!hasCursor) {
        // gentle Lissajous drift so it breathes without a cursor
        target.x = w * 0.5 + Math.cos(t * 0.00038) * w * 0.2;
        target.y = h * 0.44 + Math.sin(t * 0.00052) * h * 0.16;
      }
      m.x += (target.x - m.x) * 0.06;
      m.y += (target.y - m.y) * 0.06;

      const offX = reduce ? 0 : (t * 0.004) % GS;
      const offY = reduce ? 0 : (t * 0.003) % GS;
      const R = Math.min(w, h) * 0.42;

      ctx.clearRect(0, 0, w, h);

      // base grid — barely there everywhere
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(200,255,0,0.011)';
      gridLines(offX, offY);
      ctx.stroke();

      ctx.globalCompositeOperation = 'lighter';

      // brighter grid revealed near the light — concentric clips give a soft
      // additive falloff (no hard circle edge)
      for (const ring of [
        { r: R, a: 0.007 },
        { r: R * 0.66, a: 0.012 },
        { r: R * 0.34, a: 0.016 },
      ]) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(m.x, m.y, ring.r, 0, TAU);
        ctx.clip();
        ctx.strokeStyle = `rgba(200,255,0,${ring.a})`;
        gridLines(offX, offY);
        ctx.stroke();
        ctx.restore();
      }

      // the soft light itself
      const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, R);
      g.addColorStop(0, 'rgba(200,255,0,0.09)');
      g.addColorStop(0.5, 'rgba(190,255,40,0.03)');
      g.addColorStop(1, 'rgba(200,255,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(m.x, m.y, R, 0, TAU);
      ctx.fill();
    }

    function tick(now: number) {
      const dt = last ? Math.min(now - last, 48) : 16;
      last = now;
      frame(dt);
      if (running) raf = requestAnimationFrame(tick);
    }
    function start() {
      if (!running && !reduce) { running = true; last = 0; raf = requestAnimationFrame(tick); }
    }
    function stop() { running = false; cancelAnimationFrame(raf); }

    resize();
    frame(16);

    const host = parent.closest('section') ?? parent;
    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      target.x = e.clientX - r.left; target.y = e.clientY - r.top; hasCursor = true;
    };
    const onLeave = () => { hasCursor = false; };
    const onResize = () => { resize(); if (reduce) frame(16); };

    if (fine && !reduce) {
      host.addEventListener('pointermove', onMove as EventListener);
      host.addEventListener('pointerleave', onLeave);
    }
    window.addEventListener('resize', onResize);
    const io = new IntersectionObserver(([en]) => (en.isIntersecting ? start() : stop()), { threshold: 0 });
    io.observe(canvas);

    return () => {
      stop();
      io.disconnect();
      host.removeEventListener('pointermove', onMove as EventListener);
      host.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
