import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy loading für alle Komponenten mit Three.js
const Home = React.lazy(() => import('./Home'));
const Blog = React.lazy(() => import('./Blog'));
const Contact = React.lazy(() => import('./Contact'));
const KITransformation = React.lazy(() => import('./KITransformation'));
const Cybersecurity = React.lazy(() => import('./Cybersecurity'));
const Tools = React.lazy(() => import('./Tools'));
const WebHosting = React.lazy(() => import('./WebHosting'));
const ITInfrastructure = React.lazy(() => import('./ITInfrastructure'));
const WebDevelopment = React.lazy(() => import('./WebDevelopment'));
const CaseStudies = React.lazy(() => import('./CaseStudies'));
const FAQ = React.lazy(() => import('./FAQ'));
const SoftwareDevelopment = React.lazy(() => import('./SoftwareDevelopment'));
const WorkflowAutomation = React.lazy(() => import('./WorkflowAutomation'));
const Impressum = React.lazy(() => import('./Impressum'));
const Datenschutz = React.lazy(() => import('./Datenschutz'));
const WebentwicklungLanding = React.lazy(() => import('./landingpages/WebentwicklungLanding'));

const ThreeJSComponents = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ki-transformation" element={<KITransformation />} />
      <Route path="/cybersecurity" element={<Cybersecurity />} />
      <Route path="/tools" element={<Tools />} />
      <Route path="/webhosting" element={<WebHosting />} />
      <Route path="/web-development" element={<WebDevelopment />} />
      <Route path="/it-infrastructure" element={<ITInfrastructure />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/case-studies" element={<CaseStudies />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/software-development" element={<SoftwareDevelopment />} />
      <Route path="/workflow-automation" element={<WorkflowAutomation />} />
      <Route path="/impressum" element={<Impressum />} />
      <Route path="/datenschutz" element={<Datenschutz />} />
      <Route path="/webentwicklung" element={<WebentwicklungLanding />} />
    </Routes>
  );
};

export default ThreeJSComponents; 