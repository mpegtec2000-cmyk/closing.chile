'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useCartStore } from '@/lib/cart';
import { formatCLP } from '@/lib/utils';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, subtotal, totalItems } =
    useCartStore();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [closeCart]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const total = subtotal();
  const count = totalItems();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#0d0d0d] border-l border-white/8 flex flex-col shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Carrito de compras"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
              <div className="flex items-center gap-3">
                <ShoppingBag size={16} strokeWidth={1.5} className="text-gold" />
                <span className="font-display text-xl text-white tracking-widest">
                  CARRITO
                </span>
                {count > 0 && (
                  <span className="bg-gold text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                aria-label="Cerrar carrito"
                className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors rounded-sm hover:bg-white/5"
              >
                <X size={16} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-2">
              {items.length === 0 ? (
                <EmptyCart onClose={closeCart} />
              ) : (
                <ul className="divide-y divide-white/5">
                  {items.map((item) => (
                    <CartItemRow
                      key={`${item.id}-${item.size}`}
                      item={item}
                      onRemove={() => removeItem(item.id, item.size)}
                      onUpdateQty={(qty) => updateQty(item.id, item.size, qty)}
                    />
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/8 px-6 py-6 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-sm">Subtotal</span>
                  <span className="text-white font-semibold text-lg">
                    {formatCLP(total)}
                  </span>
                </div>

                {/* Shipping note */}
                <p className="text-white/25 text-xs leading-relaxed">
                  Envío calculado al momento del pago. Envíos a todo Chile.
                </p>

                {/* Checkout button */}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  id="cart-checkout-btn"
                  className="group w-full flex items-center justify-center gap-3 bg-gold text-black py-4 text-sm font-bold tracking-[0.15em] uppercase hover:bg-gold-light transition-colors duration-200"
                >
                  FINALIZAR COMPRA
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>

                {/* Continue shopping */}
                <button
                  onClick={closeCart}
                  className="w-full text-center text-white/30 text-xs hover:text-white/60 transition-colors tracking-widest uppercase py-1"
                >
                  Seguir comprando
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── CartItemRow ─────────────────────────────────────────── */
function CartItemRow({
  item,
  onRemove,
  onUpdateQty,
}: {
  item: ReturnType<typeof useCartStore>['items'][number];
  onRemove: () => void;
  onUpdateQty: (qty: number) => void;
}) {
  return (
    <li className="flex gap-4 px-6 py-5">
      {/* Image */}
      <div className="w-20 h-24 flex-shrink-0 bg-white/5 rounded-sm overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/10">
            <ShoppingBag size={20} strokeWidth={1} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <Link
            href={`/producto/${item.slug}`}
            className="text-white text-sm font-medium leading-snug hover:text-gold transition-colors line-clamp-2"
          >
            {item.name}
          </Link>
          <p className="text-white/30 text-xs mt-1 tracking-widest uppercase">
            Talla: {item.size}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          {/* Qty controls */}
          <div className="flex items-center gap-1 border border-white/10 rounded-sm">
            <button
              onClick={() => onUpdateQty(item.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Disminuir cantidad"
            >
              <Minus size={10} />
            </button>
            <span className="w-8 text-center text-white text-xs font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQty(item.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Aumentar cantidad"
            >
              <Plus size={10} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-semibold">
              {formatCLP(item.price * item.quantity)}
            </span>
            <button
              onClick={onRemove}
              aria-label="Eliminar producto"
              className="w-6 h-6 flex items-center justify-center text-white/20 hover:text-red-400 transition-colors"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

/* ─── EmptyCart ───────────────────────────────────────────── */
function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8 py-20">
      <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-6">
        <ShoppingBag size={24} strokeWidth={1} className="text-white/20" />
      </div>
      <p className="font-display text-2xl text-white tracking-widest mb-2">
        CARRITO VACÍO
      </p>
      <p className="text-white/30 text-sm mb-8">
        Todavía no has agregado nada. Explora la tienda y encuentra algo que te guste.
      </p>
      <Link
        href="/tienda"
        onClick={onClose}
        className="inline-flex items-center gap-2 bg-gold text-black px-6 py-3 text-xs font-bold tracking-[0.15em] uppercase hover:bg-gold-light transition-colors"
      >
        IR A LA TIENDA
        <ArrowRight size={12} />
      </Link>
    </div>
  );
}
