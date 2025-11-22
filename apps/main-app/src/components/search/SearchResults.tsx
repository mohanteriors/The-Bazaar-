'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from '../products/ProductCard';
import { Loader2, ArrowUpDown } from 'lucide-react';

export function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get filter parameters
  const query = searchParams.get('q') || '';
  const categoryId = searchParams.get('category') || undefined;
  const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
  const inStockOnly = searchParams.get('inStock') === 'true';
  const minRating = searchParams.get('minRating') ? parseInt(searchParams.get('minRating')!) : undefined;
  const sortBy = searchParams.get('sort') || 'newest';
  const page = parseInt(searchParams.get('page') || '1');

  // Fetch products with filters
  const { data: products, isLoading, error } = useProducts({
    search: query,
    categoryId,
    minPrice,
    maxPrice,
    inStockOnly,
    minRating,
    sortBy: sortBy as any,
    page,
    limit: 24,
  });

  const updateSort = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSort);
    params.delete('page'); // Reset to page 1 when sorting changes
    router.push(`/search?${params.toString()}`);
  };

  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/search?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-12 w-12 animate-spin text-brand-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl p-12 text-center">
        <p className="text-red-600 mb-4">Failed to load search results</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  const totalResults = products?.length || 0;

  return (
    <div>
      {/* Results Header */}
      <div className="bg-white rounded-xl p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-brand-navy">
            {query ? (
              <>
                Search results for <span className="text-brand-primary">"{query}"</span>
              </>
            ) : (
              'All Products'
            )}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {totalResults} {totalResults === 1 ? 'product' : 'products'} found
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => updateSort(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm"
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {totalResults === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-brand-navy mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your filters or search query
          </p>
          <button
            onClick={() => router.push('/search')}
            className="px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-blue-700"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalResults > 24 && (
            <div className="bg-white rounded-xl p-4 flex items-center justify-center gap-2">
              <button
                onClick={() => updatePage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {[...Array(Math.ceil(totalResults / 24))].map((_, i) => {
                  const pageNum = i + 1;
                  // Show first, last, current, and adjacent pages
                  if (
                    pageNum === 1 ||
                    pageNum === Math.ceil(totalResults / 24) ||
                    Math.abs(pageNum - page) <= 1
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => updatePage(pageNum)}
                        className={`px-4 py-2 rounded-lg ${
                          page === pageNum
                            ? 'bg-brand-primary text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (Math.abs(pageNum - page) === 2) {
                    return <span key={pageNum} className="px-2">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => updatePage(page + 1)}
                disabled={page >= Math.ceil(totalResults / 24)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
