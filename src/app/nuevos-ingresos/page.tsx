import type { Metadata } from 'next';
import { getProducts } from '@/lib/queries';
import TiendaClient from '@/components/tienda/TiendaClient';
import { getCategories } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'Nuevos Ingresos | CLOSING®',
  description: 'Descubre los últimos ingresos de streetwear en CLOSING®.',
};

export default async function NuevosIngresosPage() {
  const [products, categories] = await Promise.all([
    getProducts({ sort: 'newest', limit: 48 }),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="border-b border-white/5 pt-28 pb-10">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <h1 className="font-display text-5xl md:text-6xl text-white tracking-widest uppercase">
            Nuevos Ingresos
          </h1>
          <p className="text-white/40 text-sm mt-3 max-w-lg">
            Lo último que acaba de llegar a nuestra tienda. Stock limitado.
          </p>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-12">
        <TiendaClient products={products} categories={categories} />
      </div>
    </div>
  );
}
