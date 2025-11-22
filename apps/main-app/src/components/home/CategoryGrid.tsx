'use client';

import Link from 'next/link';
import { useCategories } from '../../hooks/useCategories';
import { Loader2 } from 'lucide-react';

export function CategoryGrid() {
  const { data: categories, isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <section className="py-16 bg-brand-gray">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-display mb-8 text-center text-brand-navy">
            Shop by Category
          </h2>
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-brand-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !categories || categories.length === 0) {
    return null; // Silently fail for categories - not critical
  }

  // Show only top-level categories (no parent)
  const topCategories = categories.filter((cat) => !cat.parentId).slice(0, 8);

  return (
    <section className="py-16 bg-brand-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-brand-navy">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of products across different categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
          {topCategories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-brand-primary"
            >
              {/* Icon or Emoji */}
              {category.icon ? (
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
              ) : (
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-primary/10 flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors">
                  <span className="text-2xl font-bold text-brand-primary">
                    {category.name.charAt(0)}
                  </span>
                </div>
              )}

              {/* Category Name */}
              <h3 className="font-semibold text-brand-navy group-hover:text-brand-primary transition-colors">
                {category.name}
              </h3>

              {/* Description (if available) */}
              {category.description && (
                <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                  {category.description}
                </p>
              )}
            </Link>
          ))}
        </div>

        {categories.length > 8 && (
          <div className="text-center mt-12">
            <Link
              href="/categories"
              className="inline-flex items-center px-8 py-3 bg-white text-brand-primary border-2 border-brand-primary rounded-lg font-semibold hover:bg-brand-primary hover:text-white transition-colors"
            >
              View All Categories
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
