'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { subscribeToNewsletter } from '@/app/actions';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    
    const result = await subscribeToNewsletter(email);
    
    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  }

  return (
    <section id="newsletter" className="py-24 bg-[#080807] border-y border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(201,168,76,0.06),transparent)]" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gold text-xs font-medium tracking-[0.3em] uppercase mb-4">
            — Únete al movimiento
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white tracking-widest mb-4">
            STAY IN<br/>THE LOOP
          </h2>
          <p className="text-white/40 text-sm leading-relaxed mb-10">
            Nuevos ingresos, drops exclusivos y acceso anticipado. Sin spam. Solo
            lo que importa.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {status === 'success' ? (
            <div className="flex flex-col items-center gap-3 text-gold">
              <CheckCircle size={32} strokeWidth={1.5} />
              <p className="font-display text-2xl tracking-widest">¡BIENVENIDO!</p>
              <p className="text-white/40 text-sm">Ya eres parte de CLOSING®.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-0 border border-white/10 focus-within:border-gold/40 transition-colors duration-300"
            >
              <input
                type="email"
                id="newsletter-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="flex-1 bg-transparent px-5 py-4 text-white text-sm placeholder-white/20 outline-none focus:placeholder-white/10 transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="group flex items-center justify-center gap-2 bg-gold text-black px-7 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#dfc06a] disabled:opacity-60 transition-all duration-200 flex-shrink-0"
              >
                {status === 'loading' ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  <>
                    SUSCRIBIRSE
                    <ArrowRight
                      size={13}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="text-red-400 text-xs mt-3">
              Algo salió mal. Inténtalo de nuevo.
            </p>
          )}

          <p className="text-white/20 text-[10px] mt-4 tracking-wide">
            Sin spam. Puedes darte de baja en cualquier momento.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
