"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import CaseStudyCard from "./CaseStudyCard";
import { CaseStudy } from "../data/caseStudies";

// Import slick-carousel css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CaseStudySliderProps {
    cases: CaseStudy[];
}

const CaseStudySlider: React.FC<CaseStudySliderProps> = ({ cases }) => {
    const sliderRef = useRef<Slider | null>(null);

    const settings = {
        dots: true,
        infinite: cases.length > 2,
        speed: 1000,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        cssEase: "cubic-bezier(0.45, 0.05, 0.55, 0.95)",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                }
            }
        ],
        appendDots: (dots: React.ReactNode) => (
            <div style={{ bottom: "-40px" }}>
                <ul className="flex justify-center gap-2 m-0 p-0 list-none"> {dots} </ul>
            </div>
        ),
        customPaging: (i: number) => (
            <div className="w-2 h-2 rounded-full bg-neutral-700 hover:bg-blue-500 transition-all duration-300" />
        )
    };

    if (!cases || cases.length === 0) return null;

    return (
        <div className="relative pb-12">
            <Slider ref={sliderRef} {...settings}>
                {cases.map((caseStudy, index) => (
                    <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} index={index} />
                ))}
            </Slider>

        </div>
    );
};

export default CaseStudySlider;
