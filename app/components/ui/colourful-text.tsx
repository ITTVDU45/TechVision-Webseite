"use client";
import React from 'react';
// Re-export existing implementation from src to avoid duplication
// and provide a typed wrapper for TSX imports in app/components
const ColourfulText: React.FC<{ text?: string; children?: React.ReactNode }> = ({ children, text }) => {
  return <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">{children ?? text}</span>;
};

export default ColourfulText;


