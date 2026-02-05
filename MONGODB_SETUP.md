# MongoDB Setup - Wichtige Hinweise

## ✅ Problem behoben

Das Leerzeichen vor `MONGODB_URI` in der `.env.local` Datei wurde entfernt.

## 🔄 Server neu starten erforderlich

**WICHTIG**: Next.js lädt Umgebungsvariablen nur beim Start des Servers. Nach Änderungen in `.env.local` muss der Development Server neu gestartet werden.

### Server neu starten:

1. **Stoppen Sie den aktuellen Server** (Strg+C im Terminal)
2. **Starten Sie den Server neu**:
   ```bash
   npm run dev
   # oder
   yarn dev
   # oder
   pnpm dev
   ```

## ✅ Überprüfung

Nach dem Neustart sollte MongoDB funktionieren:

1. **Admin-Panel öffnen**: `http://localhost:3000/admin`
2. **Einloggen** (Demo-Login funktioniert weiterhin)
3. **FAQ erstellen**: Sollte jetzt funktionieren ohne Fehlermeldung

## 🔍 Troubleshooting

Falls es immer noch nicht funktioniert:

1. **Überprüfen Sie die `.env.local` Datei**:
   - Keine Leerzeichen vor Variablennamen
   - Keine Anführungszeichen um den Wert
   - Korrekte Datei: `.env.local` (nicht `.env`)

2. **Server-Logs prüfen**:
   - Schauen Sie in die Konsole, ob MongoDB-Verbindungsfehler angezeigt werden
   - Prüfen Sie, ob `MONGODB_URI` beim Start geladen wird

3. **MongoDB-Verbindung testen**:
   - Stellen Sie sicher, dass die MongoDB-URI korrekt ist
   - Prüfen Sie, ob die IP-Adresse in der MongoDB-Whitelist ist (bei MongoDB Atlas)

## 📝 Beispiel `.env.local` Format

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/?appName=AppName

# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-min-32-chars
NEXTAUTH_URL=http://localhost:3000
```

**Wichtig**: Keine Leerzeichen vor `MONGODB_URI`!
