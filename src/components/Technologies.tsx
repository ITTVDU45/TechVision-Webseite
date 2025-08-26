import React from 'react';

const Technologies: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
            <span className="text-white">Unsere </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600">
              Technologien
            </span>
          </h1>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            Wir nutzen modernste Technologien und Frameworks, um innovative und skalierbare Lösungen zu entwickeln.
          </p>
          
          {/* Technologie-Kategorien */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Frontend */}
            <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all">
              <h3 className="text-2xl font-bold text-white mb-4">Frontend</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• React 19 & Next.js 15</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Framer Motion</li>
              </ul>
            </div>
            
            {/* Backend */}
            <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all">
              <h3 className="text-2xl font-bold text-white mb-4">Backend</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Node.js</li>
                <li>• Python</li>
                <li>• MongoDB</li>
                <li>• REST APIs</li>
              </ul>
            </div>
            
            {/* Cloud & DevOps */}
            <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all">
              <h3 className="text-2xl font-bold text-white mb-4">Cloud & DevOps</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• AWS / Azure</li>
                <li>• Docker</li>
                <li>• CI/CD</li>
                <li>• Kubernetes</li>
              </ul>
            </div>
            
            {/* KI & Machine Learning */}
            <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all">
              <h3 className="text-2xl font-bold text-white mb-4">KI & ML</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• TensorFlow</li>
                <li>• PyTorch</li>
                <li>• OpenAI API</li>
                <li>• LangChain</li>
              </ul>
            </div>
            
            {/* Mobile */}
            <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all">
              <h3 className="text-2xl font-bold text-white mb-4">Mobile</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• React Native</li>
                <li>• Flutter</li>
                <li>• Native iOS/Android</li>
                <li>• PWA</li>
              </ul>
            </div>
            
            {/* Datenbanken */}
            <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all">
              <h3 className="text-2xl font-bold text-white mb-4">Datenbanken</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• PostgreSQL</li>
                <li>• MySQL</li>
                <li>• Redis</li>
                <li>• Elasticsearch</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technologies;
