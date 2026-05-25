'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface EnrichedCategory {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  shortDesc: string;
}

export default function CategoryNavClient({
  categories,
}: {
  categories: EnrichedCategory[];
}) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat, i) => (
        <motion.div
          key={cat.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, delay: i * 0.07 }}
        >
          <Link
            href={`/tienda?categoria=${cat.slug}`}
            id={`category-${cat.slug}`}
            className="group flex flex-col items-center gap-3 flex-shrink-0 w-32 py-5 px-4 rounded-sm border border-white/8 bg-white/2 hover:border-gold/40 hover:bg-gold/5 transition-all duration-300"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
              {cat.emoji}
            </span>
            <div className="text-center">
              <p className="text-white text-xs font-semibold tracking-[0.1em] uppercase">
                {cat.name}
              </p>
              <p className="text-white/30 text-[10px] mt-0.5 tracking-wide">
                {cat.shortDesc}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
