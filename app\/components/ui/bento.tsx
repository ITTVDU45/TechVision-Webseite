import React from 'react';
import { motion } from 'framer-motion';

export function BentoGrid({ children, className = '', ...props }) {
  return (
    <div 
      className={`grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
}

export function BentoCard({ children, className = '', ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-2xl bg-white/5 border border-white/10 
                hover:border-blue-500/50 transition-all ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
} 