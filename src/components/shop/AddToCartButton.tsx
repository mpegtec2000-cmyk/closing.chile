'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/cart';
import type { Product } from '@/lib/types';
import { ShoppingBag } from 'lucide-react';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [error, setError] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError(true);
      return;
    }

    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0] || '',
      size: selectedSize,
    });
    setError(false);
  };

  return (
    <div className="space-y-6">
      {/* Selector de Talla */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/60 text-xs font-semibold tracking-widest uppercase">
            Talla
          </span>
          {error && (
            <span className="text-red-400 text-xs animate-pulse">
              Selecciona una talla
            </span>
          )}
        </div>
        <div className="grid grid-cols-5 gap-2">
          {product.sizes_available?.map((size) => (
            <button
              key={size}
              onClick={() => {
                setSelectedSize(size);
                setError(false);
              }}
              className={`py-3 text-sm font-medium transition-all duration-200 border rounded-sm ${
                selectedSize === size
                  ? 'border-gold text-gold bg-gold/5'
                  : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Botón de Agregar */}
      <button
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        className="w-full flex items-center justify-center gap-3 bg-gold text-black py-4 text-sm font-bold tracking-[0.15em] uppercase hover:bg-gold-light transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ShoppingBag size={18} strokeWidth={2} />
        {product.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
      </button>
    </div>
  );
}
