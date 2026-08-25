import {
  PricingPlan,
  ExpertiseFeature,
  WhyDifferentFeature,
  SpecializedHosting,
  OneClickApp,
  AdditionalService,
  BlogPost,
  FAQ,
} from './types';

export const pricingPlansData: PricingPlan[] = [
  {
    name: 'Starter',
    originalPrice: '4,99€',
    currentPrice: '0,79€',
    features: [
      '1 Website',
      '10GB SSD Storage',
      '10 Mailboxen',
      '10 MySQL Datenbanken',
      'Unmetered Traffic',
      '1 Core CPU und 1 GB Memory',
    ],
    link: '#',
  },
  {
    name: 'Deluxe',
    originalPrice: '6,99€',
    currentPrice: '2,99€',
    features: [
      '5 Websites',
      '25GB SSD Storage',
      'Unlimited Mailboxen',
      'Unlimited MySQL Datenbanken',
      'Unmetered Traffic',
      '2 Core CPU und 2 GB Memory',
    ],
    link: '#',
  },
  {
    name: 'Ultimate',
    originalPrice: '12,99€',
    currentPrice: '6,99€',
    isPopular: true,
    features: [
      'Unlimited Websites',
      'Unlimited Storage',
      'Unlimited Mailboxen',
      'Unlimited MySQL Datenbanken',
      'Unmetered Traffic',
      '3 Core CPU und 3 GB Memory',
    ],
    link: '#',
  },
  {
    name: 'Maximum',
    originalPrice: '14,99€',
    currentPrice: '8,99€',
    features: [
      'Unlimited Websites',
      'Unlimited Storage',
      'Unlimited Mailboxen',
      'Unlimited MySQL Datenbanken',
      'Unmetered Traffic',
      '4 Core CPU und 4 GB Memory',
    ],
    link: '#',
  },
];

export const expertiseFeaturesData: ExpertiseFeature[] = [
  {
    icon: '🚀',
    title: 'Unmetered Traffic',
    description: 'Unbegrenzte Bandbreite für höchste Performance und Skalierbarkeit Ihrer Webseite.',
  },
  {
    icon: '⚙️',
    title: 'CyberPanel Control',
    description: 'Benutzerfreundliche Verwaltung aller Hosting-Funktionen über ein modernes Interface.',
  },
  {
    icon: '🖱️',
    title: 'One-Click Installation',
    description: 'Sofortiger Zugriff auf über 150 Apps und CMS-Systeme mit nur einem Klick.',
  },
  {
    icon: '🔒',
    title: 'SSL Zertifikate',
    description: 'Unbegrenzter Schutz durch kostenlose Let\'s Encrypt SSL-Zertifikate für alle Ihre Domains.',
  },
  {
    icon: '🔄',
    title: 'Kostenlose Migration',
    description: 'Wechseln Sie mühelos – unser Expertenteam übernimmt Ihre Migration kostenlos und professionell.',
  },
  {
    icon: '💾',
    title: 'Automatisierte Backups',
    description: 'Regelmäßige Backups sichern Ihre Daten automatisch und gewährleisten maximale Datensicherheit.',
  },
];

export const whyDifferentFeaturesData: WhyDifferentFeature[] = [
  {
    icon: '☁️',
    title: '100% Cloud Platform',
    description: 'Unser Cloud-Service vereint multiple Server zu einer leistungsstarken Hosting-Lösung. Entwickelt für maximale Skalierbarkeit, exzellenten Support, höchste Verfügbarkeit und Sicherheit - optimiert für beste Performance.',
  },
  {
    icon: '🔐',
    title: 'DSGVO Konform',
    description: 'Alle unsere Hosting-Lösungen entsprechen den strengen europäischen Datenschutzrichtlinien und garantieren die sichere Verarbeitung personenbezogener Daten.',
  },
  {
    icon: '🛡️',
    title: 'Sichere Cloud-Infrastruktur',
    description: 'Genießen Sie zuverlässige Sicherheit und professionelle Infrastruktur. Unsere Firewall schützt vor unerwünschtem Traffic, Malware und Phishing-Attacken. Skalieren Sie unkompliziert ohne Zusatzkosten.',
  },
];

export const oneClickAppsData: OneClickApp[] = [
  { name: 'WordPress' },
  { name: 'PrestaShop' },
];

export const specializedHostingData: SpecializedHosting[] = [
  {
    name: 'Software Hosting',
    icon: '💻',
  },
  {
    name: 'KI Hosting',
    icon: '🤖',
  },
];

export const additionalServicesData: AdditionalService[] = [
  {
    icon: '🚀',
    title: 'Performance Optimierung',
    description: 'Maximale Geschwindigkeit für Ihre Website',
  },
  {
    icon: '🔒',
    title: 'SSL Zertifikate',
    description: 'Sichere Verschlüsselung für Ihre Daten',
  },
  {
    icon: '💾',
    title: 'Backup Service',
    description: 'Tägliche Sicherungen Ihrer Daten',
  },
  {
    icon: '🆘',
    title: '24/7 Support',
    description: 'Rund um die Uhr für Sie da',
  },
  {
    icon: '⚙️',
    title: 'Control Panel',
    description: 'Einfache Verwaltung Ihrer Dienste',
  },
  {
    icon: '🖱️',
    title: 'One-Click Installer',
    description: 'Schnelle Installation von Anwendungen',
  },
  {
    icon: '🔄',
    title: 'Kostenlose Migration',
    description: 'Umzugsservice für Ihre Website',
  },
  {
    icon: '🔐',
    title: 'DSGVO konform',
    description: 'Hosting nach deutschen Standards',
  },
];

export const hostingInsightsData: BlogPost[] = [
  {
    id: 'wordpress-performance',
    title: 'WordPress Performance Optimierung',
    subtitle: 'WordPress',
    description: 'Lernen Sie die besten Techniken zur Beschleunigung Ihrer WordPress-Website',
    image: '/images/blog/wordpress-performance.jpg',
    category: {
      name: 'WordPress',
      icon: '📝',
    },
    date: '2024-03-15',
    readTime: '6 min',
    link: '/blog/wordpress-performance',
  },
  {
    id: 'cloud-vs-traditional',
    title: 'Cloud Hosting vs. Traditional Hosting',
    subtitle: 'Cloud',
    description: 'Ein detaillierter Vergleich der verschiedenen Hosting-Arten',
    image: '/images/blog/cloud-hosting.jpg',
    category: {
      name: 'Cloud',
      icon: '☁️',
    },
    date: '2024-03-12',
    readTime: '5 min',
    link: '/blog/cloud-vs-traditional',
  },
  {
    id: 'hosting-security',
    title: 'Sicherheit im Webhosting',
    subtitle: 'Security',
    description: 'So schützen Sie Ihre Website vor Cyber-Bedrohungen',
    image: '/images/blog/hosting-security.jpg',
    category: {
      name: 'Security',
      icon: '🔒',
    },
    date: '2024-03-10',
    readTime: '7 min',
    link: '/blog/hosting-security',
  },
];

export const faqsData: FAQ[] = [
  {
    question: 'Was ist der Unterschied zwischen Shared und Cloud Hosting?',
    answer: 'Shared Hosting teilt sich Server-Ressourcen mit anderen Websites, während Cloud Hosting mehrere Server zu einer leistungsstarken Infrastruktur verbindet. Cloud Hosting bietet bessere Skalierbarkeit, höhere Verfügbarkeit und bessere Performance, da Ressourcen dynamisch zugewiesen werden können.',
  },
  {
    question: 'Wie funktioniert die WordPress-Installation?',
    answer: 'Mit unserem One-Click-Installer können Sie WordPress in wenigen Minuten installieren. Wählen Sie einfach WordPress aus dem Installer-Menü, geben Sie die gewünschten Details ein, und die Installation erfolgt automatisch. Keine technischen Kenntnisse erforderlich!',
  },
  {
    question: 'Bieten Sie eine Uptime-Garantie?',
    answer: 'Ja, wir garantieren eine Uptime von 99,9%. Unsere Cloud-Infrastruktur mit redundanten Systemen und automatischem Failover sorgt für maximale Verfügbarkeit Ihrer Website.',
  },
  {
    question: 'Wie funktioniert das Backup-System?',
    answer: 'Wir führen täglich automatische Backups Ihrer Daten durch. Diese werden sicher auf separaten Servern gespeichert. Sie können jederzeit über das Control Panel auf Ihre Backups zugreifen und bei Bedarf eine Wiederherstellung anfordern.',
  },
];
