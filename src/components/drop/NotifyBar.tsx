"use client";

import { useState } from "react";

export default function NotifyBar() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    console.log("Email registrado:", email);
    setSent(true);
    setEmail("");
  }

  return (
    <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center mb-12 shadow-2xl max-w-2xl mx-auto">
      {sent ? (
        <p className="text-sm text-green-400 font-medium tracking-wide">
          Listo — te avisamos antes del próximo drop.
        </p>
      ) : (
        <>
          <h2 className="text-xl md:text-2xl font-display text-white mb-2 tracking-wider">
            Avísame del próximo drop
          </h2>
          <p className="text-sm text-white/60 mb-6">
            Acceso anticipado antes que se abra al público.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 text-sm px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors"
              required
            />
            <button
              type="submit"
              className="text-xs font-bold tracking-[0.1em] uppercase px-6 py-3 rounded-lg border-none bg-gold text-black hover:bg-gold-light hover:shadow-[0_0_15px_rgba(201,168,76,0.3)] transition-all whitespace-nowrap"
            >
              Avisarme
            </button>
          </form>
        </>
      )}
    </div>
  );
}
