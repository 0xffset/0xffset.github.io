import { useEffect, useRef, useState } from "react";

const cols = 48,
  rows = 28,
  cs = 12;
export default function Life() {
  const ref = useRef<HTMLCanvasElement>(null);
  const grid = useRef(new Uint8Array(cols * rows));
  const [paused, setPaused] = useState(false);
  const pz = useRef(false);
  pz.current = paused;
  const seed = () => {
    const a = grid.current;
    for (let i = 0; i < a.length; i++) a[i] = Math.random() < 0.24 ? 1 : 0;
  };
  useEffect(() => {
    const cv = ref.current!,
      cx = cv.getContext("2d")!;
    cv.width = cols * cs;
    cv.height = rows * cs;
    let gen = 0;
    const draw = () => {
      const a = grid.current;
      cx.fillStyle = "#161513";
      cx.fillRect(0, 0, cv.width, cv.height);
      cx.strokeStyle = "#26241f";
      cx.lineWidth = 1;
      cx.beginPath();
      for (let i = 0; i <= cols; i++) {
        cx.moveTo(i * cs + 0.5, 0);
        cx.lineTo(i * cs + 0.5, cv.height);
      }
      for (let j = 0; j <= rows; j++) {
        cx.moveTo(0, j * cs + 0.5);
        cx.lineTo(cv.width, j * cs + 0.5);
      }
      cx.stroke();
      cx.fillStyle = "#e6e1d6";
      for (let i = 0; i < a.length; i++)
        if (a[i])
          cx.fillRect(
            (i % cols) * cs + 2,
            Math.floor(i / cols) * cs + 2,
            cs - 3,
            cs - 3,
          );
    };
    const step = () => {
      const a = grid.current,
        b = new Uint8Array(a.length);
      let p = 0;
      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++) {
          let c = 0;
          for (let dy = -1; dy < 2; dy++)
            for (let dx = -1; dx < 2; dx++)
              if (dx || dy)
                c +=
                  a[((y + dy + rows) % rows) * cols + ((x + dx + cols) % cols)];
          const v = c === 3 || (c === 2 && a[y * cols + x]) ? 1 : 0;
          b[y * cols + x] = v;
          p += v;
        }
      grid.current = b;
      if (p < 6 && ++gen > 25) {
        seed();
        gen = 0;
      }
    };
    seed();
    const t = setInterval(() => {
      if (!pz.current) step();
      draw();
    }, 110);
    let paint = -1;
    const cell = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      return (
        Math.floor(((e.clientY - r.top) / r.height) * rows) * cols +
        Math.floor(((e.clientX - r.left) / r.width) * cols)
      );
    };
    const dn = (e: PointerEvent) => {
      const i = cell(e);
      paint = grid.current[i] ? 0 : 1;
      grid.current[i] = paint;
      cv.setPointerCapture(e.pointerId);
      draw();
    };
    const mv = (e: PointerEvent) => {
      if (paint < 0) return;
      const i = cell(e);
      if (i >= 0 && i < grid.current.length) grid.current[i] = paint;
      draw();
    };
    const up = () => {
      paint = -1;
    };
    cv.addEventListener("pointerdown", dn);
    cv.addEventListener("pointermove", mv);
    cv.addEventListener("pointerup", up);
    return () => {
      clearInterval(t);
      cv.removeEventListener("pointerdown", dn);
      cv.removeEventListener("pointermove", mv);
      cv.removeEventListener("pointerup", up);
    };
  }, []);
  return (
    <figure>
      <div className="fr">
        <canvas id="lf" ref={ref} />
      </div>
      <div className="ctl">
        <button onClick={() => setPaused(!paused)}>
          {paused ? (
            <>
              <span className="es">reanudar</span>
              <span className="en">resume</span>
            </>
          ) : (
            <>
              <span className="es">pausar</span>
              <span className="en">pause</span>
            </>
          )}
        </button>
        <button onClick={seed}>
          <span className="es">aleatorio</span>
          <span className="en">random</span>
        </button>
        <button onClick={() => grid.current.fill(0)}>
          <span className="es">limpiar</span>
          <span className="en">clear</span>
        </button>
      </div>
      <figcaption>
        <span className="es">
          Juego de la vida (regla B3/S23) en un toro de 48×28. Haz clic o
          arrastra sobre la cuadrícula para dibujar células.
        </span>
        <span className="en">
          Game of Life (rule B3/S23) on a 48×28 torus. Click or drag on the grid
          to draw cells.
        </span>
      </figcaption>
    </figure>
  );
}
