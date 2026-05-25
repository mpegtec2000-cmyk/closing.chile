'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import type { SortOption } from '@/lib/queries';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest',     label: 'Más nuevos' },
  { value: 'price_asc',  label: 'Precio: menor a mayor' },
  { value: 'price_desc', label: 'Precio: mayor a menor' },
  { value: 'name_asc',   label: 'Nombre A–Z' },
];

interface SortBarProps {
  totalCount: number;
  onMobileFilterOpen: () => void;
}

export default function SortBar({ totalCount, onMobileFilterOpen }: SortBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeSort = (searchParams.get('orden') as SortOption) ?? 'newest';

  const handleSort = (value: SortOption) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('orden', value);
    params.delete('page');
    router.push(`/tienda?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between gap-4 mb-8 pb-5 border-b border-white/5">
      <p className="text-white/30 text-xs tracking-wide">
        <span className="text-white font-medium">{totalCount}</span>{' '}
        {totalCount === 1 ? 'producto' : 'productos'}
      </p>

      <div className="flex items-center gap-3">
        {/* Mobile filter toggle */}
        <button
          onClick={onMobileFilterOpen}
          className="lg:hidden flex items-center gap-1.5 text-white/50 text-xs hover:text-white transition-colors border border-white/10 px-3 py-2 rounded-sm"
        >
          <SlidersHorizontal size={12} />
          Filtros
        </button>

        {/* Sort select */}
        <div className="relative">
          <select
            value={activeSort}
            onChange={(e) => handleSort(e.target.value as SortOption)}
            className="appearance-none bg-transparent border border-white/10 text-white/60 text-xs px-4 py-2 pr-8 rounded-sm hover:border-white/20 focus:outline-none focus:border-gold/50 transition-colors cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-[#111] text-white"
              >
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={12}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}
