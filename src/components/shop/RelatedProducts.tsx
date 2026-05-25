import { getRelatedProducts } from '@/lib/queries';
import ProductCard from '@/components/ui/ProductCard';

export default async function RelatedProducts({ categoryId, excludeId }: { categoryId: string, excludeId: string }) {
  const products = await getRelatedProducts(categoryId, excludeId, 4);

  if (products.length === 0) return null;

  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <h2 className="font-display text-2xl text-white tracking-widest mb-10 text-center uppercase">
          También te podría gustar
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
