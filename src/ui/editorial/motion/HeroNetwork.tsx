'use client';

import { useEffect, useRef } from 'react';

// Interactive "systems" network behind the hero — a faint drifting node graph
// that lights up lime around the cursor. Canvas 2D (GPU-light), guarded:
// reduced-motion renders a single static frame, touch devices get fewer nodes +
// no cursor interaction, and the loop pauses when scrolled off-screen.
export function HeroNetwork() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = ref.current;
    if (!canvasEl) return;
    const ctxMaybe = canvasEl.getContext('2d');
    const parentMaybe = canvasEl.parentElement;
    if (!ctxMaybe || !parentMaybe) return;
    // Non-null aliases so values stay narrowed inside the animation closures.
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = ctxMaybe;
    const parent: HTMLElement = parentMaybe;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const COUNT = fine ? 66 : 32;
    const LINK = 150;
    const nodes = Array.from({ length: COUNT }, () => ({
      x: 0,
      y: 0,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
    }));
    const mouse = { x: -9999, y: -9999, on: false };
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;

    function resize() {
      const r = parent.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      for (const n of nodes) {
        n.x = Math.random() * w;
        n.y = Math.random() * h;
      }
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        if (!reduce) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
          if (mouse.on) {
            const dx = n.x - mouse.x;
            const dy = n.y - mouse.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 130 * 130 && d2 > 0.5) {
              const d = Math.sqrt(d2);
              const f = (1 - d / 130) * 0.9;
              n.x += (dx / d) * f;
              n.y += (dy / d) * f;
            }
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d >= LINK) continue;
          const t = 1 - d / LINK;
          let lit = 0;
          if (mouse.on) {
            const md = Math.hypot((a.x + b.x) / 2 - mouse.x, (a.y + b.y) / 2 - mouse.y);
            lit = md < 170 ? 1 - md / 170 : 0;
          }
          ctx.strokeStyle =
            lit > 0
              ? `rgba(200,255,0,${(0.08 + t * 0.22) * (0.5 + lit)})`
              : `rgba(122,122,134,${t * 0.14})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        const lit = mouse.on ? Math.max(0, 1 - Math.hypot(n.x - mouse.x, n.y - mouse.y) / 130) : 0;
        ctx.fillStyle = lit > 0.05 ? `rgba(200,255,0,${0.45 + lit * 0.55})` : 'rgba(122,122,134,0.5)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.5 + lit * 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function tick() {
      frame();
      if (running) raf = requestAnimationFrame(tick);
    }
    function start() {
      if (!running && !reduce) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    resize();
    seed();
    frame();

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.on = true;
    };
    const onLeave = () => {
      mouse.on = false;
    };
    const onResize = () => {
      resize();
      seed();
      if (reduce) frame();
    };

    if (fine && !reduce) {
      parent.addEventListener('pointermove', onMove);
      parent.addEventListener('pointerleave', onLeave);
    }
    window.addEventListener('resize', onResize);

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      stop();
      io.disconnect();
      parent.removeEventListener('pointermove', onMove);
      parent.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
