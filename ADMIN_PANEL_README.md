# TechVision CMS Admin Panel

Vollständiges Content Management System für die TechVision-Website.

## Features

- **Dashboard**: Übersicht mit Statistiken zu allen Content-Typen
- **CRUD-Operationen**: Vollständige Verwaltung für:
  - FAQs
  - Blog-Artikel
  - Case Studies (Erfolgsgeschichten)
  - Services/Karten
  - Pricing-Pläne
  - Testimonials (Kundenstimmen)
  - Seiteninhalte (Hero-Sektionen, etc.)
- **Bild-Upload**: Drag & Drop Bild-Upload mit Vorschau
- **Seitenzuordnung**: Content kann bestimmten Seiten zugeordnet werden
- **Authentifizierung**: Sichere Anmeldung mit NextAuth.js

## Setup

### Demo-Modus (ohne MongoDB/MinIO)

Für schnellen Start ohne Datenbank:

1. **Umgebungsvariablen ERFORDERLICH**:
   
   **WICHTIG**: Erstellen Sie eine `.env.local` Datei im Root-Verzeichnis (gleiche Ebene wie `package.json`):
```env
NEXTAUTH_SECRET=demo-secret-key-change-in-production-min-32-chars-long
NEXTAUTH_URL=http://localhost:3000
```

   **Ohne diese Datei funktioniert die Anmeldung nicht!**
   
   Die Datei muss exakt `.env.local` heißen (mit Punkt am Anfang, keine Erweiterung).

2. **Demo-Login**:
   - Email: `admin@techvision.de`
   - Password: `admin`

3. **Entwicklungsserver starten**:
```bash
npm run dev
```

Das Admin-Panel funktioniert im Demo-Modus, aber CRUD-Operationen sind deaktiviert (nur Lesen möglich).

### Produktions-Setup (mit MongoDB/MinIO)

### 1. Umgebungsvariablen

Erstellen Sie eine `.env.local` Datei im Root-Verzeichnis:

```env
MONGODB_URI=mongodb://localhost:27017/techvision-cms
NEXTAUTH_SECRET=your-secret-key-here-change-in-production
NEXTAUTH_URL=http://localhost:3000

# MinIO Configuration (optional)
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET_NAME=techvision-uploads
```

### 2. MongoDB installieren und starten

Stellen Sie sicher, dass MongoDB läuft. Für lokale Entwicklung:

```bash
# MongoDB starten (je nach Installation)
mongod
# oder
brew services start mongodb-community
```

### 2.1. MinIO installieren und starten

MinIO ist ein S3-kompatibler Object Storage Server für die Bildspeicherung.

**Option A: Docker (empfohlen)**
```bash
docker run -d \
  -p 9000:9000 \
  -p 9001:9001 \
  --name minio \
  -e "MINIO_ROOT_USER=minioadmin" \
  -e "MINIO_ROOT_PASSWORD=minioadmin" \
  -v minio-data:/data \
  minio/minio server /data --console-address ":9001"
```

**Option B: Lokale Installation**
```bash
# macOS
brew install minio/stable/minio

# Linux
wget https://dl.min.io/server/minio/release/linux-amd64/minio
chmod +x minio
./minio server /data
```

MinIO Console: `http://localhost:9001` (Standard: minioadmin/minioadmin)

### 3. Admin-Benutzer erstellen

```bash
npx tsx scripts/create-admin-user.ts
```

Folgen Sie den Anweisungen, um einen Admin-Benutzer zu erstellen.

### 4. Daten migrieren (optional)

Importieren Sie bestehende statische Daten in MongoDB:

```bash
npx tsx scripts/migrate-data.ts
```

### 5. Entwicklungsserver starten

```bash
npm run dev
```

## Verwendung

### Admin-Panel öffnen

Navigieren Sie zu: `http://localhost:3000/admin`

### Anmeldung

Verwenden Sie die Anmeldedaten, die Sie mit dem `create-admin-user.ts` Script erstellt haben.

### Content verwalten

