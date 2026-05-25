'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const collections = [
  {
    id: 'cargos',
    label: 'Cargos',
    description: 'Multipocket. Ripstop. Sin filtros.',
    href: '/pantalones/cargos',
    gradient: 'from-[#2a2418] via-[#1a1610] to-[#0a0a0a]',
    accent: '🪖',
  },
  {
    id: 'bucket-hats',
    label: 'Bucket Hats',
    description: 'El accesorio del movimiento.',
    href: '/accesorios/bucket-hats',
    gradient: 'from-[#1a1a2e] via-[#111120] to-[#0a0a0a]',
    accent: '🪣',
  },
  {
    id: 'outdoor',
    label: 'Outdoor',
    description: 'Para el concreto y el cerro.',
    href: '/pantalones/outdoor',
    gradient: 'from-[#1a2210] via-[#111509] to-[#0a0a0a]',
    accent: '🏕️',
  },
  {
    id: 'streetwear',
    label: 'Streetwear',
    description: 'La esencia de CLOSING®.',
    href: '/tienda',
    gradient: 'from-[#221818] via-[#150f0f] to-[#0a0a0a]',
    accent: '🔥',
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function CollectionCards() {
  return (
    <section id="colecciones" className="py-20 bg-[#0A0A0A]">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-gold text-xs font-medium tracking-[0.3em] uppercase mb-2">
            — Shop by collection
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white tracking-widest">
            COMPRA POR<br className="md:hidden" /> COLECCIÓN
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {collections.map((col) => (
            <motion.div key={col.id} variants={cardVariants}>
              <Link
                href={col.href}
                id={`collection-${col.id}`}
                className="group block relative aspect-[3/4] rounded-sm overflow-hidden border border-white/5 hover:border-gold/20 transition-all duration-500"
              >
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${col.gradient} transition-all duration-500`}
                />

                {/* Large emoji decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 select-none pointer-events-none">
                  {col.accent}
                </div>

                {/* Gold border glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-gold/10 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-3xl text-white tracking-widest mb-1 group-hover:text-gold transition-colors duration-300">
                    {col.label}
                  </h3>
                  <p className="text-white/40 text-xs leading-relaxed mb-4">
                    {col.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-gold text-xs font-medium tracking-[0.2em] uppercase group-hover:gap-3 transition-all duration-300">
                    Explorar
                    <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
