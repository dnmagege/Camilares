-- Camila Ravelle public-site schema for Supabase/Postgres.
-- Private/premium media is intentionally NOT stored in this public-site project.

create extension if not exists pgcrypto;

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  consent boolean not null check (consent),
  consented_at timestamptz not null default now(),
  source text not null default 'website' check (char_length(source) <= 100),
  created_at timestamptz not null default now()
);
create unique index if not exists newsletter_subscribers_email_lower_idx
  on public.newsletter_subscribers (email);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 150),
  email text not null,
  company text check (company is null or char_length(company) <= 200),
  category text not null check (category in ('Brand partnership', 'Media', 'General enquiry')),
  message text not null check (char_length(message) between 10 and 5000),
  created_at timestamptz not null default now()
);

create table if not exists public.collaboration_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 150),
  company text check (company is null or char_length(company) <= 200),
  email text not null,
  campaign_type text not null check (char_length(campaign_type) between 1 and 200),
  message text not null check (char_length(message) between 10 and 5000),
  created_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  author text not null default 'Camila Ravelle',
  published_at timestamptz,
  reading_minutes integer not null default 4 check (reading_minutes between 1 and 60),
  excerpt text not null,
  body text[] not null default '{}',
  cover_url text not null,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('lifestyle', 'fashion', 'fitness', 'travel')),
  src text not null,
  alt text not null,
  caption text not null,
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key,
  name text not null,
  category text not null,
  product_type text not null check (product_type in ('digital', 'physical')),
  price numeric(10, 2) not null check (price >= 0),
  image text not null,
  description text not null,
  active boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event text not null check (char_length(event) between 1 and 80),
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- RLS is enabled everywhere. Public users may read only deliberately published
-- public editorial/catalog rows. PII and event writes go through server routes.
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_messages enable row level security;
alter table public.collaboration_enquiries enable row level security;
alter table public.blog_posts enable row level security;
alter table public.gallery_items enable row level security;
alter table public.products enable row level security;
alter table public.analytics_events enable row level security;

drop policy if exists published_blog_read on public.blog_posts;
create policy published_blog_read on public.blog_posts for select to anon, authenticated using (published = true);
drop policy if exists published_gallery_read on public.gallery_items;
create policy published_gallery_read on public.gallery_items for select to anon, authenticated using (published = true);
drop policy if exists active_products_read on public.products;
create policy active_products_read on public.products for select to anon, authenticated using (active = true);

-- This schema intentionally has no auth.users/profile/membership tables and no
-- premium-media tables. No public policies are granted on newsletter_subscribers,
-- contact_messages, collaboration_enquiries or analytics_events. Keep the
-- service-role key in server-only environment variables; never expose it with
-- the NEXT_PUBLIC_ prefix.
