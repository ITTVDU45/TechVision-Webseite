"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Drawer({ isOpen, onClose, children }: DrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="fixed left-0 top-0 z-50 flex h-[100dvh] max-h-[100svh] w-[min(18rem,88vw)] flex-col border-r border-gray-800 bg-gray-900 pt-[env(safe-area-inset-top,0px)] md:hidden"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-gray-800 px-4 py-3">
              <h2 className="text-lg font-bold text-white">Menü</h2>
              <button
                type="button"
                onClick={onClose}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg transition-colors hover:bg-gray-800 touch-manipulation"
                aria-label="Menü schließen"
              >
                <IconX className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain touch-pan-y [-webkit-overflow-scrolling:touch]">
              {children}
            </div>
            <div
              className="shrink-0"
              style={{ height: "max(0.5rem, env(safe-area-inset-bottom, 0px))" }}
              aria-hidden
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
