"use client";
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

const LottieSequence: React.FC<{ animations: string[] }> = ({ animations }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    fetch(animations[currentIndex])
      .then((response) => response.json())
      .then((data) => {
        if (mounted) setAnimationData(data);
      })
      .catch(() => {
        // ignore load errors in client fallback
      });

    return () => {
      mounted = false;
    };
  }, [currentIndex, animations]);

  const handleComplete = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % animations.length);
  };

  if (!animationData) return null;

  return (
    <Lottie
      animationData={animationData}
      loop={false}
      onComplete={handleComplete}
      className="w-full h-full object-cover"
    />
  );
};

export default LottieSequence;


