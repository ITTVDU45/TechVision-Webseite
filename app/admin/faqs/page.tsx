"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DataTable from '../components/DataTable';
import PageSelector from '../components/PageSelector';
import FAQForm from '../components/FAQForm';
import FAQBulkImportDialog from '../components/FAQBulkImportDialog';

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  page: string;
  category?: string;
  order: number;
}

export default function FAQsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState('all');
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);

  const fetchFAQs = useCallback(async () => {
    try {
      const url = selectedPage === 'all' ? '/api/faqs' : `/api/faqs?page=${selectedPage}`;
      const res = await fetch(url);
      const data = await res.json();
      setFaqs(data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedPage]);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/admin/login');
      return;
    }
    fetchFAQs();
  }, [session, status, router, fetchFAQs]);

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie diese FAQ wirklich löschen?')) return;

    try {
      const res = await fetch(`/api/faqs?id=${id}`, { 
        method: 'DELETE',
        credentials: 'include', // Wichtig: Cookies (Session) mitsenden
      });
      if (res.ok) {
        fetchFAQs();
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFAQ(faq);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setEditingFAQ(null);
    setShowForm(false);
    fetchFAQs();
  };

  if (loading) {
    return <div className="p-4 md:p-8 text-white">Lädt...</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">FAQs verwalten</h1>
          <p className="text-sm md:text-base text-gray-400">Verwalten Sie häufig gestellte Fragen</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
          <button
            type="button"
            onClick={() => setShowBulkImport(true)}
            className="w-full sm:w-auto px-4 md:px-6 py-3 rounded-lg border border-violet-500/50 text-violet-200 font-medium hover:bg-violet-500/10 transition-all min-h-[44px]"
          >
            Massenimport (KI)
          </button>
          <button
            type="button"
            onClick={() => {
              setEditingFAQ(null);
              setShowForm(true);
            }}
            className="w-full sm:w-auto px-4 md:px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all min-h-[44px]"
          >
            Neue FAQ hinzufügen
          </button>
        </div>
      </div>

      <div className="mb-6">
        <PageSelector
          value={selectedPage}
          onChange={setSelectedPage}
          label="Seite filtern"
        />
      </div>

      <DataTable
        data={faqs}
        columns={[
          { key: 'question', label: 'Frage' },
          {
            key: 'answer',
            label: 'Antwort',
            multilineClamp: true,
          },
          { key: 'page', label: 'Seite' },
          { key: 'category', label: 'Kategorie' },
          { key: 'order', label: 'Reihenfolge' },
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <FAQForm
          faq={editingFAQ}
          onClose={handleFormClose}
        />
      )}

      <FAQBulkImportDialog
        open={showBulkImport}
        onClose={() => setShowBulkImport(false)}
        onSaved={fetchFAQs}
      />
    </div>
  );
}
