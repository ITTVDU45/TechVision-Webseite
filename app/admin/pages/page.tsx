"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DataTable from '../components/DataTable';
import PageContentForm from '../components/PageContentForm';

interface PageContent {
  _id: string;
  page: string;
  section: string;
  title?: string;
  subtitle?: string;
  description?: string;
  content?: Record<string, any>;
}

export default function PagesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [contents, setContents] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingContent, setEditingContent] = useState<PageContent | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchContents = useCallback(async () => {
    try {
      const res = await fetch('/api/page-content');
      const data = await res.json();
      setContents(data);
    } catch (error) {
      console.error('Error fetching page contents:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/admin/login');
      return;
    }
    fetchContents();
  }, [session, status, router, fetchContents]);

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie diesen Seiteninhalt wirklich löschen?')) return;

    try {
      const res = await fetch(`/api/page-content?id=${id}`, { 
        method: 'DELETE',
        credentials: 'include', // Wichtig: Cookies (Session) mitsenden
      });
      if (res.ok) {
        fetchContents();
      }
    } catch (error) {
      console.error('Error deleting page content:', error);
    }
  };

  const handleEdit = (content: PageContent) => {
    setEditingContent(content);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setEditingContent(null);
    setShowForm(false);
    fetchContents();
  };

  if (loading) {
    return <div className="p-4 md:p-8 text-white">Lädt...</div>;
  }

  return (
    <div className="p-4 sm:p-5 md:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl">Seiteninhalte verwalten</h1>
          <p className="text-sm text-gray-400 sm:text-base">Verwalten Sie Hero-Sektionen und andere Seiteninhalte</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingContent(null);
            setShowForm(true);
          }}
          className="min-h-[44px] w-full touch-manipulation rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-sm font-medium text-white transition-all hover:from-blue-600 hover:to-indigo-700 sm:w-auto sm:px-6"
        >
          Neuen Seiteninhalt hinzufügen
        </button>
      </div>

      <DataTable
        data={contents}
        columns={[
          { key: 'page', label: 'Seite' },
          { key: 'section', label: 'Sektion' },
          { key: 'title', label: 'Titel' },
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <PageContentForm
          content={editingContent}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}
