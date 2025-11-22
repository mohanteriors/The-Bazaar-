'use client';

import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from '../products/ProductCard';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

interface RelatedProductsProps {
  categoryId: string;
  currentProductId: string;
}

export function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: products, isLoading } = useProducts({
    categoryId,
    limit: 12,
  });

  // Filter out current product
  const relatedProducts = products?.filter((p) => p.id !== currentProductId) || [];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-8">
        <h2 className="text-2xl font-bold text-brand-navy mb-6">Related Products</h2>
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
        </div>
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-brand-navy">Related Products</h2>
        
        {/* Scroll Buttons */}
        {relatedProducts.length > 4 && (
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 border border-gray-300 rounded-lg hover:border-brand-primary hover:text-brand-primary transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 border border-gray-300 rounded-lg hover:border-brand-primary hover:text-brand-primary transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Products Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {relatedProducts.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-64">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
