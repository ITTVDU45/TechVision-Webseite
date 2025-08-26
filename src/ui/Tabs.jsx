import React, { useState } from 'react';

export function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex justify-center mb-12">
        <div className="inline-flex rounded-lg border border-white/10 p-1 bg-neutral-900/50">
          {tabs.map((tab, idx) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(idx)}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === idx
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>
      {tabs[activeTab].content}
    </div>
  );
} 