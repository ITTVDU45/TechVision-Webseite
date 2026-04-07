"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

export default function LoginPage(): React.JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const emailEl = form.elements.namedItem("email") as HTMLInputElement | null;
    const passwordEl = form.elements.namedItem("password") as HTMLInputElement | null;
    // Browser-Autofill setzt oft nur den DOM-Wert, nicht den React-State — immer native Werte lesen
    const emailVal = (emailEl?.value ?? email).trim().toLowerCase();
    const passwordVal = passwordEl?.value ?? password;

    try {
      const result = await signIn("credentials", {
        email: emailVal,
        password: passwordVal,
        redirect: false,
        callbackUrl: "/admin",
      });

      if (result?.error) {
        if (result.error === "Configuration") {
          setError("Server-Konfigurationsfehler. Bitte NEXTAUTH_URL / NEXTAUTH_SECRET in Vercel prüfen.");
        } else if (
          result.error === "CredentialsSignin" ||
          result.error.toLowerCase().includes("credentials")
        ) {
          setError(
            "Ungültige Anmeldedaten oder falsches gespeichertes Passwort im Browser. Passwort manuell neu eingeben (Autofill leert manchmal das Formular im Hintergrund)."
          );
        } else {
          setError(`Login fehlgeschlagen: ${result.error}`);
        }
        return;
      }

      if (result?.ok) {
        // Voller Reload: Session-Cookie zuverlässig, SessionProvider sieht die Session
        window.location.assign("/admin");
        return;
      }

      setError("Unerwarteter Fehler beim Login. Bitte versuchen Sie es erneut.");
    } catch (err) {
      console.error("Login exception:", err);
      setError("Netzwerk- oder Serverfehler. Bitte später erneut versuchen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh min-h-[100svh] items-center justify-center bg-black px-4 pb-safe pt-[max(1rem,env(safe-area-inset-top,0px))]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-6 sm:p-8"
      >
        <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl">TechVision CMS</h1>
        <p className="mb-8 text-gray-400">Admin-Panel Anmeldung</p>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label htmlFor="admin-email" className="mb-2 block text-sm font-medium text-gray-300">
              E-Mail
            </label>
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="min-h-[48px] w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-base text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="info@it-techvision.de"
              inputMode="email"
              autoCapitalize="none"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="mb-2 block text-sm font-medium text-gray-300">
              Passwort
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="min-h-[48px] w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-base text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="min-h-[48px] w-full touch-manipulation rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-base font-medium text-white transition-all hover:from-blue-600 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Wird angemeldet…" : "Anmelden"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
