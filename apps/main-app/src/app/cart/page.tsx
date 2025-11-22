'use client';

import { useCartStore } from '../../lib/stores/cartStore';
import { CartItem } from '../../components/cart/CartItem';
import { CartSummary } from '../../components/cart/CartSummary';
import { EmptyCart } from '../../components/cart/EmptyCart';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const itemsByVendor = useCartStore((state) => state.getItemsByVendor());

  if (items.length === 0) {
    return <EmptyCart />;
  }

  // Group items by vendor
  const vendorGroups = Array.from(itemsByVendor.entries());

  return (
    <div className="min-h-screen bg-brand-gray py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-navy flex items-center gap-3">
            <ShoppingCart className="h-8 w-8" />
            Shopping Cart
          </h1>
          <p className="text-gray-600 mt-2">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {vendorGroups.map(([vendorId, vendorItems]) => (
              <div key={vendorId} className="bg-white rounded-xl p-6">
                {/* Vendor Header */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
                  <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-brand-primary font-semibold text-sm">
                      {vendorItems[0].vendorName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-navy">
                      {vendorItems[0].vendorName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {vendorItems.length} {vendorItems.length === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>

                {/* Vendor Items */}
                <div className="space-y-4">
                  {vendorItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link
              href="/search"
              className="inline-flex items-center gap-2 text-brand-primary hover:text-blue-700 font-medium"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CartSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
