'use client';

const brands = [
  { name: 'Nike SB', src: '/brands/nike.png' },
  { name: 'Dickies', src: '/brands/dickies.png' },
  { name: 'Vans', src: '/brands/vans.png' },
  { name: 'DC Shoes', src: '/brands/dc.png' },
  { name: 'Polo Ralph Lauren', src: '/brands/polo.png' },
];

export default function BrandCarousel() {
  // Duplicamos el array para lograr el efecto de scroll infinito sin cortes
  const duplicatedBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <div className="w-full bg-[#080807] border-y border-white/5 py-10 overflow-hidden relative">
      {/* Sombras en los bordes para un difuminado suave */}
      <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#080807] to-transparent z-10" />
      <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#080807] to-transparent z-10" />

      {/* Contenedor animado del scroll */}
      <div className="flex items-center w-max animate-ticker">
        {duplicatedBrands.map((brand, i) => (
          <div 
            key={i} 
            className="flex-shrink-0 w-32 md:w-48 mx-8 md:mx-12 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
          >
            <img 
              src={brand.src} 
              alt={`Logo de ${brand.name}`} 
              className="max-h-12 md:max-h-16 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
