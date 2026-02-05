"use client";
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import Sidebar, { SidebarContent } from './components/Sidebar';
import Drawer from './components/Drawer';
import { IconMenu } from '@tabler/icons-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SessionProvider 
      refetchInterval={5 * 60} // Session alle 5 Minuten prüfen
      refetchOnWindowFocus={true} // Session beim Fokus auf Fenster prüfen
    >
      {isLoginPage ? (
        // Login-Seite ohne Sidebar
        <div className="min-h-screen bg-black">
          {children}
        </div>
      ) : (
        // Alle anderen Admin-Seiten mit Sidebar
        <div className="flex min-h-screen bg-black">
          {/* Desktop Sidebar */}
          <Sidebar />
          
          {/* Mobile Drawer */}
          <Drawer isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}>
            <div className="flex flex-col min-h-full">
              <SidebarContent onLinkClick={() => setSidebarOpen(false)} />
            </div>
          </Drawer>

          {/* Main Content */}
          <main className="flex-1 bg-gray-950 min-w-0">
            {/* Mobile Header mit Hamburger Menu */}
            <div className="md:hidden sticky top-0 z-30 bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Menü öffnen"
              >
                <IconMenu className="w-6 h-6 text-gray-300" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-white">TechVision CMS</h1>
                <p className="text-xs text-gray-400">Admin Panel</p>
              </div>
            </div>
            {children}
          </main>
        </div>
      )}
    </SessionProvider>
  );
}