1. **Dashboard**: Übersicht aller Content-Typen
2. **FAQs**: Häufig gestellte Fragen verwalten
3. **Blogs**: Blog-Artikel erstellen und bearbeiten
4. **Case Studies**: Erfolgsgeschichten verwalten
5. **Services**: Services/Karten hinzufügen
6. **Pricing**: Preispläne verwalten
7. **Testimonials**: Kundenstimmen verwalten
8. **Seiteninhalte**: Hero-Sektionen und andere Seiteninhalte bearbeiten

### Bild-Upload

1. Klicken Sie auf "Bild hochladen" in den Formularen
2. Wählen Sie ein Bild aus oder ziehen Sie es per Drag & Drop
3. Das Bild wird automatisch in MinIO gespeichert
4. Die URL wird automatisch in das Formular eingefügt

**Unterstützte Formate**: JPEG, PNG, GIF, WebP, SVG
**Maximale Dateigröße**: 10MB

## API Endpoints

Alle API-Endpoints sind unter `/api/` verfügbar:

- `GET /api/faqs?page=home` - FAQs abrufen
- `POST /api/faqs` - FAQ erstellen
- `PUT /api/faqs` - FAQ aktualisieren
- `DELETE /api/faqs?id=...` - FAQ löschen

Ähnliche Endpoints für:
- `/api/blogs`
- `/api/case-studies`
- `/api/services`
- `/api/pricing`
- `/api/testimonials`
- `/api/page-content`
- `/api/upload` - Bild-Upload

## Frontend-Integration

Die Frontend-Komponenten können Daten aus der API laden. Verwenden Sie die Helper-Funktionen in `lib/api.ts`:

```typescript
import { fetchFAQs, fetchBlogPosts } from '@/lib/api';

// In einer Server Component oder API Route
const faqs = await fetchFAQs('home');
const blogs = await fetchBlogPosts();
```

## Datenbank-Schema

### Models

- **User**: Admin-Benutzer
- **FAQ**: FAQ-Einträge mit Seitenzuordnung
- **BlogPost**: Blog-Artikel
- **CaseStudy**: Erfolgsgeschichten
- **Service**: Services/Karten
- **PricingPlan**: Preispläne
- **Testimonial**: Kundenstimmen
- **PageContent**: Seiteninhalte (Hero, etc.)

## Sicherheit

- Alle Admin-Routes sind durch NextAuth.js geschützt
- Passwörter werden mit bcrypt gehasht
- API-Endpoints prüfen die Authentifizierung
- Middleware schützt `/admin/*` Routen

## Produktion

Für die Produktion:

1. Ändern Sie `NEXTAUTH_SECRET` zu einem sicheren, zufälligen Wert
2. Verwenden Sie eine MongoDB Atlas Verbindung oder einen anderen Produktions-Datenbank-Service
3. Stellen Sie sicher, dass `NEXTAUTH_URL` auf Ihre Produktions-URL zeigt
4. Konfigurieren Sie Bild-Upload für Cloud Storage (optional)

## Troubleshooting

### MongoDB-Verbindungsfehler

- Stellen Sie sicher, dass MongoDB läuft
- Überprüfen Sie die `MONGODB_URI` in `.env.local`
- Für MongoDB Atlas: Verwenden Sie die Connection String mit Benutzername und Passwort

### Authentifizierungsfehler

- Überprüfen Sie `NEXTAUTH_SECRET` und `NEXTAUTH_URL`
- Stellen Sie sicher, dass ein Admin-Benutzer existiert

### Bild-Upload-Fehler

- Stellen Sie sicher, dass MinIO läuft und erreichbar ist
- Überprüfen Sie die MinIO-Konfiguration in `.env.local`:
  - `MINIO_ENDPOINT` (Standard: localhost)
  - `MINIO_PORT` (Standard: 9000)
  - `MINIO_ACCESS_KEY` und `MINIO_SECRET_KEY`
  - `MINIO_BUCKET_NAME` (Standard: techvision-uploads)
- Für Produktion: Konfigurieren Sie `MINIO_PUBLIC_URL` für CDN/Proxy-Zugriff
