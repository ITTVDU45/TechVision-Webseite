import React from 'react';
import { motion } from 'framer-motion';

const CaseStudyTemplate = ({ 
  title, 
  subtitle, 
  companyDescription, 
  projectGoals, 
  preCollaboration, 
  postCollaboration, 
  techStack, 
  benefits, 
  additionalCaseStudies,
  challenges,
  keywords,
  client,
  image
}) => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden bg-black flex items-center">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-gradient bg-[length:200%_200%]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        </div>
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="text-white">{title} – </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600">
                {subtitle}
              </span>
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Hauptinhalt mit Sidebar */}
      <div className="flex">
        <main className="w-3/4 p-6">
          {/* Unternehmensbeschreibung */}
          <section className="mb-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">Unternehmensbeschreibung</h2>
                <p className="text-gray-400">{companyDescription}</p>
              </div>
              <div className="md:w-1/2">
                <img src="/path/to/image.jpg" alt="Unternehmensbild" className="w-full h-auto rounded-lg" />
              </div>
            </div>
          </section>

          {/* Projektziele */}
          <section className="mb-8">
            <div className="flex flex-col md:flex-row-reverse items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">Projektziele</h2>
                <p className="text-gray-400">{projectGoals}</p>
              </div>
              <div className="md:w-1/2">
                <img src="/path/to/image.jpg" alt="Projektziele Bild" className="w-full h-auto rounded-lg" />
              </div>
            </div>
          </section>

          {/* Situation vor der Zusammenarbeit */}
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">Situation vor der Zusammenarbeit</h2>
                <p className="text-gray-400">{preCollaboration}</p>
              </div>
              <div>
                <img src="/path/to/image.jpg" alt="Vorher Bild" className="w-full h-auto rounded-lg" />
              </div>
            </div>
          </section>

          {/* Nach unserer Zusammenarbeit */}
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img src="/path/to/image.jpg" alt="Nachher Bild" className="w-full h-auto rounded-lg" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">Nach unserer Zusammenarbeit</h2>
                <p className="text-gray-400">{postCollaboration}</p>
              </div>
            </div>
          </section>

          {/* Weitere Case Studies */}
          <section className="py-16 bg-black">
            <h2 className="text-3xl font-bold mb-4">Weitere Case Studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {additionalCaseStudies.map((study, index) => (
                <div key={index} className="bg-gray-900 p-4 rounded-lg">
                  <h3 className="text-xl font-bold">{study.title}</h3>
                  <p className="text-gray-400">{study.description}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Rechte Seitenleiste */}
        <aside className="w-1/4 bg-gray-900 p-6">
          <h2 className="text-2xl font-bold mb-4">Projektzusammenfassung</h2>
          <ul className="text-gray-400 space-y-2">
            <li><strong>Techstack:</strong> {techStack}</li>
            <li><strong>Herausforderungen:</strong> {challenges}</li>
            <li><strong>Ziele:</strong> {projectGoals}</li>
            <li><strong>Schlagwörter:</strong> {keywords.join(', ')}</li>
            <li><strong>Kunde:</strong> {client}</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default CaseStudyTemplate; 