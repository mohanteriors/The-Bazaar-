'use client';

import { useCartStore } from '../../lib/stores/cartStore';
import { useRouter } from 'next/navigation';
import { ShoppingBag, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export function CartSummary() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const validateCart = useCartStore((state) => state.validateCart);
  
  const [hasErrors, setHasErrors] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  // Calculate costs
  const TAX_RATE = 0.16; // 16% VAT in Kenya
  const FREE_SHIPPING_THRESHOLD = 5000;
  
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 500;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shippingCost + tax;

  // Validate cart on mount and when items change
  useEffect(() => {
    const validate = async () => {
      const result = await validateCart();
      setHasErrors(!result.isValid);
    };
    validate();
  }, [items, validateCart]);

  const handleCheckout = async () => {
    setIsValidating(true);
    
    const validation = await validateCart();
    
    if (!validation.isValid) {
      setHasErrors(true);
      setIsValidating(false);
      // Show error toast
      alert('Please fix cart errors before proceeding to checkout');
      return;
    }

    setIsValidating(false);
    router.push('/checkout');
  };

  return (
    <div className="bg-white rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-brand-navy">Order Summary</h2>

      {/* Subtotal */}
      <div className="flex justify-between text-gray-700">
        <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
        <span>KES {subtotal.toLocaleString()}</span>
      </div>

      {/* Shipping */}
      <div className="flex justify-between text-gray-700">
        <span>Shipping</span>
        <span>
          {shippingCost === 0 ? (
            <span className="text-green-600 font-medium">FREE</span>
          ) : (
            `KES ${shippingCost.toLocaleString()}`
          )}
        </span>
      </div>

      {/* Free Shipping Progress */}
      {subtotal < FREE_SHIPPING_THRESHOLD && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            Add <span className="font-bold">KES {(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString()}</span> more to get FREE shipping!
          </p>
          <div className="mt-2 h-2 bg-blue-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-primary transition-all"
              style={{ width: `${(subtotal / FREE_SHIPPING_THRESHOLD) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Tax */}
      <div className="flex justify-between text-gray-700">
        <span>Tax (VAT 16%)</span>
        <span>KES {Math.round(tax).toLocaleString()}</span>
      </div>

      {/* Total */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-brand-navy">Total</span>
          <span className="text-2xl font-bold text-brand-navy">
            KES {Math.round(total).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Error Alert */}
      {hasErrors && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-red-800">
            <p className="font-medium">Cart has errors</p>
            <p>Please review and fix issues before checkout</p>
          </div>
        </div>
      )}

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        disabled={hasErrors || isValidating || items.length === 0}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand-primary text-white rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        <ShoppingBag className="h-5 w-5" />
        {isValidating ? 'Validating...' : 'Proceed to Checkout'}
      </button>

      {/* Trust Badges */}
      <div className="pt-4 border-t border-gray-200 space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Secure checkout</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Buyer protection</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Easy returns</span>
        </div>
      </div>
    </div>
  );
}
