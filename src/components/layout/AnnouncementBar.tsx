'use client';

import { motion } from 'framer-motion';

const messages = [
  'Envíos a todo Chile',
  'Nuevos ingresos cada semana',
  'Pagos seguros con WebPay y tarjetas',
  'Devoluciones en 14 días',
  'Envíos a todo Chile',
  'Nuevos ingresos cada semana',
  'Pagos seguros con WebPay y tarjetas',
  'Devoluciones en 14 días',
];

export default function AnnouncementBar() {
  return (
    <div className="bg-gold text-black text-xs font-medium tracking-widest uppercase overflow-hidden h-8 flex items-center">
      <motion.div
        className="flex whitespace-nowrap gap-16"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {messages.map((msg, i) => (
          <span key={i} className="flex items-center gap-4">
            <span className="text-black/40">◆</span>
            {msg}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
