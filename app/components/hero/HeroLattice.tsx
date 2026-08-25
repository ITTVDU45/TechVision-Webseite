"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Räumliches Gitter als Hero-Hintergrund.
 *
 * Bewusst kein Partikelgeflimmer: Ein Raster mit Tiefe liest sich als
 * Infrastruktur und Struktur - das ist das Thema der Seite. Die Bewegung ist
 * langsam genug, um beim Lesen nicht zu stören.
 *
 * Wird nur über HeroBackdrop geladen, das Rücksichtnahme und Sichtbarkeit
 * regelt. Diese Datei kümmert sich allein um die Darstellung.
 */

/** Rasterpunkte je Achse. 34x34 ergibt gut 2200 Linien - genug für Tiefe. */
const SEGMENTS = 34;
const SPACING = 1.35;

export default function HeroLattice({ paused = false }: { paused?: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
    } catch {
      return; // Kein WebGL: Der Verlauf im Hintergrund bleibt für sich stehen.
    }

    // Über 1.5 bringt die Auflösung hier nichts Sichtbares, kostet aber
    // quadratisch Füllrate - auf Retina-Notebooks der Unterschied
    // zwischen flüssig und zäh.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(host.clientWidth, host.clientHeight);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050a12, 0.055);

    const camera = new THREE.PerspectiveCamera(52, host.clientWidth / host.clientHeight, 0.1, 120);
    camera.position.set(0, 6.5, 20);
    camera.lookAt(0, 0, -6);

    // Gitter als Liniennetz. Positionen werden im Takt neu geschrieben,
    // deshalb ein einziges BufferGeometry statt vieler Objekte.
    const positions: number[] = [];
    const half = (SEGMENTS * SPACING) / 2;
    for (let ix = 0; ix < SEGMENTS; ix++) {
      for (let iz = 0; iz < SEGMENTS; iz++) {
        const x = ix * SPACING - half;
        const z = iz * SPACING - half;
        if (ix < SEGMENTS - 1) {
          positions.push(x, 0, z, x + SPACING, 0, z);
        }
        if (iz < SEGMENTS - 1) {
          positions.push(x, 0, z, x, 0, z + SPACING);
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    const attribute = new THREE.Float32BufferAttribute(positions, 3);
    geometry.setAttribute("position", attribute);

    const material = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.22,
    });

    const lattice = new THREE.LineSegments(geometry, material);
    lattice.rotation.x = -0.06;
    scene.add(lattice);

    const base = Float32Array.from(positions);
    const array = attribute.array as Float32Array;

    // Zeigerposition als Ziel, dem die Kamera nachläuft - harte Sprünge
    // wirken nervös.
    const pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const onResize = () => {
      if (!host.clientWidth || !host.clientHeight) return;
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
    };
    const observer = new ResizeObserver(onResize);
    observer.observe(host);

    let frame = 0;
    const clock = new THREE.Clock();

    const draw = () => {
      frame = requestAnimationFrame(draw);
      if (pausedRef.current) return;

      const t = clock.getElapsedTime();

      // Zwei überlagerte Wellen: eine allein sieht mechanisch aus.
      for (let i = 0; i < array.length; i += 3) {
        const x = base[i];
        const z = base[i + 2];
        array[i + 1] =
          Math.sin(x * 0.16 + t * 0.32) * 0.9 + Math.cos(z * 0.19 - t * 0.24) * 0.7;
      }
      attribute.needsUpdate = true;

      eased.x += (pointer.x - eased.x) * 0.03;
      eased.y += (pointer.y - eased.y) * 0.03;
      camera.position.x = eased.x * 2.2;
      camera.position.y = 6.5 - eased.y * 1.1;
      camera.lookAt(0, 0, -6);

      renderer.render(scene, camera);
    };
    draw();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />;
}
