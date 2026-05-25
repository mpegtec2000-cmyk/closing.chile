import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getProducts } from '@/lib/queries';
import NuevosIngresosClient from './NuevosIngresosClient';

export default async function NuevosIngresos() {
  const products = await getProducts({ sort: 'newest', limit: 6 });

  return (
    <section id="nuevos-ingresos" className="py-20 bg-[#0A0A0A]">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-gold text-xs font-medium tracking-[0.3em] uppercase mb-2">
              — Esta semana
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white tracking-widest">
              NUEVOS INGRESOS
            </h2>
          </div>
          <Link
            href="/nuevos-ingresos"
            className="group inline-flex items-center gap-2 text-white/40 text-xs font-medium tracking-[0.2em] uppercase hover:text-gold transition-colors duration-200"
          >
            Ver todos
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Grid — client component handles animations + wishlist state */}
        <NuevosIngresosClient products={products} />
      </div>
    </section>
  );
}
