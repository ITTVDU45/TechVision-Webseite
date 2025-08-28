"use client";
import React from "react";

export type CyberSecurityProps = {
  id?: string;
};

export default function CyberSecurity({ id }: CyberSecurityProps): JSX.Element {
  return (
    <main className="min-h-screen flex items-center justify-center py-24 bg-black text-white">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-4">Cybersecurity</h1>
        <p className="text-gray-400">Sicherheitslösungen und Beratung für Ihr Unternehmen{ id ? ` – ${id}` : '' }.</p>
      </div>
    </main>
  );
}


