"use client";
import React from 'react';
// Inline lightweight fallback implementation to avoid SSR issues
interface VortexCustomProps extends React.HTMLAttributes<HTMLDivElement> {
  backgroundColor?: string;
  rangeY?: number;
  particleCount?: number;
  baseHue?: number;
}

type VortexProps = React.PropsWithChildren<VortexCustomProps>;

const Vortex: React.FC<VortexProps> = ({ children, backgroundColor, style, className, ...rest }) => {
  const mergedStyle = { ...(style as React.CSSProperties), backgroundColor } as React.CSSProperties;
  return (
    <div {...(rest as React.HTMLAttributes<HTMLDivElement>)} style={mergedStyle} className={`relative overflow-hidden ${className ?? ''}`}>
      {children}
    </div>
  );
};

export default Vortex;


