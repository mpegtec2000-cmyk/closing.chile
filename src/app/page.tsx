"use client";

import { useState } from "react";
import Countdown from "@/components/drop/Countdown";
import ProductCard, { Product } from "@/components/drop/ProductCard";
import NotifyBar from "@/components/drop/NotifyBar";

const PRODUCTOS: Product[] = [
  {
    id: 1,
    nombre: "Cargo Pant Olive",
    precio: 24990,
    precioOriginal: 34990,
    stock: 2,
    stockInicial: 5,
    vendidos: 3,
    imagen: null,
    categoria: "Pantalones",
    talla: "L",
  },
  {
    id: 2,
    nombre: "Denim Straight Blue",
    precio: 39990,
    precioOriginal: null,
    stock: 2,
    stockInicial: 4,
    vendidos: 2,
    imagen: null,
    categoria: "Pantalones",
    talla: "M",
  },
  {
    id: 3,
    nombre: "Bucket Hat Stone",
    precio: 19990,
    precioOriginal: null,
    stock: 0,
    stockInicial: 10,
    vendidos: 10,
    imagen: null,
    categoria: "Accesorios",
    talla: "One Size",
  },
  {
    id: 4,
    nombre: "Rugby Top Black",
    precio: 44990,
    precioOriginal: null,
    stock: 3,
    stockInicial: 5,
    vendidos: 2,
    imagen: null,
    categoria: "Polerones",
    talla: "XL",
  },
  {
    id: 5,
    nombre: "Nike SB Dunk Low",
    precio: 89990,
    precioOriginal: null,
    stock: 1,
    stockInicial: 2,
    vendidos: 1,
    imagen: null,
    categoria: "Zapatillas",
    talla: "42",
  },
  {
    id: 6,
    nombre: "Camisa Vintage Levis",
    precio: 29990,
    precioOriginal: 39990,
    stock: 2,
    stockInicial: 3,
    vendidos: 1,
    imagen: null,
    categoria: "Camisas",
    talla: "M",
  }
];

export default function HomePage() {
  const [items, setItems] = useState<Product[]>(PRODUCTOS);
  const [cart, setCart] = useState<{ id: number; qty: number }[]>([]);
  
  // Filtros
  const [categoria, setCategoria] = useState("Todas");
  const [talla, setTalla] = useState("Todas");

  // 2 semanas a partir de ahora
  const targetTimestamp = Date.now() + 1000 * 60 * 60 * 24 * 14;

  function handleAdd(producto: Product) {
    setItems((prev) =>
      prev.map((p) =>
        p.id === producto.id && p.stock > 0
          ? { ...p, stock: p.stock - 1, vendidos: p.vendidos + 1 }
          : p
      )
    );
    setCart((prev) => {
      const existing = prev.find((c) => c.id === producto.id);
      if (existing) {
        return prev.map((c) =>
          c.id === producto.id ? { ...c, qty: c.qty + 1 } : c
        );
      }
      return [...prev, { ...producto, qty: 1 }];
    });
  }

  const totalItems = cart.reduce((s, c) => s + c.qty, 0);
  const disponibles = items.filter((p) => p.stock > 0).length;

  // Extraer categorías y tallas únicas
  const categorias = ["Todas", ...Array.from(new Set(PRODUCTOS.map(p => p.categoria)))];
  const tallas = ["Todas", ...Array.from(new Set(PRODUCTOS.map(p => p.talla)))];

  // Aplicar filtros
  const filteredItems = items.filter((p) => {
    const matchCat = categoria === "Todas" || p.categoria === categoria;
    const matchTalla = talla === "Todas" || p.talla === talla;
    return matchCat && matchTalla;
  });

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 max-w-5xl mx-auto">
      <header className="text-center mb-10">
        <div className="inline-flex items-center text-[10px] md:text-xs font-bold tracking-widest uppercase bg-white/10 border border-white/20 text-white px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse" />
          Drop Activo
        </div>
        <h1 className="font-display text-5xl md:text-7xl text-white mb-4 tracking-wider drop-shadow-lg">
          DROP 001
        </h1>
        <p className="text-white/70 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
          Piezas únicas. Filtra lo que buscas y asegura tu prenda antes que se agote.
        </p>
      </header>

      <Countdown targetTimestamp={targetTimestamp} />

      <p className="text-center text-sm text-white/50 mb-6 uppercase tracking-widest font-semibold">
        {disponibles === 0
          ? "Todo el drop se agotó."
          : disponibles === 1
          ? "Solo queda 1 pieza disponible."
          : `${disponibles} piezas disponibles en total`}
      </p>

      {/* Barra de Filtros */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-10">
        <select 
          value={categoria} 
          onChange={(e) => setCategoria(e.target.value)}
          className="bg-black/60 border border-white/20 text-white text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-gold backdrop-blur-sm cursor-pointer"
        >
          {categorias.map(c => <option key={c} value={c} className="bg-zinc-900">{c}</option>)}
        </select>

        <select 
          value={talla} 
          onChange={(e) => setTalla(e.target.value)}
          className="bg-black/60 border border-white/20 text-white text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-gold backdrop-blur-sm cursor-pointer"
        >
          {tallas.map(t => <option key={t} value={t} className="bg-zinc-900">{t === "Todas" ? "Todas las tallas" : `Talla: ${t}`}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
        {filteredItems.length > 0 ? (
          filteredItems.map((p) => (
            <ProductCard key={p.id} producto={p} onAdd={handleAdd} />
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-white/50">
            No hay prendas con esa combinación de talla y categoría.
          </div>
        )}
      </div>

      <NotifyBar />

      {totalItems > 0 && (
        <div className="fixed bottom-6 right-6 bg-gold text-black px-6 py-3 rounded-full flex items-center gap-3 font-semibold text-sm shadow-[0_0_20px_rgba(201,168,76,0.4)] z-50 animate-bounce">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {totalItems} en carrito
        </div>
      )}
    </div>
  );
}
