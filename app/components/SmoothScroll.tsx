"use client";
import { useEffect } from "react";
import Lenis from "lenis";

function prefersReducedMotion(): boolean {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Ein Lenis mit autoRaf (ein RAF-Loop) statt manuellem RAF + lenis.raf — weniger Jank.
 * Bei reduced-motion: natives Scrollen (bessere Performance + A11y).
 */
export default function SmoothScroll() {
    useEffect(() => {
        if (prefersReducedMotion()) return;

        const lenis = new Lenis({
            autoRaf: true,
            smoothWheel: true,
            orientation: "vertical",
            gestureOrientation: "vertical",
            lerp: 0.085,
            wheelMultiplier: 0.85,
            touchMultiplier: 1.35,
            syncTouch: true,
            infinite: false,
        });

        return () => {
            lenis.destroy();
        };
    }, []);

    return null;
}
