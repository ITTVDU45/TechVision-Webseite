import React from 'react';
import CaseStudyTemplate from '../../components/CaseStudyTemplate';
import { caseStudies } from '../../data/caseStudies';

export default function KITransformationPage() {
  const data = caseStudies['ki-transformation'];
  return <CaseStudyTemplate data={data} />;
}


