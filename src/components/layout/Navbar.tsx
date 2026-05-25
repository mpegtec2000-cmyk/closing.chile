'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
} from 'lucide-react';
import { useCartStore } from '@/lib/cart';

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Tienda', href: '/tienda' },
  { label: 'Hombre', href: '/tienda?genero=hombre' },
  { label: 'Mujer', href: '/tienda?genero=mujer' },
  { label: 'Pantalones', href: '/tienda?categoria=cargos' },
  { label: 'Polerones', href: '/tienda?categoria=polerones' },
  { label: 'Accesorios', href: '/tienda?categoria=accesorios' },
  { label: 'Nuevos Ingresos', href: '/nuevos-ingresos', highlight: true },
  { label: 'Sale', href: '/tienda?sale=true', sale: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleCart, totalItems } = useCartStore();

  // Hydration-safe cart count
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    setCartCount(totalItems());
    const unsub = useCartStore.subscribe((s) => setCartCount(s.totalItems()));
    return unsub;
  }, [totalItems]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-8 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <img 
              src="/logo.jpg" 
              alt="CLOSING Logo" 
              className="h-16 md:h-20 w-auto object-contain brightness-90 group-hover:brightness-110 transition-all duration-300 animate-pulse drop-shadow-xl"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-0">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`relative px-3 py-1.5 text-[11px] font-original font-extrabold tracking-[0.12em] uppercase transition-colors duration-200 group ${
                  link.sale
                    ? 'text-red-400 hover:text-red-300'
                    : link.highlight
                    ? 'text-gold hover:text-gold/80'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-3 right-3 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </nav>

          {/* Icon cluster */}
          <div className="flex items-center gap-1">
            <Link
              href="/buscar"
              aria-label="Buscar"
              className="w-9 h-9 flex items-center justify-center text-white/70 hover:text-gold transition-colors duration-200 rounded-sm hover:bg-white/5"
            >
              <Search size={18} strokeWidth={1.5} />
            </Link>
            <Link
              href="/cuenta"
              aria-label="Mi cuenta"
              className="w-9 h-9 flex items-center justify-center text-white/70 hover:text-gold transition-colors duration-200 rounded-sm hover:bg-white/5"
            >
              <User size={18} strokeWidth={1.5} />
            </Link>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="w-9 h-9 flex items-center justify-center text-white/70 hover:text-gold transition-colors duration-200 rounded-sm hover:bg-white/5"
            >
              <Heart size={18} strokeWidth={1.5} />
            </Link>

            {/* Cart with live badge */}
            <button
              onClick={toggleCart}
              aria-label={`Carrito — ${cartCount} items`}
              id="navbar-cart-btn"
              className="relative w-9 h-9 flex items-center justify-center text-white/70 hover:text-gold transition-colors duration-200 rounded-sm hover:bg-white/5"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute -top-0.5 -right-0.5 bg-gold text-black text-[9px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center leading-none"
                  >
                    {cartCount > 99 ? '99+' : cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
              className="xl:hidden w-9 h-9 flex items-center justify-center text-white/70 hover:text-gold transition-colors ml-1"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-80 bg-[#0f0f0f] border-l border-white/10 p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <img 
                  src="/logo.jpg" 
                  alt="CLOSING Logo" 
                  className="h-12 w-auto object-contain animate-pulse drop-shadow-md"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Cerrar menú"
                  className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex flex-col gap-1 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block py-3 text-sm font-original font-extrabold tracking-widest uppercase border-b border-white/5 transition-colors ${
                        link.sale
                          ? 'text-red-400'
                          : link.highlight
                          ? 'text-gold'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-white/10 flex gap-4">
                {[Search, User, Heart].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-gold transition-colors"
                  >
                    <Icon size={18} strokeWidth={1.5} />
                  </button>
                ))}
                <button
                  onClick={() => { setMobileOpen(false); toggleCart(); }}
                  className="relative w-10 h-10 flex items-center justify-center text-white/40 hover:text-gold transition-colors"
                >
                  <ShoppingBag size={18} strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-gold text-black text-[9px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
