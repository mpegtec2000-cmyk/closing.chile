'use client';

import Link from 'next/link';

// Inline SVG icons — avoids barrel optimizer issues with lucide-react
const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
  </svg>
);

const columns = {
  tienda: {
    title: 'Tienda',
    links: [
      { label: 'Nuevos Ingresos', href: '/nuevos-ingresos' },
      { label: 'Hombre', href: '/hombre' },
      { label: 'Mujer', href: '/mujer' },
      { label: 'Pantalones', href: '/pantalones' },
      { label: 'Polerones', href: '/polerones' },
      { label: 'Accesorios', href: '/accesorios' },
      { label: 'Sale', href: '/sale' },
    ],
  },
  ayuda: {
    title: 'Ayuda',
    links: [
      { label: 'Envíos y plazos', href: '/envios' },
      { label: 'Cambios y devoluciones', href: '/devoluciones' },
      { label: 'Guía de tallas', href: '/tallas' },
      { label: 'Preguntas frecuentes', href: '/faq' },
      { label: 'Contacto', href: '/contacto' },
    ],
  },
  nosotros: {
    title: 'Nosotros',
    links: [
      { label: 'Nuestra historia', href: '/historia' },
      { label: 'Sustentabilidad', href: '/sustentabilidad' },
      { label: 'Trabaja con nosotros', href: '/empleo' },
      { label: 'Política de privacidad', href: '/privacidad' },
      { label: 'Términos y condiciones', href: '/terminos' },
    ],
  },
};

const paymentMethods = [
  { name: 'WebPay', label: 'W' },
  { name: 'Visa', label: 'VISA' },
  { name: 'Mastercard', label: 'MC' },
  { name: 'AmEx', label: 'AMEX' },
];

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <span className="font-display text-3xl text-white tracking-[0.15em] block mb-4">
              CLOSING<span className="text-gold">®</span>
            </span>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Ropa americana curada con propósito. Streetwear auténtico para
              quienes viven sin filtros.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold transition-all duration-300"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold transition-all duration-300 text-[10px] font-bold"
              >
                TK
              </a>
              <a
                href="https://wa.me"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold transition-all duration-300"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(columns).map(([key, col]) => (
            <div key={key}>
              <h4 className="text-white text-xs font-semibold tracking-[0.2em] uppercase mb-5">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/40 text-sm hover:text-gold transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/25 text-xs tracking-wide">
            © {new Date().getFullYear()} CLOSING®. Todos los derechos reservados. Santiago, Chile.
          </p>

          {/* Payment badges */}
          <div className="flex items-center gap-2">
            <span className="text-white/25 text-xs mr-2">Pago seguro con</span>
            {paymentMethods.map((pm) => (
              <span
                key={pm.name}
                className="h-7 px-2.5 rounded border border-white/10 bg-white/5 flex items-center justify-center text-white/50 text-[10px] font-bold tracking-wider"
                title={pm.name}
              >
                {pm.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
