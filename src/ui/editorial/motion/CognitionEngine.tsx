'use client';

import { useEffect, useRef } from 'react';

// "Cognition Engine" — the hero masterpiece. A glowing core wrapped in rotating
// geometric rings (the machine), with organic neural filaments radiating out
// (the brain); light-pulses travel inward and ignite the core. Canvas 2D with
// additive glow, cursor-reactive. Guarded: reduced-motion renders one static
// frame, touch devices go lighter, and the loop pauses off-screen.
export function CognitionEngine() {
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
    const lite = !fine;

    const FIL = lite ? 9 : 15;
    const PARTS = lite ? 16 : 38;
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    type Fil = { ang: number; len: number; bow: number; pulses: { t: number; sp: number }[] };
    type Part = { ang: number; rad: number; sp: number; r: number; flat: number };

    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let s = 1;
    let raf = 0;
    let running = false;
    let time = 0;
    let last = 0;
    let flash = 0;
    const mouse = { x: 0, y: 0, on: false };
    const off = { x: 0, y: 0 };

    const fils: Fil[] = Array.from({ length: FIL }, (_, i) => ({
      ang: (i / FIL) * Math.PI * 2 + rnd(-0.18, 0.18),
      len: rnd(0.6, 1),
      bow: rnd(-0.42, 0.42),
      pulses: Array.from({ length: Math.random() > 0.45 ? 2 : 1 }, () => ({
        t: Math.random(),
        sp: rnd(0.0004, 0.00095),
      })),
    }));
    const parts: Part[] = Array.from({ length: PARTS }, () => ({
      ang: rnd(0, Math.PI * 2),
      rad: rnd(0.25, 1.05),
      sp: rnd(-0.00004, 0.00004),
      r: rnd(0.5, 1.7),
      flat: rnd(0.55, 0.85),
    }));
    const rings = [
      { r: 0.42, e: 0.34, base: 0, sp: 0.00026, nodes: 3 },
      { r: 0.63, e: 0.52, base: 1.1, sp: -0.0002, nodes: 2 },
      { r: 0.84, e: 0.24, base: 2.2, sp: 0.00014, nodes: 4 },
    ];

    function resize() {
      const r = parent.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2;
      cy = h / 2;
      s = Math.min(w, h) / 2;
    }

    function bez(
      ax: number, ay: number, bx: number, by: number, dx: number, dy: number, t: number,
    ): [number, number] {
      const u = 1 - t;
      return [
        u * u * ax + 2 * u * t * bx + t * t * dx,
        u * u * ay + 2 * u * t * by + t * t * dy,
      ];
    }

    function frame(dt: number) {
      time += dt;
      const tx = mouse.on ? (mouse.x - cx) / s : 0;
      const ty = mouse.on ? (mouse.y - cy) / s : 0;
      off.x += (tx - off.x) * 0.05;
      off.y += (ty - off.y) * 0.05;
      const ex = cx + off.x * s * 0.05;
      const ey = cy + off.y * s * 0.05;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      const coreR = s * 0.07;
      const maxR = s * 0.98;

      // neural filaments + inward pulses
      for (const f of fils) {
        const dx = Math.cos(f.ang);
        const dy = Math.sin(f.ang);
        const px0 = ex + dx * coreR;
        const py0 = ey + dy * coreR;
        const endR = maxR * f.len;
        const px2 = ex + dx * endR;
        const py2 = ey + dy * endR;
        const ctrlR = endR * 0.5;
        const px1 = ex + dx * ctrlR + -dy * (f.bow * endR);
        const py1 = ey + dy * ctrlR + dx * (f.bow * endR);

        ctx.strokeStyle = 'rgba(200,255,0,0.05)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(px0, py0);
        ctx.quadraticCurveTo(px1, py1, px2, py2);
        ctx.stroke();

        for (const pu of f.pulses) {
          if (!reduce) {
            pu.t -= pu.sp * dt;
            if (pu.t <= 0) {
              pu.t = 1;
              flash = Math.min(1.2, flash + 0.45);
            }
          }
          for (let k = 0; k < 5; k++) {
            const tt = Math.min(1, pu.t + k * 0.028);
            const [qx, qy] = bez(px0, py0, px1, py1, px2, py2, tt);
            const a = (1 - k / 5) * 0.55;
            ctx.fillStyle = `rgba(200,255,0,${a})`;
            ctx.beginPath();
            ctx.arc(qx, qy, 1.8 - k * 0.3, 0, Math.PI * 2);
            ctx.fill();
          }
          const [gx, gy] = bez(px0, py0, px1, py1, px2, py2, pu.t);
          const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, 9);
          g.addColorStop(0, 'rgba(200,255,0,0.5)');
          g.addColorStop(1, 'rgba(200,255,0,0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(gx, gy, 9, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // geometric rings (the machine)
      for (const ring of rings) {
        const rx = s * ring.r;
        const ry = s * ring.r * ring.e;
        const rot = ring.base + (reduce ? 0 : time * ring.sp) + off.x * 0.4;
        ctx.strokeStyle = 'rgba(200,255,0,0.12)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(ex, ey, rx, ry, rot, 0, Math.PI * 2);
        ctx.stroke();
        for (let n = 0; n < ring.nodes; n++) {
          const a = (n / ring.nodes) * Math.PI * 2 + (reduce ? 0 : time * 0.0005);
          const lx = Math.cos(a) * rx;
          const ly = Math.sin(a) * ry;
          const nx = ex + lx * Math.cos(rot) - ly * Math.sin(rot);
          const ny = ey + lx * Math.sin(rot) + ly * Math.cos(rot);
          ctx.fillStyle = 'rgba(200,255,0,0.8)';
          ctx.beginPath();
          ctx.arc(nx, ny, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // particles
      for (const p of parts) {
        if (!reduce) p.ang += p.sp * dt;
        const pr = s * p.rad;
        const ppx = ex + Math.cos(p.ang) * pr;
        const ppy = ey + Math.sin(p.ang) * pr * p.flat;
        ctx.fillStyle = 'rgba(200,255,0,0.22)';
        ctx.beginPath();
        ctx.arc(ppx, ppy, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // core (the engine)
      const cr = coreR * (1 + 0.12 * Math.sin(time * 0.003) + flash * 0.45);
      const cg = ctx.createRadialGradient(ex, ey, 0, ex, ey, cr * 4.5);
      cg.addColorStop(0, 'rgba(255,255,255,0.95)');
      cg.addColorStop(0.18, `rgba(200,255,0,${0.7 + flash * 0.25})`);
      cg.addColorStop(1, 'rgba(200,255,0,0)');
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(ex, ey, cr * 4.5, 0, Math.PI * 2);
      ctx.fill();
      flash *= 0.92;
    }

    function tick(now: number) {
      const dt = last ? Math.min(now - last, 48) : 16;
      last = now;
      frame(dt);
      if (running) raf = requestAnimationFrame(tick);
    }
    function start() {
      if (!running && !reduce) {
        running = true;
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    resize();
    frame(16);

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
      if (reduce) frame(16);
    };

    const host = parent.closest('section') ?? parent;
    if (fine && !reduce) {
      host.addEventListener('pointermove', onMove as EventListener);
      host.addEventListener('pointerleave', onLeave);
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
      host.removeEventListener('pointermove', onMove as EventListener);
      host.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
