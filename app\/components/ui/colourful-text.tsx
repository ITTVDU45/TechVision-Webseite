"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ColourfulText({
  text
}) {
  const colors = [
    "from-blue-400",
    "via-blue-500",
    "to-blue-600"
  ];

  return (
    <span className={`bg-clip-text text-transparent bg-gradient-to-r ${colors.join(' ')} animate-gradient-x`}>
      {text}
    </span>
  );
}
