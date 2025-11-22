import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-brand-primary via-blue-600 to-brand-navy text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}/>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">
            Discover Authentic Kenyan Products
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Shop directly from trusted local vendors. Quality products, fair prices, delivered to your doorstep.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <form action="/search" method="GET" className="relative">
              <div className="relative flex items-center">
                <Search className="absolute left-4 h-6 w-6 text-gray-400" />
                <input
                  type="text"
                  name="q"
                  placeholder="Search for products, vendors, categories..."
                  className="w-full pl-12 pr-4 py-4 rounded-full text-brand-navy text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-6 py-2 bg-brand-primary hover:bg-blue-700 text-white rounded-full font-semibold transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/categories/electronics"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-primary rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg min-w-[200px]"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors min-w-[200px]"
            >
              Learn More
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold font-display">500+</div>
              <div className="text-sm text-blue-200 mt-1">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold font-display">50+</div>
              <div className="text-sm text-blue-200 mt-1">Vendors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold font-display">1000+</div>
              <div className="text-sm text-blue-200 mt-1">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
