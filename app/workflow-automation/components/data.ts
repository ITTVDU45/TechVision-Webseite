import {
  KIAgentFeature,
  AutomationBenefit,
  UseCase,
  IntegrationCategory,
  FAQ,
} from './types';

export const kiAgentFeaturesData: KIAgentFeature[] = [
  {
    icon: '🤖',
    title: 'Automatische Aufgabenverarbeitung',
    description: 'KI-Agenten übernehmen repetitive Aufgaben und führen diese rund um die Uhr präzise aus.',
  },
  {
    icon: '🧮',
    title: 'Intelligente Entscheidungsfindung',
    description: 'Datenbasierte Analysen unterstützen bei komplexen Entscheidungsprozessen.',
  },
  {
    icon: '📈',
    title: 'Kontinuierliche Optimierung',
    description: 'Machine Learning Algorithmen verbessern die Prozesse stetig durch Lernen aus Erfahrungen.',
  },
];

export const automationBenefitsData: AutomationBenefit[] = [
  {
    icon: '⚡',
    title: 'Schnellere Prozesse',
    description: 'Automatisierte Workflows reduzieren die Bearbeitungszeit um bis zu 80% und eliminieren Wartezeiten.',
  },
  {
    icon: '💰',
    title: 'Kostenreduktion',
    description: 'Senken Sie Ihre operativen Kosten durch effiziente, automatisierte Abläufe und minimieren Sie manuelle Eingriffe.',
  },
  {
    icon: '🎯',
    title: 'Höhere Präzision',
    description: 'Eliminieren Sie menschliche Fehler und gewährleisten Sie konsistente Qualität in allen Prozessen.',
  },
  {
    icon: '📊',
    title: 'Bessere Skalierbarkeit',
    description: 'Wachsen Sie ohne proportionalen Anstieg der Prozesskosten und behalten Sie die volle Kontrolle.',
  },
  {
    icon: '🔄',
    title: 'Nahtlose Integration',
    description: 'Verbinden Sie bestehende Systeme und schaffen Sie einen durchgängigen Informationsfluss.',
  },
  {
    icon: '📱',
    title: 'Mobile Zugänglichkeit',
    description: 'Greifen Sie von überall auf Ihre automatisierten Prozesse zu und behalten Sie den Überblick.',
  },
];

export const useCasesData: UseCase[] = [
  {
    icon: '👥',
    title: 'HR-Prozesse',
    subtitle: 'Automatisiertes Onboarding',
    description: 'Optimieren Sie den Einstellungsprozess durch automatisierte Dokumentenerstellung, Zugriffsrechte-Verwaltung und Einarbeitungspläne.',
    features: [
      'Automatische Erstellung von Arbeitsverträgen',
      'Koordinierte Zugriffsrechte-Vergabe',
      'Strukturierte Einarbeitungspläne',
      'Erinnerungen für wichtige Meilensteine',
    ],
  },
  {
    icon: '📄',
    title: 'Rechnungsbearbeitung',
    subtitle: 'Digitale Rechnungsverarbeitung',
    description: 'Automatisieren Sie den gesamten Rechnungsprozess von der Erfassung bis zur Bezahlung mit KI-gestützter Dokumentenverarbeitung.',
    features: [
      'KI-basierte Datenextraktion',
      'Automatische Kontierung',
      'Digitaler Freigabeprozess',
      'Automatisierte Buchungen',
    ],
  },
  {
    icon: '🎯',
    title: 'Kundenservice',
    subtitle: 'Intelligentes Ticket-Management',
    description: 'Verbessern Sie Ihre Reaktionszeiten durch automatische Kategorisierung und Weiterleitung von Kundenanfragen.',
    features: [
      'KI-gestützte Ticket-Klassifizierung',
      'Automatische Prioritätensetzung',
      'Intelligente Agentenzuweisung',
      'Vorgefertigte Antwortvorlagen',
    ],
  },
  {
    icon: '📈',
    title: 'Marketing Automation',
    subtitle: 'Lead-Management & Nurturing',
    description: 'Automatisieren Sie Ihre Marketing-Kampagnen für effiziente Lead-Generierung und personalisierte Kundenansprache.',
    features: [
      'Automatisierte E-Mail-Kampagnen',
      'Lead-Scoring und -Qualifizierung',
      'Personalisierte Content-Delivery',
      'Performance-Tracking',
    ],
  },
];

