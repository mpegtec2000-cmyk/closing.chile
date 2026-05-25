'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ui/ProductCard';
import FilterSidebar from '@/components/tienda/FilterSidebar';
import SortBar from '@/components/tienda/SortBar';
import { ProductGridSkeleton } from '@/components/ui/Skeletons';
import type { Product, Category } from '@/lib/types';

interface TiendaClientProps {
  products: Product[];
  categories: Category[];
  isLoading?: boolean;
}

export default function TiendaClient({
  products,
  categories,
  isLoading = false,
}: TiendaClientProps) {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  return (
    <div className="flex gap-12">
      {/* Desktop Filter Sidebar */}
      <div className="hidden lg:block">
        <FilterSidebar categories={categories} />
      </div>

      {/* Mobile Filter Overlay */}
      {mobileFilterOpen && (
        <FilterSidebar
          categories={categories}
          isMobileOpen={true}
          onMobileClose={() => setMobileFilterOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <SortBar
          totalCount={products.length}
          onMobileFilterOpen={() => setMobileFilterOpen(true)}
        />

        {isLoading ? (
          <ProductGridSkeleton count={9} />
        ) : products.length === 0 ? (
          <EmptyState />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          >
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="text-5xl mb-6">👕</div>
      <h3 className="font-display text-2xl text-white tracking-widest mb-2">
        SIN RESULTADOS
      </h3>
      <p className="text-white/30 text-sm max-w-xs">
        No encontramos productos con esos filtros. Prueba cambiando la categoría o el rango de precio.
      </p>
    </div>
  );
}
