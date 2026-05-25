-- ============================================================
-- CLOSING® — Initial Schema Migration
-- 001_initial.sql
-- ============================================================

-- ── Extensions ──────────────────────────────────────────────
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm"; -- for text search

-- ── Categories ──────────────────────────────────────────────
create table public.categories (
  id           uuid primary key default uuid_generate_v4(),
  slug         text not null unique,
  name         text not null,
  description  text,
  cover_image  text,
  sort_order   int  not null default 0,
  created_at   timestamptz not null default now()
);

-- ── Collections ─────────────────────────────────────────────
create table public.collections (
  id          uuid primary key default uuid_generate_v4(),
  slug        text not null unique,
  title       text not null,
  subtitle    text,
  hero_image  text,
  is_active   bool not null default true,
  created_at  timestamptz not null default now()
);

-- ── Products ────────────────────────────────────────────────
create table public.products (
  id              uuid primary key default uuid_generate_v4(),
  slug            text not null unique,
  name            text not null,
  description     text,
  price           int  not null,          -- CLP, no decimals
  compare_price   int,                    -- original price for sale
  stock           int  not null default 0,
  category_id     uuid references public.categories(id) on delete set null,
  images          text[] not null default '{}',
  tags            text[] not null default '{}',
  is_published    bool not null default false,
  is_new          bool not null default false,
  is_sale         bool not null default false,
  sizes_available text[] not null default '{"XS","S","M","L","XL"}',
  gender          text check (gender in ('hombre', 'mujer', 'unisex')) default 'unisex',
  weight_grams    int,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- ── Product ↔ Collection (many-to-many) ─────────────────────
create table public.product_collections (
  product_id    uuid references public.products(id) on delete cascade,
  collection_id uuid references public.collections(id) on delete cascade,
  primary key (product_id, collection_id)
);

-- ── Orders ──────────────────────────────────────────────────
create table public.orders (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid references auth.users(id) on delete set null,
  status           text not null default 'pending'
                   check (status in ('pending','paid','shipped','delivered','cancelled','refunded')),
  total            int  not null,              -- CLP total in cents (integer)
  items            jsonb not null default '[]', -- [{product_id, name, price, qty, size, image}]
  shipping_address jsonb,                       -- {name, address, city, region, zip}
  payment_id       text,                        -- WebPay / Transbank token
  payment_method   text default 'webpay',
  notes            text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create trigger orders_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

-- ── Subscribers ─────────────────────────────────────────────
create table public.subscribers (
  id            uuid primary key default uuid_generate_v4(),
  email         text not null unique,
  subscribed_at timestamptz not null default now(),
  source        text default 'newsletter',   -- 'newsletter' | 'checkout' | 'popup'
  is_active     bool not null default true
);

-- ── Indexes ─────────────────────────────────────────────────
create index idx_products_category   on public.products(category_id);
create index idx_products_published  on public.products(is_published) where is_published = true;
create index idx_products_slug       on public.products(slug);
create index idx_products_price      on public.products(price);
create index idx_products_created    on public.products(created_at desc);
create index idx_products_tags       on public.products using gin(tags);
create index idx_products_name_trgm  on public.products using gin(name gin_trgm_ops);
create index idx_orders_user         on public.orders(user_id);
create index idx_orders_status       on public.orders(status);
create index idx_categories_slug     on public.categories(slug);
create index idx_categories_sort     on public.categories(sort_order);

-- ── Row Level Security ───────────────────────────────────────
alter table public.products          enable row level security;
alter table public.categories        enable row level security;
alter table public.collections       enable row level security;
alter table public.product_collections enable row level security;
alter table public.orders            enable row level security;
alter table public.subscribers       enable row level security;

-- ── RLS Policies ────────────────────────────────────────────

-- PRODUCTS: public can read published products only
create policy "Public can read published products"
  on public.products for select
  using (is_published = true);

-- PRODUCTS: authenticated service role can do anything (for admin/seed)
create policy "Service role full access on products"
  on public.products for all
  using (auth.role() = 'service_role');

-- CATEGORIES: public read
create policy "Public can read categories"
  on public.categories for select
  using (true);

create policy "Service role full access on categories"
  on public.categories for all
  using (auth.role() = 'service_role');

-- COLLECTIONS: public can read active collections
create policy "Public can read active collections"
  on public.collections for select
  using (is_active = true);

create policy "Service role full access on collections"
  on public.collections for all
  using (auth.role() = 'service_role');

-- PRODUCT_COLLECTIONS: public read
create policy "Public can read product_collections"
  on public.product_collections for select
  using (true);

create policy "Service role full access on product_collections"
  on public.product_collections for all
  using (auth.role() = 'service_role');

-- ORDERS: users can only see their own orders
create policy "Users can view own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Users can insert own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

create policy "Service role full access on orders"
  on public.orders for all
  using (auth.role() = 'service_role');

-- SUBSCRIBERS: anyone can subscribe (insert), no public read
create policy "Anyone can subscribe"
  on public.subscribers for insert
  with check (true);

create policy "Service role full access on subscribers"
  on public.subscribers for all
  using (auth.role() = 'service_role');

-- ── Seed: Categories ────────────────────────────────────────
insert into public.categories (slug, name, description, sort_order) values
  ('cargos',        'Cargos',        'Pantalones cargo multipocket estilo americano', 1),
  ('denim',         'Denim',         'Jeans vintage washed de los 90s', 2),
  ('bucket-hats',   'Bucket Hats',   'El accesorio del movimiento streetwear', 3),
  ('polerones',     'Polerones',     'Heavyweight fleece unisex', 4),
  ('outdoor',       'Outdoor Pants', 'Pantalones técnicos para el concreto y el cerro', 5),
  ('tops',          'Tops',          'Camisetas oversized y tanks', 6),
  ('accesorios',    'Accesorios',    'Accesorios para completar el look', 7);

-- ── Seed: Collections ───────────────────────────────────────
insert into public.collections (slug, title, subtitle, is_active) values
  ('nuevos-ingresos', 'Nuevos Ingresos', 'Lo que acaba de llegar esta semana', true),
  ('sale',            'Sale',            'Precios rebajados — stock limitado',  true),
  ('hombre',          'Hombre',          'Colección masculina',                 true),
  ('mujer',           'Mujer',           'Colección femenina',                  true);