export const integrationCategoriesData: IntegrationCategory[] = [
  {
    icon: '💼',
    title: 'ERP Systeme',
    systems: ['SAP', 'Microsoft Dynamics', 'Oracle'],
    features: ['Datensynchronisation', 'Prozessintegration', 'Automatische Updates'],
  },
  {
    icon: '👥',
    title: 'CRM Systeme',
    systems: ['Salesforce', 'HubSpot', 'Microsoft Dynamics'],
    features: ['Kundenmanagement', 'Vertriebsautomatisierung', 'Lead-Tracking'],
  },
  {
    icon: '📧',
    title: 'E-Mail & Kommunikation',
    systems: ['Outlook', 'Gmail', 'Teams', 'Slack'],
    features: ['Automatische Benachrichtigungen', 'E-Mail-Workflows', 'Chat-Integration'],
  },
  {
    icon: '📊',
    title: 'Analytics Tools',
    systems: ['Power BI', 'Tableau', 'Google Analytics'],
    features: ['Datenanalyse', 'Reporting', 'Dashboards'],
  },
  {
    icon: '☁️',
    title: 'Cloud Services',
    systems: ['AWS', 'Azure', 'Google Cloud'],
    features: ['Skalierbare Infrastruktur', 'Cloud Storage', 'Serverless Functions'],
  },
  {
    icon: '🔐',
    title: 'Security Tools',
    systems: ['Identity Management', 'SSO', 'Encryption'],
    features: ['Zugriffssteuerung', 'Datenverschlüsselung', 'Compliance'],
  },
];

export const faqsData: FAQ[] = [
  {
    question: 'Wie starten wir mit der Workflow Automatisierung?',
    answer: 'Wir beginnen mit einer detaillierten Analyse Ihrer aktuellen Prozesse. In einem unverbindlichen Beratungsgespräch identifizieren wir Automatisierungspotenziale und entwickeln gemeinsam eine maßgeschneiderte Strategie. Anschließend erstellen wir einen detaillierten Implementierungsplan mit klaren Meilensteinen.',
  },
  {
    question: 'Welche Vorteile bietet die Integration von KI-Agenten?',
    answer: 'KI-Agenten lernen aus Ihren Prozessen und optimieren diese kontinuierlich. Sie übernehmen repetitive Aufgaben, treffen datenbasierte Entscheidungen und verbessern sich durch Machine Learning stetig selbst. Dies führt zu höherer Effizienz, geringeren Fehlerquoten und kontinuierlicher Prozessoptimierung.',
  },
  {
    question: 'Welche Tools setzen Sie ein und wie erfolgt die Anbindung?',
    answer: 'Wir nutzen moderne Workflow-Automatisierungstools wie n8n, Make (Integromat) und spezialisierte KI-Plattformen. Die Anbindung erfolgt über APIs, Webhooks und vordefinierte Konnektoren. Wir integrieren nahtlos in Ihre bestehenden Systeme wie ERP, CRM, E-Mail und Cloud-Services.',
  },
  {
    question: 'Wie lange dauert der gesamte Prozess?',
    answer: 'Die Dauer hängt von der Komplexität Ihrer Prozesse ab. Einfache Automatisierungen können bereits nach wenigen Wochen umgesetzt werden, während komplexere Workflows mehrere Monate in Anspruch nehmen können. In der Beratung erstellen wir einen detaillierten Zeitplan für Ihr Projekt.',
  },
];
