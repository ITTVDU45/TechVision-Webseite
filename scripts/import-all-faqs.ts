// Lade .env.local manuell
import { readFileSync } from 'fs';
import { resolve } from 'path';

const envPath = resolve(process.cwd(), '.env.local');
try {
  const envFile = readFileSync(envPath, 'utf-8');
  envFile.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        if (!process.env[key.trim()]) {
          process.env[key.trim()] = value;
        }
      }
    }
  });
} catch (error) {
  console.error('❌ Fehler beim Laden von .env.local:', error);
  process.exit(1);
}

import mongoose from 'mongoose';
import connectDB from '../lib/mongodb';
import FAQ from '../lib/models/FAQ';

// Alle FAQs ohne Preisangaben - für die FAQ-Seite
const faqsData = [
  // KI Transformation
  {
    question: 'Welche Kosten sind mit einer KI-Transformation verbunden?',
    answer: 'Die Kosten einer KI-Transformation variieren je nach Projektumfang und Komplexität. Typischerweise setzen sich die Kosten aus mehreren Komponenten zusammen: Initial-Analyse, Implementierung, Schulungen und laufende Wartung. Wir bieten flexible Finanzierungsmodelle und unterstützen Sie bei der Beantragung von Fördermitteln, die einen erheblichen Teil der Projektkosten decken können.',
    page: 'faq',
    order: 1,
  },
  {
    question: 'Gibt es eine Standardlösung oder werden maßgeschneiderte KI-Modelle entwickelt?',
    answer: 'Wir entwickeln primär maßgeschneiderte KI-Modelle, die exakt auf Ihre Geschäftsprozesse und Anforderungen zugeschnitten sind. Zusätzlich bieten wir vorkonfigurierte Branchenlösungen als Basis, die wir individuell anpassen. Dies ermöglicht eine optimale Balance zwischen Entwicklungszeit, Kosten und Leistung. Unsere KI-Modelle werden speziell für Ihre Datensätze trainiert und optimiert.',
    page: 'faq',
    order: 2,
  },
  {
    question: 'Bietet ihr eine kostenlose Erstberatung zur KI-Transformation an?',
    answer: 'Ja, wir bieten eine kostenlose 90-minütige Initial-Beratung an. In diesem Gespräch analysieren wir Ihre aktuelle Situation, identifizieren Potenziale für KI-Anwendungen und entwickeln erste Lösungsansätze. Sie erhalten eine erste Einschätzung zu Machbarkeit, Zeitrahmen und Investitionsbedarf. Die Beratung kann vor Ort oder digital stattfinden und wird von erfahrenen KI-Experten durchgeführt.',
    page: 'faq',
    order: 3,
  },
  {
    question: 'Gibt es Fördermöglichkeiten oder staatliche Zuschüsse für KI-Transformationen?',
    answer: 'Ja, es gibt verschiedene Förderprogramme für KI-Projekte. Auf Bundesebene existieren Programme wie "Digital Jetzt", "go-digital" und spezielle KI-Förderungen des BMBF. Zusätzlich gibt es länderspezifische Programme und EU-Förderungen. Wir unterstützen Sie bei der Identifikation passender Programme und der Antragstellung. Die Förderquoten liegen typischerweise zwischen 30% und 70% der Projektkosten.',
    page: 'faq',
    order: 4,
  },
  {
    question: 'Wie lange dauert die Implementierung einer KI-Lösung?',
    answer: 'Die Implementierungsdauer einer KI-Lösung beträgt typischerweise 3-6 Monate. Der Prozess umfasst: Analyse (2-4 Wochen), Konzeption (3-6 Wochen), Entwicklung (8-12 Wochen), Testing (2-4 Wochen) und Deployment (1-2 Wochen). Bei komplexeren Projekten oder unternehmensweiten Transformationen kann sich der Zeitrahmen auf 6-12 Monate erweitern. Wir arbeiten agil und liefern bereits während der Implementierung erste Ergebnisse.',
    page: 'faq',
    order: 5,
  },
  {
    question: 'Welche Branchen profitieren am meisten von KI-Transformation?',
    answer: 'KI-Transformationen bieten branchenübergreifende Vorteile, besonders in: Fertigung (Predictive Maintenance, Qualitätskontrolle), Gesundheitswesen (Diagnostik, Patientenbetreuung), Finanzsektor (Risikobewertung, Fraud Detection), Einzelhandel (Personalisierung, Bestandsmanagement), Logistik (Routenoptimierung, Lieferkettenmanagement) und Dienstleistungen (Kundenservice, Prozessautomatisierung). Die Effizienzsteigerungen liegen branchenabhängig zwischen 20-40%.',
    page: 'faq',
    order: 6,
  },
  {
    question: 'Ist eine monatliche Zahlung oder Einmalzahlung möglich?',
    answer: 'Wir bieten flexible Zahlungsmodelle an: Einmalzahlung mit Rabatt, monatliche Raten über die Projektlaufzeit oder hybride Modelle. Die monatliche Zahlung umfasst typischerweise eine Initial-Anzahlung und gleichmäßige Raten. Zusätzlich bieten wir Pay-per-Use Modelle für KI-Services und flexible Wartungsverträge. Die Zahlungskonditionen werden individuell vereinbart und auf Ihre Liquiditätsplanung abgestimmt.',
    page: 'faq',
    order: 7,
  },
  {
    question: 'Wie hoch ist der Wartungsaufwand für KI-Modelle nach der Implementierung?',
    answer: 'Der Wartungsaufwand für KI-Modelle umfasst regelmäßiges Monitoring, Performance-Optimierung und Modell-Updates. Typischerweise benötigen KI-Systeme alle 3-6 Monate ein Retraining mit neuen Daten. Der monatliche Wartungsaufwand beträgt durchschnittlich 5-15 Stunden, abhängig von Komplexität und Dynamik des Anwendungsfalls. Wir bieten Wartungsverträge mit 24/7 Support und proaktivem Monitoring.',
    page: 'faq',
    order: 8,
  },
  {
    question: 'Gibt es flexible Preismodelle für KMU und Großunternehmen?',
    answer: 'Ja, unsere Preismodelle sind skalierbar und an die Unternehmensgröße angepasst. Für KMU bieten wir Einstiegspakete mit fokussierten KI-Lösungen. Großunternehmen profitieren von Enterprise-Paketen mit umfassender Integration und individuellen Lizenzen. Alle Pakete beinhalten Schulungen, Support und können modular erweitert werden. Spezielle Startup-Konditionen und Non-Profit-Rabatte sind verfügbar.',
    page: 'faq',
    order: 9,
  },
  {
    question: 'Welche Faktoren beeinflussen die Kosten einer KI-Integration?',
    answer: 'Die Kosten einer KI-Integration werden von mehreren Faktoren beeinflusst: Datenmenge und -qualität (Aufbereitungsaufwand), Komplexität der Geschäftsprozesse, Integrationstiefe in bestehende Systeme, Anforderungen an Genauigkeit und Performance, Schulungsbedarf, Hardware-Anforderungen und Skalierbarkeit. Zusätzliche Kostenfaktoren sind Sicherheitsanforderungen, regulatorische Compliance und gewünschte Supportlevel. Wir erstellen transparente Kostenkalkulationen basierend auf Ihrer spezifischen Situation.',
    page: 'faq',
    order: 10,
  },
  // KI Beratung
  {
    question: 'Wie startet ein KI-Transformationsprojekt?',
    answer: 'Ein KI-Transformationsprojekt beginnt mit einer umfassenden Bedarfsanalyse, in der wir Ihre aktuellen Prozesse, Herausforderungen und Ziele verstehen. Wir führen Workshops durch, um die Anforderungen zu klären und die Potenziale von KI zu identifizieren. Anschließend erstellen wir einen detaillierten Projektplan, der die nächsten Schritte, Zeitrahmen und Ressourcen festlegt. Die enge Zusammenarbeit mit Ihrem Team ist entscheidend für den Erfolg des Projekts.',
    page: 'faq',
    order: 11,
  },
  {
    question: 'Welche Daten müssen Unternehmen bereitstellen?',
    answer: 'Unternehmen sollten relevante Daten bereitstellen, die für das Training und die Validierung der KI-Modelle erforderlich sind. Dazu gehören historische Daten, aktuelle Prozessdaten, Kundenfeedback und andere relevante Informationen. Wir helfen Ihnen bei der Datenaufbereitung und -bereinigung, um sicherzustellen, dass die Datenqualität hoch ist und die Modelle effektiv trainiert werden können.',
    page: 'faq',
    order: 12,
  },
  {
    question: 'Wie läuft die Planung und Konzeptionsphase ab?',
    answer: 'In der Planungs- und Konzeptionsphase definieren wir die Projektziele, die benötigten Ressourcen und die technischen Anforderungen. Wir erstellen Prototypen und Machbarkeitsstudien, um die Ansätze zu validieren. Diese Phase umfasst auch die Identifikation von Risiken und die Entwicklung von Strategien zur Risikominderung. Regelmäßige Meetings mit Ihrem Team stellen sicher, dass alle Stakeholder informiert und einbezogen sind.',
    page: 'faq',
    order: 13,
  },
  {
    question: 'Welche Meilensteine gibt es bei der KI-Integration?',
    answer: 'Die Meilensteine bei der KI-Integration umfassen: 1. Bedarfsanalyse und Zieldefinition, 2. Datenaufbereitung und -analyse, 3. Modelltraining und -validierung, 4. Implementierung der KI-Lösung, 5. Testing und Qualitätssicherung, 6. Schulung der Mitarbeiter, 7. Rollout und Monitoring. Jeder Meilenstein wird dokumentiert und mit Ihrem Team abgestimmt.',
    page: 'faq',
    order: 14,
  },
  {
    question: 'Wie lange dauert es, eine KI-Lösung produktiv zu setzen?',
    answer: 'Die Dauer bis zur Produktivsetzung einer KI-Lösung variiert je nach Komplexität und Umfang des Projekts. In der Regel dauert es zwischen 3 und 6 Monaten, um eine KI-Lösung von der Konzeptionsphase bis zur Implementierung zu bringen. Bei größeren Projekten kann dieser Zeitraum auch länger sein. Wir arbeiten agil und liefern in Iterationen, um frühzeitig Ergebnisse zu erzielen.',
    page: 'faq',
    order: 15,
  },
  {
    question: 'Wird eine Schulung für Mitarbeiter zur Nutzung der KI angeboten?',
    answer: 'Ja, wir bieten umfassende Schulungen für Ihre Mitarbeiter an, um sicherzustellen, dass sie die KI-Lösungen effektiv nutzen können. Die Schulungen umfassen sowohl technische Aspekte als auch die Anwendung der KI in den täglichen Arbeitsabläufen. Wir bieten sowohl Präsenz- als auch Online-Schulungen an, die auf die spezifischen Bedürfnisse Ihres Unternehmens zugeschnitten sind.',
    page: 'faq',
    order: 16,
  },
  {
    question: 'Welche Herausforderungen treten typischerweise bei KI-Transformationen auf?',
    answer: 'Typische Herausforderungen bei KI-Transformationen sind: unzureichende Datenqualität, Widerstand der Mitarbeiter gegen Veränderungen, unklare Zieldefinitionen, technische Integrationsprobleme und mangelnde Unterstützung durch das Management. Wir helfen Ihnen, diese Herausforderungen proaktiv anzugehen, indem wir Change Management-Strategien implementieren und die Kommunikation im Unternehmen fördern.',
    page: 'faq',
    order: 17,
  },
  {
    question: 'Was passiert, wenn eine KI-Lösung nach der Implementierung nicht die gewünschten Ergebnisse liefert?',
    answer: 'Wenn eine KI-Lösung nicht die gewünschten Ergebnisse liefert, führen wir eine umfassende Analyse durch, um die Ursachen zu identifizieren. Mögliche Maßnahmen umfassen die Anpassung der Modelle, die Verbesserung der Datenqualität oder die Überarbeitung der Implementierungsstrategie. Wir arbeiten eng mit Ihrem Team zusammen, um sicherzustellen, dass die Lösung optimiert wird und die gewünschten Ergebnisse erzielt werden.',
    page: 'faq',
    order: 18,
  },
  {
    question: 'Wie erfolgt die Qualitätssicherung und Testing von KI-Modellen?',
    answer: 'Die Qualitätssicherung und das Testing von KI-Modellen erfolgen durch eine Kombination aus automatisierten Tests und manuellen Überprüfungen. Wir verwenden Metriken wie Genauigkeit, Präzision und Recall, um die Leistung der Modelle zu bewerten. Darüber hinaus führen wir A/B-Tests durch, um die Auswirkungen der KI-Lösungen in der Praxis zu messen. Regelmäßige Reviews und Anpassungen stellen sicher, dass die Modelle kontinuierlich verbessert werden.',
    page: 'faq',
    order: 19,
  },
  {
    question: 'Wie wird sichergestellt, dass die KI langfristig optimiert wird?',
    answer: 'Um sicherzustellen, dass die KI langfristig optimiert wird, implementieren wir Monitoring-Tools, die die Leistung der Modelle in Echtzeit überwachen. Wir führen regelmäßige Retrainings durch, um die Modelle mit neuen Daten zu versorgen und ihre Genauigkeit zu gewährleisten. Zudem bieten wir Wartungsverträge an, die regelmäßige Updates und Anpassungen der KI-Lösungen umfassen.',
    page: 'faq',
    order: 20,
  },
  // Softwareentwicklung
  {
    question: 'Was kostet eine individuelle Softwareentwicklung?',
    answer: 'Die Kosten für individuelle Softwareentwicklung variieren je nach Umfang und Komplexität. Kleine Projekte beginnen bei einem bestimmten Betrag, mittlere Projekte liegen in einem mittleren Bereich, komplexe Enterprise-Lösungen ab einem höheren Betrag. Die Stundensätze variieren abhängig von Technologie und Expertise. Wir bieten transparente Festpreise oder agile Entwicklung nach Aufwand. Wartung und Support werden separat kalkuliert, typischerweise 15-20% der Entwicklungskosten jährlich.',
    page: 'faq',
    order: 21,
  },
  {
    question: 'Gibt es monatliche Wartungs- und Supportkosten?',
    answer: 'Ja, wir bieten verschiedene Wartungs- und Supportpakete: Basic mit Bug-Fixes und Updates, Professional mit zusätzlichem 8/5 Support und proaktivem Monitoring, Enterprise mit 24/7 Support und garantierten Reaktionszeiten. Alle Pakete beinhalten regelmäßige Sicherheitsupdates, Backups und Performance-Optimierungen. Die Kosten basieren auf Systemkomplexität und Supportumfang.',
    page: 'faq',
    order: 22,
  },
  {
    question: 'Welche Zahlungsmethoden bietet ihr für Softwareprojekte an?',
    answer: 'Wir bieten flexible Zahlungsmodelle: Festpreis mit Meilenstein-basierten Zahlungen, Time & Material mit monatlicher Abrechnung, oder hybride Modelle. Akzeptierte Zahlungsmethoden umfassen Überweisung, SEPA-Lastschrift und internationale Zahlungen. Für größere Projekte sind auch Ratenzahlungen oder projektbegleitende Finanzierung möglich. Alle Zahlungspläne werden vertraglich festgehalten und transparent kommuniziert.',
    page: 'faq',
    order: 23,
  },
  {
    question: 'Wie wird die Preisgestaltung für maßgeschneiderte Lösungen kalkuliert?',
    answer: 'Die Preiskalkulation basiert auf mehreren Faktoren: Funktionsumfang, technische Komplexität, Integrationsanforderungen, Projektdauer und benötigte Ressourcen. Wir erstellen detaillierte Aufwandsschätzungen pro Feature und berücksichtigen auch Testing, Dokumentation und Projektmanagement. Ein typisches Projekt wird in Arbeitspakete unterteilt, die einzeln kalkuliert und transparent dargestellt werden. Risikopuffer und Qualitätssicherung sind bereits eingepreist.',
    page: 'faq',
    order: 24,
  },
  {
    question: 'Ist eine agile Entwicklung mit monatlichen Sprints möglich?',
    answer: 'Ja, wir arbeiten bevorzugt nach agilen Methoden wie Scrum mit 2-4 wöchigen Sprints. Dies ermöglicht regelmäßige Releases, flexible Anpassungen der Anforderungen und kontinuierliches Feedback. Jeder Sprint liefert funktionale Inkremente der Software. Wir nutzen moderne Tools für Projektmanagement, Versionskontrolle und automatisierte Tests. Sprint Reviews und Retrospektiven sichern die Qualität und kontinuierliche Verbesserung.',
    page: 'faq',
    order: 25,
  },
  {
    question: 'Welche Vorteile bietet eine individuell entwickelte Software gegenüber Standardlösungen?',
    answer: 'Individualsoftware bietet entscheidende Vorteile: Perfekte Anpassung an Ihre Geschäftsprozesse, höhere Effizienz durch maßgeschneiderte Funktionen, volle Kontrolle über Weiterentwicklung, bessere Integration in bestehende Systeme, Wettbewerbsvorteil durch einzigartige Features. Während Standardsoftware oft Kompromisse erfordert, optimiert Individualsoftware Ihre spezifischen Workflows und wächst mit Ihren Anforderungen. ROI-Analysen zeigen oft Kosteneinsparungen von 30-50% gegenüber angepassten Standardlösungen.',
    page: 'faq',
    order: 26,
  },
  {
    question: 'Bietet ihr auch die Weiterentwicklung bestehender Software an?',
    answer: 'Ja, wir übernehmen die Weiterentwicklung und Modernisierung bestehender Softwaresysteme. Dies beginnt mit einer technischen Analyse des Ist-Zustands, Codequalität und Dokumentation. Wir entwickeln Strategien für Updates, neue Features und Performance-Optimierungen. Legacy-Systeme können schrittweise modernisiert werden, ohne den laufenden Betrieb zu gefährden. Auch die Migration auf neue Technologien oder Cloud-Plattformen ist möglich.',
    page: 'faq',
    order: 27,
  },
  {
    question: 'Gibt es Pakete für kleine, mittlere und große Unternehmen?',
    answer: 'Wir bieten maßgeschneiderte Pakete für verschiedene Unternehmensgrößen: Starter für kleine Unternehmen mit fokussierten Lösungen, Professional für mittlere Unternehmen mit umfangreicheren Anforderungen, Enterprise für Großunternehmen mit komplexen Systemlandschaften. Jedes Paket enthält Entwicklung, Testing, Dokumentation, Schulung und initialen Support. Flexible Erweiterungen sind jederzeit möglich.',
    page: 'faq',
    order: 28,
  },
  {
    question: 'Welche Faktoren beeinflussen die Kosten eines Softwareprojekts?',
    answer: 'Die Projektkosten werden von verschiedenen Faktoren beeinflusst: Funktionsumfang und Komplexität, Anzahl der Schnittstellen und Integrationen, Sicherheitsanforderungen, Skalierbarkeit, Benutzeranzahl, Technologie-Stack, Projektdauer, Qualitätsanforderungen, Dokumentationsumfang und Support-Level. Auch spezielle Anforderungen wie Hochverfügbarkeit, Compliance oder Multi-Mandantenfähigkeit beeinflussen die Kosten. Wir erstellen transparente Kalkulationen mit detaillierter Aufschlüsselung.',
    page: 'faq',
    order: 29,
  },
  {
    question: 'Gibt es eine kostenlose Erstberatung für Softwareentwicklungsprojekte?',
    answer: 'Ja, wir bieten eine kostenlose initiale Beratung (2-3 Stunden) an. Dabei analysieren wir Ihre Anforderungen, diskutieren technische Lösungsansätze und erstellen eine erste Machbarkeitseinschätzung. Sie erhalten einen Überblick über mögliche Technologien, grobe Zeitplanung und Kostenschätzung. Die Beratung kann persönlich oder remote stattfinden und wird von erfahrenen Softwarearchitekten durchgeführt.',
    page: 'faq',
    order: 30,
  },
  {
    question: 'Welche Technologien kommen für Frontend und Backend zum Einsatz?',
    answer: 'Im Frontend setzen wir moderne Frameworks wie React, Vue.js oder Angular ein, kombiniert mit TypeScript für type-safe Entwicklung. Das Backend basiert je nach Anforderung auf Node.js, Python (Django/Flask), Java (Spring) oder .NET Core. Für Datenbanken nutzen wir PostgreSQL, MongoDB oder MySQL. Microservices werden mit Docker/Kubernetes orchestriert. Die Technologieauswahl erfolgt basierend auf Ihren spezifischen Anforderungen an Performance, Skalierbarkeit und Wartbarkeit.',
    page: 'faq',
    order: 31,
  },
  // Webseitenentwicklung
  {
    question: 'Was kostet eine professionelle Webseite?',
    answer: 'Die Kosten einer professionellen Webseite staffeln sich nach Umfang: Basic-Paket für Informationsseiten mit bis zu 10 Unterseiten, Content-Management-System und responsivem Design. Business-Paket erweitert um komplexe Funktionen, Mehrsprachigkeit und Marketing-Tools. Enterprise-Paket für umfangreiche Portale mit individuellen Funktionen, E-Commerce-Integration und komplexen Datenbanken. Alle Pakete beinhalten SEO-Optimierung, Security-Features und Hosting-Setup.',
    page: 'faq',
    order: 32,
  },
  {
    question: 'Gibt es monatliche Wartungskosten für eine Webseite?',
    answer: 'Ja, wir bieten verschiedene Wartungspakete: Basic mit Sicherheitsupdates, Backups und technischem Support, Professional zusätzlich mit Content-Updates, SEO-Optimierung und Performance-Monitoring, Enterprise mit umfassendem Marketing-Support und 24/7 Betreuung. Alle Pakete beinhalten SSL-Zertifikate, regelmäßige Updates und Hosting-Management. Die Kosten variieren je nach Websitegröße und Funktionsumfang.',
    page: 'faq',
    order: 33,
  },
  {
    question: 'Welche Vorteile bietet eine individuell entwickelte Webseite gegenüber einem Baukastensystem?',
    answer: 'Individuell entwickelte Webseiten bieten entscheidende Vorteile: Maximale Flexibilität im Design und Funktionsumfang, bessere Performance durch optimierten Code, höhere Suchmaschinenfreundlichkeit, nahtlose Integration von Drittsystemen, vollständige Kontrolle über Updates und Änderungen. Im Gegensatz zu Baukastensystemen entstehen keine versteckten Folgekosten durch Plugins oder Template-Lizenzen. Die Investition amortisiert sich typischerweise innerhalb von 12-24 Monaten durch geringere Wartungskosten und bessere Conversion-Raten.',
    page: 'faq',
    order: 34,
  },
  {
    question: 'Sind SEO-Optimierungen in den Kosten enthalten?',
    answer: 'Ja, grundlegende SEO-Optimierungen sind in allen Paketen enthalten: Technische SEO (Ladezeiten, Mobile-First, strukturierte Daten), On-Page SEO (Meta-Tags, Headings, URLs), Content-Optimierung und lokale SEO. Erweiterte SEO-Services wie Content-Marketing, Backlink-Aufbau und regelmäßige SEO-Audits können optional gebucht werden. Wir bieten monatliche SEO-Pakete für kontinuierliche Optimierung und Ranking-Verbesserung.',
    page: 'faq',
    order: 35,
  },
  {
    question: 'Wie lange dauert die Entwicklung einer Webseite?',
    answer: 'Die Entwicklungsdauer variiert je nach Projektumfang: Simple Webseiten (4-6 Wochen), mittlere Business-Webseiten (8-12 Wochen), komplexe Portale (3-6 Monate). Der Prozess umfasst: Konzeption und Wireframing (1-2 Wochen), Design (2-3 Wochen), Entwicklung (3-8 Wochen), Content-Integration (1-2 Wochen), Testing und Optimierung (1-2 Wochen). Durch agiles Projektmanagement können erste Versionen bereits früher online gehen.',
    page: 'faq',
    order: 36,
  },
  {
    question: 'Welche Technologien verwendet ihr für die Webseitenentwicklung?',
    answer: 'Wir setzen auf modernste Webtechnologien: Frontend mit React.js/Next.js oder Vue.js/Nuxt.js für optimale Performance und SEO, Backend mit Node.js oder PHP/Laravel für robuste APIs, Headless CMS wie Strapi oder Contentful für flexibles Content-Management. Hosting erfolgt auf skalierbaren Cloud-Plattformen (AWS, Google Cloud). Für E-Commerce nutzen wir Shopify oder WooCommerce, je nach Anforderung. Alle Lösungen sind PWA-fähig und folgen dem JAMstack-Prinzip.',
    page: 'faq',
    order: 37,
  },
  {
    question: 'Sind eure Webseiten mobilfreundlich und responsive?',
    answer: 'Absolut, alle unsere Webseiten werden nach dem Mobile-First-Prinzip entwickelt. Das responsive Design passt sich automatisch an alle Bildschirmgrößen an (Smartphones, Tablets, Desktops). Wir optimieren für Touch-Bedienung, schnelle Ladezeiten auf mobilen Netzen und implementieren Progressive Web App (PWA) Funktionen. Regelmäßige Tests auf verschiedenen Geräten und Browsern garantieren eine konsistente Nutzererfahrung.',
    page: 'faq',
    order: 38,
  },
  {
    question: 'Welche CMS-Systeme unterstützt ihr?',
    answer: 'Wir bieten verschiedene CMS-Lösungen an: WordPress für klassische Websites mit umfangreichem Plugin-Ökosystem, Strapi/Contentful als moderne Headless-CMS für maximale Flexibilität, Shopify für E-Commerce-fokussierte Seiten. Eigenentwickelte CMS-Lösungen sind für spezielle Anforderungen möglich. Alle Systeme werden benutzerfreundlich konfiguriert und mit detaillierten Schulungen übergeben. Updates und Sicherheit werden kontinuierlich gewährleistet.',
    page: 'faq',
    order: 39,
  },
  {
    question: 'Wie erfolgt die Übergabe und Freischaltung der Webseite?',
    answer: 'Die Webseitenübergabe erfolgt in mehreren Schritten: Finale Qualitätskontrolle und Testing, Schulung der Administratoren (2-4 Stunden), Bereitstellung der Dokumentation, schrittweise Migration von der alten zur neuen Webseite. Die Freischaltung erfolgt typischerweise nachts oder am Wochenende, um Störungen zu minimieren. 30 Tage Support nach Launch sind inklusive. Wir begleiten auch die Nachbetreuung und Optimierung.',
    page: 'faq',
    order: 40,
  },
  {
    question: 'Bietet ihr langfristigen Support und Wartung an?',
    answer: 'Ja, wir bieten umfassende Wartungspläne: Technische Wartung (Updates, Backups, Sicherheit), Content-Management Support, Performance-Monitoring und Optimierung, SEO-Betreuung und Marketing-Support. Service Level Agreements (SLAs) garantieren definierte Reaktionszeiten. Das Support-Team ist per Ticket-System, E-Mail und Telefon erreichbar. Regelmäßige Reports informieren über Website-Performance und Optimierungspotenziale.',
    page: 'faq',
    order: 41,
  },
  // Onlineshop Entwicklung
  {
    question: 'Was kostet eine individuelle Onlineshop-Lösung?',
    answer: 'Die Kosten für eine individuelle Onlineshop-Lösung variieren je nach Umfang und Komplexität. Einfache Shops beginnen bei einem bestimmten Betrag, während komplexe Lösungen mit umfangreichen Funktionen und Integrationen deutlich mehr kosten können. Die Preisgestaltung hängt von Faktoren wie Design, Funktionalität, Anzahl der Produkte und benötigten Integrationen ab. Wir bieten transparente Kostenschätzungen und flexible Zahlungsmodelle an.',
    page: 'faq',
    order: 42,
  },
  {
    question: 'Welche E-Commerce Plattformen verwendet ihr für Onlineshops?',
    answer: 'Wir entwickeln Onlineshops basierend auf führenden Plattformen: Shopify (ideal für schnellen Start), WooCommerce (WordPress-basiert, flexibel), Magento (Enterprise-Level) und individuelle Lösungen. Die Auswahl basiert auf Faktoren wie Produktanzahl, Integrationsanforderungen, Skalierbarkeit und Budget. Alle Shops werden mit modernen Payment-Systemen, ERP-Anbindung und Marketing-Tools ausgestattet.',
    page: 'faq',
    order: 43,
  },
  {
    question: 'Wie wird die Sicherheit meines Onlineshops gewährleistet?',
    answer: 'Die Sicherheit Ihres Onlineshops hat für uns höchste Priorität. Wir implementieren SSL-Zertifikate für sichere Datenübertragungen, nutzen sichere Zahlungsmethoden und führen regelmäßige Sicherheitsupdates durch. Darüber hinaus setzen wir auf Firewalls, Malware-Scans und Sicherheitsüberprüfungen, um potenzielle Bedrohungen zu minimieren. Wir beraten Sie auch zu Best Practices für die Sicherheit Ihrer Kundendaten.',
    page: 'faq',
    order: 44,
  },
  {
    question: 'Wie integriere ich verschiedene Zahlungsmethoden in meinen Onlineshop?',
    answer: 'Wir integrieren eine Vielzahl von Zahlungsmethoden in Ihren Onlineshop, darunter Kreditkarten, PayPal, Sofortüberweisung, Klarna und viele weitere. Die Auswahl der Zahlungsmethoden erfolgt basierend auf den Bedürfnissen Ihrer Zielgruppe und den gängigen Zahlungsmethoden in Ihrer Branche. Wir stellen sicher, dass die Integration reibungslos funktioniert und die Benutzererfahrung optimiert wird.',
    page: 'faq',
    order: 45,
  },
  {
    question: 'Wie kann ich meinen Onlineshop für Suchmaschinen optimieren?',
    answer: 'Die Suchmaschinenoptimierung (SEO) ist entscheidend für den Erfolg Ihres Onlineshops. Wir implementieren SEO-Best Practices, einschließlich der Optimierung von Meta-Tags, URL-Strukturen, Bildbeschreibungen und der Erstellung von qualitativ hochwertigem Content. Darüber hinaus führen wir Keyword-Recherchen durch und optimieren die Seitenladegeschwindigkeit, um die Sichtbarkeit in Suchmaschinen zu erhöhen. Regelmäßige SEO-Audits helfen, die Leistung kontinuierlich zu verbessern.',
    page: 'faq',
    order: 46,
  },
  {
    question: 'Wie kann ich meine Produkte im Onlineshop verwalten?',
    answer: 'Wir bieten Ihnen ein benutzerfreundliches Content-Management-System (CMS), mit dem Sie Ihre Produkte einfach verwalten können. Sie können Produkte hinzufügen, bearbeiten oder löschen, Preise anpassen, Lagerbestände überwachen und Produktkategorien erstellen. Darüber hinaus bieten wir Schulungen an, um sicherzustellen, dass Sie alle Funktionen optimal nutzen können.',
    page: 'faq',
    order: 47,
  },
  {
    question: 'Gibt es eine Möglichkeit, meinen Onlineshop zu skalieren?',
    answer: 'Ja, unsere Onlineshop-Lösungen sind skalierbar und können mit Ihrem Unternehmen wachsen. Wir planen die Architektur so, dass sie zukünftige Erweiterungen und zusätzliche Funktionen unterstützt. Ob Sie neue Produktkategorien hinzufügen, internationale Märkte erschließen oder zusätzliche Verkaufsstellen integrieren möchten, wir stellen sicher, dass Ihr Onlineshop flexibel und anpassungsfähig bleibt.',
    page: 'faq',
    order: 48,
  },
  {
    question: 'Wie lange dauert es, einen Onlineshop zu entwickeln?',
    answer: 'Die Entwicklungsdauer eines Onlineshops hängt von der Komplexität und den spezifischen Anforderungen ab. Ein einfacher Onlineshop kann in 4-6 Wochen fertiggestellt werden, während komplexere Lösungen mit individuellen Anpassungen und Integrationen 8-12 Wochen oder länger in Anspruch nehmen können. Wir arbeiten eng mit Ihnen zusammen, um einen realistischen Zeitrahmen zu erstellen und sicherzustellen, dass alle Anforderungen erfüllt werden.',
    page: 'faq',
    order: 49,
  },
  {
    question: 'Bietet ihr auch Support nach dem Launch meines Onlineshops an?',
    answer: 'Ja, wir bieten umfassenden Support nach dem Launch Ihres Onlineshops an. Dies umfasst technische Unterstützung, regelmäßige Wartung, Sicherheitsupdates und die Behebung von Problemen. Darüber hinaus bieten wir Schulungen für Ihr Team an, um sicherzustellen, dass Sie alle Funktionen Ihres Onlineshops optimal nutzen können. Unsere Support-Teams sind jederzeit erreichbar, um Ihnen bei Fragen oder Problemen zu helfen.',
    page: 'faq',
    order: 50,
  },
  // Workflow Automatisierung
  {
    question: 'Welche Prozesse können automatisiert werden?',
    answer: 'Workflow-Automatisierung eignet sich für zahlreiche Geschäftsprozesse: Dokumentenmanagement (70% Zeitersparnis), Rechnungsverarbeitung (85% schneller), Kundenservice (24/7 Verfügbarkeit), Personalwesen (60% weniger manuelle Arbeit), Bestellabwicklung (90% Fehlerreduktion) und Reporting (automatische Generierung). Wir analysieren Ihre Prozesse und implementieren maßgeschneiderte Automatisierungslösungen mit RPA (Robotic Process Automation), KI und API-Integrationen.',
    page: 'faq',
    order: 51,
  },
  {
    question: 'Wie startet ein Automatisierungsprojekt?',
    answer: 'Ein Automatisierungsprojekt beginnt mit einer detaillierten Analyse Ihrer bestehenden Prozesse. Wir identifizieren Engpässe, ineffiziente Abläufe und Bereiche mit hohem Automatisierungspotenzial. Anschließend erstellen wir einen maßgeschneiderten Automatisierungsplan, der die Ziele, den Zeitrahmen und die benötigten Ressourcen festlegt. In der Implementierungsphase setzen wir die Automatisierungslösungen um und testen diese gründlich, bevor sie in den Live-Betrieb übergehen.',
    page: 'faq',
    order: 52,
  },
  {
    question: 'Welche Technologien verwendet ihr für die Automatisierung?',
    answer: 'Wir nutzen eine Vielzahl von Technologien für die Workflow-Automatisierung, darunter RPA-Tools wie UiPath, Automation Anywhere und Blue Prism. Für KI-gestützte Automatisierungen setzen wir auf Machine Learning-Frameworks wie TensorFlow und PyTorch. Darüber hinaus integrieren wir APIs und Webhooks, um verschiedene Systeme miteinander zu verbinden und Daten nahtlos auszutauschen.',
    page: 'faq',
    order: 53,
  },
  {
    question: 'Wie wird die Qualität der automatisierten Prozesse sichergestellt?',
    answer: 'Die Qualitätssicherung automatisierter Prozesse erfolgt durch umfassende Tests und Monitoring. Wir implementieren Testfälle, um sicherzustellen, dass die Automatisierung wie gewünscht funktioniert. Darüber hinaus setzen wir Monitoring-Tools ein, um die Leistung der automatisierten Prozesse in Echtzeit zu überwachen. Bei Abweichungen oder Fehlern werden sofortige Maßnahmen ergriffen, um die Integrität der Prozesse zu gewährleisten.',
    page: 'faq',
    order: 54,
  },
  {
    question: 'Wie lange dauert es, einen automatisierten Prozess zu implementieren?',
    answer: 'Die Implementierungsdauer eines automatisierten Prozesses hängt von der Komplexität und dem Umfang des Projekts ab. Ein einfacher Prozess kann in wenigen Wochen automatisiert werden, während komplexe Automatisierungen mehrere Monate in Anspruch nehmen können. Wir arbeiten eng mit Ihnen zusammen, um einen realistischen Zeitrahmen zu erstellen und sicherzustellen, dass alle Anforderungen erfüllt werden.',
    page: 'faq',
    order: 55,
  },
  {
    question: 'Welche Vorteile bietet die Automatisierung von Geschäftsprozessen?',
    answer: 'Die Automatisierung von Geschäftsprozessen bietet zahlreiche Vorteile: Effizienzsteigerung durch Zeitersparnis, Reduzierung von Fehlern durch automatisierte Abläufe, Kostensenkung durch optimierte Ressourcennutzung, verbesserte Mitarbeiterzufriedenheit durch Entlastung von Routineaufgaben und die Möglichkeit, sich auf strategische Tätigkeiten zu konzentrieren. Darüber hinaus ermöglicht die Automatisierung eine schnellere Reaktion auf Marktveränderungen und Kundenbedürfnisse.',
    page: 'faq',
    order: 56,
  },
  {
    question: 'Wie wird der ROI einer Automatisierung gemessen?',
    answer: 'Der ROI (Return on Investment) einer Automatisierung wird durch die Analyse der Einsparungen und Effizienzgewinne im Vergleich zu den Investitionskosten gemessen. Wir erstellen eine detaillierte Kosten-Nutzen-Analyse, die sowohl direkte Einsparungen (z. B. reduzierte Arbeitsstunden) als auch indirekte Vorteile (z. B. verbesserte Kundenzufriedenheit) berücksichtigt. Regelmäßige Reviews helfen, den langfristigen Erfolg der Automatisierung zu bewerten.',
    page: 'faq',
    order: 57,
  },
  {
    question: 'Wie wird sichergestellt, dass die Automatisierung mit den Unternehmenszielen übereinstimmt?',
    answer: 'Wir arbeiten eng mit Ihnen zusammen, um sicherzustellen, dass die Automatisierungslösungen mit Ihren Unternehmenszielen und -strategien übereinstimmen. Zu Beginn des Projekts definieren wir klare Ziele und KPIs, die den Erfolg der Automatisierung messen. Regelmäßige Meetings und Feedback-Runden während des Projekts gewährleisten, dass Anpassungen vorgenommen werden können, um die Ausrichtung auf die Unternehmensziele sicherzustellen.',
    page: 'faq',
    order: 58,
  },
  {
    question: 'Welche Herausforderungen können bei der Automatisierung auftreten?',
    answer: 'Herausforderungen bei der Automatisierung können technologische Hürden, Widerstand der Mitarbeiter gegen Veränderungen, unzureichende Datenqualität und Integrationsprobleme mit bestehenden Systemen sein. Wir adressieren diese Herausforderungen durch umfassende Schulungen, Change Management-Strategien und eine sorgfältige Planung der Implementierung, um einen reibungslosen Übergang zu gewährleisten.',
    page: 'faq',
    order: 59,
  },
  // Digitale Transformation
  {
    question: 'Was versteht man unter digitaler Transformation?',
    answer: 'Digitale Transformation bezeichnet den umfassenden Wandel von Geschäftsmodellen, Prozessen und Unternehmenskultur durch den Einsatz digitaler Technologien. Ziel ist es, Effizienz zu steigern, neue Geschäftsmöglichkeiten zu erschließen und die Kundenerfahrung zu verbessern. Dies umfasst die Integration von Technologien wie Cloud-Computing, Big Data, IoT und Künstliche Intelligenz in alle Bereiche des Unternehmens.',
    page: 'faq',
    order: 60,
  },
  {
    question: 'Welche Vorteile bietet die digitale Transformation für Unternehmen?',
    answer: 'Die digitale Transformation bietet zahlreiche Vorteile: erhöhte Effizienz durch automatisierte Prozesse, verbesserte Kundenerfahrung durch personalisierte Angebote, schnellere Entscheidungsfindung durch Datenanalysen, Kostensenkungen durch optimierte Abläufe und die Möglichkeit, neue Geschäftsmodelle zu entwickeln. Unternehmen, die die digitale Transformation erfolgreich umsetzen, können sich einen Wettbewerbsvorteil verschaffen und ihre Marktposition stärken.',
    page: 'faq',
    order: 61,
  },
  {
    question: 'Wie kann ich mit der digitalen Transformation in meinem Unternehmen beginnen?',
    answer: 'Der erste Schritt zur digitalen Transformation besteht darin, eine umfassende Analyse Ihrer aktuellen Prozesse und Technologien durchzuführen. Identifizieren Sie Bereiche mit Verbesserungspotenzial und definieren Sie klare Ziele. Anschließend entwickeln wir gemeinsam eine digitale Strategie, die auf Ihre spezifischen Bedürfnisse zugeschnitten ist. Wir unterstützen Sie bei der Auswahl geeigneter Technologien und der Implementierung von Lösungen.',
    page: 'faq',
    order: 62,
  },
  {
    question: 'Welche Technologien sind entscheidend für die digitale Transformation?',
    answer: 'Wichtige Technologien für die digitale Transformation sind: Cloud-Computing für flexible Ressourcen, Big Data für datengetriebenes Entscheiden, Künstliche Intelligenz für Automatisierung und personalisierte Erlebnisse, Internet of Things (IoT) für vernetzte Geräte und Prozesse sowie Blockchain für sichere Transaktionen. Die Auswahl der Technologien hängt von den spezifischen Anforderungen und Zielen Ihres Unternehmens ab.',
    page: 'faq',
    order: 63,
  },
  {
    question: 'Wie lange dauert die digitale Transformation?',
    answer: 'Die Dauer der digitalen Transformation variiert je nach Unternehmensgröße, Branche und Komplexität der Prozesse. Kleinere Unternehmen können in 6-12 Monaten signifikante Fortschritte erzielen, während größere Unternehmen mehrere Jahre benötigen können, um umfassende Veränderungen umzusetzen. Es ist wichtig, die Transformation schrittweise zu planen und regelmäßig zu evaluieren, um Anpassungen vorzunehmen.',
    page: 'faq',
    order: 64,
  },
  {
    question: 'Wie kann ich die Mitarbeiter in den digitalen Transformationsprozess einbeziehen?',
    answer: 'Die Einbeziehung der Mitarbeiter ist entscheidend für den Erfolg der digitalen Transformation. Führen Sie regelmäßige Schulungen und Workshops durch, um das Verständnis für neue Technologien zu fördern. Bieten Sie Möglichkeiten zur Mitgestaltung und Feedback an, um die Akzeptanz zu erhöhen. Eine offene Kommunikation über die Ziele und Vorteile der Transformation hilft, Widerstände abzubauen und das Engagement zu steigern.',
    page: 'faq',
    order: 65,
  },
  {
    question: 'Welche Herausforderungen können bei der digitalen Transformation auftreten?',
    answer: 'Herausforderungen bei der digitalen Transformation können technologische Hürden, Widerstand der Mitarbeiter, unzureichende Datenqualität, fehlende digitale Kompetenzen und unklare Zieldefinitionen sein. Um diese Herausforderungen zu bewältigen, ist eine sorgfältige Planung, Schulung und ein effektives Change Management erforderlich. Wir unterstützen Sie dabei, diese Herausforderungen proaktiv anzugehen.',
    page: 'faq',
    order: 66,
  },
  {
    question: 'Wie messe ich den Erfolg meiner digitalen Transformation?',
    answer: 'Der Erfolg der digitalen Transformation kann durch verschiedene KPIs gemessen werden, wie z.B. Effizienzsteigerungen, Kostensenkungen, Umsatzwachstum, Kundenzufriedenheit und Mitarbeiterengagement. Regelmäßige Reviews und Anpassungen der Strategie sind wichtig, um sicherzustellen, dass die gesetzten Ziele erreicht werden. Wir helfen Ihnen, geeignete Metriken zu definieren und den Fortschritt zu überwachen.',
    page: 'faq',
    order: 67,
  },
  {
    question: 'Gibt es Best Practices für die digitale Transformation?',
    answer: 'Ja, einige Best Practices für die digitale Transformation umfassen: klare Zieldefinitionen, schrittweise Implementierung, Einbeziehung der Mitarbeiter, kontinuierliche Schulung, Nutzung agiler Methoden, regelmäßige Evaluierung und Anpassung der Strategie sowie die Auswahl geeigneter Technologien. Der Austausch mit anderen Unternehmen und Experten kann ebenfalls wertvolle Einblicke und Inspiration bieten.',
    page: 'faq',
    order: 68,
  },
  // Cyber Security Beratung
  {
    question: 'Welche Sicherheitsmaßnahmen implementiert ihr für Webanwendungen?',
    answer: 'Wir implementieren eine Vielzahl von Sicherheitsmaßnahmen, darunter SSL-Verschlüsselung, Firewalls, regelmäßige Sicherheitsupdates, Penetrationstests und Sicherheitsüberprüfungen. Zudem setzen wir auf sichere Programmierpraktiken, um Schwachstellen zu minimieren. Unsere Sicherheitsarchitektur wird regelmäßig überprüft und an aktuelle Bedrohungen angepasst.',
    page: 'faq',
    order: 69,
  },
  {
    question: 'Wie schützt ihr die Daten eurer Kunden?',
    answer: 'Der Schutz der Kundendaten hat für uns höchste Priorität. Wir verwenden Datenverschlüsselung, Zugriffskontrollen und regelmäßige Sicherheitsaudits, um sicherzustellen, dass alle Daten sicher gespeichert und verarbeitet werden. Zudem schulen wir unsere Mitarbeiter regelmäßig in Bezug auf Datenschutz und Datensicherheit.',
    page: 'faq',
    order: 70,
  },
  {
    question: 'Wie geht ihr mit Datenschutzverletzungen um?',
    answer: 'Im Falle einer Datenschutzverletzung haben wir einen klaren Notfallplan. Dieser umfasst die sofortige Identifikation und Behebung der Schwachstelle, die Benachrichtigung betroffener Kunden und die Meldung an die zuständigen Behörden gemäß den gesetzlichen Vorgaben. Wir führen auch eine umfassende Analyse durch, um zukünftige Vorfälle zu verhindern.',
    page: 'faq',
    order: 71,
  },
  {
    question: 'Welche Compliance-Vorgaben beachtet ihr?',
    answer: 'Wir halten uns an alle relevanten Compliance-Vorgaben, einschließlich der Datenschutz-Grundverordnung (DSGVO), des Bundesdatenschutzgesetzes (BDSG) und anderer branchenspezifischer Vorschriften. Unsere Prozesse und Systeme werden regelmäßig überprüft, um sicherzustellen, dass wir alle gesetzlichen Anforderungen erfüllen.',
    page: 'faq',
    order: 72,
  },
  {
    question: 'Bietet ihr Schulungen zur Sensibilisierung für Cyber-Sicherheit an?',
    answer: 'Ja, wir bieten umfassende Schulungen zur Sensibilisierung für Cyber-Sicherheit an. Diese Schulungen decken Themen wie Phishing, Passwortsicherheit, sichere Nutzung von IT-Ressourcen und den Umgang mit sensiblen Daten ab. Ziel ist es, das Bewusstsein der Mitarbeiter für Sicherheitsrisiken zu schärfen und sie in der Anwendung sicherer Praktiken zu schulen.',
    page: 'faq',
    order: 73,
  },
  {
    question: 'Wie oft führt ihr Sicherheitsüberprüfungen durch?',
    answer: 'Wir führen regelmäßige Sicherheitsüberprüfungen durch, mindestens einmal pro Jahr. Diese Überprüfungen umfassen Penetrationstests, Schwachstellenanalysen und Audits unserer Sicherheitsrichtlinien. Bei Bedarf werden zusätzliche Überprüfungen durchgeführt, insbesondere nach größeren Änderungen an unseren Systemen oder Prozessen.',
    page: 'faq',
    order: 74,
  },
  {
    question: 'Welche Technologien setzt ihr zur Gewährleistung der Cyber-Sicherheit ein?',
    answer: 'Wir setzen eine Vielzahl von Technologien zur Gewährleistung der Cyber-Sicherheit ein, darunter Intrusion Detection Systeme (IDS), Firewalls, Antivirus-Software, Datenverschlüsselung und Sicherheitsmanagement-Tools. Diese Technologien werden kontinuierlich aktualisiert und an die neuesten Bedrohungen angepasst.',
    page: 'faq',
    order: 75,
  },
  {
    question: 'Wie wird die Sicherheit von Drittanbieterdiensten gewährleistet?',
    answer: 'Wir prüfen die Sicherheitsstandards und Compliance-Vorgaben aller Drittanbieterdienste, die wir nutzen. Verträge mit Drittanbietern enthalten Sicherheitsanforderungen, und wir führen regelmäßige Audits durch, um sicherzustellen, dass diese Anforderungen eingehalten werden. Bei der Auswahl von Drittanbietern legen wir großen Wert auf deren Sicherheitspraktiken.',
    page: 'faq',
    order: 76,
  },
  {
    question: 'Wie geht ihr mit Sicherheitsvorfällen um?',
    answer: 'Im Falle eines Sicherheitsvorfalls haben wir einen klaren Reaktionsplan, der die Identifikation, Eindämmung, Behebung und Nachverfolgung des Vorfalls umfasst. Wir analysieren die Ursachen und ergreifen Maßnahmen zur Vermeidung zukünftiger Vorfälle. Zudem informieren wir betroffene Parteien und die zuständigen Behörden, wenn dies erforderlich ist.',
    page: 'faq',
    order: 77,
  },
  // IT Infrastruktur
  {
    question: 'Welche IT-Infrastruktur-Lösungen bietet ihr an?',
    answer: 'Wir bieten umfassende IT-Infrastruktur-Lösungen, einschließlich Cloud-Hosting, Server-Management, Netzwerksicherheit, Backup- und Disaster-Recovery-Lösungen sowie Virtualisierung. Unsere Lösungen sind skalierbar und anpassbar, um den spezifischen Anforderungen Ihres Unternehmens gerecht zu werden. Wir arbeiten mit führenden Anbietern wie AWS, Microsoft Azure und Google Cloud zusammen, um Ihnen die besten Technologien anzubieten.',
    page: 'faq',
    order: 78,
  },
  {
    question: 'Wie gewährleistet ihr die Sicherheit der IT-Infrastruktur?',
    answer: 'Die Sicherheit unserer IT-Infrastruktur wird durch mehrschichtige Sicherheitsmaßnahmen gewährleistet, darunter Firewalls, Intrusion Detection Systeme, regelmäßige Sicherheitsupdates und umfassende Monitoring-Tools. Wir führen regelmäßige Sicherheitsüberprüfungen und Penetrationstests durch, um potenzielle Schwachstellen zu identifizieren und zu beheben. Zudem schulen wir unsere Mitarbeiter in Bezug auf Sicherheitsbest Practices.',
    page: 'faq',
    order: 79,
  },
  {
    question: 'Bietet ihr Unterstützung bei der Migration in die Cloud?',
    answer: 'Ja, wir unterstützen Sie umfassend bei der Migration in die Cloud. Unser Team analysiert Ihre bestehende Infrastruktur, plant die Migration und führt diese schrittweise durch, um Ausfallzeiten zu minimieren. Wir helfen Ihnen auch bei der Auswahl der richtigen Cloud-Dienste und -Anbieter, um sicherzustellen, dass Ihre Anforderungen an Leistung, Sicherheit und Kosten erfüllt werden.',
    page: 'faq',
    order: 80,
  },
  {
    question: 'Wie wird die Performance der IT-Infrastruktur überwacht?',
    answer: 'Die Performance unserer IT-Infrastruktur wird durch fortlaufendes Monitoring und Reporting sichergestellt. Wir nutzen moderne Monitoring-Tools, um die Systemleistung, Verfügbarkeit und Sicherheit in Echtzeit zu überwachen. Bei Auffälligkeiten oder Leistungsengpässen werden sofortige Maßnahmen ergriffen, um die Stabilität und Effizienz der Systeme zu gewährleisten.',
    page: 'faq',
    order: 81,
  },
  {
    question: 'Welche Backup- und Disaster-Recovery-Lösungen bietet ihr an?',
    answer: 'Wir bieten maßgeschneiderte Backup- und Disaster-Recovery-Lösungen, die auf Ihre spezifischen Anforderungen abgestimmt sind. Dazu gehören regelmäßige automatisierte Backups, Offsite-Speicherung, Notfallwiederherstellungspläne und Tests der Wiederherstellungsprozesse. Unsere Lösungen gewährleisten, dass Ihre Daten im Falle eines Ausfalls oder einer Katastrophe schnell und zuverlässig wiederhergestellt werden können.',
    page: 'faq',
    order: 82,
  },
  {
    question: 'Wie unterstützt ihr Unternehmen bei der Einhaltung von Compliance-Vorgaben?',
    answer: 'Wir unterstützen Unternehmen bei der Einhaltung von Compliance-Vorgaben, indem wir sicherstellen, dass alle Systeme und Prozesse den relevanten gesetzlichen Anforderungen entsprechen. Dazu gehören Datenschutzbestimmungen (z.B. DSGVO), branchenspezifische Vorschriften und Sicherheitsstandards. Wir führen regelmäßige Audits durch und bieten Schulungen an, um das Bewusstsein für Compliance-Themen zu schärfen.',
    page: 'faq',
    order: 83,
  },
  {
    question: 'Welche Rolle spielt Virtualisierung in eurer IT-Infrastruktur?',
    answer: 'Virtualisierung spielt eine zentrale Rolle in unserer IT-Infrastruktur, da sie die Ressourcennutzung optimiert, die Flexibilität erhöht und die Kosten senkt. Durch Virtualisierung können mehrere virtuelle Maschinen auf einem physischen Server betrieben werden, was die Effizienz steigert und die Bereitstellung neuer Dienste beschleunigt. Wir setzen auf führende Virtualisierungstechnologien wie VMware und Hyper-V.',
    page: 'faq',
    order: 84,
  },
  {
    question: 'Wie geht ihr mit IT-Support-Anfragen um?',
    answer: 'IT-Support-Anfragen werden über ein Ticket-System erfasst, das eine schnelle und effiziente Bearbeitung gewährleistet. Unser Support-Team ist rund um die Uhr erreichbar und priorisiert Anfragen basierend auf Dringlichkeit und Komplexität. Wir bieten verschiedene Support-Levels an, von grundlegenden technischen Anfragen bis hin zu umfassendem 24/7-Support für kritische Systeme.',
    page: 'faq',
    order: 85,
  },
  {
    question: 'Bietet ihr maßgeschneiderte IT-Lösungen für spezifische Branchen an?',
    answer: 'Ja, wir bieten maßgeschneiderte IT-Lösungen für verschiedene Branchen an, darunter Gesundheitswesen, Finanzdienstleistungen, Einzelhandel und Fertigung. Unsere Lösungen sind speziell auf die Anforderungen und Herausforderungen jeder Branche abgestimmt, um maximale Effizienz, Sicherheit und Compliance zu gewährleisten. Wir arbeiten eng mit unseren Kunden zusammen, um individuelle Lösungen zu entwickeln, die ihren spezifischen Bedürfnissen gerecht werden.',
    page: 'faq',
    order: 86,
  },
  // Hosting
  {
    question: 'Welche Hosting-Lösungen bietet ihr an?',
    answer: 'Wir bieten verschiedene Hosting-Lösungen an, darunter Shared Hosting, VPS (Virtual Private Server), dedizierte Server und Cloud-Hosting. Unsere Lösungen sind skalierbar und bieten hohe Verfügbarkeit, Sicherheit und Performance. Wir arbeiten mit führenden Anbietern zusammen, um Ihnen die besten Technologien und Support-Optionen anzubieten. Alle Hosting-Pakete beinhalten regelmäßige Backups, Sicherheitsupdates und Monitoring.',
    page: 'faq',
    order: 87,
  },
  {
    question: 'Wie wählt man die richtige Hosting-Lösung aus?',
    answer: 'Die Wahl der richtigen Hosting-Lösung hängt von mehreren Faktoren ab: Art der Anwendung (Webseite, Onlineshop, App), erwarteter Traffic, benötigte Ressourcen (CPU, RAM, Speicher), Sicherheitsanforderungen und Budget. Wir beraten Sie gerne, um die beste Lösung für Ihre spezifischen Anforderungen zu finden. Eine gründliche Analyse Ihrer Bedürfnisse ist der Schlüssel zur optimalen Hosting-Strategie.',
    page: 'faq',
    order: 88,
  },
  {
    question: 'Bietet ihr Managed Hosting an?',
    answer: 'Ja, wir bieten Managed Hosting-Dienste an, bei denen wir die gesamte Serververwaltung übernehmen. Dazu gehören regelmäßige Updates, Sicherheitsüberprüfungen, Performance-Optimierungen und technischer Support. Dies ermöglicht Ihnen, sich auf Ihr Kerngeschäft zu konzentrieren, während wir uns um die technische Infrastruktur kümmern. Unsere Managed Hosting-Pakete sind flexibel und anpassbar.',
    page: 'faq',
    order: 89,
  },
  {
    question: 'Wie wird die Sicherheit der gehosteten Anwendungen gewährleistet?',
    answer: 'Die Sicherheit unserer gehosteten Anwendungen wird durch mehrschichtige Sicherheitsmaßnahmen gewährleistet, darunter Firewalls, DDoS-Schutz, regelmäßige Sicherheitsupdates, SSL-Zertifikate und Monitoring-Tools. Wir führen auch regelmäßige Sicherheitsaudits durch, um potenzielle Schwachstellen zu identifizieren und zu beheben. Zudem schulen wir unsere Mitarbeiter in Bezug auf Sicherheitsbest Practices.',
    page: 'faq',
    order: 90,
  },
  // Tools & KI-Agenten
  {
    question: 'Welche Tools verwendet ihr für die Entwicklung und das Projektmanagement?',
    answer: 'Wir verwenden eine Vielzahl von Tools für die Entwicklung und das Projektmanagement, darunter Git für die Versionskontrolle, Jira für das Projektmanagement, Slack für die Kommunikation und Confluence für die Dokumentation. Für die Entwicklung setzen wir auf moderne Frameworks und Programmiersprachen, die den aktuellen Standards entsprechen. Unsere Tools sind darauf ausgelegt, die Zusammenarbeit und Effizienz im Team zu maximieren.',
    page: 'faq',
    order: 91,
  },
  {
    question: 'Bietet ihr Schulungen für die Nutzung von Tools an?',
    answer: 'Ja, wir bieten Schulungen für die Nutzung unserer Tools und Technologien an. Diese Schulungen sind auf die spezifischen Bedürfnisse Ihres Unternehmens zugeschnitten und können sowohl vor Ort als auch online durchgeführt werden. Ziel ist es, sicherzustellen, dass Ihr Team die Tools effektiv nutzen kann, um die Produktivität und Effizienz zu steigern.',
    page: 'faq',
    order: 92,
  },
  {
    question: 'Wie integriert ihr neue Tools in bestehende Systeme?',
    answer: 'Die Integration neuer Tools in bestehende Systeme erfolgt in mehreren Schritten: Zunächst analysieren wir die bestehenden Systeme und Prozesse, um sicherzustellen, dass die neuen Tools nahtlos integriert werden können. Anschließend planen wir die Integration, führen Tests durch und schulen die Mitarbeiter. Wir stellen sicher, dass die neuen Tools die Effizienz steigern und die Benutzerfreundlichkeit verbessern.',
    page: 'faq',
    order: 93,
  },
  {
    question: 'Welche Unterstützung bietet ihr bei der Implementierung von Tools?',
    answer: 'Wir bieten umfassende Unterstützung bei der Implementierung von Tools, einschließlich der Planung, Installation, Konfiguration und Schulung. Unser Team steht Ihnen während des gesamten Prozesses zur Seite, um sicherzustellen, dass die Implementierung reibungslos verläuft und alle Anforderungen erfüllt werden. Nach der Implementierung bieten wir auch fortlaufenden Support und Wartung an.',
    page: 'faq',
    order: 94,
  },
  {
    question: 'Wie bleibt ihr über neue Technologien und Tools informiert?',
    answer: 'Wir bleiben über neue Technologien und Tools informiert, indem wir regelmäßig an Schulungen, Konferenzen und Webinaren teilnehmen. Zudem verfolgen wir aktuelle Trends in der Branche durch Fachliteratur, Blogs und Online-Communities. Unser Team ist bestrebt, stets auf dem neuesten Stand zu bleiben, um Ihnen die besten Lösungen anbieten zu können.',
    page: 'faq',
    order: 95,
  },
];

