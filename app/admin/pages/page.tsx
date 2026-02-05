"use client";
import React, { useEffect, useState } from 'react';
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
  const { data: session } = useSession();
  const router = useRouter();
  const [contents, setContents] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingContent, setEditingContent] = useState<PageContent | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!session) {
      router.push('/admin/login');
      return;
    }
    fetchContents();
  }, [session]);

  const fetchContents = async () => {
    try {
      const res = await fetch('/api/page-content');
      const data = await res.json();
      setContents(data);
    } catch (error) {
      console.error('Error fetching page contents:', error);
    } finally {
      setLoading(false);
    }
  };

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
    return <div className="p-8 text-white">Lädt...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Seiteninhalte verwalten</h1>
          <p className="text-gray-400">Verwalten Sie Hero-Sektionen und andere Seiteninhalte</p>
        </div>
        <button
          onClick={() => {
            setEditingContent(null);
            setShowForm(true);
          }}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all"
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
