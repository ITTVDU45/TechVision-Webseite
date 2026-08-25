import React from 'react';
import type { Metadata } from 'next';
import CaseStudyTemplate from '../../components/CaseStudyTemplate';
import { caseStudies } from '../../data/caseStudies';

export const metadata: Metadata = { title: 'Cybersecurityberatung', description: 'Referenzprojekt zur strukturierten Analyse und Verbesserung der IT-Sicherheit.' };

export default function CybersecurityPage() {
  const data = caseStudies['cybersecurityberatung'];
  return <CaseStudyTemplate data={data} />;
}
