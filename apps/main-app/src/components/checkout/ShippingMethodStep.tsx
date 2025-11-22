'use client';

import { useState } from 'react';
import {
  useCheckoutStore,
  SHIPPING_METHODS,
  ShippingMethod,
} from '../../lib/stores/checkoutStore';
import { useCartStore } from '../../lib/stores/cartStore';
import { Truck, Clock, Check, ChevronLeft } from 'lucide-react';

export function ShippingMethodStep() {
  const setShippingMethod = useCheckoutStore(
    (state) => state.setShippingMethod
  );
  const setCurrentStep = useCheckoutStore((state) => state.setCurrentStep);
  const savedMethod = useCheckoutStore((state) => state.shippingMethod);
  const cartSubtotal = useCartStore((state) => state.getSubtotal());

  const [selectedMethod, setSelectedMethod] = useState<ShippingMethod | null>(
    savedMethod
  );

  const handleContinue = () => {
    if (selectedMethod) {
      setShippingMethod(selectedMethod);
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  // Calculate actual shipping cost based on cart subtotal
  const getShippingCost = (method: ShippingMethod) => {
    if (method.id === 'standard' && cartSubtotal >= 5000) {
      return 0; // Free standard shipping over KES 5,000
    }
    return method.cost;
  };

  return (
    <div className="bg-white rounded-xl p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-brand-navy mb-2">
          Shipping Method
        </h2>
        <p className="text-gray-600">
          Choose how you want your order delivered
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {SHIPPING_METHODS.map((method) => {
          const cost = getShippingCost(method);
          const isSelected = selectedMethod?.id === method.id;
          const isFree = cost === 0;

          return (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method)}
              className={`w-full text-left p-6 border-2 rounded-lg transition-all ${
                isSelected
                  ? 'border-brand-primary bg-blue-50'
                  : 'border-gray-200 hover:border-brand-primary hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {/* Icon */}
                  <div
                    className={`p-3 rounded-lg ${
                      isSelected
                        ? 'bg-brand-primary text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {method.id === 'same-day' ? (
                      <Clock className="h-6 w-6" />
                    ) : (
                      <Truck className="h-6 w-6" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-brand-navy">
                        {method.name}
                      </h3>
                      {isFree && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                          FREE
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {method.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">
                        Estimated delivery: {method.estimatedDays}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="text-lg font-bold text-brand-navy">
                      {isFree ? 'FREE' : `KES ${cost.toLocaleString()}`}
                    </div>
                  </div>
                </div>

                {/* Selected Indicator */}
                {isSelected && (
                  <div className="ml-4">
                    <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Free Shipping Notice */}
      {cartSubtotal < 5000 && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <span className="font-medium">Tip:</span> Add{' '}
            <span className="font-bold">
              KES {(5000 - cartSubtotal).toLocaleString()}
            </span>{' '}
            more to your cart to get FREE standard shipping!
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-6 py-3 text-gray-700 hover:text-brand-primary font-medium transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          Back to Shipping Address
        </button>

        <button
          onClick={handleContinue}
          disabled={!selectedMethod}
          className="px-8 py-3 bg-brand-primary text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Continue to Review
        </button>
      </div>
    </div>
  );
}
