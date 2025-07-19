"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface CarGalleryProps {
  images: string[];
}

export const CarGallery = ({ images }: CarGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Главное изображение */}
        <div
          className="w-full aspect-square relative rounded-xl overflow-hidden cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <Image
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            fill
            className="object-cover transition duration-300"
          />

          {/* Стрелки */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black p-2 rounded-full shadow-md"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black p-2 rounded-full shadow-md"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Миниатюры */}
        <div className="flex gap-3 overflow-x-auto">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-[160px] h-[100px] relative rounded-lg border ${
                currentIndex === idx ? "border-primary" : "border-transparent"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Модалка */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
            }}
            className="absolute top-5 right-5 text-white bg-black/50 p-2 rounded-full"
          >
            <X size={24} />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-[90vw] h-[90vh] max-w-4xl"
          >
            <Image
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              fill
              className="object-contain"
            />

            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
