"use client";

import { useAnimationFrame } from "motion/react";
import { useRef } from "react";

export default function AnimatedCubeBackground() {
    const ref = useRef(null);

    useAnimationFrame((t) => {
        if (!ref.current) return;

        const rotate = Math.sin(t / 10000) * 200;
        const y = (1 + Math.sin(t / 1000)) * -50;
        ref.current.style.transform = `translateY(${y}px) rotateX(${rotate}deg) rotateY(${rotate}deg)`;
    });

    return (
        <div className="cube-bg">
            <div className="cube" ref={ref}>
                <div className="side front" />
                <div className="side left" />
                <div className="side right" />
                <div className="side top" />
                <div className="side bottom" />
                <div className="side back" />
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
                background-color: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(4px);
            }

            .front { transform: rotateY(0deg) translateZ(150px); }
            .back { transform: rotateY(180deg) translateZ(150px); }
            .left { transform: rotateY(-90deg) translateZ(150px); }
            .right { transform: rotateY(90deg) translateZ(150px); }
            .top { transform: rotateX(90deg) translateZ(150px); }
            .bottom { transform: rotateX(-90deg) translateZ(150px); }
        `}</style>
    );
}