async function importFAQs() {
  try {
    console.log('🔄 Verbinde mit MongoDB...');
    await connectDB();
    console.log('✅ Verbindung erfolgreich');

    let created = 0;
    let updated = 0;
    let skipped = 0;

    for (const faqData of faqsData) {
      try {
        // Prüfe, ob FAQ bereits existiert (basierend auf question und page)
        const existing = await FAQ.findOne({
          question: faqData.question,
          page: faqData.page,
        });

        if (existing) {
          // Update bestehende FAQ
          await FAQ.findByIdAndUpdate(existing._id, faqData);
          updated++;
          console.log(`✏️  Aktualisiert: ${faqData.question.substring(0, 50)}...`);
        } else {
          // Erstelle neue FAQ
          await FAQ.create(faqData);
          created++;
          console.log(`✨ Erstellt: ${faqData.question.substring(0, 50)}...`);
        }
      } catch (error) {
        console.error(`❌ Fehler bei "${faqData.question}":`, error);
        skipped++;
      }
    }

    console.log('\n📊 Zusammenfassung:');
    console.log(`   ✨ Erstellt: ${created}`);
    console.log(`   ✏️  Aktualisiert: ${updated}`);
    console.log(`   ⏭️  Übersprungen: ${skipped}`);
    console.log(`   📦 Gesamt: ${faqsData.length}`);

    // Zeige alle FAQs für FAQ-Seite an
    const allFAQs = await FAQ.find({ page: 'faq' }).sort({ order: 1 });
    console.log(`\n📋 Alle FAQs für FAQ-Seite in der Datenbank: ${allFAQs.length}`);

    console.log('\n✅ Import abgeschlossen!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Fehler beim Import:', error);
    process.exit(1);
  }
}

// Script ausführen
importFAQs();
