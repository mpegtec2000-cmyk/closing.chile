import Link from 'next/link';
import { getCategories } from '@/lib/queries';
import CategoryNavClient from './CategoryNavClient';

// Emoji map by category slug
const CATEGORY_EMOJI: Record<string, string> = {
  cargos:         '🪖',
  denim:          '👖',
  'bucket-hats':  '🪣',
  polerones:      '🧥',
  outdoor:        '🏕️',
  tops:           '👕',
  accesorios:     '🕶️',
};

const CATEGORY_DESC: Record<string, string> = {
  cargos:         'Multipocket style',
  denim:          'Vintage washed',
  'bucket-hats':  'Street essentials',
  polerones:      'Heavyweight fleece',
  outdoor:        'Terrain-ready',
  tops:           'Tees & tanks',
  accesorios:     'Finish the look',
};

export default async function CategoryNav() {
  const categories = await getCategories();

  const enriched = categories.map((cat) => ({
    ...cat,
    emoji: CATEGORY_EMOJI[cat.slug] ?? '🏷️',
    shortDesc: CATEGORY_DESC[cat.slug] ?? '',
  }));

  return (
    <section id="categorias" className="py-16 bg-[#0A0A0A] border-y border-white/5">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-display text-2xl md:text-3xl text-white tracking-widest">
            EXPLORAR
          </h2>
          <Link
            href="/tienda"
            className="text-gold text-xs font-medium tracking-[0.2em] uppercase hover:text-gold/70 transition-colors"
          >
            Ver todo →
          </Link>
        </div>

        <CategoryNavClient categories={enriched} />
      </div>
    </section>
  );
}
