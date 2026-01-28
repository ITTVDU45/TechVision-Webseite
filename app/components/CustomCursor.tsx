"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);

    // Mouse position motion values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for the follower text
    const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
    const followerX = useSpring(mouseX, springConfig);
    const followerY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Set visibility once mouse starts moving
            if (!isVisible) setIsVisible(true);

            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [mouseX, mouseY, isVisible]);

    // Hide cursor on touch devices
    if (typeof window !== "undefined" && "ontouchstart" in window) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 pointer-events-none z-[9999]"
            style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s ease" }}
        >
            {/* Custom Cursor Arrow */}
            <motion.div
                className="fixed top-0 left-0 w-6 h-6 text-blue-500"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-5%",
                    translateY: "-5%",
                }}
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                >
                    <path
                        d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                        fill="currentColor"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </motion.div>

            {/* Lagging "YOU" Follower */}
            <motion.div
                className="fixed top-0 left-0 px-3 py-1 bg-white/[0.1] backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-2xl"
                style={{
                    x: followerX,
                    y: followerY,
                    translateX: "40%",
                    translateY: "60%",
                }}
            >
                <span className="text-[10px] font-black text-white tracking-widest uppercase">
                    YOU
                </span>

                {/* Subtle Glow inside the pill */}
                <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-sm" />
            </motion.div>

            <style jsx global>{`
        @media (pointer: fine) {
          body, a, button {
            cursor: none !important;
          }
        }
      `}</style>
        </div>
    );
}
