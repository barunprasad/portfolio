'use client';

import { useEffect, useRef } from 'react';

// "Cognition Engine" — the hero masterpiece. An AI processing engine with a
// spatial human⊕AI duality: organic branching dendrites feed from the LEFT
// (the brain), right-angle circuit traces + data pulses on the RIGHT (the AI),
// fused in a central processor — a dense neural mesh firing activations inside a
// hex chip, ringed by a turbine and counter-rotating hex housing (the machine),
// over a faint data-grid. Canvas 2D, additive glow, cursor-reactive. Guarded:
// reduced-motion renders one static frame, touch goes lighter, loop pauses off-screen.
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
    const L = (a: number) => `rgba(200,255,0,${a})`;

    let w = 0, h = 0, cx = 0, cy = 0, s = 1, raf = 0, running = false, t = 0, last = 0;
    const mouse = { x: 0, y: 0, on: false };
    const off = { x: 0, y: 0 };

    // --- dense neural mesh core (the AI brain) ---
    const innerN = lite ? 5 : 8;
    const outerN = lite ? 9 : 14;
    type Node = { r: number; a: number; lit: number };
    const inner: Node[] = Array.from({ length: innerN }, (_, i) => ({ r: 0.11, a: (i / innerN) * TAU, lit: 0 }));
    const outer: Node[] = Array.from({ length: outerN }, (_, i) => ({ r: 0.21, a: (i / outerN) * TAU + 0.15, lit: 0 }));
    type Edge = { from: Node; to: Node; pulse: number; sp: number; active: boolean };
    const edges: Edge[] = [];
    const mkEdge = (from: Node, to: Node) =>
      edges.push({ from, to, pulse: Math.random(), sp: rnd(0.001, 0.0024), active: Math.random() > 0.45 });
    outer.forEach((o, i) => {
      mkEdge(o, inner[i % innerN]);
      mkEdge(o, inner[(i + 2) % innerN]);
      if (Math.random() > 0.6) mkEdge(o, outer[(i + 1) % outerN]);
    });
    inner.forEach((n, i) => mkEdge(n, inner[(i + 1) % innerN]));

    // --- circuit traces on the RIGHT (the AI I/O) ---
    const TRACE = lite ? 6 : 11;
    type Trace = { a: number; step: number; rMid: number; rOut: number; mod: number; pulses: { p: number; sp: number }[] };
    const traces: Trace[] = Array.from({ length: TRACE }, (_, i) => ({
      a: -Math.PI * 0.46 + (i / (TRACE - 1)) * Math.PI * 0.92 + rnd(-0.04, 0.04), // right hemisphere
      step: rnd(0.1, 0.26) * (Math.random() > 0.5 ? 1 : -1),
      rMid: rnd(0.48, 0.66),
      rOut: rnd(0.82, 0.97),
      mod: Math.random() > 0.55 ? rnd(0.34, 0.46) : 0,
      pulses: Array.from({ length: Math.random() > 0.5 ? 2 : 1 }, () => ({ p: Math.random(), sp: rnd(0.0006, 0.0014) })),
    }));

    // --- branching organic dendrites on the LEFT (the human input) ---
    type Seg = [number, number, number, number, number, number];
    const bezPt = (a: number[], b: number[], c: number[], u: number): [number, number] => {
      const k = 1 - u;
      return [k * k * a[0] + 2 * k * u * b[0] + u * u * c[0], k * k * a[1] + 2 * k * u * b[1] + u * u * c[1]];
    };
    function buildDend(base: number): Seg[] {
      const dx = Math.cos(base), dy = Math.sin(base);
      const px = -dy, py = dx;
      const len = rnd(0.6, 0.95);
      const bow = rnd(-0.32, 0.32);
      const m0 = [dx * 0.23, dy * 0.23];
      const m2 = [dx * len + px * bow * 0.25, dy * len + py * bow * 0.25];
      const m1 = [dx * len * 0.5 + px * bow, dy * len * 0.5 + py * bow];
      const segs: Seg[] = [[m0[0], m0[1], m1[0], m1[1], m2[0], m2[1]]];
      const bp = bezPt(m0, m1, m2, 0.55);
      for (const sign of [1, -1]) {
        const ba = base + sign * rnd(0.32, 0.62);
        const bl = len * rnd(0.3, 0.5);
        const e = [bp[0] + Math.cos(ba) * bl, bp[1] + Math.sin(ba) * bl];
        const c = [bp[0] + Math.cos(ba) * bl * 0.5 + px * sign * 0.08, bp[1] + Math.sin(ba) * bl * 0.5 + py * sign * 0.08];
        segs.push([bp[0], bp[1], c[0], c[1], e[0], e[1]]);
      }
      return segs;
    }
    const DEND = lite ? 3 : 5;
    const dends = Array.from({ length: DEND }, (_, i) =>
      buildDend(Math.PI * 0.62 + (i / (DEND - 1)) * Math.PI * 0.76),
    );

    function resize() {
      const r = parent.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2; cy = h / 2; s = Math.min(w, h) / 2;
    }
    const npos = (n: Node, ex: number, ey: number, spin: number): [number, number] => [
      ex + Math.cos(n.a + spin) * n.r * s,
      ey + Math.sin(n.a + spin) * n.r * s,
    ];
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
    const hexPath = (ex: number, ey: number, r: number, rot: number) => {
      ctx.beginPath();
      for (let k = 0; k <= 6; k++) {
        const a = (k / 6) * TAU + rot;
        const x = ex + Math.cos(a) * r, y = ey + Math.sin(a) * r;
        if (k === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
    };

    function frame(dt: number) {
      t += dt;
      const tx = mouse.on ? (mouse.x - cx) / s : 0;
      const ty = mouse.on ? (mouse.y - cy) / s : 0;
      off.x += (tx - off.x) * 0.05;
      off.y += (ty - off.y) * 0.05;
      const ex = cx + off.x * s * 0.04;
      const ey = cy + off.y * s * 0.04;
      const spin = reduce ? 0 : t * 0.00008 + off.x * 0.22;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineWidth = 1;

      // faint data-grid (digital substrate), clipped to a disc
      ctx.save();
      ctx.beginPath();
      ctx.arc(ex, ey, 0.82 * s, 0, TAU);
      ctx.clip();
      ctx.strokeStyle = L(0.035);
      const gs = s * 0.13;
      ctx.beginPath();
      for (let gx = ex - s; gx < ex + s; gx += gs) {
        ctx.moveTo(gx, ey - s);
        ctx.lineTo(gx, ey + s);
      }
      for (let gy = ey - s; gy < ey + s; gy += gs) {
        ctx.moveTo(ex - s, gy);
        ctx.lineTo(ex + s, gy);
      }
      ctx.stroke();
      ctx.restore();

      // organic dendrites (the brain) — left, branching
      for (const segs of dends) {
        ctx.strokeStyle = L(0.16);
        for (const sg of segs) {
          ctx.beginPath();
          ctx.moveTo(ex + sg[0] * s, ey + sg[1] * s);
          ctx.quadraticCurveTo(ex + sg[2] * s, ey + sg[3] * s, ex + sg[4] * s, ey + sg[5] * s);
          ctx.stroke();
        }
        for (const sg of segs) {
          ctx.fillStyle = L(0.5);
          ctx.beginPath();
          ctx.arc(ex + sg[4] * s, ey + sg[5] * s, 1.5, 0, TAU);
          ctx.fill();
        }
      }

      // machine housing — counter-rotating hex frames + vertex bolts
      for (const hx of [
        { r: 0.8, sp: 0.00012, base: 0 },
        { r: 0.58, sp: -0.0002, base: Math.PI / 6 },
      ]) {
        const rot = (reduce ? 0 : t * hx.sp) + off.x * 0.3 + hx.base;
        ctx.strokeStyle = L(0.16);
        hexPath(ex, ey, hx.r * s, rot);
        ctx.stroke();
        for (let k = 0; k < 6; k++) {
          const a = (k / 6) * TAU + rot;
          ctx.fillStyle = L(0.5);
          ctx.beginPath();
          ctx.arc(ex + Math.cos(a) * hx.r * s, ey + Math.sin(a) * hx.r * s, 2, 0, TAU);
          ctx.fill();
        }
      }
      // turbine blade ring (the engine)
      const bRot = reduce ? 0 : t * 0.0002;
      const blades = lite ? 20 : 34;
      ctx.strokeStyle = L(0.16);
      for (let k = 0; k < blades; k++) {
        const a = (k / blades) * TAU + bRot;
        ctx.beginPath();
        ctx.moveTo(ex + Math.cos(a) * 0.66 * s, ey + Math.sin(a) * 0.66 * s);
        ctx.lineTo(ex + Math.cos(a + 0.07) * 0.73 * s, ey + Math.sin(a + 0.07) * 0.73 * s);
        ctx.stroke();
      }
      // asymmetric arc brackets
      const arcRot = reduce ? 0 : t * 0.00007;
      ctx.setLineDash([4, 9]);
      ctx.strokeStyle = L(0.1);
      ctx.beginPath();
      ctx.arc(ex, ey, 0.93 * s, arcRot - 0.5, arcRot + 1.3);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(ex, ey, 0.93 * s, arcRot + Math.PI - 0.5, arcRot + Math.PI + 1.3);
      ctx.stroke();
      ctx.setLineDash([]);

      // circuit traces (the AI) — right, with pads, modules and data pulses
      for (const tr of traces) {
        const pts = tracePts(tr, ex, ey, spin * 0.5);
        ctx.strokeStyle = L(0.1);
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
        ctx.stroke();
        const pad = pts[pts.length - 1];
        ctx.strokeStyle = L(0.42);
        ctx.strokeRect(pad[0] - 3, pad[1] - 3, 6, 6);
        if (tr.mod) {
          const [mx, my] = polyAt(pts, tr.mod);
          ctx.strokeStyle = L(0.3);
          ctx.strokeRect(mx - 4, my - 2.5, 8, 5);
        }
        for (const pu of tr.pulses) {
          if (!reduce) {
            pu.p -= pu.sp * dt;
            if (pu.p <= 0) pu.p = 1;
          }
          for (let k = 0; k < 4; k++) {
            const [qx, qy] = polyAt(pts, Math.min(1, pu.p + k * 0.02));
            ctx.fillStyle = L((1 - k / 4) * 0.65);
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
            e.active = Math.random() > 0.22;
          }
        }
        ctx.strokeStyle = L(0.1 + (e.active ? 0.06 : 0));
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
        if (e.active && !reduce) {
          const px = ax + (bx - ax) * (1 - e.pulse);
          const py = ay + (by - ay) * (1 - e.pulse);
          ctx.fillStyle = L(0.9);
          ctx.beginPath();
          ctx.arc(px, py, 1.6, 0, TAU);
          ctx.fill();
        }
      }
      for (const n of [...inner, ...outer]) {
        const [nx, ny] = npos(n, ex, ey, spin);
        n.lit *= 0.93;
        ctx.fillStyle = L(0.45 + n.lit * 0.55);
        ctx.beginPath();
        ctx.arc(nx, ny, 1.7 + n.lit * 2.2, 0, TAU);
        ctx.fill();
      }

      // core processor chip (hex housing around the neural core)
      ctx.strokeStyle = L(0.3);
      hexPath(ex, ey, 0.28 * s, reduce ? 0 : -t * 0.00022);
      ctx.stroke();

      // core glow
      const cr = s * 0.05 * (1 + 0.1 * Math.sin(t * 0.004));
      const g = ctx.createRadialGradient(ex, ey, 0, ex, ey, cr * 3.4);
      g.addColorStop(0, 'rgba(255,255,255,0.9)');
      g.addColorStop(0.3, L(0.55));
      g.addColorStop(1, L(0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(ex, ey, cr * 3.4, 0, TAU);
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
