'use client';

import { useCartStore } from '@/lib/cart';
import CartDrawer from '@/components/shop/CartDrawer';

/**
 * Mounts the CartDrawer at root level.
 * Must be a Client Component because it reads Zustand store.
 */
export default function CartProvider() {
  // Subscribing here ensures the drawer is always mounted
  useCartStore((s) => s.isOpen);
  return <CartDrawer />;
}
