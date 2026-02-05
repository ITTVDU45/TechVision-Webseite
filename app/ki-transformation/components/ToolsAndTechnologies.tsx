"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tool } from "./types";

interface ToolsAndTechnologiesProps {
  title?: string;
  description?: string;
  tools?: Tool[];
}

export default function ToolsAndTechnologies({
  title = "Tools & Technologien für KI-Transformation",
  description = "Modernste Technologien und APIs für Ihre digitale Transformation",
  tools = [],
}: ToolsAndTechnologiesProps) {
  const [activeTab, setActiveTab] = useState<string>("");

  // Gruppiere Tools nach Kategorien
  const groupedTools = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, Tool[]>);

  const categories = Object.keys(groupedTools);

  // Setze ersten Tab als aktiv, wenn noch keiner gesetzt ist
  React.useEffect(() => {
    if (categories.length > 0 && !activeTab) {
      setActiveTab(categories[0]);
    }
  }, [categories, activeTab]);

  return (
    <section className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            {title.includes("KI-Transformation") ? (
              <>
                {title.split("KI-Transformation")[0]}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
                  KI-Transformation
                </span>
              </>
            ) : (
              title
            )}
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">{description}</p>
        </motion.div>

        {/* Tools mit Tabs */}
        {tools.length > 0 && (
          <div className="max-w-7xl mx-auto mb-16">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                    activeTab === category
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/50"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab && groupedTools[activeTab] && (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {groupedTools[activeTab].map((tool, toolIndex) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 * toolIndex }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      className={`bg-gradient-to-br ${tool.color} backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-opacity-60 transition-all duration-300 cursor-pointer group`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-3xl flex-shrink-0">{tool.icon}</div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                            {tool.name}
                          </h4>
                          <p className="text-gray-300 text-sm leading-relaxed">{tool.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
}
