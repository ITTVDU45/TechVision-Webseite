"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DataTable from '../components/DataTable';
import CaseStudyForm from '../components/CaseStudyForm';

interface CaseStudy {
  _id: string;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  stats: Array<{ value: string; label: string }>;
  category?: string[];
  page?: string[];
  published: boolean;
}

export default function CaseStudiesPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!session) {
      router.push('/admin/login');
      return;
    }
    fetchCaseStudies();
    fetchCategories();
  }, [session]);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/case-study-categories', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setCategories(data);
        }
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchCaseStudies = async () => {
    try {
      const res = await fetch('/api/case-studies');
      const data = await res.json();
      setCaseStudies(data);
    } catch (error) {
      console.error('Error fetching case studies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie diese Case Study wirklich löschen?')) return;

    try {
      const res = await fetch(`/api/case-studies?id=${id}`, { 
        method: 'DELETE',
        credentials: 'include', // Wichtig: Cookies (Session) mitsenden
      });
      if (res.ok) {
        fetchCaseStudies();
      }
    } catch (error) {
      console.error('Error deleting case study:', error);
    }
  };

  const handleEdit = (caseStudy: CaseStudy) => {
    setEditingCaseStudy(caseStudy);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setEditingCaseStudy(null);
    setShowForm(false);
    fetchCaseStudies();
  };

  if (loading) {
    return <div className="p-8 text-white">Lädt...</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Case Studies verwalten</h1>
          <p className="text-sm md:text-base text-gray-400">Verwalten Sie Erfolgsgeschichten</p>
        </div>
        <button
          onClick={() => {
            setEditingCaseStudy(null);
            setShowForm(true);
          }}
          className="w-full md:w-auto px-4 md:px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all min-h-[44px]"
        >
          Neue Case Study hinzufügen
        </button>
      </div>

      <DataTable
        data={caseStudies}
        columns={[
          { key: 'title', label: 'Titel' },
          { key: 'subtitle', label: 'Untertitel' },
          {
            key: 'category',
            label: 'Kategorien',
            render: (value) => {
              if (!value || (Array.isArray(value) && value.length === 0) || (!Array.isArray(value) && !value)) {
                return <span className="text-gray-500">-</span>;
              }
              const categoryIds = Array.isArray(value) ? value : [value];
              
              return (
                <div className="flex flex-wrap gap-1">
                  {categoryIds.slice(0, 3).map((catId: string, idx: number) => {
                    const category = categories.find((c) => c.id === catId);
                    return (
                      <span 
                        key={idx} 
                        className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs cursor-pointer hover:bg-green-500/30 transition-colors"
                        title={category?.name || catId}
                      >
                        {category?.name || catId}
                      </span>
                    );
                  })}
                  {categoryIds.length > 3 && (
                    <span className="px-2 py-1 text-gray-500 text-xs">+{categoryIds.length - 3}</span>
                  )}
                </div>
              );
            },
          },
          {
            key: 'page',
            label: 'Seiten',
            render: (value) => {
              if (!value || (Array.isArray(value) && value.length === 0) || (!Array.isArray(value) && (value === 'all' || value === ''))) {
                return <span className="text-gray-500">-</span>;
              }
              const pages = Array.isArray(value) ? value : [value];
              const pageNames: Record<string, string> = {
                'home': 'Startseite',
                'ki-transformation': 'KI Transformation',
                'software-development': 'Softwareentwicklung',
                'workflow-automation': 'Workflow Automation',
                'cybersecurity': 'Cybersecurity',
                'tools': 'Tools & KI-Agenten',
                'webhosting': 'Webhosting',
                'it-infrastructure': 'IT Infrastruktur',
                'web-development': 'Webentwicklung',
              };
              return (
                <div className="flex flex-wrap gap-1">
                  {pages.slice(0, 3).map((page: string, idx: number) => (
                    <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                      {pageNames[page] || page}
                    </span>
                  ))}
                  {pages.length > 3 && (
                    <span className="px-2 py-1 text-gray-500 text-xs">+{pages.length - 3}</span>
                  )}
                </div>
              );
            },
          },
          {
            key: 'published',
            label: 'Status',
            render: (value) => (
              <span className={`px-2 py-1 rounded text-xs ${value ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                {value ? 'Veröffentlicht' : 'Entwurf'}
              </span>
            ),
          },
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <CaseStudyForm
          caseStudy={editingCaseStudy}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}
