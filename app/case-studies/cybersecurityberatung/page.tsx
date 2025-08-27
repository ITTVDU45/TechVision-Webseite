import React from 'react';
import CaseStudyTemplate from '../../components/CaseStudyTemplate';
import { caseStudies } from '../../data/caseStudies';

export default function CybersecurityPage() {
  const data = caseStudies['cybersecurityberatung'];
  return <CaseStudyTemplate data={data} />;
}
