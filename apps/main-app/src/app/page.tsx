import Link from 'next/link';
import { ArrowRight, ShoppingBag, TrendingUp, Shield } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-primary to-blue-700 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold font-display mb-6">
              Your Marketplace. Your Rules.
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Discover unique products from trusted Kenyan vendors. Shop with confidence, delivered to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/categories/electronics"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-brand-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary/10 text-brand-primary mb-4">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                Browse thousands of products from verified vendors across Kenya.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary/10 text-brand-primary mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Shop safely with M-Pesa, Stripe, and other trusted payment methods.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary/10 text-brand-primary mb-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your orders delivered quickly with our reliable logistics partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 bg-brand-gray">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-display mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'Electronics', slug: 'electronics', emoji: '📱' },
              { name: 'Fashion', slug: 'fashion', emoji: '👗' },
              { name: 'Home & Living', slug: 'home-living', emoji: '🏠' },
              { name: 'Health & Beauty', slug: 'health-beauty', emoji: '💄' },
              { name: 'Groceries', slug: 'groceries', emoji: '🛒' },
            ].map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-2">{category.emoji}</div>
                <h3 className="font-semibold text-brand-navy">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-display mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of happy customers shopping from trusted Kenyan vendors.
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center justify-center px-8 py-3 bg-brand-primary text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Create Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
