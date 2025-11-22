import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  stock: number; // Available stock
  image?: string;
  variant?: Record<string, string>;
  vendorId: string;
  vendorName: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getSubtotal: () => number;
  getItemsByVendor: () => Map<string, CartItem[]>;
  validateCart: () => Promise<CartValidationResult>;
}

export interface CartValidationResult {
  isValid: boolean;
  errors: CartValidationError[];
  warnings: CartValidationWarning[];
}

export interface CartValidationError {
  itemId: string;
  type: 'out_of_stock' | 'product_inactive' | 'price_changed' | 'variant_unavailable';
  message: string;
  currentValue?: any;
  expectedValue?: any;
}

export interface CartValidationWarning {
  itemId: string;
  type: 'low_stock' | 'price_increase';
  message: string;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          // Check if item already exists (same product + variant)
          const variantKey = item.variant ? JSON.stringify(item.variant) : '';
          const existingItem = state.items.find(
            (i) => i.productId === item.productId && JSON.stringify(i.variant || '') === variantKey
          );

          if (existingItem) {
            // Update quantity, but don't exceed stock
            const newQuantity = Math.min(
              existingItem.quantity + (item.quantity || 1),
              item.stock
            );

            return {
              items: state.items.map((i) =>
                i.id === existingItem.id
                  ? { ...i, quantity: newQuantity }
                  : i
              ),
            };
          }

          // Add new item with quantity limited by stock
          const quantity = Math.min(item.quantity || 1, item.stock);

          return {
            items: [
              ...state.items,
              {
                ...item,
                quantity,
                id: item.id || `${item.productId}-${Date.now()}-${Math.random()}`,
              },
            ],
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === id) {
              // Don't exceed available stock
              const newQuantity = Math.min(quantity, item.stock);
              return { ...item, quantity: newQuantity };
            }
            return item;
          }),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getSubtotal: () => {
        return get().getTotalPrice();
      },

      getItemsByVendor: () => {
        const itemsByVendor = new Map<string, CartItem[]>();
        
        get().items.forEach((item) => {
          const vendorItems = itemsByVendor.get(item.vendorId) || [];
          vendorItems.push(item);
          itemsByVendor.set(item.vendorId, vendorItems);
        });

        return itemsByVendor;
      },

      validateCart: async () => {
        const errors: CartValidationError[] = [];
        const warnings: CartValidationWarning[] = [];
        const items = get().items;

        // In a real implementation, this would fetch current product data from Supabase
        // For now, we'll validate based on the data we have in the cart
        
        items.forEach((item) => {
          // Check stock availability
          if (item.stock === 0) {
            errors.push({
              itemId: item.id,
              type: 'out_of_stock',
              message: `${item.name} is out of stock`,
            });
          } else if (item.quantity > item.stock) {
            errors.push({
              itemId: item.id,
              type: 'out_of_stock',
              message: `Only ${item.stock} units of ${item.name} available`,
              currentValue: item.quantity,
              expectedValue: item.stock,
            });
          } else if (item.stock <= 5) {
            warnings.push({
              itemId: item.id,
              type: 'low_stock',
              message: `Only ${item.stock} units left`,
            });
          }
        });

        return {
          isValid: errors.length === 0,
          errors,
          warnings,
        };
      },
    }),
    {
      name: 'bazaar-cart-storage',
      // Add version for future migrations
      version: 1,
      // Optionally add expiration (7 days)
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);
