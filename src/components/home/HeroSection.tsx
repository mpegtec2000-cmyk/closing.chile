'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background gradient mesh */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0A0A0A] to-[#111008]" />
        {/* Atmospheric gold glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] bg-gold/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[30vw] h-[40vh] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 lg:px-10 w-full pt-24">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="h-px w-10 bg-gold" />
            <span className="text-gold text-xs font-medium tracking-[0.3em] uppercase">
              American Streetwear — Chile
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-[clamp(3.5rem,11vw,10rem)] leading-[0.9] tracking-[-0.01em] text-white mb-8"
          >
            ROPA
            <br />
            <span className="text-gold">AMERICANA</span>
            <br />
            CON ACTITUD
            <br />
            REAL.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/50 text-base md:text-lg max-w-md leading-relaxed mb-10"
          >
            Vintage americano curado pieza a pieza. Sin bullshit, sin fast
            fashion. Solo ropa que dice algo.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/tienda"
              id="hero-cta-primary"
              className="group relative inline-flex items-center gap-3 bg-gold text-black px-8 py-4 text-sm font-semibold tracking-[0.15em] uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.4)]"
            >
              <span className="relative z-10">IR A LA TIENDA</span>
              <ArrowRight
                size={16}
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
              />
              <span className="absolute inset-0 bg-[#dfc06a] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
            </Link>

            <Link
              href="/nuevos-ingresos"
              id="hero-cta-secondary"
              className="inline-flex items-center gap-2 text-white/60 text-sm font-medium tracking-widest uppercase hover:text-white transition-colors duration-200 group"
            >
              Nuevos ingresos
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/20 text-[10px] tracking-[0.3em] uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-gold/40 to-transparent"
          />
        </motion.div>
      </div>

      {/* Decorative right side text */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 opacity-20">
        <span
          className="text-white/60 text-[9px] tracking-[0.4em] uppercase"
          style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
        >
          Santiago — Chile — Est. 2024
        </span>
        <span className="w-px h-16 bg-white/20" />
      </div>
    </section>
  );
}
