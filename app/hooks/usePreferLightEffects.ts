"use client";

import { useEffect, useState } from "react";

/**
 * True auf typischen Touch-Geräten (grobe Pointer) und iOS:
 * weniger WebGL, kein scroll-gekoppeltes Parallax, schlankere Animationen.
 */
export function usePreferLightEffects(): boolean {
  const [preferLight, setPreferLight] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const ios = /iP(hone|ad|od)/i.test(navigator.userAgent);
    setPreferLight(coarse || ios);
  }, []);

  return preferLight;
}
