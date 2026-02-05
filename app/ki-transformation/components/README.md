# KI-Transformation Komponenten

Diese Komponenten sind modular, dynamisch und wiederverwendbar aufgebaut.

## Struktur

```
app/ki-transformation/components/
├── types.ts                    # TypeScript Typen
├── data.ts                     # Statische Daten
├── index.ts                     # Export-Index
├── HeroSection.tsx              # Hero-Sektion
├── UseCasesCarousel.tsx         # Karussell mit Use Cases
├── WhatIsKITransformation.tsx    # "Was bedeutet KI-Transformation?"
├── WhyIntegrateAI.tsx           # "Warum KI integrieren?"
├── ToolsAndTechnologies.tsx     # Tools & Technologien
├── ImplementationProcess.tsx   # Implementierungsprozess
├── KIInsightsTrends.tsx         # KI-Insights & Trends
└── FAQSection.tsx               # FAQ-Sektion
```

## Verwendung

### Einfache Verwendung mit Standard-Daten

```tsx
import {
  HeroSection,
  UseCasesCarousel,
  WhatIsKITransformation,
  WhyIntegrateAI,
  ToolsAndTechnologies,
  ImplementationProcess,
  KIInsightsTrends,
  FAQSection,
  useCasesData,
  whatIsFeatures,
  whyIntegrateFeatures,
  processSteps,
  faqsData,
} from "../ki-transformation/components";

export default function MyPage() {
  return (
    <>
      <HeroSection />
      <UseCasesCarousel useCases={useCasesData} />
      <WhatIsKITransformation features={whatIsFeatures} />
      <WhyIntegrateAI features={whyIntegrateFeatures} />
      <ToolsAndTechnologies />
      <ImplementationProcess steps={processSteps} />
      <KIInsightsTrends />
      <FAQSection faqs={faqsData} />
    </>
  );
}
```

### Custom Props verwenden

Alle Komponenten akzeptieren Props für vollständige Anpassung:

```tsx
<HeroSection
  title="Mein Custom Titel"
  subtitle="Meine Custom Beschreibung"
  ctaText="Jetzt starten"
  ctaLink="/custom-link"
/>

<WhatIsKITransformation
  title="Custom Titel"
  description="Custom Beschreibung"
  features={[
    {
      icon: IconCustom,
      title: "Custom Feature",
      description: "Beschreibung",
      color: "from-blue-500/20 to-blue-600/20",
      iconColor: "text-blue-400",
    },
  ]}
/>
```

## Komponenten-Props

### HeroSection
- `title?: string` - Haupttitel
- `subtitle?: string` - Untertitel
- `ctaText?: string` - CTA-Button Text
- `ctaLink?: string` - CTA-Button Link

### UseCasesCarousel
- `useCases: UseCase[]` - Array von Use Cases
- `autoSlideInterval?: number` - Auto-Slide Intervall in ms (default: 5000)

### WhatIsKITransformation
- `title?: string` - Titel
- `description?: string` - Beschreibung
- `features: FeatureCard[]` - Array von Features

### WhyIntegrateAI
- `badge?: string` - Badge Text
- `title?: string` - Titel
- `description?: string` - Beschreibung
- `features: FeatureCard[]` - Array von Features
- `ctaText?: string` - CTA-Button Text
- `ctaLink?: string` - CTA-Button Link

### ToolsAndTechnologies
- `title?: string` - Titel
- `description?: string` - Beschreibung
- `integrationTitle?: string` - Integration Titel
- `integrationDescription?: string` - Integration Beschreibung

### ImplementationProcess
- `title?: string` - Titel
- `description?: string` - Beschreibung
- `steps: ProcessStep[]` - Array von Prozess-Schritten
- `ctaText?: string` - CTA-Button Text
- `ctaLink?: string` - CTA-Button Link

### KIInsightsTrends
- `title?: string` - Titel
- `description?: string` - Beschreibung

### FAQSection
- `title?: string` - Titel
- `description?: string` - Beschreibung
- `faqs: FAQ[]` - Array von FAQs

## Typen

### UseCase
```typescript
interface UseCase {
  title: string;
  description: string;
  example?: string;
  icon?: string;
  gradient?: string;
  stats?: { value: string; label: string }[];
}
```

### FeatureCard
```typescript
interface FeatureCard {
  icon: Icon;
  title: string;
  description: string;
  color: string;
  iconColor: string;
}
```

### ProcessStep
```typescript
interface ProcessStep {
  number: string;
  icon: Icon;
  title: string;
  subtitle: string;
  items: string[];
  color: string;
  iconColor: string;
}
```

### FAQ
```typescript
interface FAQ {
  question: string;
  answer: string;
}
```

## Daten anpassen

Alle Daten können in `data.ts` angepasst werden. Die Komponenten verwenden diese Daten standardmäßig, können aber auch mit eigenen Props überschrieben werden.

## Wiederverwendbarkeit

Alle Komponenten sind vollständig wiederverwendbar und können in anderen Seiten verwendet werden:

```tsx
// In einer anderen Seite
import { HeroSection, useCasesData } from "../ki-transformation/components";

export default function OtherPage() {
  return (
    <>
      <HeroSection title="Anderer Titel" />
      <UseCasesCarousel useCases={useCasesData} />
    </>
  );
}
```
