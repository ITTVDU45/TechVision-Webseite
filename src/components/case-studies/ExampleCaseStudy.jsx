import React from 'react';
import CaseStudyTemplate from '../templates/CaseStudyTemplate';

const ExampleCaseStudy = () => {
  const title = "Implementierung eines KI-gestützten CRM-Systems";
  const subtitle = "Effizienzsteigerung bei A Plus Gerüstbau";
  const companyDescription = "A Plus Gerüstbau GmbH aus Duisburg ist ein Gerüstbauspezialist, der Bauprojekte mit maßgeschneiderten Gerüstlösungen beliefert.";
  const projectGoals = "Ziel war es, die Angebotserstellung und das Projektmanagement zu digitalisieren und zu automatisieren.";
  const preCollaboration = "Vor Einführung des neuen CRM-Systems waren viele Prozesse manuell oder papierbasiert, was zeitaufwendig und fehleranfällig war.";
  const postCollaboration = "Nach der Implementierung des CRM-Systems wurden zentrale Abläufe automatisiert, was zu einer signifikanten Effizienzsteigerung führte.";
  const techStack = "React, KI-Agenten, Automatisierungstechnologien";
  const benefits = "Signifikante Effizienzsteigerung, umfassende Automatisierung, hohe Benutzerfreundlichkeit";
  const additionalCaseStudies = [
    { title: "E-Commerce Platform", description: "Entwicklung eines modernen Online-Shops..." },
    { title: "Corporate Website", description: "Responsive Unternehmenswebsite mit React..." }
  ];

  return (
    <CaseStudyTemplate
      title={title}
      subtitle={subtitle}
      companyDescription={companyDescription}
      projectGoals={projectGoals}
      preCollaboration={preCollaboration}
      postCollaboration={postCollaboration}
      techStack={techStack}
      benefits={benefits}
      additionalCaseStudies={additionalCaseStudies}
    />
  );
};

export default ExampleCaseStudy; 