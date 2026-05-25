"use client";

import Image from "next/image";

export type Product = {
  id: number;
  nombre: string;
  precio: number;
  precioOriginal: number | null;
  stock: number;
  stockInicial?: number;
  vendidos?: number;
  imagen: string | null;
  categoria: string;
  talla?: string;
};

export default function ProductCard({
  producto,
  onAdd,
}: {
  producto: Product;
  onAdd: (p: Product) => void;
}) {
  const { nombre, precio, precioOriginal, stock, imagen, categoria } = producto;
  const agotado = stock <= 0;
  const ultimaUnidad = stock === 1;

  const fmt = (n: number) => "$" + n.toLocaleString("es-CL");

  const stockMax = producto.stockInicial ?? stock + (producto.vendidos ?? 0);
  const pct = stockMax > 0 ? Math.round((stock / stockMax) * 100) : 0;

  const getStockColorClass = (pct: number) => {
    if (pct <= 0) return "bg-zinc-700";
    if (pct <= 33) return "bg-red-500";
    if (pct <= 66) return "bg-orange-400";
    return "bg-green-500";
  };
  const barColorClass = getStockColorClass(agotado ? 0 : pct);

  return (
    <div
      className={`bg-black/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/30 ${
        agotado ? "opacity-60 grayscale-[0.5]" : ""
      }`}
    >
      <div className="w-full aspect-[3/4] bg-white/5 relative overflow-hidden flex flex-col items-center justify-center">
        {imagen ? (
          <Image
            src={imagen}
            alt={nombre}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="flex flex-col items-center justify-center opacity-40">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-white"
            >
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
              <circle cx="7" cy="7" r="1.5" fill="currentColor" />
            </svg>
            <span className="text-xs text-white mt-2 tracking-widest uppercase">
              {categoria} {producto.talla ? `· ${producto.talla}` : ""}
            </span>
          </div>
        )}

        {agotado && (
          <div className="absolute top-3 left-3 bg-zinc-900 text-zinc-300 text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded">
            Agotado
          </div>
        )}
        {ultimaUnidad && !agotado && (
          <div className="absolute top-3 left-3 bg-red-900/90 text-red-200 text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded backdrop-blur-sm">
            Última unidad
          </div>
        )}
      </div>

      <div className="px-3 pt-3 pb-1">
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${barColorClass}`}
            style={{ width: agotado ? "0%" : `${pct}%` }}
          />
        </div>
        <span className="text-[10px] text-white/50 mt-1 block uppercase tracking-wider">
          {agotado
            ? "Sin stock"
            : ultimaUnidad
            ? "1 unidad disponible"
            : `${stock} restantes`}
        </span>
      </div>

      <div className="p-3">
        <h3 className="text-sm font-semibold text-white mb-1 truncate">
          {nombre}
        </h3>
        <div className="text-sm text-white/70 flex gap-2 items-center mb-4">
          {precioOriginal ? (
            <>
              <span className="text-gold font-semibold">{fmt(precio)}</span>
              <span className="line-through text-xs text-white/40">
                {fmt(precioOriginal)}
              </span>
            </>
          ) : (
            fmt(precio)
          )}
        </div>
        <button
          disabled={agotado}
          onClick={() => !agotado && onAdd(producto)}
          className={`w-full py-2.5 text-xs font-bold tracking-widest uppercase rounded-lg transition-all ${
            agotado
              ? "bg-white/10 text-white/40 cursor-not-allowed"
              : "bg-white text-black hover:bg-gold hover:text-black hover:shadow-[0_0_15px_rgba(201,168,76,0.4)]"
          }`}
        >
          {agotado ? "Agotado" : "Agregar"}
        </button>
      </div>
    </div>
  );
}
