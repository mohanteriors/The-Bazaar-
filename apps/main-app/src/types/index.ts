// User Types
export interface User {
  id: string;
  email: string;
  role: 'SHOPPER' | 'VENDOR' | 'ADMIN' | 'SUPER_ADMIN';
  status: 'ACTIVE' | 'SUSPENDED' | 'BANNED' | 'PENDING_VERIFICATION';
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Product Types
export interface Product {
  id: string;
  vendorId: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
  price: number;
  compareAtPrice?: number;
  currency: string;
  sku?: string;
  stock: number;
  lowStockThreshold: number;
  hasVariants: boolean;
  variants?: ProductVariant[];
  status: 'DRAFT' | 'ACTIVE' | 'INACTIVE' | 'PENDING_REVIEW' | 'REJECTED';
  isActive: boolean;
  isFeatured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface ProductVariant {
  id: string;
  name: string;
  options: Record<string, string>;
  price: number;
  stock: number;
  sku?: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  parentId?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Cart Types
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variant?: Record<string, string>;
}

// Order Types
export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  vendorId: string;
  shippingAddressId: string;
  shippingMethod?: string;
  shippingCost: number;
  trackingNumber?: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  currency: string;
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED' | 'DISPUTED';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  confirmedAt?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
}

// Address Types
export interface Address {
  id: string;
  userId: string;
  label?: string;
  street: string;
  city: string;
  state?: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Vendor Types
export interface Vendor {
  id: string;
  userId: string;
  businessName: string;
  businessType?: string;
  taxId?: string;
  description?: string;
  logo?: string;
  kycStatus: 'PENDING_APPROVAL' | 'ACTIVE' | 'SUSPENDED' | 'REJECTED' | 'UNDER_REVIEW';
  commissionRate: number;
  createdAt: Date;
  updatedAt: Date;
}

// Review Types
export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  isVerified: boolean;
  isHidden: boolean;
  createdAt: Date;
  updatedAt: Date;
}
