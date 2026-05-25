'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { formatCLP, discountPercent } from '@/lib/utils';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const hasDiscount = product.compare_price && product.compare_price > product.price;
  const discount = hasDiscount
    ? discountPercent(product.compare_price!, product.price)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative"
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#111] rounded-sm mb-4">
        {/* Product image */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent transition-opacity duration-500 ${
            imageLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onLoad={() => setImageLoaded(true)}
          />
        ) : (
          /* Placeholder when no image */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/10">
            <ShoppingBag size={40} strokeWidth={1} />
            <span className="text-xs tracking-widest uppercase">{product.name}</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.is_new && (
            <span className="bg-gold text-black text-[9px] font-bold tracking-[0.15em] uppercase px-2 py-1">
              NEW
            </span>
          )}
          {product.is_sale && hasDiscount && (
            <span className="bg-white text-black text-[9px] font-bold tracking-[0.15em] uppercase px-2 py-1">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          aria-label={wishlisted ? 'Quitar de wishlist' : 'Agregar a wishlist'}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10 transition-all duration-200 hover:border-gold/50 hover:bg-black/70"
        >
          <Heart
            size={14}
            className={`transition-all duration-200 ${
              wishlisted ? 'fill-gold text-gold' : 'text-white/60'
            }`}
          />
        </button>

        {/* Quick add overlay */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full bg-gold text-black text-[11px] font-semibold tracking-[0.15em] uppercase py-3 hover:bg-[#dfc06a] transition-colors duration-200">
            Agregar al carrito
          </button>
        </div>
      </div>

      {/* Info */}
      <div>
        <Link
          href={`/producto/${product.slug}`}
          className="block text-white/80 text-sm font-medium hover:text-white transition-colors duration-200 leading-snug mb-1"
        >
          {product.name}
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-white font-semibold text-sm">
            {formatCLP(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-white/30 text-xs line-through">
              {formatCLP(product.compare_price!)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
