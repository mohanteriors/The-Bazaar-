# Main App - State Management & Data Fetching

This document outlines the state management and data fetching patterns used in the Main App (Shopper Portal).

## Overview

The Main App uses a combination of:
- **React Query (TanStack Query)** for server state management and data fetching
- **Zustand** for client-side state management (e.g., shopping cart)
- **Supabase Auth** for authentication state

## Providers

### QueryProvider
Location: `src/providers/QueryProvider.tsx`

Wraps the application with React Query's `QueryClientProvider`. Configured with:
- 5-minute stale time for cached data
- Single retry on failed requests
- Disabled refetch on window focus (development)

### AuthProvider
Location: `src/providers/AuthProvider.tsx`

Provides authentication state throughout the app:
- `user`: Current authenticated user
- `session`: Current session
- `loading`: Loading state
- `signOut()`: Sign out function

Usage:
```tsx
import { useAuth } from '@/providers/AuthProvider';

const { user, session, loading, signOut } = useAuth();
```

## Custom Hooks

### useUser
Location: `src/hooks/useUser.ts`

Fetches the current authenticated user using React Query.

```tsx
import { useUser } from '@/hooks/useUser';

const { data: user, isLoading, error } = useUser();
```

### useProducts
Location: `src/hooks/useProducts.ts`

Fetches products with optional filtering:

```tsx
import { useProducts } from '@/hooks/useProducts';

// Get all products
const { data: products } = useProducts();

// Get featured products
const { data: featured } = useProducts({ isFeatured: true, limit: 10 });

// Get products by category
const { data: categoryProducts } = useProducts({ categoryId: 'cat-id' });
```

### useProduct
Location: `src/hooks/useProducts.ts`

Fetches a single product by slug:

```tsx
import { useProduct } from '@/hooks/useProducts';

const { data: product, isLoading } = useProduct('product-slug');
```

### useCategories
Location: `src/hooks/useCategories.ts`

Fetches all active categories:

```tsx
import { useCategories } from '@/hooks/useCategories';

const { data: categories } = useCategories();
```

### useCategory
Location: `src/hooks/useCategories.ts`

Fetches a single category by slug:

```tsx
import { useCategory } from '@/hooks/useCategories';

const { data: category } = useCategory('category-slug');
```

## Zustand Stores

### Cart Store
Location: `src/lib/stores/cartStore.ts`

Manages shopping cart state with localStorage persistence:

```tsx
import { useCartStore } from '@/lib/stores/cartStore';

// In a component
const addItem = useCartStore((state) => state.addItem);
const items = useCartStore((state) => state.items);
const totalItems = useCartStore((state) => state.getTotalItems());
const totalPrice = useCartStore((state) => state.getTotalPrice());

// Add item to cart
addItem({
  id: 'unique-id',
  productId: 'product-id',
  name: 'Product Name',
  price: 1000,
  quantity: 1,
  image: '/image.jpg'
});

// Update quantity
updateQuantity('item-id', 2);

// Remove item
removeItem('item-id');

// Clear cart
clearCart();
```

## Data Flow

### Server State (React Query)
1. Component calls custom hook (e.g., `useProducts()`)
2. React Query checks cache
3. If stale or not cached, fetches from Supabase
4. Returns data with loading/error states
5. Automatically refetches based on configuration

### Client State (Zustand)
1. Component accesses store (e.g., `useCartStore()`)
2. Store returns current state
3. Component calls actions to update state
4. Store persists to localStorage
5. All subscribed components re-render

### Authentication State
1. AuthProvider initializes on app load
2. Listens for auth state changes from Supabase
3. Updates context when user signs in/out
4. Components access via `useAuth()` hook

## Best Practices

1. **Use React Query for server data**: Products, categories, orders, user profile
2. **Use Zustand for UI state**: Cart, filters, modals, temporary form state
3. **Use Context sparingly**: Only for auth and theme
4. **Optimize selectors**: Use specific selectors in Zustand to prevent unnecessary re-renders
5. **Handle loading states**: Always show loading UI while fetching
6. **Handle errors gracefully**: Display user-friendly error messages
7. **Invalidate queries**: After mutations, invalidate related queries to refetch fresh data

## Example: Adding to Cart with Optimistic Updates

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCartStore } from '@/lib/stores/cartStore';

function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  
  const handleAddToCart = () => {
    // Optimistically update UI
    addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
    
    // Show success message
    toast.success('Added to cart!');
  };
  
  return (
    <button onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
}
```

## Future Enhancements

- [ ] Add wishlist store
- [ ] Add search history store
- [ ] Add recently viewed products
- [ ] Add comparison feature
- [ ] Implement optimistic updates for orders
- [ ] Add offline support with service workers
