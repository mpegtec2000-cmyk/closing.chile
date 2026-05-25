"use client";

import { useState, useEffect } from "react";

export default function Countdown({ targetTimestamp }: { targetTimestamp: number }) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0, ended: false });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    function calc() {
      const diff = targetTimestamp - Date.now();
      if (diff <= 0) {
        setTime({ d: 0, h: 0, m: 0, s: 0, ended: true });
        return;
      }
      setTime({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((diff % (1000 * 60)) / 1000),
        ended: false,
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetTimestamp]);

  if (!mounted) return null;

  if (time.ended) {
    return (
      <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center mb-8 shadow-2xl">
        <p className="text-gold text-lg tracking-[0.2em] font-semibold uppercase">
          DROP ABIERTO
        </p>
      </div>
    );
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  const units = [
    { val: pad(time.d), label: "días" },
    { val: pad(time.h), label: "horas" },
    { val: pad(time.m), label: "min" },
    { val: pad(time.s), label: "seg" },
  ];

  return (
    <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 text-center mb-10 shadow-2xl">
      <p className="text-white/60 text-xs md:text-sm tracking-[0.15em] uppercase mb-4">
        Cierra en
      </p>
      <div className="flex justify-center items-center gap-3 md:gap-6">
        {units.map((u, i) => (
          <div key={u.label} className="flex items-center gap-3 md:gap-6">
            <div className="flex flex-col items-center min-w-[50px] md:min-w-[80px]">
              <span className="font-display text-4xl md:text-6xl text-white tabular-nums tracking-wider">
                {u.val}
              </span>
              <span className="text-white/50 text-[10px] md:text-xs uppercase tracking-[0.1em] mt-1 md:mt-2">
                {u.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="font-display text-3xl md:text-5xl text-white/20 -mt-6 font-light">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
