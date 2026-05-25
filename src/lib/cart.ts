import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;         // product id
  slug: string;
  name: string;
  price: number;      // CLP
  image: string;      // first image url
  size: string;       // XS / S / M / L / XL
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string, size: string) => void;
  updateQty: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;

  // Derived
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart:   () => set({ isOpen: true }),
      closeCart:  () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (incoming) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.id === incoming.id && i.size === incoming.size
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === incoming.id && i.size === incoming.size
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
              isOpen: true,
            };
          }

          return {
            items: [...state.items, { ...incoming, quantity: 1 }],
            isOpen: true,
          };
        });
      },

      removeItem: (id, size) => {
        set((state) => ({
          items: state.items.filter((i) => !(i.id === id && i.size === size)),
        }));
      },

      updateQty: (id, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, size);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id && i.size === size ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: 'closing-cart',
      storage: createJSONStorage(() => localStorage),
      // Only persist items, not the open state
      partialize: (state) => ({ items: state.items }),
    }
  )
);
