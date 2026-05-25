'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import type { Category } from '@/lib/types';

interface FilterSidebarProps {
  categories: Category[];
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const PRICE_RANGES = [
  { label: 'Todos los precios', min: undefined, max: undefined },
  { label: 'Hasta $15.000',    min: undefined, max: 15000 },
  { label: '$15.000 – $25.000', min: 15000,   max: 25000 },
  { label: '$25.000 – $35.000', min: 25000,   max: 35000 },
  { label: 'Más de $35.000',   min: 35000,    max: undefined },
];

export default function FilterSidebar({
  categories,
  isMobileOpen = false,
  onMobileClose,
}: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get('categoria') ?? '';
  const activeMinPrice = searchParams.get('min') ? Number(searchParams.get('min')) : undefined;
  const activeMaxPrice = searchParams.get('max') ? Number(searchParams.get('max')) : undefined;

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null) params.delete(key);
      else params.set(key, value);
      params.delete('page'); // reset pagination
      router.push(`/tienda?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handlePriceRange = (min?: number, max?: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (min === undefined) params.delete('min'); else params.set('min', String(min));
    if (max === undefined) params.delete('max'); else params.set('max', String(max));
    params.delete('page');
    router.push(`/tienda?${params.toString()}`);
  };

  const handleClearAll = () => router.push('/tienda');

  const hasActiveFilters = activeCategory || activeMinPrice || activeMaxPrice;

  const content = (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <SlidersHorizontal size={14} strokeWidth={1.5} />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase">Filtros</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleClearAll}
            className="text-[10px] text-gold/70 hover:text-gold tracking-widest uppercase transition-colors"
          >
            Limpiar todo
          </button>
        )}
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-white/40 text-[10px] font-semibold tracking-[0.25em] uppercase mb-4">
          Categoría
        </h3>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => updateParam('categoria', null)}
              className={`w-full text-left text-sm py-1.5 transition-colors duration-150 ${
                !activeCategory ? 'text-gold font-medium' : 'text-white/50 hover:text-white'
              }`}
            >
              Todas las categorías
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => updateParam('categoria', cat.slug)}
                className={`w-full text-left text-sm py-1.5 transition-colors duration-150 flex items-center justify-between group ${
                  activeCategory === cat.slug
                    ? 'text-gold font-medium'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {cat.name}
                {activeCategory === cat.slug && (
                  <span className="w-1 h-1 rounded-full bg-gold" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-px bg-white/5" />

      {/* Price range */}
      <div>
        <h3 className="text-white/40 text-[10px] font-semibold tracking-[0.25em] uppercase mb-4">
          Precio
        </h3>
        <ul className="space-y-1">
          {PRICE_RANGES.map((range) => {
            const isActive =
              activeMinPrice === range.min && activeMaxPrice === range.max;
            return (
              <li key={range.label}>
                <button
                  onClick={() => handlePriceRange(range.min, range.max)}
                  className={`w-full text-left text-sm py-1.5 transition-colors duration-150 flex items-center justify-between ${
                    isActive ? 'text-gold font-medium' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {range.label}
                  {isActive && <span className="w-1 h-1 rounded-full bg-gold" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );

  // Mobile overlay version
  if (isMobileOpen) {
    return (
      <div className="fixed inset-0 z-50 flex">
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onMobileClose}
        />
        <aside className="relative ml-auto w-72 h-full bg-[#0f0f0f] border-l border-white/8 p-8 overflow-y-auto">
          <button
            onClick={onMobileClose}
            className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors"
            aria-label="Cerrar filtros"
          >
            <X size={18} />
          </button>
          {content}
        </aside>
      </div>
    );
  }

  return <aside className="w-52 flex-shrink-0">{content}</aside>;
}
