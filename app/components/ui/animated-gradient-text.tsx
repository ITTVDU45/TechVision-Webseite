"use client";
import React from 'react';
import { motion } from 'framer-motion';

type Props = { children?: React.ReactNode; className?: string };

export default function AnimatedGradientText({ children, className = '' }: Props) {
  if (!children) return null;

  const colors = [
    'rgb(59, 130, 246)',
    'rgb(96, 165, 250)',
    'rgb(147, 197, 253)',
    'rgb(99, 102, 241)',
    'rgb(129, 140, 248)',
    'rgb(165, 180, 252)',
  ];

  const [currentColors, setCurrentColors] = React.useState(colors);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...colors].sort(() => Math.random() - 0.5);
      setCurrentColors(shuffled);
      setCount((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.span className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400 ${className}`}>
      {String(children).split('').map((char, index) => (
        <motion.span
          key={`${char}-${count}-${index}`}
          initial={{ y: 0 }}
          animate={{
            color: currentColors[index % currentColors.length],
            y: [0, -2, 0],
            scale: [1, 1.01, 1],
            filter: ['blur(0px)', 'blur(4px)', 'blur(0px)'],
            opacity: [1, 0.8, 1],
          }}
          transition={{ duration: 0.8, delay: index * 0.03 }}
          className="inline-block whitespace-pre font-bold"
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}


