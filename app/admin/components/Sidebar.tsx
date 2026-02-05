"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  IconLayoutDashboard,
  IconHelp,
  IconNews,
  IconBriefcase,
  IconSettings,
  IconLogout,
  IconCreditCard,
  IconUsers,
  IconTools,
  IconTags,
} from '@tabler/icons-react';

interface SidebarContentProps {
  onLinkClick?: () => void;
}

// Statisches Array außerhalb der Komponente für konsistente Reihenfolge
const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: IconLayoutDashboard },
  { href: '/admin/faqs', label: 'FAQs', icon: IconHelp },
  { href: '/admin/blogs', label: 'Blogs', icon: IconNews },
  { href: '/admin/case-studies', label: 'Case Studies', icon: IconBriefcase },
  { href: '/admin/case-study-categories', label: 'Case Study Kategorien', icon: IconTags },
  { href: '/admin/services', label: 'Services', icon: IconTools },
  { href: '/admin/pricing', label: 'Pricing', icon: IconCreditCard },
  { href: '/admin/testimonials', label: 'Testimonials', icon: IconUsers },
  { href: '/admin/pages', label: 'Seiteninhalte', icon: IconSettings },
] as const;

function SidebarContent({ onLinkClick }: SidebarContentProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [activePath, setActivePath] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setActivePath(pathname);
  }, [pathname]);

  return (
    <>
      <div className="p-4 md:p-6 border-b border-gray-800">
        <h1 className="text-xl md:text-2xl font-bold text-white">TechVision CMS</h1>
        <p className="text-xs md:text-sm text-gray-400 mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = mounted && activePath ? (
            activePath === item.href || 
            (item.href !== '/admin' && activePath.startsWith(item.href))
          ) : false;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onLinkClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors min-h-[44px] ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
              suppressHydrationWarning
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white w-full transition-colors min-h-[44px]"
        >
          <IconLogout className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">Abmelden</span>
        </button>
      </div>
    </>
  );
}

export default function Sidebar() {
  return (
    <div className="hidden md:flex w-64 bg-gray-900 border-r border-gray-800 min-h-screen flex-col">
      <SidebarContent />
    </div>
  );
}

export { SidebarContent };
