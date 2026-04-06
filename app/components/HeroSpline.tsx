"use client";

import type { CSSProperties } from "react";
import Spline from "@splinetool/react-spline";

type HeroSplineProps = {
  scene: string;
  style?: CSSProperties;
};

export default function HeroSpline({ scene, style }: HeroSplineProps) {
  return <Spline scene={scene} style={style} />;
}
