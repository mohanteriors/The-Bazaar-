'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Minus, Plus, AlertTriangle } from 'lucide-react';
import { useCartStore, CartItem as CartItemType } from '../../lib/stores/cartStore';
import { useState } from 'react';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > item.stock) {
      // Show toast or alert
      return;
    }
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeItem(item.id);
    }, 300);
  };

  const isLowStock = item.stock <= 5 && item.stock > 0;
  const isOutOfStock = item.stock === 0;
  const exceedsStock = item.quantity > item.stock;

  return (
    <div
      className={`flex gap-4 pb-4 border-b border-gray-200 last:border-0 transition-all ${
        isRemoving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      {/* Product Image */}
      <Link href={`/products/${item.slug}`} className="flex-shrink-0">
        <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={item.image || '/placeholder-product.png'}
            alt={item.name}
            fill
            className="object-contain p-2"
            sizes="96px"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/products/${item.slug}`}
          className="font-semibold text-brand-navy hover:text-brand-primary line-clamp-2"
        >
          {item.name}
        </Link>

        {/* Variant */}
        {item.variant && Object.keys(item.variant).length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {Object.entries(item.variant).map(([key, value]) => (
              <span key={key} className="text-sm text-gray-600">
                {key}: <span className="font-medium">{value}</span>
              </span>
            ))}
          </div>
        )}

        {/* Stock Warnings */}
        {(isOutOfStock || exceedsStock || isLowStock) && (
          <div className="mt-2">
            {isOutOfStock && (
              <div className="flex items-center gap-1 text-red-600 text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>Out of stock</span>
              </div>
            )}
            {exceedsStock && !isOutOfStock && (
              <div className="flex items-center gap-1 text-orange-600 text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>Only {item.stock} available</span>
              </div>
            )}
            {isLowStock && !exceedsStock && (
              <div className="flex items-center gap-1 text-orange-600 text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>Only {item.stock} left in stock</span>
              </div>
            )}
          </div>
        )}

        {/* Mobile Price & Actions */}
        <div className="flex items-center justify-between mt-3 md:hidden">
          <div className="font-bold text-brand-navy">
            KES {(item.price * item.quantity).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Desktop Quantity & Price */}
      <div className="hidden md:flex flex-col items-end gap-3">
        {/* Quantity Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="p-1 border border-gray-300 rounded hover:border-brand-primary hover:text-brand-primary disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            className="w-16 text-center px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-brand-primary"
            min="1"
            max={item.stock}
          />
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={item.quantity >= item.stock}
            className="p-1 border border-gray-300 rounded hover:border-brand-primary hover:text-brand-primary disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Price */}
        <div className="font-bold text-brand-navy text-lg">
          KES {(item.price * item.quantity).toLocaleString()}
        </div>

        {/* Unit Price */}
        <div className="text-sm text-gray-500">
          KES {item.price.toLocaleString()} each
        </div>

        {/* Remove Button */}
        <button
          onClick={handleRemove}
          className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium"
        >
          <Trash2 className="h-4 w-4" />
          Remove
        </button>
      </div>

      {/* Mobile Quantity & Remove */}
      <div className="md:hidden flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="p-1 border border-gray-300 rounded"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="px-2 text-sm">{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={item.quantity >= item.stock}
            className="p-1 border border-gray-300 rounded"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
        <button
          onClick={handleRemove}
          className="p-1 text-red-600 hover:text-red-700"
          aria-label="Remove item"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
