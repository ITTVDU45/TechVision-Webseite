"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DataTable from '../components/DataTable';
import ServiceForm from '../components/ServiceForm';
import PageSelector from '../components/PageSelector';

interface Service {
  _id: string;
  name: string;
  icon: string;
  description?: string;
  page: string;
  category?: string;
  order: number;
  published: boolean;
}

export default function ServicesPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState('all');
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!session) {
      router.push('/admin/login');
      return;
    }
    fetchServices();
  }, [session, selectedPage]);

  const fetchServices = async () => {
    try {
      const url = selectedPage === 'all' ? '/api/services' : `/api/services?page=${selectedPage}`;
      const res = await fetch(url);
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie diesen Service wirklich löschen?')) return;

    try {
      const res = await fetch(`/api/services?id=${id}`, { 
        method: 'DELETE',
        credentials: 'include', // Wichtig: Cookies (Session) mitsenden
      });
      if (res.ok) {
        fetchServices();
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setEditingService(null);
    setShowForm(false);
    fetchServices();
  };

  if (loading) {
    return <div className="p-8 text-white">Lädt...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Services verwalten</h1>
          <p className="text-gray-400">Verwalten Sie Services und Karten</p>
        </div>
        <button
          onClick={() => {
            setEditingService(null);
            setShowForm(true);
          }}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all"
        >
          Neuen Service hinzufügen
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
        data={services}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'icon', label: 'Icon' },
          { key: 'page', label: 'Seite' },
          { key: 'category', label: 'Kategorie' },
          { key: 'order', label: 'Reihenfolge' },
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <ServiceForm
          service={editingService}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}
