import {
  InfrastructureSolution,
  PlanningFeature,
  Benefit,
  BlogPost,
  FAQ,
} from './types';

export const infrastructureSolutionsData: InfrastructureSolution[] = [
  {
    name: 'NAS Systeme',
    icon: '💾',
    description: 'Effiziente Speicherlösungen zur zentralen Verwaltung und schnellen Bereitstellung Ihrer Daten.',
  },
  {
    name: 'Microsoft Cloud',
    icon: '☁️',
    description: 'Skalierbare Cloud-Dienste, die Flexibilität und Sicherheit für Ihre Unternehmensanwendungen bieten.',
  },
  {
    name: 'Windows Server',
    icon: '🖥️',
    description: 'Leistungsstarke Serverlösungen für eine stabile und zuverlässige IT-Infrastruktur.',
  },
  {
    name: 'File Server',
    icon: '📁',
    description: 'Schneller und sicherer Zugriff auf Ihre Unternehmensdateien – ideal für kollaboratives Arbeiten.',
  },
  {
    name: 'Backup Server',
    icon: '🔄',
    description: 'Automatisierte Backups schützen Ihre kritischen Daten und ermöglichen eine schnelle Wiederherstellung im Notfall.',
  },
  {
    name: 'Proxmox Server',
    icon: '🔧',
    description: 'Virtualisierungslösungen, die eine optimale Nutzung Ihrer IT-Ressourcen ermöglichen.',
  },
  {
    name: 'Overlay Network',
    icon: '🌐',
    description: 'Flexible und sichere Netzwerkverbindungen, die moderne Kommunikationsprozesse unterstützen.',
  },
  {
    name: 'Firewall',
    icon: '🛡️',
    description: 'Umfassender Schutz Ihrer IT-Infrastruktur vor unbefugtem Zugriff und Cyberbedrohungen.',
  },
  {
    name: 'Computer',
    icon: '💻',
    description: 'Moderne Arbeitsplatzlösungen, individuell an Ihre Anforderungen angepasst.',
  },
];

export const planningFeaturesData: PlanningFeature[] = [
  {
    icon: '⚡',
    title: 'Optimierte Performance',
    description: 'Durch den Einsatz modernster Virtualisierungstechnologien maximieren wir die Ressourcennutzung und garantieren eine hohe Verfügbarkeit sowie schnelle Reaktionszeiten Ihrer IT-Infrastruktur.',
  },
  {
    icon: '💰',
    title: 'Kosteneffizienz',
    description: 'Flexible Skalierung und automatisierte Prozesse reduzieren Investitions- und Betriebskosten, indem Hardware optimal ausgelastet und zentral verwaltet wird.',
  },
  {
    icon: '🔒',
    title: 'Erhöhte Sicherheit',
    description: 'Integrierte Sicherheitsmechanismen sowie regelmäßige, automatisierte Backups schützen Ihre Daten und sorgen für einen störungsfreien und sicheren Betrieb.',
  },
];

export const benefitsData: Benefit[] = [
  {
    icon: '🔒',
    title: 'Höchste Sicherheit',
    description: 'Modernste Sicherheitsstandards und regelmäßige Updates schützen Ihre IT-Infrastruktur',
  },
  {
    icon: '🛟',
    title: '24/7 Support',
    description: 'Unser Expertenteam steht Ihnen rund um die Uhr zur Verfügung',
  },
  {
    icon: '📈',
    title: 'Skalierbarkeit',
    description: 'Flexible Lösungen, die mit Ihrem Unternehmen mitwachsen',
  },
  {
    icon: '💰',
    title: 'Kosteneffizienz',
    description: 'Optimierte Ressourcennutzung und transparente Kostenstruktur',
  },
  {
    icon: '🚀',
    title: 'Modernste Technologien',
    description: 'Einsatz zukunftssicherer und innovativer Technologien',
  },
  {
    icon: '🤝',
    title: 'Individuelle Beratung',
    description: 'Maßgeschneiderte Lösungen für Ihre spezifischen Anforderungen',
  },
];

export const infrastructureNewsData: BlogPost[] = [
  {
    id: 'cloud-infrastructure-trends',
    title: 'Cloud-Infrastruktur Trends 2024',
    subtitle: 'Cloud Computing',
    description: 'Die wichtigsten Entwicklungen im Überblick und wie sie Ihr Unternehmen beeinflussen.',
    image: '/images/blog/cloud-trends.jpg',
    category: {
      name: 'Cloud Computing',
      icon: '☁️',
    },
    date: '15. März 2024',
    readTime: '5 min',
    link: '/blog/cloud-infrastructure-trends',
  },
  {
    id: 'hybrid-cloud',
    title: 'Hybrid Cloud Lösungen',
    subtitle: 'Infrastructure',
    description: 'On-Premise meets Cloud – die perfekte Balance für moderne Unternehmen.',
    image: '/images/blog/hybrid-cloud.jpg',
    category: {
      name: 'Infrastructure',
      icon: '🏗️',
    },
    date: '12. März 2024',
    readTime: '6 min',
    link: '/blog/hybrid-cloud',
  },
  {
    id: 'sustainable-it',
    title: 'Nachhaltige IT-Infrastruktur',
    subtitle: 'Nachhaltigkeit',
    description: 'Green IT im Fokus – wie Sie Ihre IT-Infrastruktur umweltfreundlich gestalten.',
    image: '/images/blog/sustainable-it.jpg',
    category: {
      name: 'Nachhaltigkeit',
      icon: '🌱',
    },
    date: '10. März 2024',
    readTime: '7 min',
    link: '/blog/sustainable-it',
  },
];

export const faqsData: FAQ[] = [
  {
    question: 'Wie lange dauert die Implementierung einer neuen IT-Infrastruktur?',
    answer: 'Die Dauer der Implementierung hängt von der Komplexität und dem Umfang Ihrer IT-Infrastruktur ab. Einfache Lösungen können bereits nach wenigen Wochen umgesetzt werden, während komplexere Projekte mehrere Monate in Anspruch nehmen können. In einer unverbindlichen Beratung erstellen wir einen detaillierten Zeitplan für Ihr Projekt.',
  },
  {
    question: 'Welche Wartungsleistungen sind im Service enthalten?',
    answer: 'Unser Service umfasst regelmäßige Updates, Sicherheitspatches, Performance-Monitoring, Backup-Überwachung und 24/7 Support. Wir passen die Wartungsleistungen individuell an Ihre Anforderungen an und erstellen ein maßgeschneidertes Service-Paket für Ihr Unternehmen.',
  },
  {
    question: 'Wie wird die Datensicherheit gewährleistet?',
    answer: 'Wir implementieren mehrschichtige Sicherheitsmaßnahmen, einschließlich Firewalls, Verschlüsselung, regelmäßiger Sicherheitsupdates und automatisierter Backups. Zusätzlich führen wir regelmäßige Sicherheitsaudits durch und halten uns an die höchsten Datenschutzstandards (DSGVO).',
  },
];
