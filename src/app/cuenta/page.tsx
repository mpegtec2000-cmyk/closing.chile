import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mi Cuenta | CLOSING®',
};

export default function CuentaPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-20 flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-4xl text-white tracking-widest mb-4">MI CUENTA</h1>
        <p className="text-white/60 mb-8">Página de login/registro en construcción. Aquí iría la integración con Supabase Auth.</p>
        <a href="/tienda" className="text-gold uppercase tracking-widest text-xs font-bold hover:text-white transition-colors">Volver a la tienda</a>
      </div>
    </div>
  );
}
