"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DataTable from '../components/DataTable';
import PricingForm from '../components/PricingForm';
import PageSelector from '../components/PageSelector';

interface PricingPlan {
  _id: string;
  name: string;
  originalPrice: string;
  currentPrice: string;
  features: string[];
  isPopular?: boolean;
  page: string;
  order: number;
  published: boolean;
}

export default function PricingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState('all');
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchPlans = useCallback(async () => {
    try {
      const url = selectedPage === 'all' ? '/api/pricing' : `/api/pricing?page=${selectedPage}`;
      const res = await fetch(url);
      const data = await res.json();
      setPlans(data);
    } catch (error) {
      console.error('Error fetching pricing plans:', error);
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
    fetchPlans();
  }, [session, status, router, fetchPlans]);

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie diesen Preisplan wirklich löschen?')) return;

    try {
      const res = await fetch(`/api/pricing?id=${id}`, { 
        method: 'DELETE',
        credentials: 'include', // Wichtig: Cookies (Session) mitsenden
      });
      if (res.ok) {
        fetchPlans();
      }
    } catch (error) {
      console.error('Error deleting pricing plan:', error);
    }
  };

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setEditingPlan(null);
    setShowForm(false);
    fetchPlans();
  };

  if (loading) {
    return <div className="p-4 md:p-8 text-white">Lädt...</div>;
  }

  return (
    <div className="p-4 sm:p-5 md:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl">Preise verwalten</h1>
          <p className="text-sm text-gray-400 sm:text-base">Verwalten Sie Preispläne</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingPlan(null);
            setShowForm(true);
          }}
          className="min-h-[44px] w-full touch-manipulation rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-sm font-medium text-white transition-all hover:from-blue-600 hover:to-indigo-700 sm:w-auto sm:px-6"
        >
          Neuen Preisplan hinzufügen
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
        data={plans}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'currentPrice', label: 'Aktueller Preis' },
          { key: 'originalPrice', label: 'Original Preis' },
          { key: 'page', label: 'Seite' },
          {
            key: 'isPopular',
            label: 'Beliebt',
            render: (value) => (value ? '✓' : ''),
          },
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <PricingForm
          plan={editingPlan}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}
