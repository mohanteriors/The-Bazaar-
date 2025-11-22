import Link from 'next/link';
import { Truck, Shield, Headphones, CreditCard } from 'lucide-react';

export function PromoBanner() {
  return (
    <section className="py-12 bg-white border-y border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Free Shipping */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
              <Truck className="h-6 w-6 text-brand-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-brand-navy mb-1">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders over KES 5,000</p>
            </div>
          </div>

          {/* Secure Payment */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-brand-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-brand-navy mb-1">Secure Payment</h3>
              <p className="text-sm text-gray-600">100% secure transactions</p>
            </div>
          </div>

          {/* 24/7 Support */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
              <Headphones className="h-6 w-6 text-brand-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-brand-navy mb-1">24/7 Support</h3>
              <p className="text-sm text-gray-600">Dedicated customer service</p>
            </div>
          </div>

          {/* Multiple Payment Options */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-brand-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-brand-navy mb-1">Flexible Payment</h3>
              <p className="text-sm text-gray-600">M-Pesa, Card & more</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CallToActionBanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-brand-primary to-blue-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Are You a Kenyan Vendor?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join The Bazaar and reach thousands of customers across Kenya and beyond.
            Start selling today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/vendor/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-primary rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Become a Vendor
            </Link>
            <Link
              href="/vendor/learn-more"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
