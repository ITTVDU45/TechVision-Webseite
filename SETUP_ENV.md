# WICHTIG: .env.local Datei erstellen

## Problem
Der NextAuth "Configuration" Fehler tritt auf, weil die `.env.local` Datei fehlt.

## Lösung

**Erstellen Sie manuell eine Datei namens `.env.local`** im Root-Verzeichnis (gleiche Ebene wie `package.json`).

### Schritt-für-Schritt:

1. Öffnen Sie einen Texteditor (Notepad, VS Code, etc.)
2. Erstellen Sie eine neue Datei
3. Kopieren Sie folgenden Inhalt hinein:

```
NEXTAUTH_SECRET=demo-secret-key-change-in-production-min-32-chars-long
NEXTAUTH_URL=http://localhost:3000
```

4. Speichern Sie die Datei als `.env.local` (mit Punkt am Anfang!)
   - **Wichtig**: Die Datei muss exakt `.env.local` heißen
   - Keine Erweiterung wie `.txt` oder `.env.local.txt`
   - In Windows: Wenn der Editor `.txt` hinzufügt, benennen Sie die Datei im Explorer um

5. Stellen Sie sicher, dass die Datei im Root-Verzeichnis liegt:
   ```
   TV Webseite/
   ├── .env.local          ← Hier!
   ├── package.json
   ├── next.config.js
   └── app/
   ```

6. **Server komplett neu starten**:
   - Stoppen Sie den Server (Ctrl+C)
   - Starten Sie neu: `npm run dev`

### Demo-Login:
- Email: `admin@techvision.de`
- Password: `admin`

## Alternative: PowerShell-Befehl

Falls Sie PowerShell verwenden, können Sie auch diesen Befehl ausführen:

```powershell
@"
NEXTAUTH_SECRET=demo-secret-key-change-in-production-min-32-chars-long
NEXTAUTH_URL=http://localhost:3000
"@ | Out-File -FilePath .env.local -Encoding utf8
```

## Prüfen ob es funktioniert

Nach dem Neustart sollten Sie:
1. Keine "Configuration" Fehler mehr sehen
2. Sich mit `admin@techvision.de` / `admin` anmelden können
