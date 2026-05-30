'use client';

import { useEffect, useRef } from 'react';

// "Cognition Engine" — the hero masterpiece. A solid machine, not a starfield:
// a dark machined body (face plate, rim with bolts, a toothed gear, a filled
// turbine fan and intake ports) is rendered OPAQUE first so it has mass and a
// real silhouette. Only the contained "mind" glows — a plasma core firing
// synapses behind a breathing mechanical iris. Left intake ports are organic
// (the brain), right ports are square circuit pads (the AI). Canvas 2D,
// cursor-reactive. Guarded: reduced-motion renders one static frame, touch goes
// lighter, the loop pauses off-screen.
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

    // Acid-lime energy; warm-dark machined metal.
    const L = (a: number) => `rgba(200,255,0,${a})`;
    const METAL = 'rgba(16,18,11,1)';
    const METAL_HI = 'rgba(26,29,18,1)';
    const METAL_EDGE = 'rgba(52,58,36,1)';

    let w = 0, h = 0, cx = 0, cy = 0, s = 1, raf = 0, running = false, t = 0, last = 0;
    const mouse = { x: 0, y: 0, on: false };
    const off = { x: 0, y: 0 };

    // The contained "mind": orbiting sparks that fire into the core (the glow).
    const sparkN = lite ? 5 : 8;
    const sparks = Array.from({ length: sparkN }, (_, i) => ({
      a: (i / sparkN) * TAU,
      r: rnd(0.05, 0.13),
      sp: rnd(0.0003, 0.0009) * (Math.random() > 0.5 ? 1 : -1),
      lit: Math.random(),
    }));

    // Intake ports around the rim: left = organic (brain), right = circuit (AI).
    const portN = lite ? 8 : 12;
    const ports = Array.from({ length: portN }, (_, i) => {
      const a = (i / portN) * TAU - Math.PI / 2;
      return { a, right: Math.cos(a) > 0.05, phase: i / portN };
    });

    function resize() {
      const r = parent.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2; cy = h / 2; s = Math.min(w, h) / 2;
    }

    function frame(dt: number) {
      t += dt;
      const tx = mouse.on ? (mouse.x - cx) / s : 0;
      const ty = mouse.on ? (mouse.y - cy) / s : 0;
      off.x += (tx - off.x) * 0.05;
      off.y += (ty - off.y) * 0.05;
      const ex = cx + off.x * s * 0.05;
      const ey = cy + off.y * s * 0.05;

      // Polar → cartesian around the (parallaxed) engine centre.
      const PX = (ang: number, rad: number) => ex + Math.cos(ang) * rad;
      const PY = (ang: number, rad: number) => ey + Math.sin(ang) * rad;
      const topLit = (ang: number) => Math.max(0, -Math.sin(ang)); // 1 at the top

      ctx.clearRect(0, 0, w, h);

      // ============================================================
      // PASS A — the SOLID body (opaque, occludes the background)
      // ============================================================
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.setLineDash([]);

      // Engine face plate — lit from above (linear gradient = a real surface).
      const face = ctx.createLinearGradient(ex, ey - 0.86 * s, ex, ey + 0.86 * s);
      face.addColorStop(0, 'rgba(30,33,21,1)');
      face.addColorStop(0.5, 'rgba(15,17,11,1)');
      face.addColorStop(1, 'rgba(7,8,5,1)');
      ctx.fillStyle = face;
      ctx.beginPath();
      ctx.arc(ex, ey, 0.85 * s, 0, TAU);
      ctx.fill();

      // Machined outer rim + a top highlight where the light catches the bevel.
      ctx.lineWidth = 3;
      ctx.strokeStyle = METAL_EDGE;
      ctx.beginPath();
      ctx.arc(ex, ey, 0.845 * s, 0, TAU);
      ctx.stroke();
      ctx.lineWidth = 2;
      ctx.strokeStyle = L(0.32);
      ctx.beginPath();
      ctx.arc(ex, ey, 0.845 * s, -2.5, -0.7);
      ctx.stroke();

      // Outer ring band that holds the intake ports.
      ctx.fillStyle = METAL_HI;
      ctx.beginPath();
      ctx.arc(ex, ey, 0.84 * s, 0, TAU);
      ctx.arc(ex, ey, 0.76 * s, 0, TAU, true);
      ctx.fill('evenodd');

      // Intake ports — solid bezels; left rounded (organic), right square (circuit).
      for (const p of ports) {
        const a = p.a + (reduce ? 0 : t * 0.00003);
        const pr = 0.8 * s;
        const bx = PX(a, pr), by = PY(a, pr);
        const bz = 0.032 * s;
        ctx.fillStyle = METAL_EDGE;
        if (p.right) {
          ctx.save();
          ctx.translate(bx, by);
          ctx.rotate(a);
          ctx.fillRect(-bz, -bz, bz * 2, bz * 2);
          ctx.fillStyle = 'rgba(9,10,6,1)';
          ctx.fillRect(-bz * 0.55, -bz * 0.55, bz * 1.1, bz * 1.1);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(bx, by, bz, 0, TAU);
          ctx.fill();
          ctx.fillStyle = 'rgba(9,10,6,1)';
          ctx.beginPath();
          ctx.arc(bx, by, bz * 0.55, 0, TAU);
          ctx.fill();
        }
      }

      // Rim bolts (solid, with a top catch-light).
      for (let k = 0; k < 8; k++) {
        const a = (k / 8) * TAU + Math.PI / 8;
        const bx = PX(a, 0.815 * s), by = PY(a, 0.815 * s);
        ctx.fillStyle = METAL;
        ctx.beginPath();
        ctx.arc(bx, by, 0.016 * s, 0, TAU);
        ctx.fill();
        ctx.strokeStyle = L(0.12 + 0.3 * topLit(a));
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(bx, by, 0.016 * s, 0, TAU);
        ctx.stroke();
      }

      // Turbine fan — filled, skewed vanes (a solid rotor, top edges catch light).
      const tRot = reduce ? 0 : t * 0.00022;
      const vanes = lite ? 14 : 22;
      const tIn = 0.56 * s, tOut = 0.74 * s, aw = (TAU / vanes) * 0.46, skew = 0.16;
      for (let k = 0; k < vanes; k++) {
        const a = (k / vanes) * TAU + tRot;
        // each vane is lit by a gradient across its span — a curved metal blade
        const vg = ctx.createLinearGradient(PX(a, tIn), PY(a, tIn), PX(a + skew, tOut), PY(a + skew, tOut));
        vg.addColorStop(0, 'rgba(22,25,15,1)');
        vg.addColorStop(1, METAL_HI);
        ctx.fillStyle = vg;
        ctx.beginPath();
        ctx.moveTo(PX(a - aw, tIn), PY(a - aw, tIn));
        ctx.lineTo(PX(a + aw, tIn), PY(a + aw, tIn));
        ctx.lineTo(PX(a + aw + skew, tOut), PY(a + aw + skew, tOut));
        ctx.lineTo(PX(a - aw + skew, tOut), PY(a - aw + skew, tOut));
        ctx.closePath();
        ctx.fill();
        // leading edge highlight, brightest near the top of the rotor
        ctx.strokeStyle = L(0.14 + 0.46 * topLit(a));
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(PX(a - aw, tIn), PY(a - aw, tIn));
        ctx.lineTo(PX(a - aw + skew, tOut), PY(a - aw + skew, tOut));
        ctx.stroke();
      }
      // rotor inner/outer hairlines so the fan reads as one ring
      ctx.strokeStyle = METAL_EDGE;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(ex, ey, tIn, 0, TAU);
      ctx.moveTo(ex + tOut, ey);
      ctx.arc(ex, ey, tOut, 0, TAU);
      ctx.stroke();

      // Toothed gear — counter-rotating filled ring with trapezoidal teeth.
      const gRot = reduce ? 0 : -t * 0.00018;
      const gIn = 0.44 * s, gOut = 0.49 * s, gTooth = 0.535 * s, gTeeth = lite ? 16 : 24;
      ctx.fillStyle = METAL_HI;
      ctx.beginPath();
      ctx.arc(ex, ey, gOut, 0, TAU);
      ctx.arc(ex, ey, gIn, 0, TAU, true);
      ctx.fill('evenodd');
      for (let k = 0; k < gTeeth; k++) {
        const a = (k / gTeeth) * TAU + gRot;
        const a1 = a - 0.045, a2 = a + 0.045;
        ctx.fillStyle = METAL;
        ctx.beginPath();
        ctx.moveTo(PX(a1, gOut), PY(a1, gOut));
        ctx.lineTo(PX(a1, gTooth), PY(a1, gTooth));
        ctx.lineTo(PX(a2, gTooth), PY(a2, gTooth));
        ctx.lineTo(PX(a2, gOut), PY(a2, gOut));
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = L(0.12 + 0.42 * topLit(a));
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      ctx.strokeStyle = L(0.16);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(ex, ey, gIn, 0, TAU);
      ctx.moveTo(ex + gOut, ey);
      ctx.arc(ex, ey, gOut, 0, TAU);
      ctx.stroke();

      // Stator ring with notch ticks (fixed) — frames the iris.
      ctx.fillStyle = METAL_HI;
      ctx.beginPath();
      ctx.arc(ex, ey, 0.43 * s, 0, TAU);
      ctx.arc(ex, ey, 0.40 * s, 0, TAU, true);
      ctx.fill('evenodd');
      ctx.strokeStyle = L(0.14);
      ctx.lineWidth = 1;
      for (let k = 0; k < 36; k++) {
        const a = (k / 36) * TAU;
        ctx.beginPath();
        ctx.moveTo(PX(a, 0.405 * s), PY(a, 0.405 * s));
        ctx.lineTo(PX(a, 0.425 * s), PY(a, 0.425 * s));
        ctx.stroke();
      }

      // Mechanical iris — overlapping swirled blades; the aperture breathes open.
      const irisRot = reduce ? 0 : t * 0.00004;
      const breathe = 0.5 + 0.5 * Math.sin(t * 0.0011);
      const ap = (0.15 + 0.04 * breathe) * s;
      const rIris = 0.4 * s, irisN = 7, twist = 0.7;
      for (let k = 0; k < irisN; k++) {
        const b = (k / irisN) * TAU + irisRot;
        const wO = (Math.PI / irisN) * 1.5;
        const iA = b - twist, iB = iA + TAU / irisN;
        const mid = (iA + iB) / 2;
        ctx.beginPath();
        ctx.moveTo(PX(b - wO, rIris), PY(b - wO, rIris));
        ctx.lineTo(PX(b + wO, rIris), PY(b + wO, rIris));
        ctx.lineTo(PX(iB, ap), PY(iB, ap));
        ctx.quadraticCurveTo(PX(mid, ap * 0.74), PY(mid, ap * 0.74), PX(iA, ap), PY(iA, ap));
        ctx.closePath();
        ctx.fillStyle = k % 2 ? METAL : METAL_HI; // alternate blades read as overlap
        ctx.fill();
        ctx.strokeStyle = L(0.22);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(PX(iB, ap), PY(iB, ap));
        ctx.quadraticCurveTo(PX(mid, ap * 0.74), PY(mid, ap * 0.74), PX(iA, ap), PY(iA, ap));
        ctx.stroke();
      }

      // ============================================================
      // PASS B — the GLOW (additive): the contained, living energy
      // ============================================================
      ctx.globalCompositeOperation = 'lighter';

      // Ambient bloom so the engine casts light into the hero (not a flat sticker).
      const bloom = ctx.createRadialGradient(ex, ey, 0.3 * s, ex, ey, 1.25 * s);
      bloom.addColorStop(0, L(0.12));
      bloom.addColorStop(1, L(0));
      ctx.fillStyle = bloom;
      ctx.beginPath();
      ctx.arc(ex, ey, 1.25 * s, 0, TAU);
      ctx.fill();

      // The mind — plasma core + firing sparks, contained behind the iris.
      ctx.save();
      ctx.beginPath();
      ctx.arc(ex, ey, ap * 0.96, 0, TAU);
      ctx.clip();
      const pr = ap * (1.02 + 0.06 * Math.sin(t * 0.004));
      const core = ctx.createRadialGradient(ex, ey, 0, ex, ey, pr);
      core.addColorStop(0, 'rgba(255,255,255,0.95)');
      core.addColorStop(0.28, L(0.75));
      core.addColorStop(0.7, L(0.22));
      core.addColorStop(1, L(0));
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(ex, ey, pr, 0, TAU);
      ctx.fill();
      for (const sp of sparks) {
        if (!reduce) {
          sp.a += sp.sp * dt;
          sp.lit *= 0.94;
          if (Math.random() < 0.02) sp.lit = 1;
        }
        const sx = PX(sp.a, sp.r * s), sy = PY(sp.a, sp.r * s);
        if (sp.lit > 0.3) {
          ctx.strokeStyle = L(0.15 + sp.lit * 0.5);
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(ex, ey);
          ctx.stroke();
        }
        ctx.fillStyle = L(0.35 + sp.lit * 0.6);
        ctx.beginPath();
        ctx.arc(sx, sy, 1.1 + sp.lit * 1.8, 0, TAU);
        ctx.fill();
      }
      ctx.restore();

      // The hot edge of the aperture.
      ctx.strokeStyle = L(0.4);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(ex, ey, ap, 0, TAU);
      ctx.stroke();

      // Intake ports light up and feed the core as the engine breathes.
      for (const p of ports) {
        const a = p.a + (reduce ? 0 : t * 0.00003);
        const glow = reduce ? 0.5 : 0.5 + 0.5 * Math.sin(t * 0.0016 + p.phase * TAU);
        const bx = PX(a, 0.8 * s), by = PY(a, 0.8 * s);
        ctx.fillStyle = L(0.2 + glow * 0.6);
        ctx.beginPath();
        ctx.arc(bx, by, 1.4 + glow * 1.4, 0, TAU);
        ctx.fill();
        if (glow > 0.7) {
          ctx.strokeStyle = L((glow - 0.7) * 0.8);
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(bx, by);
          ctx.lineTo(PX(a, 0.56 * s), PY(a, 0.56 * s));
          ctx.stroke();
        }
      }
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
