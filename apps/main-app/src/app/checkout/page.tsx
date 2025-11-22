'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../../lib/stores/cartStore';
import { useCheckoutStore } from '../../lib/stores/checkoutStore';
import { CheckoutStepper } from '../../components/checkout/CheckoutStepper';
import { ShippingStep } from '../../components/checkout/ShippingStep';
import { ShippingMethodStep } from '../../components/checkout/ShippingMethodStep';
import { ReviewStep } from '../../components/checkout/ReviewStep';
import { Lock } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.items);
  const currentStep = useCheckoutStore((state) => state.currentStep);

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/cart');
    }
  }, [cartItems, router]);

  if (cartItems.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-brand-gray py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-brand-navy">Checkout</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Lock className="h-4 w-4" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <CheckoutStepper currentStep={currentStep} />
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && <ShippingStep />}
          {currentStep === 2 && <ShippingMethodStep />}
          {currentStep === 3 && <ReviewStep />}
        </div>
      </div>
    </div>
  );
}
