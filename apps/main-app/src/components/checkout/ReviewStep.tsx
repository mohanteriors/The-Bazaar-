'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCheckoutStore } from '../../lib/stores/checkoutStore';
import { useCartStore } from '../../lib/stores/cartStore';
import {
  ChevronLeft,
  MapPin,
  Truck,
  Package,
  CreditCard,
  Edit,
} from 'lucide-react';
import Image from 'next/image';

export function ReviewStep() {
  const router = useRouter();
  const setCurrentStep = useCheckoutStore((state) => state.setCurrentStep);
  const shippingAddress = useCheckoutStore((state) => state.shippingAddress);
  const shippingMethod = useCheckoutStore((state) => state.shippingMethod);
  const orderNotes = useCheckoutStore((state) => state.orderNotes);
  const setOrderNotes = useCheckoutStore((state) => state.setOrderNotes);

  const cartItems = useCartStore((state) => state.items);
  const itemsByVendor = useCartStore((state) => state.getItemsByVendor());
  const subtotal = useCartStore((state) => state.getSubtotal());

  const [notes, setNotes] = useState(orderNotes);
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate costs
  const TAX_RATE = 0.16; // 16% VAT
  const shippingCost =
    shippingMethod?.id === 'standard' && subtotal >= 5000
      ? 0
      : shippingMethod?.cost || 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shippingCost + tax;

  const handleBack = () => {
    setCurrentStep(2);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    setOrderNotes(notes);

    // TODO: In M3.3, this will redirect to payment page
    // For now, we'll just show a placeholder
    setTimeout(() => {
      router.push('/checkout/payment');
    }, 1000);
  };

  const vendorGroups = Array.from(itemsByVendor.entries());

  return (
    <div className="space-y-6">
      {/* Order Items */}
      <div className="bg-white rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-brand-navy flex items-center gap-2">
            <Package className="h-6 w-6" />
            Order Items
          </h2>
          <span className="text-sm text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div className="space-y-6">
          {vendorGroups.map(([vendorId, vendorItems]) => (
            <div
              key={vendorId}
              className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
            >
              {/* Vendor Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-brand-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-brand-primary font-semibold text-xs">
                    {vendorItems[0].vendorName.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold text-brand-navy">
                  {vendorItems[0].vendorName}
                </h3>
              </div>

              {/* Vendor Items */}
              <div className="space-y-3">
                {vendorItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image || '/placeholder-product.png'}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-brand-navy line-clamp-1">
                        {item.name}
                      </h4>
                      {item.variant && Object.keys(item.variant).length > 0 && (
                        <p className="text-sm text-gray-600">
                          {Object.entries(item.variant)
                            .map(([key, value]) => `${key}: ${value}`)
                            .join(', ')}
                        </p>
                      )}
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-brand-navy">
                        KES {(item.price * item.quantity).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        KES {item.price.toLocaleString()} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-brand-navy flex items-center gap-2">
            <MapPin className="h-6 w-6" />
            Shipping Address
          </h2>
          <button
            onClick={() => setCurrentStep(1)}
            className="flex items-center gap-1 text-brand-primary hover:text-blue-700 text-sm font-medium"
          >
            <Edit className="h-4 w-4" />
            Edit
          </button>
        </div>

        {shippingAddress && (
          <div className="text-gray-700">
            <p className="font-semibold text-brand-navy">
              {shippingAddress.fullName}
            </p>
            <p>{shippingAddress.phone}</p>
            <p className="mt-2">{shippingAddress.street}</p>
            <p>
              {shippingAddress.city}, {shippingAddress.state}{' '}
              {shippingAddress.postalCode}
            </p>
            <p>{shippingAddress.country}</p>
          </div>
        )}
      </div>

      {/* Shipping Method */}
      <div className="bg-white rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-brand-navy flex items-center gap-2">
            <Truck className="h-6 w-6" />
            Shipping Method
          </h2>
          <button
            onClick={() => setCurrentStep(2)}
            className="flex items-center gap-1 text-brand-primary hover:text-blue-700 text-sm font-medium"
          >
            <Edit className="h-4 w-4" />
            Edit
          </button>
        </div>

        {shippingMethod && (
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold text-brand-navy">
                {shippingMethod.name}
              </p>
              <p className="text-sm text-gray-600">
                {shippingMethod.description}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Estimated delivery: {shippingMethod.estimatedDays}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-brand-navy">
                {shippingCost === 0
                  ? 'FREE'
                  : `KES ${shippingCost.toLocaleString()}`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Order Notes */}
      <div className="bg-white rounded-xl p-8">
        <h2 className="text-xl font-bold text-brand-navy mb-4">
          Order Notes (Optional)
        </h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any special instructions for your order?"
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
        />
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-xl p-8">
        <h2 className="text-2xl font-bold text-brand-navy mb-6">
          Order Summary
        </h2>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal ({cartItems.length} items)</span>
            <span>KES {subtotal.toLocaleString()}</span>
          </div>
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
          <div className="flex justify-between text-gray-700">
            <span>Tax (VAT 16%)</span>
            <span>KES {Math.round(tax).toLocaleString()}</span>
          </div>
          <div className="pt-3 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-brand-navy">Total</span>
              <span className="text-2xl font-bold text-brand-navy">
                KES {Math.round(total).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 text-gray-700 hover:text-brand-primary font-medium transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
            Back
          </button>

          <button
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="flex items-center gap-2 px-8 py-4 bg-brand-primary text-white rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <CreditCard className="h-5 w-5" />
            {isProcessing ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </div>
      </div>
    </div>
  );
}
