import {
  OpenSourceTool,
  KIAgent,
  IntegrationCategory,
  IntegrationFeature,
  FAQ,
} from './types';

export const openSourceToolsData: OpenSourceTool[] = [
  {
    name: 'Cal.com',
    icon: '📅',
    description: 'Open-Source-Terminplanungstool für flexible Meetings',
    features: [
      'Automatische Zeitzonenkonvertierung',
      'Team-Kalender',
      'API-Integration',
    ],
  },
  {
    name: 'Zeiterfassung',
    icon: '⏱️',
    description: 'Effiziente Zeiterfassung für Teams & Freelancer',
    features: [
      'Projektbasierte Erfassung',
      'Automatische Berichte',
      'Export-Funktionen',
    ],
  },
  {
    name: 'Passwort-Tresor',
    icon: '🔐',
    description: 'Sicheres Passwort-Management für Unternehmen',
    features: [
      'Ende-zu-Ende-Verschlüsselung',
      'Team-Sharing',
      'Zugriffskontrollen',
    ],
  },
  {
    name: 'ERP-System Idurar',
    icon: '🏢',
    description: 'Open-Source-ERP für Unternehmensverwaltung',
    features: [
      'Finanzverwaltung',
      'Lagermanagement',
      'Personalwesen',
    ],
  },
  {
    name: 'CRM Perfex',
    icon: '🤝',
    description: 'Leistungsstarke CRM-Lösung für Kundenmanagement',
    features: [
      'Kontaktverwaltung',
      'Verkaufspipeline',
      'E-Mail-Marketing',
    ],
  },
  {
    name: 'File-Transfer',
    icon: '📤',
    description: 'Sicherer Open-Source-Dateiversand',
    features: [
      'Verschlüsselter Transfer',
      'Große Dateien',
      'Link-Sharing',
    ],
  },
  {
    name: 'Nextcloud',
    icon: '☁️',
    description: 'Private Cloud-Lösung für Datei- und Datenmanagement',
    features: [
      'Dateisynchronisation',
      'Kollaboration',
      'Kalenderfunktion',
    ],
  },
];

export const kiAgentsData: KIAgent[] = [
  {
    name: 'Personal Assistant',
    icon: '👤',
    description: 'Automatisierte Unterstützung für Terminplanung, E-Mails, Aufgaben und persönliche Organisation.',
    features: [
      'Intelligente Kalenderverwaltung',
      'E-Mail-Priorisierung',
      'Task-Management',
    ],
    detailsLink: '#',
  },
  {
    name: 'Juristische KI-Agenten',
    icon: '⚖️',
    description: 'Spezialisierte KI für Anwaltskanzleien & rechtliche Prozesse.',
    features: [
      'Fallanalyse & Dokumentengenerierung',
      'Automatisierte Vertragsprüfung',
      'Rechtsauskunft & Mandantenkommunikation',
    ],
    detailsLink: '#',
  },
  {
    name: 'Unternehmensberater-KI',
    icon: '📊',
    description: 'Unterstützt Berater bei Datenanalysen, Strategieentwicklung & Prozessoptimierung.',
    detailsLink: '#',
  },
];

export const integrationCategoriesData: IntegrationCategory[] = [
  {
    name: 'Enterprise Systeme',
    icon: '🏢',
    items: [
      { name: 'SAP', logo: 'S' },
      { name: 'Microsoft Dynamics', logo: 'M' },
      { name: 'Oracle', logo: 'O' },
      { name: 'Salesforce', logo: 'S' },
    ],
    detailsLink: '#',
  },
  {
    name: 'Cloud Services',
    icon: '☁️',
    items: [
      { name: 'AWS', logo: 'A' },
      { name: 'Microsoft Azure', logo: 'M' },
      { name: 'Google Cloud', logo: 'G' },
      { name: 'Digital Ocean', logo: 'D' },
    ],
    detailsLink: '#',
  },
  {
    name: 'API Integrationen',
    icon: '🔌',
    items: [
      { name: 'Meta APIs', logo: 'M' },
      { name: 'Google APIs', logo: 'G' },
      { name: 'Fireflow', logo: 'F' },
      { name: 'Stripe', logo: 'S' },
    ],
    detailsLink: '#',
  },
];

export const integrationFeaturesData: IntegrationFeature[] = [
  {
    icon: '⚡',
    title: 'Schnelle Einrichtung',
    description: 'Einfache Integration durch vordefinierte Konnektoren und klare Dokumentation',
  },
  {
    icon: '🔒',
    title: 'Sicherheit & Compliance',
    description: 'Verschlüsselte Datenübertragung und Einhaltung aller Datenschutzstandards',
  },
  {
    icon: '🔧',
    title: 'Flexible Anpassung',
    description: 'Individuelle Konfigurationsmöglichkeiten für Ihre spezifischen Anforderungen',
  },
];

export const faqsData: FAQ[] = [
  {
    question: 'Welche KI-Agenten sind für mein Unternehmen geeignet?',
    answer: 'Die Auswahl hängt von Ihren spezifischen Anforderungen ab. Wir bieten Personal Assistant für allgemeine Aufgaben, Juristische KI-Agenten für Kanzleien und Unternehmensberater-KI für strategische Analysen. In einer unverbindlichen Beratung finden wir gemeinsam die beste Lösung für Ihr Unternehmen.',
  },
  {
    question: 'Sind Open-Source-Tools wirklich sicher?',
    answer: 'Ja, Open-Source-Tools können sehr sicher sein, da der Code öffentlich einsehbar ist und von der Community kontinuierlich überprüft wird. Wir implementieren zusätzliche Sicherheitsmaßnahmen wie Verschlüsselung, Zugriffskontrollen und regelmäßige Updates, um höchste Sicherheitsstandards zu gewährleisten.',
  },
  {
    question: 'Wie funktioniert die Integration in mein bestehendes System?',
    answer: 'Unsere Tools und KI-Agenten lassen sich nahtlos in Ihre bestehende IT-Landschaft integrieren. Wir nutzen vordefinierte Konnektoren für gängige Systeme wie SAP, Microsoft Dynamics, Salesforce und Cloud-Services. Die Integration erfolgt schrittweise mit minimaler Unterbrechung Ihrer Geschäftsprozesse.',
  },
  {
    question: 'Gibt es eine Testphase für die Tools?',
    answer: 'Ja, wir bieten eine Testphase an, in der Sie die Tools und KI-Agenten in Ihrer Umgebung ausprobieren können. So können Sie die Funktionalität und den Nutzen vor der finalen Implementierung evaluieren.',
  },
];
