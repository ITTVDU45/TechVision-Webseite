"use client";
import React, { useEffect, useState } from 'react';
import type { Session } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  IconHelp,
  IconNews,
  IconBriefcase,
  IconTools,
  IconCreditCard,
  IconUsers,
} from '@tabler/icons-react';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [fallbackSession, setFallbackSession] = useState<Session | null>(null);
  const [stats, setStats] = useState({
    faqs: 0,
    blogs: 0,
    caseStudies: 0,
    services: 0,
    pricing: 0,
    testimonials: 0,
  });

  useEffect(() => {
    if (session) setFallbackSession(null);
  }, [session]);

  useEffect(() => {
    if (status !== 'unauthenticated') return;
    let cancelled = false;
    void (async () => {
      await new Promise((r) => setTimeout(r, 500));
      if (cancelled) return;
      const s = await getSession();
      if (cancelled) return;
      if (s) setFallbackSession(s);
      else router.replace('/admin/login');
    })();
    return () => {
      cancelled = true;
    };
  }, [status, router]);

  const activeSession = session ?? fallbackSession;

  useEffect(() => {
    if (activeSession) {
      fetchStats();
    }
  }, [activeSession]);

  const fetchStats = async () => {
    try {
      const [faqs, blogs, caseStudies, services, pricing, testimonials] = await Promise.all([
        fetch('/api/faqs').then((r) => r.ok ? r.json() : []).catch(() => []),
        fetch('/api/blogs').then((r) => r.ok ? r.json() : []).catch(() => []),
        fetch('/api/case-studies').then((r) => r.ok ? r.json() : []).catch(() => []),
        fetch('/api/services?page=home&exactPage=1').then((r) => r.ok ? r.json() : []).catch(() => []),
        fetch('/api/pricing').then((r) => r.ok ? r.json() : []).catch(() => []),
        fetch('/api/testimonials').then((r) => r.ok ? r.json() : []).catch(() => []),
      ]);

      setStats({
        faqs: Array.isArray(faqs) ? faqs.length : 0,
        blogs: Array.isArray(blogs) ? blogs.length : 0,
        caseStudies: Array.isArray(caseStudies) ? caseStudies.length : 0,
        services: Array.isArray(services) ? services.length : 0,
        pricing: Array.isArray(pricing) ? pricing.length : 0,
        testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex min-h-dvh items-center justify-center px-4">
        <div className="text-white">Lädt...</div>
      </div>
    );
  }

  if (!activeSession) {
    if (status === 'unauthenticated') {
      return (
        <div className="flex min-h-dvh items-center justify-center px-4 text-gray-300">
          Sitzung wird geprüft …
        </div>
      );
    }
    return null;
  }

  const statCards = [
    { label: 'FAQs', value: stats.faqs, icon: IconHelp, color: 'from-blue-500 to-blue-600', href: '/admin/faqs' },
    { label: 'Blogs', value: stats.blogs, icon: IconNews, color: 'from-purple-500 to-purple-600', href: '/admin/blogs' },
    { label: 'Case Studies', value: stats.caseStudies, icon: IconBriefcase, color: 'from-green-500 to-green-600', href: '/admin/case-studies' },
    { label: 'Services (Start)', value: stats.services, icon: IconTools, color: 'from-orange-500 to-orange-600', href: '/admin/services' },
    { label: 'Pricing', value: stats.pricing, icon: IconCreditCard, color: 'from-teal-500 to-teal-600', href: '/admin/pricing' },
    { label: 'Testimonials', value: stats.testimonials, icon: IconUsers, color: 'from-pink-500 to-pink-600', href: '/admin/testimonials' },
  ];

  return (
    <div className="p-4 sm:p-5 md:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl">Dashboard</h1>
        <p className="text-sm text-gray-400 sm:text-base">Willkommen zurück, {activeSession.user?.name}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <a
              key={stat.label}
              href={stat.href}
              className="group touch-manipulation rounded-lg border border-gray-800 bg-gray-900 p-5 transition-colors hover:border-gray-700 sm:p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {stat.value}
                </span>
              </div>
              <h3 className="text-lg font-medium text-gray-300">{stat.label}</h3>
            </a>
          );
        })}
      </div>
    </div>
  );
}
