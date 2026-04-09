// Lade .env.local manuell
import { readFileSync } from "fs";
import { resolve } from "path";

const envPath = resolve(process.cwd(), ".env.local");
try {
  const envFile = readFileSync(envPath, "utf-8");
  envFile.split("\n").forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith("#")) {
      const [key, ...valueParts] = trimmedLine.split("=");
      if (key && valueParts.length > 0) {
        const value = valueParts.join("=").trim();
        if (!process.env[key.trim()]) {
          process.env[key.trim()] = value;
        }
      }
    }
  });
} catch (error) {
  console.error("❌ Fehler beim Laden von .env.local:", error);
  process.exit(1);
}

import connectDB from "../lib/mongodb";
import Service from "../lib/models/Service";
import {
  DEFAULT_HOME_SERVICES,
  HOME_SERVICES_PLACEMENT,
} from "../lib/home-services-defaults";

async function importServices() {
  try {
    console.log("🔄 Verbinde mit MongoDB...");
    await connectDB();
    console.log("✅ Verbindung erfolgreich");

    let created = 0;
    let updated = 0;
    let skipped = 0;

    for (const s of DEFAULT_HOME_SERVICES) {
      try {
        const payload = {
          icon: s.icon,
          name: s.name,
          description: s.description,
          order: s.order,
          page: HOME_SERVICES_PLACEMENT,
          link: s.link,
          gradient: s.gradient,
          category: "home-carousel",
          published: true,
        };

        const existing = await Service.findOne({
          name: s.name,
          page: HOME_SERVICES_PLACEMENT,
        });

        if (existing) {
          await Service.findByIdAndUpdate(existing._id, payload);
          updated++;
          console.log(`✏️  Aktualisiert: ${s.name}`);
        } else {
          await Service.create(payload);
          created++;
          console.log(`✨ Erstellt: ${s.name}`);
        }
      } catch (error) {
        console.error(`❌ Fehler bei ${s.name}:`, error);
        skipped++;
      }
    }

    console.log("\n📊 Zusammenfassung:");
    console.log(`   ✨ Erstellt: ${created}`);
    console.log(`   ✏️  Aktualisiert: ${updated}`);
    console.log(`   ⏭️  Fehler: ${skipped}`);
    console.log(`   📦 Soll: ${DEFAULT_HOME_SERVICES.length}`);

    const allServices = await Service.find({ page: HOME_SERVICES_PLACEMENT }).sort({
      order: 1,
    });
    console.log("\n📋 Services mit page=home:");
    allServices.forEach((svc, i) => {
      console.log(
        `   ${i + 1}. ${svc.icon} ${svc.name} → ${svc.link || "(kein link)"} (order ${svc.order})`
      );
    });

    console.log("\n✅ Import abgeschlossen!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Fehler beim Import:", error);
    process.exit(1);
  }
}

importServices();
