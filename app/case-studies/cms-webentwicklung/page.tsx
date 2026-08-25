import React from 'react';
import type { Metadata } from 'next';
import CaseStudyTemplate from '../../components/CaseStudyTemplate';
import { caseStudies } from '../../data/caseStudies';

export const metadata: Metadata = { title: 'CMS-Webentwicklung', description: 'Referenzprojekt zur Entwicklung einer modernen Website mit Headless CMS und Next.js.' };

export default function CMSWebentwicklungPage() {
  const data = caseStudies['cms-webentwicklung'];
  return <CaseStudyTemplate data={data} />;
}


