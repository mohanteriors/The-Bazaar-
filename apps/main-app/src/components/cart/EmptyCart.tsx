import Link from 'next/link';
import { ShoppingCart, ArrowRight } from 'lucide-react';

export function EmptyCart() {
  return (
    <div className="min-h-screen bg-brand-gray flex items-center justify-center py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-xl p-12 text-center">
          {/* Icon */}
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingCart className="h-12 w-12 text-gray-400" />
          </div>

          {/* Message */}
          <h2 className="text-2xl font-bold text-brand-navy mb-3">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
          </p>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Link
              href="/search"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-brand-primary text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse Products
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-brand-primary hover:text-brand-primary transition-colors"
            >
              Go to Homepage
            </Link>
          </div>

          {/* Popular Categories */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Popular Categories
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {['Electronics', 'Fashion', 'Home & Living', 'Beauty'].map((category) => (
                <Link
                  key={category}
                  href={`/search?category=${category.toLowerCase()}`}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-brand-primary hover:text-white transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
