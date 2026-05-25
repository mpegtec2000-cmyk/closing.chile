import type { Metadata } from 'next';
import { Bebas_Neue, DM_Sans, Permanent_Marker } from 'next/font/google';
import './globals.css';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartProvider from '@/components/shop/CartProvider';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const permanentMarker = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-syne', // keeping variable name to avoid changing tailwind
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CLOSING® | Ropa Americana con Actitud Real',
  description:
    'American vintage curado con propósito. Streetwear auténtico — envíos a todo Chile, nuevos ingresos cada semana.',
  keywords: ['ropa americana', 'streetwear chile', 'vintage', 'cargos', 'polerones', 'bucket hat'],
  openGraph: {
    title: 'CLOSING® | Ropa Americana con Actitud Real',
    description: 'American vintage curado con propósito. Streetwear auténtico — envíos a todo Chile.',
    url: 'https://closing.cl',
    siteName: 'CLOSING®',
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CLOSING®',
    description: 'American vintage curado con propósito.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CL" className={`${bebasNeue.variable} ${dmSans.variable} ${permanentMarker.variable}`}>
      <body className="font-body text-white antialiased relative">
        {/* Background Video */}
        <video
          src="/video-fondo.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover -z-10 brightness-50"
        />
        
        <div className="relative z-0 flex flex-col min-h-screen">
          <AnnouncementBar />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <CartProvider />
      </body>
    </html>
  );
}
