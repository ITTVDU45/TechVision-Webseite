/**
 * Legt / aktualisiert einen Admin-Benutzer in MongoDB (bcrypt).
 *
 * In .env.local: MONGODB_URI + ADMIN_SEED_PASSWORD (min. 6 Zeichen).
 * Optional: ADMIN_SEED_EMAIL (Standard: info@it-techvision.de)
 *
 * npm run seed:admin
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const envPath = resolve(process.cwd(), ".env.local");
try {
  const envFile = readFileSync(envPath, "utf-8");
  envFile.split("\n").forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith("#")) {
      const [key, ...valueParts] = trimmedLine.split("=");
      if (key && valueParts.length > 0) {
        const value = valueParts.join("=").trim();
        const k = key.trim();
        if (!process.env[k]) process.env[k] = value;
      }
    }
  });
} catch {
  console.error("❌ .env.local nicht gefunden oder nicht lesbar. Lege sie im Projektroot an.");
  process.exit(1);
}

const MONGODB_URI = process.env.MONGODB_URI?.trim() || process.env.MongoDB_URI?.trim();
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI (oder MongoDB_URI) ist in .env.local nicht gesetzt.");
  process.exit(1);
}

const email = (process.env.ADMIN_SEED_EMAIL || "info@it-techvision.de").toLowerCase().trim();
const password = process.env.ADMIN_SEED_PASSWORD?.trim() ?? "";
if (password.length < 6) {
  console.error(
    "❌ ADMIN_SEED_PASSWORD in .env.local setzen (min. 6 Zeichen), dann: npm run seed:admin"
  );
  process.exit(1);
}

/** Eigenes Schema ohne pre('save')-Hash — Passwort wird hier einmal gehasht. */
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    name: { type: String, required: true },
    role: { type: String, enum: ["admin", "editor"], default: "editor" },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function createAdminUser(): Promise<void> {
  try {
    console.log("🔄 Verbinde mit MongoDB…");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Verbunden.");

    const name = "Admin";
    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("ℹ️  Benutzer existiert — aktualisiere Passwort und Rolle…");
      existingUser.password = hashedPassword;
      existingUser.role = "admin";
      existingUser.name = name;
      await existingUser.save();
      console.log("\n✅ Admin aktualisiert:", email);
    } else {
      await User.create({
        email,
        password: hashedPassword,
        name,
        role: "admin",
      });
      console.log("\n✅ Admin angelegt:", email);
    }

    console.log("\n📝 Anmeldung im CMS: /admin/login");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error: unknown) {
    const err = error as { message?: string; code?: number };
    console.error("❌ Fehler:", err.message);
    if (err.code === 11000) console.error("   E-Mail bereits vergeben.");
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
}

void createAdminUser();
