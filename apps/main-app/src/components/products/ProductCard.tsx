import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../lib/stores/cartStore';
import type { Product } from '../../types';

interface ProductCardProps {
  product: any; // Flexible type to handle Supabase response with relations
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  // Calculate average rating
  const avgRating = product.reviews && product.reviews.length > 0
    ? product.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / product.reviews.length
    : 0;

  // Get first image or placeholder
  const images = Array.isArray(product.images) ? product.images : [];
  const imageUrl = images[0] || '/placeholder-product.png';

  // Check if product is on sale
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = onSale
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  // Stock status
  const inStock = product.stock > 0;
  const lowStock = product.stock > 0 && product.stock <= product.lowStockThreshold;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!inStock) return;

    addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: imageUrl,
    });

    // TODO: Show toast notification
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {onSale && (
            <span className="px-2 py-1 bg-brand-danger text-white text-xs font-bold rounded">
              -{discountPercent}%
            </span>
          )}
          {product.isFeatured && (
            <span className="px-2 py-1 bg-brand-primary text-white text-xs font-bold rounded">
              Featured
            </span>
          )}
          {lowStock && inStock && (
            <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded">
              Low Stock
            </span>
          )}
          {!inStock && (
            <span className="px-2 py-1 bg-gray-500 text-white text-xs font-bold rounded">
              Out of Stock
            </span>
          )}
        </div>

        {/* Quick Add to Cart */}
        {inStock && (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-2 right-2 p-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-primary hover:text-white"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Vendor Name */}
        {product.vendor && (
          <p className="text-xs text-gray-500 mb-1 truncate">
            {product.vendor.businessName}
          </p>
        )}

        {/* Product Name */}
        <h3 className="font-semibold text-brand-navy mb-2 line-clamp-2 group-hover:text-brand-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        {avgRating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= avgRating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">
              ({product.reviews?.length || 0})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-brand-navy">
            {product.currency} {product.price.toLocaleString()}
          </span>
          {onSale && (
            <span className="text-sm text-gray-500 line-through">
              {product.currency} {product.compareAtPrice?.toLocaleString()}
            </span>
          )}
        </div>

        {/* Stock Info */}
        {lowStock && inStock && (
          <p className="text-xs text-orange-600 mt-2">
            Only {product.stock} left in stock
          </p>
        )}
      </div>
    </Link>
  );
}
