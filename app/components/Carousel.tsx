"use client";

import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import { fetchCarouselImages, CarouselImage } from "@/app/lib/api/carouselApi";
const API_PUBLIC_URL = process.env.NEXT_PUBLIC_URL ?? "";

const MyCarousel: React.FC = () => {
  const [images, setImages] = useState<CarouselImage[]>([]);

  useEffect(() => {
    fetchCarouselImages().then(setImages).catch(console.error);
  }, []);

  return (
    <div className="w-full h-64 md:h-96 relative z-10 bg-[#000]">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        interval={4000}
        swipeable
      >
        {images.map((img) => (
          <div key={img.id} className="relative h-64 md:h-96 w-full">
            <Image
              src={`${API_PUBLIC_URL}/slider/${img.image}`}
              alt={img.title ?? "carousel image"}
              fill
              className="object-cover"
              priority={true}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wIAAgEB/wF56VsAAAAASUVORK5CYII="
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MyCarousel;