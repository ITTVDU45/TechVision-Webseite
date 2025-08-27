export type FAQ = {
  question: string;
  answer: string;
  category?: string;
};

export const faqs: FAQ[] = [
  // KI Transformation
  {
    question: "Welche Kosten sind mit einer KI-Transformation verbunden?",
    answer: "Die Kosten einer KI-Transformation variieren je nach Projektumfang und Komplexität. Typischerweise setzen sich die Kosten aus mehreren Komponenten zusammen: Initial-Analyse (2.000-5.000€), Implementierung (10.000-50.000€), Schulungen (3.000-8.000€) und laufende Wartung (500-2.000€ monatlich). Wir bieten flexible Finanzierungsmodelle und unterstützen Sie bei der Beantragung von Fördermitteln, die bis zu 50% der Projektkosten decken können.",
    category: "ki_transformation"
  },
  // ... (rest der FAQs wird 1:1 übernommen)
];

export default faqs;


