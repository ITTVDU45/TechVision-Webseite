"use client";
import { useEffect } from "react";
import Lenis from "lenis";

function prefersReducedMotion(): boolean {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const finePointerQuery = "(hover: hover) and (pointer: fine)";

function shouldUseLenis(): boolean {
    if (typeof window === "undefined") return false;
    if (prefersReducedMotion()) return false;
    return window.matchMedia(finePointerQuery).matches;
}

/**
 * Lenis mit autoRaf — weniger Jank als manuelles RAF.
 * Auf Touch-Geräten kein Lenis: natives Momentum-Scrolling bleibt erhalten (kein syncTouch-Jank).
 * Bei reduced-motion: natives Scrollen (Performance + A11y).
 */
export default function SmoothScroll() {
    useEffect(() => {
        if (typeof window === "undefined") return;

        let lenis: Lenis | null = null;

        const apply = () => {
            lenis?.destroy();
            lenis = null;
            if (!shouldUseLenis()) return;
            lenis = new Lenis({
                autoRaf: true,
                smoothWheel: true,
                orientation: "vertical",
                gestureOrientation: "vertical",
                lerp: 0.085,
                wheelMultiplier: 0.85,
                touchMultiplier: 1,
                syncTouch: false,
                infinite: false,
            });
        };

        const mq = window.matchMedia(finePointerQuery);
        const onMotion = () => apply();

        const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

        apply();
        mq.addEventListener("change", apply);
        motionMq.addEventListener("change", onMotion);

        return () => {
            mq.removeEventListener("change", apply);
            motionMq.removeEventListener("change", onMotion);
            lenis?.destroy();
        };
    }, []);

    return null;
}
