"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/**
 * Entscheidet, ob der 3D-Hintergrund überhaupt läuft.
 *
 * Three.js wiegt rund 150 kB. Über dynamic() mit ssr:false liegt das in einem
 * eigenen Bündel, das erst nach der Hydration geladen wird - der First Load
 * der Startseite bleibt davon unberührt.
 *
 * Nicht geladen wird bei:
 *   - prefers-reduced-motion: reduce
 *   - grobem Zeiger und schmalem Fenster (Telefone zahlen für Deko am meisten)
 * Pausiert wird, sobald der Hero aus dem Bild ist oder der Tab in den
 * Hintergrund geht. Ein unsichtbares Bild zu rendern kostet nur Akku.
 */

const HeroLattice = dynamic(() => import("./HeroLattice"), { ssr: false });

export default function HeroBackdrop() {
  const [enabled, setEnabled] = useState(false);
  const [paused, setPaused] = useState(false);
  const markerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarseQuery = window.matchMedia("(pointer: coarse)");

    const decide = () => {
      setEnabled(!motionQuery.matches && !(coarseQuery.matches && window.innerWidth < 1024));
    };
    decide();

    motionQuery.addEventListener("change", decide);
    coarseQuery.addEventListener("change", decide);
    window.addEventListener("resize", decide, { passive: true });
    return () => {
      motionQuery.removeEventListener("change", decide);
      coarseQuery.removeEventListener("change", decide);
      window.removeEventListener("resize", decide);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const marker = markerRef.current;
    if (!marker) return;

    const observer = new IntersectionObserver(
      ([entry]) => setPaused(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(marker);

    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled]);

  return (
    <div ref={markerRef} className="absolute inset-0" aria-hidden="true">
      {enabled ? <HeroLattice paused={paused} /> : null}
    </div>
  );
}
