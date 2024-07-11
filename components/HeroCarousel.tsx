"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const heroImages = [
  {
    imagUrl: "/assets/images/hero-1.svg",
    alt: "smartwatch",
  },
  {
    imagUrl: "/assets/images/hero-2.svg",
    alt: "bag",
  },
  {
    imagUrl: "/assets/images/hero-3.svg",
    alt: "lamp",
  },
  {
    imagUrl: "/assets/images/hero-4.svg",
    alt: "air frier",
  },
  {
    imagUrl: "/assets/images/hero-5.svg",
    alt: "dolo 650 mg",
  },
];
function HeroCarousel() {
  return (
    <div>
      {" "}
      <Carousel
        showThumbs={false}
       // autoPlay
       // infiniteLoop
       // interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((image, index) => (
          <div key={index}>
            <Image
              width={200}
              height={200}
              src={image.imagUrl}
              alt={image.alt}
            />
          </div>
        ))}
      </Carousel>
      l
    </div>
  );
}

export default HeroCarousel;
