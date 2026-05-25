import HeroSection from '@/components/home/HeroSection';
import CategoryNav from '@/components/home/CategoryNav';
import NuevosIngresos from '@/components/home/NuevosIngresos';
import BrandBanner from '@/components/home/BrandBanner';
import CollectionCards from '@/components/home/CollectionCards';
import NewsletterSignup from '@/components/home/NewsletterSignup';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryNav />
      <NuevosIngresos />
      <BrandBanner />
      <CollectionCards />
      <NewsletterSignup />
    </>
  );
}
