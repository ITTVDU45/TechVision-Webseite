"use client";
import React, { memo, useCallback, useEffect, useRef } from 'react';
import { animate } from 'motion';

type Props = {
  blur?: number;
  glow?: boolean;
  borderWidth?: number;
  spread?: number;
  disabled?: boolean;
  proximity?: number;
  inactiveZone?: number;
  className?: string;
  children?: React.ReactNode;
};

const GlowingEffect = memo(({ blur = 0, glow = true, borderWidth = 1, spread = 20, disabled = false, proximity = 64, inactiveZone = 0.01, className, children }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = useCallback((ev: MouseEvent) => {
    if (!containerRef.current || disabled) return;
    const box = containerRef.current.getBoundingClientRect();
    const x = ev.clientX - box.left;
    const y = ev.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));

    if (distance < proximity) {
      const opacity = Math.max(0, 1 - distance / proximity);
      if (glowRef.current) {
        animate(glowRef.current, { opacity, transform: `translate(${x - centerX}px, ${y - centerY}px)` }, { duration: 0.1 });
      }
    } else {
      if (glowRef.current) {
        animate(glowRef.current, { opacity: 0, transform: 'translate(0, 0)' }, { duration: 0.1 });
      }
    }
  }, [disabled, proximity]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || disabled) return;
    container.addEventListener('mousemove', handleMouseMove as EventListener);
    return () => container.removeEventListener('mousemove', handleMouseMove as EventListener);
  }, [handleMouseMove, disabled]);

  return (
    <div ref={containerRef} className={className}>
      {glow && (
        <div ref={glowRef} className="pointer-events-none absolute inset-0" style={{ opacity: 0, borderRadius: 'inherit', transition: 'opacity 0.2s', background: `radial-gradient(circle at center, rgba(255,255,255,${inactiveZone}) 0%, transparent ${spread}%)`, filter: `blur(${blur}px)` }} />
      )}
      {children}
    </div>
  );
});

GlowingEffect.displayName = 'GlowingEffect';

export { GlowingEffect };


