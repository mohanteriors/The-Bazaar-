import { HeroSection } from '../components/home/HeroSection';
import { PromoBanner, CallToActionBanner } from '../components/home/PromoBanner';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { CategoryGrid } from '../components/home/CategoryGrid';

export const metadata = {
  title: 'The Bazaar - Discover Authentic Kenyan Products',
  description: 'Shop directly from trusted Kenyan vendors. Quality products, fair prices, delivered to your doorstep. Electronics, Fashion, Home & Living, and more.',
  keywords: 'Kenya marketplace, Kenyan products, online shopping Kenya, buy from Kenyan vendors, e-commerce Kenya',
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Search */}
      <HeroSection />

      {/* Trust Indicators / USPs */}
      <PromoBanner />

      {/* Featured Products - Real data from Supabase */}
      <FeaturedProducts />

      {/* Shop by Category */}
      <CategoryGrid />

      {/* Vendor CTA */}
      <CallToActionBanner />
    </div>
  );
}
