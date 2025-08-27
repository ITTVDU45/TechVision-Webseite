import React from 'react';
import CaseStudyTemplate from '../../components/CaseStudyTemplate';
import { caseStudies } from '../../data/caseStudies';

export default function CMSWebentwicklungPage() {
  const data = caseStudies['cms-webentwicklung'];
  return <CaseStudyTemplate data={data} />;
}


