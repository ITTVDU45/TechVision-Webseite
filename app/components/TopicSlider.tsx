"use client";
import React, { useRef } from "react";
import Slider, { CustomArrowProps } from "react-slick";
import TopicCard from "./TopicCard";
import { BlogPost } from "../data/blogPosts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface TopicSliderProps {
  posts: BlogPost[];
}

function TopicPrevArrow({ className, style, onClick }: CustomArrowProps): React.JSX.Element {
  return (
    <button
      type="button"
      className={`${className ?? ""} topic-slider-arrow topic-slider-arrow--prev`}
      style={{ ...style, display: "flex" }}
      onClick={onClick}
      aria-label="Vorheriger Artikel"
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
}

function TopicNextArrow({ className, style, onClick }: CustomArrowProps): React.JSX.Element {
  return (
    <button
      type="button"
      className={`${className ?? ""} topic-slider-arrow topic-slider-arrow--next`}
      style={{ ...style, display: "flex" }}
      onClick={onClick}
      aria-label="Nächster Artikel"
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}

export default function TopicSlider({ posts }: TopicSliderProps): React.JSX.Element | null {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: true,
    infinite: posts.length > 2,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.45, 0.05, 0.55, 0.95)",
    prevArrow: <TopicPrevArrow />,
    nextArrow: <TopicNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    appendDots: (dots: React.ReactNode) => (
      <div className="topic-slider-dots-wrap">
        <ul className="m-0 flex list-none flex-wrap justify-center gap-2 p-0">{dots}</ul>
      </div>
    ),
    customPaging: () => <div className="topic-slider-dot" />,
  };

  if (!posts?.length) return null;

  return (
    <div className="topic-slider relative pb-14 md:pb-16">
      <Slider ref={sliderRef} {...settings}>
        {posts.map((post, index) => (
          <TopicCard key={post.id} post={post} index={index} />
        ))}
      </Slider>
    </div>
  );
}
