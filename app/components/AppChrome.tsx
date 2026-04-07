"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import SmoothScroll from "./SmoothScroll";
import CustomCursor from "./CustomCursor";

/**
 * Lenis + Custom Cursor nur außerhalb von /admin — bessere Performance und UX auf Mobilgeräten im CMS.
 */
function AppChromeInner() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
    </>
  );
}

export default function AppChrome() {
  return (
    <Suspense fallback={null}>
      <AppChromeInner />
    </Suspense>
  );
}
