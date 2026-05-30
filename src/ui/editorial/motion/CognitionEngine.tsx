'use client';

import { useEffect, useRef } from 'react';

// "Cognition Engine" — the hero masterpiece. An AI processing engine: a neural
// mesh core firing activations (brain/AI), housed in segmented mechanical rings
// (the engine), with right-angle circuit traces carrying data pulses inward and
// a few organic dendrites feeding one side (the human input). Canvas 2D, additive
// glow, cursor-reactive. Guarded: reduced-motion renders one static frame, touch
// goes lighter, and the loop pauses off-screen.
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
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const TAU = Math.PI * 2;
    const LIME = (a: number) => `rgba(200,255,0,${a})`;
    const WHITE = (a: number) => `rgba(255,255,255,${a})`;

    let w = 0, h = 0, cx = 0, cy = 0, s = 1, raf = 0, running = false, t = 0, last = 0;
    const mouse = { x: 0, y: 0, on: false };
    const off = { x: 0, y: 0 };

    // neural mesh core: two concentric rings of nodes + connections
    const innerN = lite ? 4 : 6;
    const outerN = lite ? 7 : 10;
    type Node = { r: number; a: number; lit: number };
    const inner: Node[] = Array.from({ length: innerN }, (_, i) => ({ r: 0.1, a: (i / innerN) * TAU, lit: 0 }));
    const outer: Node[] = Array.from({ length: outerN }, (_, i) => ({ r: 0.2, a: (i / outerN) * TAU + 0.2, lit: 0 }));
    type Edge = { from: Node; to: Node; pulse: number; sp: number; active: boolean };
    const edges: Edge[] = [];
    outer.forEach((o, i) => {
      edges.push({ from: o, to: inner[i % innerN], pulse: Math.random(), sp: rnd(0.0009, 0.002), active: Math.random() > 0.4 });
      if (Math.random() > 0.5)
        edges.push({ from: o, to: inner[(i + 1) % innerN], pulse: Math.random(), sp: rnd(0.0009, 0.002), active: Math.random() > 0.5 });
    });

    // circuit traces (right-angle data lines)
    const TRACE = lite ? 5 : 8;
    type Trace = { a: number; step: number; rMid: number; rOut: number; pulses: { p: number; sp: number }[] };
    const traces: Trace[] = Array.from({ length: TRACE }, (_, i) => ({
      a: (i / TRACE) * TAU + rnd(-0.08, 0.08),
      step: rnd(0.12, 0.3) * (Math.random() > 0.5 ? 1 : -1),
      rMid: rnd(0.5, 0.66),
      rOut: rnd(0.82, 0.98),
      pulses: Array.from({ length: Math.random() > 0.5 ? 2 : 1 }, () => ({ p: Math.random(), sp: rnd(0.0006, 0.0014) })),
    }));

    // organic dendrites (human input), upper-left quadrant
    const dends = Array.from({ length: lite ? 2 : 4 }, () => ({
      a: rnd(Math.PI * 0.7, Math.PI * 1.25),
      len: rnd(0.55, 0.92),
      bow: rnd(0.25, 0.6) * (Math.random() > 0.5 ? 1 : -1),
    }));

    function resize() {
      const r = parent.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2; cy = h / 2; s = Math.min(w, h) / 2;
    }

    function npos(n: Node, ex: number, ey: number, spin: number): [number, number] {
      return [ex + Math.cos(n.a + spin) * n.r * s, ey + Math.sin(n.a + spin) * n.r * s];
    }
    function tracePts(tr: Trace, ex: number, ey: number, spin: number): [number, number][] {
      const a = tr.a + spin;
      const a2 = a + tr.step;
      return [
        [ex + Math.cos(a) * 0.24 * s, ey + Math.sin(a) * 0.24 * s],
        [ex + Math.cos(a) * tr.rMid * s, ey + Math.sin(a) * tr.rMid * s],
        [ex + Math.cos(a2) * tr.rMid * s, ey + Math.sin(a2) * tr.rMid * s],
        [ex + Math.cos(a2) * tr.rOut * s, ey + Math.sin(a2) * tr.rOut * s],
      ];
    }
    function polyAt(pts: [number, number][], u: number): [number, number] {
      const segs = pts.length - 1;
      const f = Math.min(0.9999, Math.max(0, u)) * segs;
      const i = Math.floor(f);
      const lt = f - i;
      return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * lt, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * lt];
    }

    function frame(dt: number) {
      t += dt;
      const tx = mouse.on ? (mouse.x - cx) / s : 0;
      const ty = mouse.on ? (mouse.y - cy) / s : 0;
      off.x += (tx - off.x) * 0.05;
      off.y += (ty - off.y) * 0.05;
      const ex = cx + off.x * s * 0.04;
      const ey = cy + off.y * s * 0.04;
      const spin = reduce ? 0 : t * 0.00009 + off.x * 0.25;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineWidth = 1;

      // organic dendrites (faint, behind)
      for (const d of dends) {
        const dx = Math.cos(d.a), dy = Math.sin(d.a);
        const x0 = ex + dx * 0.22 * s, y0 = ey + dy * 0.22 * s;
        const x2 = ex + dx * d.len * s, y2 = ey + dy * d.len * s;
        const x1 = ex + dx * d.len * s * 0.5 + -dy * d.bow * d.len * s;
        const y1 = ey + dy * d.len * s * 0.5 + dx * d.bow * d.len * s;
        ctx.strokeStyle = LIME(0.06);
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.quadraticCurveTo(x1, y1, x2, y2);
        ctx.stroke();
      }

      // segmented mechanical rings (the housing)
      const rings = [
        { r: 0.5, dash: [5, 9], sp: 0.00022, ticks: 24 },
        { r: 0.72, dash: [3, 13], sp: -0.00015, ticks: 0 },
        { r: 0.92, dash: [14, 10], sp: 0.0001, ticks: 12 },
      ];
      for (const ring of rings) {
        const rot = (reduce ? 0 : t * ring.sp) + off.x * 0.3;
        ctx.save();
        ctx.translate(ex, ey);
        ctx.rotate(rot);
        ctx.setLineDash(ring.dash);
        ctx.strokeStyle = LIME(0.14);
        ctx.beginPath();
        ctx.arc(0, 0, ring.r * s, 0, TAU);
        ctx.stroke();
        ctx.setLineDash([]);
        for (let k = 0; k < ring.ticks; k++) {
          const a = (k / ring.ticks) * TAU;
          ctx.strokeStyle = LIME(0.18);
          ctx.beginPath();
          ctx.moveTo(Math.cos(a) * (ring.r * s - 4), Math.sin(a) * (ring.r * s - 4));
          ctx.lineTo(Math.cos(a) * (ring.r * s + 4), Math.sin(a) * (ring.r * s + 4));
          ctx.stroke();
        }
        ctx.restore();
      }

      // circuit traces + data pulses
      for (const tr of traces) {
        const pts = tracePts(tr, ex, ey, spin * 0.5);
        ctx.strokeStyle = LIME(0.1);
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
        ctx.stroke();
        const pad = pts[pts.length - 1];
        ctx.strokeStyle = LIME(0.4);
        ctx.strokeRect(pad[0] - 3, pad[1] - 3, 6, 6);
        for (const pu of tr.pulses) {
          if (!reduce) {
            pu.p -= pu.sp * dt;
            if (pu.p <= 0) pu.p = 1;
          }
          for (let k = 0; k < 4; k++) {
            const [qx, qy] = polyAt(pts, Math.min(1, pu.p + k * 0.02));
            ctx.fillStyle = LIME((1 - k / 4) * 0.6);
            ctx.fillRect(qx - 1.4, qy - 1.4, 2.8, 2.8);
          }
        }
      }

      // neural mesh edges + activations
      for (const e of edges) {
        const [ax, ay] = npos(e.from, ex, ey, spin);
        const [bx, by] = npos(e.to, ex, ey, spin);
        if (!reduce && e.active) {
          e.pulse -= e.sp * dt;
          if (e.pulse <= 0) {
            e.pulse = 1;
            e.to.lit = 1;
            e.active = Math.random() > 0.25;
          }
        }
        ctx.strokeStyle = LIME(0.1 + (e.active ? 0.06 : 0));
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
        if (e.active && !reduce) {
          const px = ax + (bx - ax) * (1 - e.pulse);
          const py = ay + (by - ay) * (1 - e.pulse);
          ctx.fillStyle = LIME(0.85);
          ctx.beginPath();
          ctx.arc(px, py, 1.6, 0, TAU);
          ctx.fill();
        }
      }
      // neural nodes
      for (const n of [...inner, ...outer]) {
        const [nx, ny] = npos(n, ex, ey, spin);
        n.lit *= 0.93;
        ctx.fillStyle = LIME(0.45 + n.lit * 0.55);
        ctx.beginPath();
        ctx.arc(nx, ny, 1.8 + n.lit * 2.2, 0, TAU);
        ctx.fill();
      }

      // core (contained processing glow)
      const cr = s * 0.05 * (1 + 0.1 * Math.sin(t * 0.004));
      const g = ctx.createRadialGradient(ex, ey, 0, ex, ey, cr * 3.2);
      g.addColorStop(0, WHITE(0.9));
      g.addColorStop(0.3, LIME(0.55));
      g.addColorStop(1, LIME(0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(ex, ey, cr * 3.2, 0, TAU);
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

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.on = true;
    };
    const onLeave = () => { mouse.on = false; };
    const onResize = () => { resize(); if (reduce) frame(16); };

    const hostEl = parent.closest('section') ?? parent;
    if (fine && !reduce) {
      hostEl.addEventListener('pointermove', onMove as EventListener);
      hostEl.addEventListener('pointerleave', onLeave);
    }
    window.addEventListener('resize', onResize);
    const io = new IntersectionObserver(([en]) => (en.isIntersecting ? start() : stop()), { threshold: 0 });
    io.observe(canvas);

    return () => {
      stop();
      io.disconnect();
      hostEl.removeEventListener('pointermove', onMove as EventListener);
      hostEl.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
