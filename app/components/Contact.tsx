"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IconMail, IconMapPin, IconPhone, IconSend } from "@tabler/icons-react";
import Header from "./Header";
import Footer from "./Footer";
import {
  SITE_CONTACT,
  getContactMapEmbedSrc,
  getGoogleMapsExternalUrl,
} from "@/lib/site-contact";

const phoneRaw =
  typeof process.env.NEXT_PUBLIC_CONTACT_PHONE === "string"
    ? process.env.NEXT_PUBLIC_CONTACT_PHONE.trim()
    : "";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const telHref = phoneRaw ? `tel:${phoneRaw.replace(/\s/g, "")}` : "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone.trim() || undefined,
          subject: subject.trim() || undefined,
          message,
          privacyAccepted,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(typeof data.error === "string" ? data.error : "Senden fehlgeschlagen.");
        return;
      }
      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
      setPrivacyAccepted(false);
    } catch {
      setStatus("error");
      setErrorMessage("Netzwerkfehler. Bitte versuchen Sie es erneut.");
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#050912] text-white">
      <Header />

      <main className="pb-20 pt-36 md:pt-44">
        <div className="section-container">
          <div className="mx-auto max-w-6xl">
            <header className="mb-12 max-w-4xl md:mb-16">
              <p className="eyebrow">Direkter Austausch</p>
              <h1 className="heading-display mt-6 text-4xl md:text-6xl lg:text-7xl">Lassen Sie uns Ihr Vorhaben einordnen.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Schildern Sie uns kurz Ausgangslage und Ziel. Wir melden uns persönlich und besprechen den sinnvollsten nächsten Schritt.</p>
            </header>

            <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="surface-card p-6">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                  <IconMapPin className="h-6 w-6" aria-hidden />
                </div>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
                  Adresse
                </h2>
                <p className="mt-2 text-lg font-medium text-white">{SITE_CONTACT.companyName}</p>
                <p className="mt-1 whitespace-pre-line text-gray-300">
                  {SITE_CONTACT.streetLine}
                  {"\n"}
                  {SITE_CONTACT.postalCode} {SITE_CONTACT.city}
                  {"\n"}
                  {SITE_CONTACT.country}
                </p>
                <a
                  href={getGoogleMapsExternalUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-medium text-blue-400 hover:text-blue-300"
                >
                  Route in Google Maps →
                </a>
              </div>

              <div className="surface-card p-6">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                  <IconPhone className="h-6 w-6" aria-hidden />
                </div>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
                  Telefon
                </h2>
                {phoneRaw ? (
                  <a
                    href={telHref}
                    className="mt-2 block text-lg font-medium text-white hover:text-emerald-300"
                  >
                    {phoneRaw}
                  </a>
                ) : (
                  <p className="mt-2 text-gray-300">
                    Rufen Sie uns gern an, sobald Ihre Nummer hinterlegt ist — oder nutzen Sie
                    E-Mail und Formular.
                  </p>
                )}
              </div>

              <div className="surface-card p-6 sm:col-span-2 lg:col-span-1">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400">
                  <IconMail className="h-6 w-6" aria-hidden />
                </div>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
                  E-Mail
                </h2>
                <a
                  href={`mailto:${SITE_CONTACT.email}`}
                  className="mt-2 block break-all text-lg font-medium text-white hover:text-violet-300"
                >
                  {SITE_CONTACT.email}
                </a>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-xl">
                <iframe
                  title="Standort auf der Karte"
                  src={getContactMapEmbedSrc()}
                  className="h-[min(420px,50vh)] w-full min-h-[280px] border-0 grayscale-[30%] contrast-[1.05] md:h-[480px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="surface-card p-6 md:p-8">
                <h2 className="text-xl font-semibold text-white md:text-2xl">Nachricht senden</h2>
                <p className="mt-2 text-sm text-gray-400">
                  Pflichtfelder sind gekennzeichnet. Mit Absenden willigen Sie ein, dass wir
                  Ihre Angaben zur Bearbeitung nutzen (siehe{" "}
                  <Link href="/datenschutz" className="text-blue-400 hover:underline">
                    Datenschutz
                  </Link>
                  ).
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div>
                    <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-gray-300">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-gray-700 bg-gray-900/80 px-4 py-3 text-white placeholder-gray-600 outline-none ring-blue-500/0 transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/30"
                      placeholder="Ihr Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-gray-300">
                      E-Mail <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-gray-700 bg-gray-900/80 px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/30"
                      placeholder="name@firma.de"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium text-gray-300">
                      Telefon <span className="text-gray-500">(optional)</span>
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-gray-700 bg-gray-900/80 px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/30"
                      placeholder="+49 …"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium text-gray-300">
                      Betreff <span className="text-gray-500">(optional)</span>
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded-xl border border-gray-700 bg-gray-900/80 px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/30"
                      placeholder="Worum geht es?"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-gray-300">
                      Nachricht <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full resize-y rounded-xl border border-gray-700 bg-gray-900/80 px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/30"
                      placeholder="Ihre Nachricht an uns …"
                    />
                  </div>

                  <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-300">
                    <input
                      type="checkbox"
                      checked={privacyAccepted}
                      onChange={(e) => setPrivacyAccepted(e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                    />
                    <span>
                      Ich habe die{" "}
                      <Link href="/datenschutz" className="text-blue-400 hover:underline">
                        Datenschutzerklärung
                      </Link>{" "}
                      gelesen und akzeptiere die Verarbeitung meiner Daten zur Bearbeitung dieser
                      Anfrage. <span className="text-red-400">*</span>
                    </span>
                  </label>

                  {errorMessage && (
                    <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300" role="alert">
                      {errorMessage}
                    </p>
                  )}
                  {status === "success" && (
                    <p className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200" role="status">
                      Vielen Dank — Ihre Nachricht wurde übermittelt. Wir melden uns bei Ihnen.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary focus-ring min-h-12 w-full disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
                  >
                    {status === "loading" ? (
                      "Wird gesendet…"
                    ) : (
                      <>
                        <IconSend className="h-5 w-5" aria-hidden />
                        Absenden
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
