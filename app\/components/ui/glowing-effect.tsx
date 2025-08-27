"use client";
import React from 'react';
import { memo, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { animate } from "motion";

const GlowingEffect = memo(({
  blur = 0,
  glow = true,
  borderWidth = 1,
  spread = 20,
  disabled = false,
  proximity = 64,
  inactiveZone = 0.01,
  className,
  children,
}) => {
  const containerRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = useCallback(
    (ev) => {
      if (!containerRef.current || disabled) return;

      const box = containerRef.current.getBoundingClientRect();
      const x = ev.clientX - box.left;
      const y = ev.clientY - box.top;

      const centerX = box.width / 2;
      const centerY = box.height / 2;
      const distance = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
      );

      if (distance < proximity) {
        const opacity = Math.max(0, 1 - distance / proximity);
        if (glowRef.current) {
          animate(
            glowRef.current,
            {
              opacity: opacity,
              transform: `translate(${x - centerX}px, ${y - centerY}px)`,
            },
            { duration: 0.1 }
          );
        }
      } else {
        if (glowRef.current) {
          animate(
            glowRef.current,
            {
              opacity: 0,
              transform: "translate(0, 0)",
            },
            { duration: 0.1 }
          );
        }
      }
    },
    [disabled, proximity]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || disabled) return;

    container.addEventListener("mousemove", handleMouseMove);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove, disabled]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {glow && (
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: 0,
            borderRadius: "inherit",
            transition: "opacity 0.2s",
            background: `radial-gradient(circle at center, rgba(255,255,255,${inactiveZone}) 0%, transparent ${spread}%)`,
            filter: `blur(${blur}px)`,
          }}
        />
      )}
      {children}
    </div>
  );
});

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };
