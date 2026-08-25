import {
  Expertise,
  CaseStudy,
  Testimonial,
  ProcessStep,
  BlogPost,
  FAQ,
} from './types';

export const expertiseData: Expertise[] = [
  {
    name: 'Frontend Entwicklung',
    icon: '💻',
  },
  {
    name: 'Backend Systeme',
    icon: '⚙️',
  },
  {
    name: 'Datenbanken',
    icon: '🗄️',
  },
  {
    name: 'Design - UI/UX',
    icon: '🎨',
  },
  {
    name: 'Security',
    icon: '🔒',
  },
];

export const caseStudiesData: CaseStudy[] = [
  {
    title: 'E-Commerce Platform',
    description: 'Entwicklung eines modernen Online-Shops mit Next.js und Shopify',
    metrics: [
      { label: 'Umsatzsteigerung', value: '150%' },
      { label: 'Schnellere Ladezeit', value: '65%' },
    ],
    link: '#',
  },
  {
    title: 'Corporate Website',
    description: 'Responsive Unternehmenswebsite mit React und Tailwind CSS',
    metrics: [
      { label: 'Mehr Conversions', value: '40%' },
      { label: 'Mobile Traffic', value: '85%' },
    ],
    link: '#',
  },
  {
    title: 'Web Application',
    description: 'Progressive Web App für Projektmanagement',
    metrics: [
      { label: 'Effizienzsteigerung', value: '30%' },
      { label: 'Schnellere Prozesse', value: '50%' },
    ],
    link: '#',
  },
];

export const testimonialsData: Testimonial[] = [
  {
    name: 'Marie Schmidt',
    company: 'TechRetail GmbH',
    quote: 'Die neue Plattform hat unseren Online-Umsatz verdoppelt.',
  },
  {
    name: 'Thomas Weber',
    company: 'InnovateTech AG',
    quote: 'Perfekte Integration von KI in unsere Systeme.',
  },
  {
    name: 'Laura Meyer',
    company: 'SmartSolutions SE',
    quote: 'Rekordzeit bei der IoT-Plattform-Entwicklung.',
  },
  {
    name: 'Michael Bauer',
    company: 'ProcessPro Solutions',
    quote: '80% Effizienzsteigerung durch neue Webanwendung.',
  },
  {
    name: 'Sandra Klein',
    company: 'DataVision',
    quote: 'Endlich Echtzeitdaten und KI-gestützte Prognosen.',
  },
  {
    name: 'Lisa Thompson',
    company: 'FutureNet',
    quote: 'Skalierbarkeit und Performance sind beeindruckend.',
  },
];

export const processStepsData: ProcessStep[] = [
  {
    number: '01',
    icon: '🎯',
    title: 'Bedarfsanalyse',
    description: 'Sie haben erkannt: Eine moderne Website ist der Schlüssel zum Erfolg. Wir analysieren gemeinsam Ihre Anforderungen.',
  },
  {
    number: '02',
    icon: '💡',
    title: 'Konzeption',
    description: 'In einem persönlichen Gespräch entwickeln wir die perfekte Strategie für Ihren Web-Auftritt.',
  },
  {
    number: '03',
    icon: '⚡',
    title: 'Entwicklung',
    description: 'Unser Team setzt Ihre Website mit modernsten Technologien pixel-perfekt um.',
  },
  {
    number: '04',
    icon: '🚀',
    title: 'Launch & Support',
    description: 'Nach dem Go-Live bleiben wir an Ihrer Seite und sorgen für kontinuierliche Optimierung.',
  },
];

export const webDevelopmentInsightsData: BlogPost[] = [
  {
    id: 'modern-web-development',
    title: 'Modern Web Development',
    subtitle: 'Development',
    description: 'Die neuesten Trends in der Webentwicklung mit React und Next.js',
    image: '/images/blog/web-development.jpg',
    category: {
      name: 'Development',
      icon: '💻',
    },
    date: '2024-03-20',
    readTime: '6 min',
    link: '/blog/modern-web-development',
  },
  {
    id: 'performance-optimization',
    title: 'Performance Optimierung',
    subtitle: 'Optimierung',
    description: 'Strategien zur Verbesserung der Website-Performance und Core Web Vitals',
    image: '/images/blog/performance.jpg',
    category: {
      name: 'Optimierung',
      icon: '⚡',
    },
    date: '2024-03-18',
    readTime: '5 min',
    link: '/blog/performance-optimization',
  },
  {
    id: 'responsive-design-2024',
    title: 'Responsive Design 2024',
    subtitle: 'Design',
    description: 'Mobile-First Ansätze und moderne CSS-Techniken für responsive Websites',
    image: '/images/blog/responsive-design.jpg',
    category: {
      name: 'Design',
      icon: '🎨',
    },
    date: '2024-03-15',
    readTime: '7 min',
    link: '/blog/responsive-design-2024',
  },
];

export const faqsData: FAQ[] = [
  {
    question: 'Wie lange dauert die Entwicklung einer Website?',
    answer: 'Die Entwicklungsdauer hängt von der Komplexität und dem Umfang Ihrer Website ab. Einfache Unternehmenswebsites können bereits nach 4-6 Wochen fertiggestellt sein, während komplexere Webanwendungen mehrere Monate in Anspruch nehmen können. In einer unverbindlichen Beratung erstellen wir einen detaillierten Zeitplan für Ihr Projekt.',
  },
  {
    question: 'Welche Technologien verwenden Sie?',
    answer: 'Wir setzen auf moderne, bewährte Technologien wie React, Next.js, TypeScript, Node.js und moderne CSS-Frameworks. Für Datenbanken nutzen wir PostgreSQL, MongoDB und andere skalierbare Lösungen. Wir wählen die Technologie basierend auf Ihren spezifischen Anforderungen aus.',
  },
  {
    question: 'Wie ist der Ablauf eines Webprojekts?',
    answer: 'Unser Prozess umfasst vier Hauptphasen: 1) Bedarfsanalyse – wir analysieren Ihre Anforderungen, 2) Konzeption – Entwicklung der Strategie, 3) Entwicklung – Umsetzung mit modernsten Technologien, 4) Launch & Support – Go-Live und kontinuierliche Optimierung.',
  },
  {
    question: 'Ist die Website auch für mobile Geräte optimiert?',
    answer: 'Ja, alle unsere Websites werden nach dem Mobile-First-Prinzip entwickelt und sind vollständig responsive. Wir testen auf verschiedenen Geräten und Bildschirmgrößen, um eine optimale Benutzererfahrung auf allen Endgeräten zu gewährleisten.',
  },
  {
    question: 'Welche Wartung und Support erhalte ich nach dem Launch?',
    answer: 'Wir bieten verschiedene Support-Pakete an, die Updates, Sicherheitspatches, Performance-Monitoring und technischen Support umfassen. Die Wartungsleistungen können individuell an Ihre Bedürfnisse angepasst werden.',
  },
];
