"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DataTable from "../components/DataTable";
import ServiceForm from "../components/ServiceForm";
import { HOME_SERVICES_PLACEMENT } from "@/lib/home-services-defaults";
import type { StoredImageMeta } from "@/lib/stored-image";

interface Service {
  _id: string;
  name: string;
  icon: string;
  image?: string;
  imageMeta?: StoredImageMeta | null;
  description?: string;
  page: string;
  link?: string;
  gradient?: string;
  category?: string;
  order: number;
  published: boolean;
}

export default function ServicesPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!session) {
      router.push("/admin/login");
      return;
    }
    fetchServices();
  }, [session]);

  const fetchServices = async () => {
    try {
      const res = await fetch(
        `/api/services?page=${HOME_SERVICES_PLACEMENT}&exactPage=1`
      );
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Möchten Sie diesen Service wirklich löschen?")) return;

    try {
      const res = await fetch(`/api/services?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        fetchServices();
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleEdit = (svc: Service) => {
    setEditingService(svc);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setEditingService(null);
    setShowForm(false);
    fetchServices();
  };

  if (loading) {
    return <div className="p-4 md:p-8 text-white">Lädt...</div>;
  }

  return (
    <div className="p-4 sm:p-5 md:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
            Startseite: Unsere Services
          </h1>
          <p className="text-sm text-gray-400 sm:text-base">
            Karten im Karussell unter „Unsere Services“ – immer der Startseiten-Sektion zugeordnet (
            <code className="text-gray-500">page=home</code>).
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingService(null);
            setShowForm(true);
          }}
          className="min-h-[44px] w-full touch-manipulation rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-sm font-medium text-white transition-all hover:from-blue-600 hover:to-indigo-700 sm:w-auto sm:px-6"
        >
          Neuen Service hinzufügen
        </button>
      </div>

      <DataTable
        data={services}
        columns={[
          { key: "order", label: "#" },
          { key: "name", label: "Name" },
          {
            key: "image",
            label: "Bild",
            render: (_: unknown, row: Service) =>
              row.image || row.imageMeta?.url ? (
                <span className="text-green-400">Ja</span>
              ) : (
                <span className="text-gray-500">—</span>
              ),
          },
          { key: "icon", label: "Icon" },
          { key: "link", label: "Link (Mehr dazu)" },
          {
            key: "description",
            label: "Beschreibung",
            multilineClamp: true,
          },
          {
            key: "published",
            label: "Live",
            render: (v: boolean) => (v ? "Ja" : "Nein"),
          },
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && <ServiceForm service={editingService} onClose={handleFormClose} />}
    </div>
  );
}
