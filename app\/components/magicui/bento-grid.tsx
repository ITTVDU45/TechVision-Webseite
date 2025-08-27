import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { CheckIcon } from "@radix-ui/react-icons";

export const BentoGrid = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {children}
    </div>
  );
};

export const BentoCard = ({ name, children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-neutral-900/50 backdrop-blur-sm p-6 rounded-xl ${className}`}
    >
      <h3 className="text-xl font-semibold mb-2 text-white">{name}</h3>
      <div className="text-gray-400">{children}</div>
    </motion.div>
  );
};
