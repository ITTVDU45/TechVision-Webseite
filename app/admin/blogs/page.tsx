"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DataTable from '../components/DataTable';
import BlogForm from '../components/BlogForm';

interface BlogPost {
  _id: string;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  date: string;
  readTime: string;
  category: {
    name: string;
    icon: string;
  };
  tags?: string[];
  page?: string;
  published: boolean;
}

export default function BlogsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!session) {
      router.push('/admin/login');
      return;
    }
    fetchBlogs();
  }, [session]);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      
      if (!res.ok) {
        console.error('API request failed:', res.status, res.statusText);
        setBlogs([]);
        setLoading(false);
        return;
      }
      
      const data = await res.json();
      
      // Stelle sicher, dass data ein Array ist
      if (Array.isArray(data)) {
        // Stelle sicher, dass tags und page korrekt geladen werden
        const blogsWithDefaults = data.map((blog: any) => ({
          ...blog,
          tags: Array.isArray(blog.tags) ? blog.tags : (blog.tags ? [blog.tags] : []),
          page: blog.page || null,
        }));
        setBlogs(blogsWithDefaults);
      } else {
        // Wenn data kein Array ist, aber auch kein Fehler-Objekt mit error-Feld
        if (data && typeof data === 'object' && 'error' in data) {
          console.error('API returned error:', data.error);
        } else {
          console.error('API error or unexpected data format:', data);
        }
        setBlogs([]);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie diesen Blog-Artikel wirklich löschen?')) return;

    try {
      const res = await fetch(`/api/blogs?id=${id}`, {
        method: 'DELETE',
        credentials: 'include', // Wichtig: Cookies (Session) mitsenden
      });
      if (res.ok) {
        fetchBlogs();
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setEditingBlog(null);
    setShowForm(false);
    fetchBlogs();
  };

  if (loading) {
    return <div className="p-8 text-white">Lädt...</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Blogs verwalten</h1>
          <p className="text-sm md:text-base text-gray-400">Verwalten Sie Blog-Artikel</p>
        </div>
        <button
          onClick={() => {
            setEditingBlog(null);
            setShowForm(true);
          }}
          className="w-full md:w-auto px-4 md:px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all min-h-[44px]"
        >
          Neuen Blog hinzufügen
        </button>
      </div>

      <DataTable
        data={blogs}
        columns={[
          { key: 'title', label: 'Titel' },
          { key: 'subtitle', label: 'Untertitel' },
          {
            key: 'category',
            label: 'Kategorien',
            render: (value) => {
              const categories = Array.isArray(value) ? value : (value ? [value] : []);
              if (categories.length === 0) {
                return <span className="text-gray-500">-</span>;
              }
              return (
                <div className="flex flex-wrap gap-1">
                  {categories.slice(0, 3).map((cat: any, idx: number) => (
                    <span key={idx} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                      {cat?.icon || '📝'} {cat?.name || cat?.id || '-'}
                    </span>
                  ))}
                  {categories.length > 3 && (
                    <span className="px-2 py-1 text-gray-500 text-xs">+{categories.length - 3}</span>
                  )}
                </div>
              );
            },
          },
          {
            key: 'page',
            label: 'Seiten',
            render: (value, row) => {
              // Unterstütze sowohl Array als auch String (für Rückwärtskompatibilität)
              const pages = Array.isArray(value) ? value : (Array.isArray(row.page) ? row.page : (value || row.page ? [value || row.page] : []));
              
              if (pages.length === 0 || (pages.length === 1 && (pages[0] === 'all' || pages[0] === ''))) {
                return <span className="text-gray-500">-</span>;
              }
              
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
            key: 'tags',
            label: 'Tags',
            render: (value, row) => {
              // Verwende row.tags direkt, falls value nicht gesetzt ist
              const tagsValue = row.tags || value;
              if (!tagsValue || !Array.isArray(tagsValue) || tagsValue.length === 0) {
                return <span className="text-gray-500">-</span>;
              }
              return (
                <div className="flex flex-wrap gap-1">
                  {tagsValue.slice(0, 3).map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {tagsValue.length > 3 && (
                    <span className="px-2 py-1 text-gray-500 text-xs">
                      +{tagsValue.length - 3}
                    </span>
                  )}
                </div>
              );
            },
          },
          { key: 'date', label: 'Datum' },
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
        <BlogForm
          blog={editingBlog}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}
