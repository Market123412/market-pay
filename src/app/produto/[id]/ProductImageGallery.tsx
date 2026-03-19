"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageGalleryProps {
  images: string[];
  title: string;
  discount?: number;
}

export default function ProductImageGallery({ images, title, discount }: ProductImageGalleryProps) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white">
        <Image
          src={images[selected] || images[0]}
          alt={title}
          fill
          className="object-contain p-4"
          sizes="(max-width: 1024px) 100vw, 480px"
          priority
        />
        {discount && discount >= 10 && (
          <span className="absolute left-3 top-3 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
            -{discount}% OFF
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded border-2 bg-white transition-colors ${
                selected === i ? "border-orange-500" : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <Image
                src={img}
                alt={`${title} ${i + 1}`}
                fill
                className="object-contain p-1"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
