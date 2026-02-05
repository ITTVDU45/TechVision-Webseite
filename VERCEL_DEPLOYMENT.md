# Vercel Deployment Guide

## Voraussetzungen

1. Vercel CLI installiert: `npm i -g vercel`
2. Vercel Account erstellt
3. Projekt mit GitHub verbunden

## Deployment mit Vercel CLI

### Erste Deployment

```bash
# Login bei Vercel
vercel login

# Projekt deployen
vercel

# Production-Deployment
vercel --prod
```

### Environment Variables in Vercel setzen

Wichtig: Die folgenden Environment Variables müssen in Vercel gesetzt werden:

1. Gehe zu deinem Vercel-Projekt
2. Settings → Environment Variables
3. Füge folgende Variablen hinzu:

**Erforderlich:**
- `NEXTAUTH_SECRET` - Mindestens 32 Zeichen lang
- `NEXTAUTH_URL` - Deine Production-URL (z.B. `https://your-domain.vercel.app`)
- `MONGODB_URI` - MongoDB Connection String (optional, für DB-Features)

**Optional:**
- `MINIO_ENDPOINT` - MinIO Endpoint (für File-Uploads)
- `MINIO_ACCESS_KEY` - MinIO Access Key
- `MINIO_SECRET_KEY` - MinIO Secret Key
- `MINIO_BUCKET_NAME` - MinIO Bucket Name

### Build-Konfiguration

Das Projekt ist bereits für Vercel konfiguriert:

- **Framework**: Next.js 15
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Node Version**: 18.x oder höher

### Wichtige Hinweise

1. **ESLint-Fehler**: Werden während des Builds ignoriert (nur Warnungen)
2. **TypeScript-Fehler**: Stoppen den Build (sollten behoben werden)
3. **Environment Variables**: Müssen in Vercel gesetzt werden, nicht in `.env.local`
4. **MongoDB**: Optional - ohne MongoDB funktioniert die Demo-Login-Funktion

### Troubleshooting

**Build schlägt fehl:**
- Prüfe die Build-Logs in Vercel
- Stelle sicher, dass alle Environment Variables gesetzt sind
- Prüfe TypeScript-Fehler lokal: `npx tsc --noEmit`

**API-Routen funktionieren nicht:**
- Prüfe die Function-Logs in Vercel
- Stelle sicher, dass `maxDuration` in `vercel.json` ausreichend ist (aktuell 30s)

**Images werden nicht geladen:**
- Prüfe die `remotePatterns` in `next.config.js`
- Stelle sicher, dass externe Domains erlaubt sind

## Automatisches Deployment

Wenn das Projekt mit GitHub verbunden ist, wird automatisch bei jedem Push auf `main` deployed.

## Lokales Testen des Production-Builds

```bash
# Production-Build lokal testen
npm run build
npm run start
```
