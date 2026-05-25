import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductBySlug } from '@/lib/queries';
import { formatCLP } from '@/lib/utils';
import ImageGallery from '@/components/shop/ImageGallery';
import AddToCartButton from '@/components/shop/AddToCartButton';
import RelatedProducts from '@/components/shop/RelatedProducts';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Suspense } from 'react';
import { ProductGridSkeleton } from '@/components/ui/Skeletons';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Producto no encontrado | CLOSING®' };
  return {
    title: `${product.name} | CLOSING®`,
    description: product.description || `Compra ${product.name} en CLOSING®.`,
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-widest mb-8">
          <Link href="/" className="hover:text-gold transition-colors">Inicio</Link>
          <ChevronRight size={10} />
          <Link href="/tienda" className="hover:text-gold transition-colors">Tienda</Link>
          <ChevronRight size={10} />
          {product.category && (
            <>
              <Link href={`/tienda?categoria=${product.category.slug}`} className="hover:text-gold transition-colors">
                {product.category.name}
              </Link>
              <ChevronRight size={10} />
            </>
          )}
          <span className="text-white/80">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
          {/* Galería de imágenes */}
          <div className="lg:sticky lg:top-32 h-fit">
            <ImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Información del producto */}
          <div className="flex flex-col">
            {product.is_new && (
              <span className="inline-block px-2 py-1 bg-white/10 text-white text-[10px] uppercase tracking-widest w-fit mb-4">
                Nuevo Ingreso
              </span>
            )}

            <h1 className="font-display text-4xl lg:text-5xl text-white tracking-widest mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-2xl text-gold font-medium">
                {formatCLP(product.price)}
              </span>
              {product.compare_price && (
                <span className="text-white/30 text-lg line-through">
                  {formatCLP(product.compare_price)}
                </span>
              )}
            </div>

            <div className="prose prose-invert prose-sm text-white/60 mb-10 max-w-none">
              <p>{product.description}</p>
            </div>

            <AddToCartButton product={product} />

            {/* Detalles (estáticos por ahora) */}
            <div className="mt-12 space-y-4 border-t border-white/10 pt-8">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-white/60 text-sm tracking-widest uppercase">Composición</span>
                <span className="text-white text-sm">100% Algodón Heavyweight</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-white/60 text-sm tracking-widest uppercase">Envío</span>
                <span className="text-white text-sm">Despachos a todo Chile (1-3 días)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={<ProductGridSkeleton count={4} />}>
        {product.category && (
          <RelatedProducts categoryId={product.category.id} excludeId={product.id} />
        )}
      </Suspense>
    </div>
  );
}
