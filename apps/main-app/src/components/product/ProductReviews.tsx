'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, ThumbsUp, Flag, CheckCircle } from 'lucide-react';

interface ProductReviewsProps {
  productId: string;
  reviews: any[];
}

export function ProductReviews({ productId, reviews }: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState<'recent' | 'highest' | 'lowest'>('recent');

  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[review.rating - 1]++;
    }
  });

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'highest') return b.rating - a.rating;
    if (sortBy === 'lowest') return a.rating - b.rating;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="bg-white rounded-xl p-6 lg:p-8">
      <h2 className="text-2xl font-bold text-brand-navy mb-6">Customer Reviews</h2>

      {reviews.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⭐</div>
          <h3 className="text-xl font-semibold text-brand-navy mb-2">No reviews yet</h3>
          <p className="text-gray-600 mb-6">Be the first to review this product!</p>
          <button className="px-6 py-3 bg-brand-primary text-white rounded-lg font-semibold hover:bg-blue-700">
            Write a Review
          </button>
        </div>
      ) : (
        <>
          {/* Rating Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
            {/* Average Rating */}
            <div className="text-center md:text-left">
              <div className="text-5xl font-bold text-brand-navy mb-2">
                {avgRating.toFixed(1)}
              </div>
              <div className="flex items-center justify-center md:justify-start mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 ${
                      star <= avgRating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">
                Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratingCounts[rating - 1];
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700 w-8">
                      {rating} ★
                    </span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-brand-navy">
              All Reviews ({reviews.length})
            </h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm"
            >
              <option value="recent">Most Recent</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {sortedReviews.map((review) => (
              <div
                key={review.id}
                className="pb-6 border-b border-gray-200 last:border-0"
              >
                {/* Reviewer Info */}
                <div className="flex items-start gap-4 mb-3">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {review.user?.avatar ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={review.user.avatar}
                          alt={`${review.user.firstName} ${review.user.lastName}`}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
                        <span className="text-lg font-semibold text-brand-primary">
                          {review.user?.firstName?.charAt(0) || 'U'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Review Header */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-brand-navy">
                        {review.user?.firstName} {review.user?.lastName}
                      </span>
                      {review.isVerified && (
                        <span className="flex items-center gap-1 text-xs text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                {review.title && (
                  <h4 className="font-semibold text-brand-navy mb-2">
                    {review.title}
                  </h4>
                )}
                <p className="text-gray-700 mb-3 leading-relaxed">
                  {review.comment}
                </p>

                {/* Review Images */}
                {review.images && Array.isArray(review.images) && review.images.length > 0 && (
                  <div className="flex gap-2 mb-3">
                    {review.images.slice(0, 4).map((image: string, index: number) => (
                      <div
                        key={index}
                        className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200"
                      >
                        <Image
                          src={image}
                          alt={`Review image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Review Actions */}
                <div className="flex items-center gap-4 text-sm">
                  <button className="flex items-center gap-1 text-gray-600 hover:text-brand-primary">
                    <ThumbsUp className="h-4 w-4" />
                    Helpful
                  </button>
                  <button className="flex items-center gap-1 text-gray-600 hover:text-red-600">
                    <Flag className="h-4 w-4" />
                    Report
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Write Review Button */}
          <div className="mt-8 text-center">
            <button className="px-8 py-3 bg-brand-primary text-white rounded-lg font-semibold hover:bg-blue-700">
              Write a Review
            </button>
          </div>
        </>
      )}
    </div>
  );
}
