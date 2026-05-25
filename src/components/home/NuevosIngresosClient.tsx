'use client';

import { motion } from 'framer-motion';
import ProductCard from '@/components/ui/ProductCard';
import { ProductGridSkeleton } from '@/components/ui/Skeletons';
import type { Product } from '@/lib/types';

interface NuevosIngresosClientProps {
  products: Product[];
}

export default function NuevosIngresosClient({ products }: NuevosIngresosClientProps) {
  if (products.length === 0) {
    // Fallback skeleton while waiting for first publish
    return <ProductGridSkeleton count={6} />;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: i * 0.07 }}
        >
          <ProductCard product={product} index={i} />
        </motion.div>
      ))}
    </div>
  );
}
