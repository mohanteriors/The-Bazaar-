'use client';

import { useState } from 'react';
import { Star, ShoppingCart, Heart, Share2, Package, Shield, Truck } from 'lucide-react';
import { useCartStore } from '../../lib/stores/cartStore';

interface ProductInfoProps {
  product: any;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  // Calculate average rating
  const reviews = product.reviews || [];
  const avgRating = reviews.length > 0
    ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length
    : 0;

  // Parse variants if they exist
  const variants = product.hasVariants && product.variants
    ? (typeof product.variants === 'string' ? JSON.parse(product.variants) : product.variants)
    : null;

  // Stock status
  const inStock = product.stock > 0;
  const lowStock = product.stock > 0 && product.stock <= product.lowStockThreshold;

  // Price calculations
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = onSale
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!inStock) return;

    const images = Array.isArray(product.images) ? product.images : [];
    
    addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      stock: product.stock,
      quantity,
      image: images[0] || '/placeholder-product.png',
      variant: selectedVariant,
      vendorId: product.vendor?.id || product.vendorId,
      vendorName: product.vendor?.businessName || 'Unknown Vendor',
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl p-6 lg:p-8 space-y-6">
      {/* Product Name */}
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-2">
          {product.name}
        </h1>
        {product.sku && (
          <p className="text-sm text-gray-500">SKU: {product.sku}</p>
        )}
      </div>

      {/* Rating */}
      {reviews.length > 0 && (
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= avgRating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {avgRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
          </span>
        </div>
      )}

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-bold text-brand-navy">
          {product.currency} {product.price.toLocaleString()}
        </span>
        {onSale && (
          <>
            <span className="text-xl text-gray-500 line-through">
              {product.currency} {product.compareAtPrice.toLocaleString()}
            </span>
            <span className="px-3 py-1 bg-brand-danger text-white text-sm font-bold rounded">
              Save {discountPercent}%
            </span>
          </>
        )}
      </div>

      {/* Stock Status */}
      <div>
        {inStock ? (
          <div className="flex items-center gap-2 text-green-600">
            <Package className="h-5 w-5" />
            <span className="font-medium">
              {lowStock ? `Only ${product.stock} left in stock` : 'In Stock'}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-red-600">
            <Package className="h-5 w-5" />
            <span className="font-medium">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Variant Selection */}
      {variants && (
        <div className="space-y-4">
          {Object.entries(variants).map(([variantType, options]: [string, any]) => (
            <div key={variantType}>
              <label className="block text-sm font-medium text-brand-navy mb-2">
                {variantType}
              </label>
              <div className="flex flex-wrap gap-2">
                {options.map((option: string) => (
                  <button
                    key={option}
                    onClick={() => setSelectedVariant({ ...selectedVariant, [variantType]: option })}
                    className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                      selectedVariant?.[variantType] === option
                        ? 'border-brand-primary bg-brand-primary text-white'
                        : 'border-gray-300 hover:border-brand-primary'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quantity Selector */}
      <div>
        <label className="block text-sm font-medium text-brand-navy mb-2">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-brand-primary font-semibold"
            disabled={!inStock}
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-20 text-center px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-brand-primary"
            min="1"
            max={product.stock}
            disabled={!inStock}
          />
          <button
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-brand-primary font-semibold"
            disabled={!inStock}
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold text-lg transition-all ${
            addedToCart
              ? 'bg-green-600 text-white'
              : inStock
              ? 'bg-brand-primary text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="h-5 w-5" />
          {addedToCart ? 'Added to Cart!' : inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
        <button
          className="px-6 py-4 border-2 border-brand-primary text-brand-primary rounded-lg font-semibold hover:bg-brand-primary hover:text-white transition-all"
          aria-label="Add to wishlist"
        >
          <Heart className="h-5 w-5" />
        </button>
        <button
          className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-brand-primary hover:text-brand-primary transition-all"
          aria-label="Share product"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      {/* Product Description */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-brand-navy mb-3">Description</h3>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {product.description}
        </p>
      </div>

      {/* Trust Badges */}
      <div className="pt-6 border-t border-gray-200 space-y-3">
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <Shield className="h-5 w-5 text-brand-primary" />
          <span>Secure payment & buyer protection</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <Truck className="h-5 w-5 text-brand-primary" />
          <span>Free shipping on orders over KES 5,000</span>
        </div>
      </div>
    </div>
  );
}
