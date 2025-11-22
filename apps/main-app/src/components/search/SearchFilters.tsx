'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCategories } from '../../hooks/useCategories';
import { X, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

export function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: categories } = useCategories();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Get current filter values from URL
  const selectedCategory = searchParams.get('category') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const inStockOnly = searchParams.get('inStock') === 'true';
  const minRating = searchParams.get('minRating') || '';

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    router.push(`/search?${params.toString()}`);
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams();
    const query = searchParams.get('q');
    if (query) params.set('q', query);
    router.push(`/search?${params.toString()}`);
  };

  const hasActiveFilters = selectedCategory || minPrice || maxPrice || inStockOnly || minRating;

  const filterContent = (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-brand-navy flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5" />
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-brand-primary hover:text-blue-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-brand-navy mb-3">
          Category
        </label>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
            <input
              type="radio"
              name="category"
              value=""
              checked={!selectedCategory}
              onChange={(e) => updateFilter('category', e.target.value)}
              className="mr-3 text-brand-primary focus:ring-brand-primary"
            />
            <span className="text-sm">All Categories</span>
          </label>
          {categories?.filter(cat => !cat.parentId).map((category) => (
            <label
              key={category.id}
              className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <input
                type="radio"
                name="category"
                value={category.id}
                checked={selectedCategory === category.id}
                onChange={(e) => updateFilter('category', e.target.value)}
                className="mr-3 text-brand-primary focus:ring-brand-primary"
              />
              <span className="text-sm">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <label className="block text-sm font-medium text-brand-navy mb-3">
          Price Range (KES)
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => updateFilter('minPrice', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm"
            min="0"
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => updateFilter('maxPrice', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm"
            min="0"
          />
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <label className="block text-sm font-medium text-brand-navy mb-3">
          Minimum Rating
        </label>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <input
                type="radio"
                name="rating"
                value={rating.toString()}
                checked={minRating === rating.toString()}
                onChange={(e) => updateFilter('minRating', e.target.value)}
                className="mr-3 text-brand-primary focus:ring-brand-primary"
              />
              <div className="flex items-center gap-1">
                {[...Array(rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
                {[...Array(5 - rating)].map((_, i) => (
                  <span key={i} className="text-gray-300">★</span>
                ))}
                <span className="text-sm ml-1">& Up</span>
              </div>
            </label>
          ))}
          {minRating && (
            <button
              onClick={() => updateFilter('minRating', '')}
              className="text-sm text-brand-primary hover:text-blue-700"
            >
              Clear rating filter
            </button>
          )}
        </div>
      </div>

      {/* Stock Availability */}
      <div>
        <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => updateFilter('inStock', e.target.checked ? 'true' : '')}
            className="mr-3 rounded text-brand-primary focus:ring-brand-primary"
          />
          <span className="text-sm font-medium text-brand-navy">In Stock Only</span>
        </label>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block bg-white rounded-xl p-6 sticky top-24">
        {filterContent}
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-full shadow-lg hover:bg-blue-700"
        >
          <SlidersHorizontal className="h-5 w-5" />
          Filters
          {hasActiveFilters && (
            <span className="bg-white text-brand-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              !
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setShowMobileFilters(false)}>
          <div
            className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-brand-navy">Filters</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {filterContent}
            <button
              onClick={() => setShowMobileFilters(false)}
              className="w-full mt-6 px-6 py-3 bg-brand-primary text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
}
