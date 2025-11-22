'use client';

import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from '../products/ProductCard';
import { Loader2 } from 'lucide-react';

export function FeaturedProducts() {
  const { data: products, isLoading, error } = useProducts({ 
    isFeatured: true, 
    limit: 12 
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-display mb-8 text-center text-brand-navy">
            Featured Products
          </h2>
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-brand-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-display mb-8 text-center text-brand-navy">
            Featured Products
          </h2>
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">Failed to load featured products</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-display mb-8 text-center text-brand-navy">
            Featured Products
          </h2>
          <div className="text-center py-20">
            <p className="text-gray-600">No featured products available at the moment.</p>
            <p className="text-sm text-gray-500 mt-2">Check back soon for exciting new products!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-brand-navy">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked selections from our trusted vendors. Quality guaranteed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length >= 12 && (
          <div className="text-center mt-12">
            <a
              href="/search?featured=true"
              className="inline-flex items-center px-8 py-3 bg-brand-primary text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Featured Products
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
