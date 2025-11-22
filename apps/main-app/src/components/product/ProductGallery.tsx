'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface ProductGalleryProps {
  images: any; // JSON array from Supabase
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const imageArray = Array.isArray(images) ? images : [];
  const [selectedImage, setSelectedImage] = useState(0);
  const [showZoom, setShowZoom] = useState(false);

  // Fallback if no images
  if (imageArray.length === 0) {
    imageArray.push('/placeholder-product.png');
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % imageArray.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + imageArray.length) % imageArray.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-white rounded-xl overflow-hidden group">
        <Image
          src={imageArray[selectedImage]}
          alt={`${productName} - Image ${selectedImage + 1}`}
          fill
          className="object-contain p-4"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />

        {/* Navigation Arrows */}
        {imageArray.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 text-brand-navy" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 text-brand-navy" />
            </button>
          </>
        )}

        {/* Zoom Button */}
        <button
          onClick={() => setShowZoom(true)}
          className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
          aria-label="Zoom image"
        >
          <ZoomIn className="h-5 w-5 text-brand-navy" />
        </button>

        {/* Image Counter */}
        {imageArray.length > 1 && (
          <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 text-white text-sm rounded-full">
            {selectedImage + 1} / {imageArray.length}
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      {imageArray.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {imageArray.map((image: string, index: number) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? 'border-brand-primary ring-2 ring-brand-primary/20'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-contain p-1"
                sizes="100px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      {showZoom && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setShowZoom(false)}
        >
          <button
            onClick={() => setShowZoom(false)}
            className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100"
            aria-label="Close zoom"
          >
            <ChevronRight className="h-6 w-6 rotate-45 text-brand-navy" />
          </button>
          <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
            <Image
              src={imageArray[selectedImage]}
              alt={`${productName} - Zoomed`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}
