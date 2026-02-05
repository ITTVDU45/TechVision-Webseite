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
    return <div className="p-8 text-white">Lädt...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Testimonials verwalten</h1>
          <p className="text-gray-400">Verwalten Sie Kundenstimmen</p>
        </div>
        <button
          onClick={() => {
            setEditingTestimonial(null);
            setShowForm(true);
          }}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all"
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
