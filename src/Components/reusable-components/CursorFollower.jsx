import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const colors = [
  "#ff00ff", 
  "#e754ff",
  "#8a2be2", 
];

const configs = [
  { size: 12, color: colors[0], spring: { damping: 18, stiffness: 300 } },
  { size: 20, color: colors[1], spring: { damping: 22, stiffness: 220 } },
  { size: 28, color: colors[2], spring: { damping: 28, stiffness: 160 } },
];

const MainCursor = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      style={{
        position: "fixed",
        width: 6,
        height: 6,
        backgroundColor: "#ffffff",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
};

const Follower = ({ size, color, springConfig }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX - size / 2);
      y.set(e.clientY - size / 2);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y, size]);

  return (
    <motion.div
      style={{
        position: "fixed",
        width: size,
        height: size,
        borderRadius: "50%",
        border: `2px solid ${color}`,
        pointerEvents: "none",
        zIndex: 9998,
        x: springX,
        y: springY,
        translateX: "0%",
        translateY: "0%",
      }}
    />
  );
};

export default function CursorFollower() {
  return (
    <>
      <MainCursor />
      {configs.map((cfg, index) => (
        <Follower
          key={index}
          size={cfg.size}
          color={cfg.color}
          springConfig={cfg.spring}
        />
      ))}
    </>
  );
}
