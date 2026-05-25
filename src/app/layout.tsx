import type { Metadata } from 'next';
import { Bebas_Neue, DM_Sans } from 'next/font/google';
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
    <html lang="es-CL" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body className="font-body bg-[#0A0A0A] text-white antialiased">
        <AnnouncementBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CartProvider />
      </body>
    </html>
  );
}
