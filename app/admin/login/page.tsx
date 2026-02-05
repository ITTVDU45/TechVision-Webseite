"use client";
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      console.log('Login result:', result);
      
      if (result?.error) {
        console.error('Login error:', result.error);
        if (result.error === 'Configuration') {
          setError('Server-Konfigurationsfehler. Bitte kontaktieren Sie den Administrator.');
        } else if (result.error.includes('credentials')) {
          setError('Ungültige Anmeldedaten. Bitte überprüfen Sie E-Mail und Passwort.');
        } else {
          setError(`Login fehlgeschlagen: ${result.error}`);
        }
        setLoading(false);
      } else if (result?.ok) {
        // Login erfolgreich - aktualisiere Session und leite weiter
        console.log('✅ Login erfolgreich, leite weiter...');
        // Kurze Verzögerung, damit die Session gesetzt wird
        await new Promise(resolve => setTimeout(resolve, 500));
        // Verwende router.push statt window.location für bessere Session-Handling
        router.push('/admin');
        router.refresh(); // Aktualisiere die Route, um Session zu laden
      } else {
        console.error('Unerwartetes Login-Ergebnis:', result);
        setError('Unerwarteter Fehler beim Login. Bitte versuchen Sie es erneut.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Login exception:', error);
      setError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-gray-900 rounded-2xl border border-gray-800 p-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">TechVision CMS</h1>
        <p className="text-gray-400 mb-8">Admin-Panel Anmeldung</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              E-Mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@techvision.de"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Passwort
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Wird angemeldet...' : 'Anmelden'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
