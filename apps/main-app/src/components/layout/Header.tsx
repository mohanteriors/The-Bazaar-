'use client';

import Link from 'next/link';
import { ShoppingCart, Search, User, Menu, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { useCartStore } from '../../lib/stores/cartStore';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-brand-primary font-display">
              THE BAZAAR
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
              />
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Account */}
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  href="/account"
                  className="flex items-center space-x-1 text-brand-navy hover:text-brand-primary transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {user.user_metadata?.first_name || 'Account'}
                  </span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-1 text-gray-600 hover:text-brand-danger transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="hidden md:flex items-center space-x-1 text-brand-navy hover:text-brand-primary transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="text-sm font-medium">Sign In</span>
              </Link>
            )}

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center space-x-1 text-brand-navy hover:text-brand-primary transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden md:inline text-sm font-medium">Cart</span>
              {/* Cart Badge */}
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-danger text-xs text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-brand-navy"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex space-x-6 py-3 border-t">
          <Link
            href="/categories/electronics"
            className="text-sm font-medium text-brand-navy hover:text-brand-primary transition-colors"
          >
            Electronics
          </Link>
          <Link
            href="/categories/fashion"
            className="text-sm font-medium text-brand-navy hover:text-brand-primary transition-colors"
          >
            Fashion
          </Link>
          <Link
            href="/categories/home-living"
            className="text-sm font-medium text-brand-navy hover:text-brand-primary transition-colors"
          >
            Home & Living
          </Link>
          <Link
            href="/categories/health-beauty"
            className="text-sm font-medium text-brand-navy hover:text-brand-primary transition-colors"
          >
            Health & Beauty
          </Link>
          <Link
            href="/categories/groceries"
            className="text-sm font-medium text-brand-navy hover:text-brand-primary transition-colors"
          >
            Groceries
          </Link>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                />
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-3">
              <Link
                href="/account"
                className="flex items-center space-x-2 text-brand-navy hover:text-brand-primary transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="font-medium">Account</span>
              </Link>
              <Link
                href="/categories/electronics"
                className="font-medium text-brand-navy hover:text-brand-primary transition-colors"
              >
                Electronics
              </Link>
              <Link
                href="/categories/fashion"
                className="font-medium text-brand-navy hover:text-brand-primary transition-colors"
              >
                Fashion
              </Link>
              <Link
                href="/categories/home-living"
                className="font-medium text-brand-navy hover:text-brand-primary transition-colors"
              >
                Home & Living
              </Link>
              <Link
                href="/categories/health-beauty"
                className="font-medium text-brand-navy hover:text-brand-primary transition-colors"
              >
                Health & Beauty
              </Link>
              <Link
                href="/categories/groceries"
                className="font-medium text-brand-navy hover:text-brand-primary transition-colors"
              >
                Groceries
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
