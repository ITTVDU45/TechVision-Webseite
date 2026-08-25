import React from 'react';
import type { Metadata } from 'next';
import CaseStudyTemplate from '../../components/CaseStudyTemplate';
import { caseStudies } from '../../data/caseStudies';

export const metadata: Metadata = { title: 'KI-Transformation', description: 'Referenzprojekt zur strategischen Einführung von KI in bestehende Geschäftsprozesse.' };

export default function KITransformationPage() {
  const data = caseStudies['ki-transformation'];
  return <CaseStudyTemplate data={data} />;
}


