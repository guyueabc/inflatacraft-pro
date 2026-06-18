"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div>
      <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-navy-100 to-navy-200">
        <img
          src={`${images[selectedImage]}?v=1`}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={cn(
                "h-20 w-24 shrink-0 overflow-hidden rounded-lg border-2 bg-gradient-to-br from-navy-100 to-navy-200 transition-all",
                selectedImage === idx
                  ? "border-navy-700"
                  : "border-transparent hover:border-gray-300"
              )}
            >
              <img
                src={`${img}?v=1`}
                alt={`${name} ${idx + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}