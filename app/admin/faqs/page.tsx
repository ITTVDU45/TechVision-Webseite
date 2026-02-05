"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DataTable from '../components/DataTable';
import PageSelector from '../components/PageSelector';
import FAQForm from '../components/FAQForm';

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  page: string;
  category?: string;
  order: number;
}

export default function FAQsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState('all');
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!session) {
      router.push('/admin/login');
      return;
    }
    fetchFAQs();
  }, [session, selectedPage]);

  const fetchFAQs = async () => {
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
  };

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
    return <div className="p-8 text-white">Lädt...</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">FAQs verwalten</h1>
          <p className="text-sm md:text-base text-gray-400">Verwalten Sie häufig gestellte Fragen</p>
        </div>
        <button
          onClick={() => {
            setEditingFAQ(null);
            setShowForm(true);
          }}
          className="w-full md:w-auto px-4 md:px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all min-h-[44px]"
        >
          Neue FAQ hinzufügen
        </button>
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
    </div>
  );
}
