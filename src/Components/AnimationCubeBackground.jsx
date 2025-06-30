import { useAnimationFrame } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function AnimatedCubeBackground() {
  const ref = useRef(null);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme") || "dark");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    setTheme(document.documentElement.getAttribute("data-theme") || "dark");

    return () => observer.disconnect();
  }, []);

  useAnimationFrame((t) => {
    if (!ref.current) return;

    const rotate = Math.sin(t / 10000) * 200;
    const y = (1 + Math.sin(t / 1000)) * -50;
    ref.current.style.transform = `translateY(${y}px) rotateX(${rotate}deg) rotateY(${rotate}deg)`;
  });

  return (
    <div className="cube-bg">
      <div ref={ref} className="cube">
        {["front", "back", "left", "right", "top", "bottom"].map((side) => (
          <div
            key={side}
            className={`side ${side}`}
            style={{
              backgroundColor: "var(--cube-bg)",

              border: "var(--cube-border)",
            }}
          />
        ))}
      </div>
      <StyleSheet />
    </div>
  );
}

function StyleSheet() {
  return (
    <style>{`
      .cube-bg {
        position: fixed;
        top: 30px;
        left: 0;
        width: 100vw;
        height: 120vh;
        z-index: -2;
        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: center;
        perspective: 1200px;
        overflow: hidden;
      }

      .cube {
        width: 300px;
        height: 300px;
        transform-style: preserve-3d;
        position: relative;
      }

      .side {
        position: absolute;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(4px);
      }

      .front { transform: rotateY(0deg) translateZ(150px); }
      .back { transform: rotateY(180deg) translateZ(150px); }
      .left { transform: rotateY(-90deg) translateZ(150px); }
      .right { transform: rotateY(90deg) translateZ(150px); }
      .top { transform: rotateX(90deg) translateZ(150px); }
      .bottom { transform: rotateX(-90deg) translateZ(150px); }

      @media (max-width: 500px) {
        .cube {
          width: 180px;
          height: 180px;
        }
        .front { transform: rotateY(0deg) translateZ(90px); }
        .back { transform: rotateY(180deg) translateZ(90px); }
        .left { transform: rotateY(-90deg) translateZ(90px); }
        .right { transform: rotateY(90deg) translateZ(90px); }
        .top { transform: rotateX(90deg) translateZ(90px); }
        .bottom { transform: rotateX(-90deg) translateZ(90px); }
      }
    `}</style>
  );
}
