'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const hasImages = images.length > 0;
  const activeImage = hasImages ? images[activeIndex] : null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const prev = () => setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div
        className="relative aspect-[3/4] bg-[#111] rounded-sm overflow-hidden cursor-zoom-in group"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
      >
        {activeImage ? (
          <motion.img
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={activeImage}
            alt={`${productName} — imagen ${activeIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-200"
            style={
              zoomed
                ? {
                    transform: 'scale(1.8)',
                    transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                  }
                : {}
            }
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/10 text-xs tracking-widest uppercase">
              Sin imagen
            </span>
          </div>
        )}

        {/* Zoom hint */}
        {activeImage && !zoomed && (
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-sm px-2 py-1 flex items-center gap-1.5">
              <ZoomIn size={10} className="text-white/60" />
              <span className="text-white/40 text-[9px] tracking-wider uppercase">Zoom</span>
            </div>
          </div>
        )}

        {/* Nav arrows (multiple images) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Imagen anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 backdrop-blur-sm border border-white/10 rounded-sm flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={next}
              aria-label="Imagen siguiente"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 backdrop-blur-sm border border-white/10 rounded-sm flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={14} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    i === activeIndex ? 'bg-gold w-4' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`aspect-square rounded-sm overflow-hidden border-2 transition-all duration-200 ${
                i === activeIndex
                  ? 'border-gold'
                  : 'border-transparent opacity-50 hover:opacity-80'
              }`}
            >
              <img
                src={img}
                alt={`Miniatura ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
