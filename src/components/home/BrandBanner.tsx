'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function BrandBanner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);

  return (
    <section
      ref={ref}
      id="brand-banner"
      className="relative py-28 md:py-40 bg-[#0c0b08] overflow-hidden border-y border-white/5"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-[#0c0b08] to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(201,168,76,0.07),transparent)]" />

      {/* Scrolling large text background */}
      <motion.div
        style={{ x }}
        className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-display text-[clamp(6rem,18vw,20rem)] text-white/[0.025] whitespace-nowrap leading-none tracking-tight"
        >
          CLOSING® CLOSING® CLOSING®
        </span>
      </motion.div>

      {/* Center content */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 lg:px-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-px w-24 bg-gold mb-10 origin-left"
        />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-[clamp(2.2rem,6vw,5.5rem)] text-white tracking-[0.05em] leading-tight max-w-4xl"
        >
          American vintage.
          <br />
          <em className="text-gold not-italic">Curado con propósito.</em>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white/30 text-sm md:text-base max-w-lg mt-6 leading-relaxed"
        >
          Cada prenda pasa por nuestros ojos antes de llegar a los tuyos.
          Calidad sobre cantidad. Siempre.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-px w-24 bg-gold mt-10 origin-right"
        />
      </div>
    </section>
  );
}
