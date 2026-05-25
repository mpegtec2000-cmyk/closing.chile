import { createClient } from '@/lib/supabase/server';
import type { Product, Category } from '@/lib/types';

export type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'name_asc';

export interface ProductFilters {
  category_slug?: string;
  min_price?: number;
  max_price?: number;
  sort?: SortOption;
  search?: string;
  limit?: number;
  offset?: number;
}

/** Fetch published products with optional filters — server only */
export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  const supabase = await createClient();
  const {
    category_slug,
    min_price,
    max_price,
    sort = 'newest',
    search,
    limit = 24,
    offset = 0,
  } = filters;

  let query = supabase
    .from('products')
    .select('*, category:categories(id, slug, name)')
    .eq('is_published', true)
    .range(offset, offset + limit - 1);

  if (category_slug) {
    const { data: cat } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', category_slug)
      .single();
    if (cat) query = query.eq('category_id', cat.id);
  }

  if (min_price !== undefined) query = query.gte('price', min_price);
  if (max_price !== undefined) query = query.lte('price', max_price);
  if (search) query = query.ilike('name', `%${search}%`);

  switch (sort) {
    case 'price_asc':  query = query.order('price', { ascending: true }); break;
    case 'price_desc': query = query.order('price', { ascending: false }); break;
    case 'name_asc':   query = query.order('name',  { ascending: true }); break;
    default:           query = query.order('created_at', { ascending: false }); break;
  }

  const { data, error } = await query;
  if (error) { console.error('[getProducts]', error.message); return []; }
  return (data as Product[]) ?? [];
}

/** Fetch a single product by slug — server only */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(id, slug, name)')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) { console.error('[getProductBySlug]', error.message); return null; }
  return data as Product;
}

/** Fetch related products (same category, excluding current) — server only */
export async function getRelatedProducts(
  categoryId: string,
  excludeId: string,
  limit = 4
): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(id, slug, name)')
    .eq('is_published', true)
    .eq('category_id', categoryId)
    .neq('id', excludeId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) { console.error('[getRelatedProducts]', error.message); return []; }
  return (data as Product[]) ?? [];
}

/** Fetch all categories ordered by sort_order — server only */
export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) { console.error('[getCategories]', error.message); return []; }
  return (data as Category[]) ?? [];
}

/** Subscribe email — server only */
export async function subscribeEmail(
  email: string,
  source = 'newsletter'
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from('subscribers')
    .upsert({ email, source }, { onConflict: 'email' });

  if (error) return { success: false, error: error.message };
  return { success: true };
}
