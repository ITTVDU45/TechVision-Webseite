"use client";
import React from 'react';
// Inline lightweight fallback implementation to avoid SSR issues
const Vortex: React.FC<Record<string, any>> = ({ children, ...rest }) => {
  const style = rest.style || {};
  return (
    <div {...rest} style={style} className={`relative overflow-hidden ${rest.className ?? ''}`}>
      {children}
    </div>
  );
};

export default Vortex;


