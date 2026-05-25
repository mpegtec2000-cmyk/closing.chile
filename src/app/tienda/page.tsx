import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getProducts, getCategories } from '@/lib/queries';
import type { SortOption } from '@/lib/queries';
import TiendaClient from '@/components/tienda/TiendaClient';
import { ProductGridSkeleton } from '@/components/ui/Skeletons';

export const metadata: Metadata = {
  title: 'Tienda | CLOSING®',
  description:
    'Explora toda la colección CLOSING®. Cargos, denim, bucket hats, polerones, outdoor y más — ropa americana curada con propósito.',
};

interface TiendaPageProps {
  searchParams: {
    categoria?: string;
    orden?: SortOption;
    min?: string;
    max?: string;
    q?: string;
  };
}

export default async function TiendaPage({ searchParams }: TiendaPageProps) {
  const [products, categories] = await Promise.all([
    getProducts({
      category_slug: searchParams.categoria,
      sort: searchParams.orden ?? 'newest',
      min_price: searchParams.min ? Number(searchParams.min) : undefined,
      max_price: searchParams.max ? Number(searchParams.max) : undefined,
      search: searchParams.q,
      limit: 48,
    }),
    getCategories(),
  ]);

  const activeCategory = categories.find(
    (c) => c.slug === searchParams.categoria
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Page header */}
      <div className="border-b border-white/5 pt-28 pb-10">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/30 text-xs tracking-widest uppercase mb-6">
            <a href="/" className="hover:text-gold transition-colors">Inicio</a>
            <span>/</span>
            <span className={activeCategory ? 'hover:text-gold cursor-pointer' : 'text-white/60'}>
              <a href="/tienda">Tienda</a>
            </span>
            {activeCategory && (
              <>
                <span>/</span>
                <span className="text-white/60">{activeCategory.name}</span>
              </>
            )}
          </div>

          <h1 className="font-display text-5xl md:text-6xl text-white tracking-widest">
            {activeCategory ? activeCategory.name.toUpperCase() : 'TIENDA'}
          </h1>
          {activeCategory?.description && (
            <p className="text-white/40 text-sm mt-3 max-w-lg">
              {activeCategory.description}
            </p>
          )}
        </div>
      </div>

      {/* Main catalog */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-12">
        <Suspense fallback={<ProductGridSkeleton count={9} />}>
          <TiendaClient products={products} categories={categories} />
        </Suspense>
      </div>
    </div>
  );
}
