import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ShippingAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  cost: number;
  estimatedDays: string;
}

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: 'Delivery in 5-7 business days',
    cost: 0, // Free over KES 5,000
    estimatedDays: '5-7 days',
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: 'Delivery in 2-3 business days',
    cost: 500,
    estimatedDays: '2-3 days',
  },
  {
    id: 'same-day',
    name: 'Same-Day Delivery',
    description: 'Nairobi only - Order before 12pm',
    cost: 1000,
    estimatedDays: 'Same day',
  },
];

interface CheckoutStore {
  currentStep: number;
  shippingAddress: ShippingAddress | null;
  shippingMethod: ShippingMethod | null;
  orderNotes: string;
  
  setCurrentStep: (step: number) => void;
  setShippingAddress: (address: ShippingAddress) => void;
  setShippingMethod: (method: ShippingMethod) => void;
  setOrderNotes: (notes: string) => void;
  resetCheckout: () => void;
  canProceedToStep: (step: number) => boolean;
}

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      shippingAddress: null,
      shippingMethod: null,
      orderNotes: '',

      setCurrentStep: (step) => {
        // Validate that we can proceed to this step
        if (get().canProceedToStep(step)) {
          set({ currentStep: step });
        }
      },

      setShippingAddress: (address) => {
        set({ shippingAddress: address });
      },

      setShippingMethod: (method) => {
        set({ shippingMethod: method });
      },

      setOrderNotes: (notes) => {
        set({ orderNotes: notes });
      },

      resetCheckout: () => {
        set({
          currentStep: 1,
          shippingAddress: null,
          shippingMethod: null,
          orderNotes: '',
        });
      },

      canProceedToStep: (step) => {
        const state = get();
        
        switch (step) {
          case 1:
            return true; // Can always go to step 1
          case 2:
            return state.shippingAddress !== null; // Need address for step 2
          case 3:
            return state.shippingAddress !== null && state.shippingMethod !== null; // Need both for step 3
          default:
            return false;
        }
      },
    }),
    {
      name: 'bazaar-checkout-storage',
      // Only persist for current session
      partialize: (state) => ({
        shippingAddress: state.shippingAddress,
        shippingMethod: state.shippingMethod,
        orderNotes: state.orderNotes,
      }),
    }
  )
);
