import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Lorenz() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    let R: THREE.WebGLRenderer;
    try {
      R = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    } catch {
      cv.parentElement!.style.display = "none";
      return;
    }
    R.setPixelRatio(Math.min(devicePixelRatio, 2));
    const S = new THREE.Scene(),
      C = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    C.position.set(0, 0, 10.5);
    const M = 4200,
      pos = new Float32Array(M * 3),
      d = 0.006;
    let x = 0.1,
      y = 0,
      z = 0;
    const step = () => {
      const dx = 10 * (y - x),
        dy = x * (28 - z) - y,
        dz = x * y - (8 / 3) * z;
      x += dx * d;
      y += dy * d;
      z += dz * d;
    };
    for (let i = 0; i < 300; i++) step();
    for (let i = 0; i < M; i++) {
      step();
      pos.set([x * 0.14, (z - 25) * 0.14, y * 0.14], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setDrawRange(0, 2);
    const G = new THREE.Group();
    G.add(new THREE.Line(g, new THREE.LineBasicMaterial({ color: 0xe6e1d6 })));
    const ax = new THREE.BufferGeometry();
    ax.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array([
          -3.4, 0, 0, 3.4, 0, 0, 0, -3.4, 0, 0, 3.4, 0, 0, 0, -3.4, 0, 0, 3.4,
        ]),
        3,
      ),
    );
    G.add(
      new THREE.LineSegments(
        ax,
        new THREE.LineBasicMaterial({ color: 0x6b675e }),
      ),
    );
    S.add(G);
    G.rotation.x = 0.25;
    const rs = () => {
      const w = cv.clientWidth,
        h = cv.clientHeight;
      R.setSize(w, h, false);
      C.aspect = w / h;
      C.updateProjectionMatrix();
    };
    addEventListener("resize", rs);
    rs();
    let dr = false,
      lx = 0,
      ly = 0,
      n = 2,
      raf = 0;
    const dn = (e: PointerEvent) => {
      dr = true;
      lx = e.clientX;
      ly = e.clientY;
      cv.setPointerCapture(e.pointerId);
    };
    const up = () => {
      dr = false;
    };
    const mv = (e: PointerEvent) => {
      if (!dr) return;
      G.rotation.y += (e.clientX - lx) * 0.008;
      if (e.pointerType === "mouse") G.rotation.x += (e.clientY - ly) * 0.008;
      lx = e.clientX;
      ly = e.clientY;
    };
    cv.addEventListener("pointerdown", dn);
    cv.addEventListener("pointerup", up);
    cv.addEventListener("pointermove", mv);
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (n < M) {
        n = Math.min(M, n + 18);
        g.setDrawRange(0, n);
      }
      if (!dr) G.rotation.y += 0.0035;
      R.render(S, C);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", rs);
      cv.removeEventListener("pointerdown", dn);
      cv.removeEventListener("pointerup", up);
      cv.removeEventListener("pointermove", mv);
      R.dispose();
    };
  }, []);
  return (
    <figure>
      <div className="fr">
        <canvas id="lz" ref={ref} />
      </div>
      <figcaption>
        <span className="es">
          Atractor de Lorenz (σ=10, ρ=28, β=8/3), calculado en tu navegador con
          Three.js. Arrastra para rotarlo.
        </span>
        <span className="en">
          Lorenz attractor (σ=10, ρ=28, β=8/3), computed in your browser with
          Three.js. Drag to rotate.
        </span>
      </figcaption>
    </figure>
  );
}
