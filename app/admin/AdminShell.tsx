"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Sidebar, { SidebarContent } from "./components/Sidebar";
import Drawer from "./components/Drawer";
import { IconMenu } from "@tabler/icons-react";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SessionProvider refetchInterval={5 * 60} refetchOnWindowFocus>
      {isLoginPage ? (
        <div className="min-h-dvh min-h-[100svh] bg-black pb-safe">{children}</div>
      ) : (
        <div className="flex min-h-dvh min-h-[100svh] bg-black">
          <Sidebar />

          <Drawer isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}>
            <div className="flex min-h-0 flex-1 flex-col">
              <SidebarContent onLinkClick={() => setSidebarOpen(false)} />
            </div>
          </Drawer>

          <main className="flex min-h-0 min-w-0 flex-1 flex-col bg-gray-950 pb-safe">
            <div className="sticky top-0 z-30 flex items-center gap-3 border-b border-gray-800 bg-gray-900 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top,0px))] md:hidden">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2 transition-colors hover:bg-gray-800 touch-manipulation"
                aria-label="Menü öffnen"
              >
                <IconMenu className="h-6 w-6 text-gray-300" />
              </button>
              <div className="min-w-0">
                <h1 className="truncate text-lg font-bold text-white">TechVision CMS</h1>
                <p className="text-xs text-gray-400">Admin Panel</p>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-x-hidden">{children}</div>
          </main>
        </div>
      )}
    </SessionProvider>
  );
}
