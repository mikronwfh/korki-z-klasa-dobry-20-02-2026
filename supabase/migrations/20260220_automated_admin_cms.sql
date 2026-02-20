-- Automated Integration: Admin + CMS schema
-- Generated: 2026-02-20

-- =========================================================
-- 0) ROLE / PROFILES
-- =========================================================
do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_role') then
    create type public.app_role as enum ('user', 'editor', 'admin');
  end if;
end
$$;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role public.app_role not null default 'user',
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id)
  values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.user_id = auth.uid()
      and p.role = 'admin'
  );
$$;

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
on public.profiles
for select
to authenticated
using (auth.uid() = user_id or public.is_admin());

drop policy if exists "profiles_update_own_or_admin" on public.profiles;
create policy "profiles_update_own_or_admin"
on public.profiles
for update
to authenticated
using (auth.uid() = user_id or public.is_admin())
with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "profiles_insert_self_or_admin" on public.profiles;
create policy "profiles_insert_self_or_admin"
on public.profiles
for insert
to authenticated
with check (auth.uid() = user_id or public.is_admin());

-- =========================================================
-- 1) SITE CONTENT
-- =========================================================
create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  content jsonb not null default '{}'::jsonb,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_site_content_updated_at on public.site_content;
create trigger trg_site_content_updated_at
before update on public.site_content
for each row execute function public.set_updated_at();

alter table public.site_content enable row level security;

drop policy if exists "site_content_public_read_published" on public.site_content;
create policy "site_content_public_read_published"
on public.site_content
for select
to anon, authenticated
using (published = true or public.is_admin());

drop policy if exists "site_content_admin_insert" on public.site_content;
create policy "site_content_admin_insert"
on public.site_content
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "site_content_admin_update" on public.site_content;
create policy "site_content_admin_update"
on public.site_content
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "site_content_admin_delete" on public.site_content;
create policy "site_content_admin_delete"
on public.site_content
for delete
to authenticated
using (public.is_admin());

-- =========================================================
-- 2) GALLERY ITEMS
-- =========================================================
create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_path text not null,
  description text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_gallery_items_updated_at on public.gallery_items;
create trigger trg_gallery_items_updated_at
before update on public.gallery_items
for each row execute function public.set_updated_at();

alter table public.gallery_items enable row level security;

drop policy if exists "gallery_public_read_published" on public.gallery_items;
create policy "gallery_public_read_published"
on public.gallery_items
for select
to anon, authenticated
using (published = true or public.is_admin());

drop policy if exists "gallery_admin_insert" on public.gallery_items;
create policy "gallery_admin_insert"
on public.gallery_items
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "gallery_admin_update" on public.gallery_items;
create policy "gallery_admin_update"
on public.gallery_items
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "gallery_admin_delete" on public.gallery_items;
create policy "gallery_admin_delete"
on public.gallery_items
for delete
to authenticated
using (public.is_admin());

-- =========================================================
-- 3) REALIZATIONS ITEMS
-- =========================================================
create table if not exists public.realizations_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_path text,
  content jsonb not null default '{}'::jsonb,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_realizations_items_updated_at on public.realizations_items;
create trigger trg_realizations_items_updated_at
before update on public.realizations_items
for each row execute function public.set_updated_at();

alter table public.realizations_items enable row level security;

drop policy if exists "realizations_public_read_published" on public.realizations_items;
create policy "realizations_public_read_published"
on public.realizations_items
for select
to anon, authenticated
using (published = true or public.is_admin());

drop policy if exists "realizations_admin_insert" on public.realizations_items;
create policy "realizations_admin_insert"
on public.realizations_items
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "realizations_admin_update" on public.realizations_items;
create policy "realizations_admin_update"
on public.realizations_items
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "realizations_admin_delete" on public.realizations_items;
create policy "realizations_admin_delete"
on public.realizations_items
for delete
to authenticated
using (public.is_admin());

-- =========================================================
-- 4) CONTACT MESSAGES
-- =========================================================
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

drop policy if exists "contact_insert_public" on public.contact_messages;
create policy "contact_insert_public"
on public.contact_messages
for insert
to anon, authenticated
with check (true);

drop policy if exists "contact_admin_read" on public.contact_messages;
create policy "contact_admin_read"
on public.contact_messages
for select
to authenticated
using (public.is_admin());

drop policy if exists "contact_admin_update" on public.contact_messages;
create policy "contact_admin_update"
on public.contact_messages
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "contact_admin_delete" on public.contact_messages;
create policy "contact_admin_delete"
on public.contact_messages
for delete
to authenticated
using (public.is_admin());

-- =========================================================
-- 5) STORAGE BUCKETS
-- =========================================================
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('realizations', 'realizations', true)
on conflict (id) do nothing;

-- gallery objects

drop policy if exists "gallery_public_read_objects" on storage.objects;
create policy "gallery_public_read_objects"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'gallery');

drop policy if exists "gallery_admin_insert_objects" on storage.objects;
create policy "gallery_admin_insert_objects"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'gallery' and public.is_admin());

drop policy if exists "gallery_admin_update_objects" on storage.objects;
create policy "gallery_admin_update_objects"
on storage.objects
for update
to authenticated
using (bucket_id = 'gallery' and public.is_admin())
with check (bucket_id = 'gallery' and public.is_admin());

drop policy if exists "gallery_admin_delete_objects" on storage.objects;
create policy "gallery_admin_delete_objects"
on storage.objects
for delete
to authenticated
using (bucket_id = 'gallery' and public.is_admin());

-- realizations objects

drop policy if exists "realizations_public_read_objects" on storage.objects;
create policy "realizations_public_read_objects"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'realizations');

drop policy if exists "realizations_admin_insert_objects" on storage.objects;
create policy "realizations_admin_insert_objects"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'realizations' and public.is_admin());

drop policy if exists "realizations_admin_update_objects" on storage.objects;
create policy "realizations_admin_update_objects"
on storage.objects
for update
to authenticated
using (bucket_id = 'realizations' and public.is_admin())
with check (bucket_id = 'realizations' and public.is_admin());

drop policy if exists "realizations_admin_delete_objects" on storage.objects;
create policy "realizations_admin_delete_objects"
on storage.objects
for delete
to authenticated
using (bucket_id = 'realizations' and public.is_admin());
