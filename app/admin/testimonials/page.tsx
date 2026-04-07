"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DataTable from '../components/DataTable';
import TestimonialForm from '../components/TestimonialForm';

interface Testimonial {
  _id: string;
  name: string;
  company: string;
  quote: string;
  image?: string;
  page?: string;
  order: number;
  published: boolean;
}

export default function TestimonialsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!session) {
      router.push('/admin/login');
      return;
    }
    fetchTestimonials();
  }, [session]);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie dieses Testimonial wirklich löschen?')) return;

    try {
      const res = await fetch(`/api/testimonials?id=${id}`, { 
        method: 'DELETE',
        credentials: 'include', // Wichtig: Cookies (Session) mitsenden
      });
      if (res.ok) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setEditingTestimonial(null);
    setShowForm(false);
    fetchTestimonials();
  };

  if (loading) {
    return <div className="p-4 md:p-8 text-white">Lädt...</div>;
  }

  return (
    <div className="p-4 sm:p-5 md:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl">Testimonials verwalten</h1>
          <p className="text-sm text-gray-400 sm:text-base">Verwalten Sie Kundenstimmen</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingTestimonial(null);
            setShowForm(true);
          }}
          className="min-h-[44px] w-full touch-manipulation rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-sm font-medium text-white transition-all hover:from-blue-600 hover:to-indigo-700 sm:w-auto sm:px-6"
        >
          Neues Testimonial hinzufügen
        </button>
      </div>

      <DataTable
        data={testimonials}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'company', label: 'Unternehmen' },
          {
            key: 'quote',
            label: 'Zitat',
            render: (value) => <span className="line-clamp-2">{value}</span>,
          },
          { key: 'page', label: 'Seite' },
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <TestimonialForm
          testimonial={editingTestimonial}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}
