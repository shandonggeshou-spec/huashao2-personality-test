-- 在 Supabase Dashboard > SQL Editor 中完整执行一次。
-- 两张表仅允许匿名访客 INSERT，不允许匿名 SELECT/UPDATE/DELETE。
-- 站长可在 Supabase Dashboard 的 Table Editor 查看、筛选和导出全部数据。

create extension if not exists pgcrypto;

create table if not exists public.test_results (
  id uuid primary key default gen_random_uuid(),
  public_id text not null unique,
  primary_type text not null check (primary_type in ('jing','ning','xu','zheng','mao','chen','yang')),
  secondary_type text not null check (secondary_type in ('jing','ning','xu','zheng','mao','chen','yang')),
  scores jsonb not null default '{}'::jsonb,
  dimensions jsonb not null default '{}'::jsonb,
  answers jsonb not null default '[]'::jsonb,
  duration_seconds integer check (duration_seconds between 0 and 86400),
  created_at timestamptz not null default now()
);

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('result','question','bug','idea','other')),
  message text not null check (char_length(message) between 1 and 1000),
  contact text,
  result_public_id text,
  result_type text,
  page_url text,
  status text not null default 'new' check (status in ('new','reviewing','resolved','archived')),
  created_at timestamptz not null default now()
);

create index if not exists test_results_created_at_idx on public.test_results(created_at desc);
create index if not exists test_results_primary_type_idx on public.test_results(primary_type);
create index if not exists feedback_created_at_idx on public.feedback(created_at desc);

alter table public.test_results enable row level security;
alter table public.feedback enable row level security;

drop policy if exists "anonymous can submit results" on public.test_results;
create policy "anonymous can submit results" on public.test_results for insert to anon with check (true);

drop policy if exists "anonymous can submit feedback" on public.feedback;
create policy "anonymous can submit feedback" on public.feedback for insert to anon with check (true);

revoke all on public.test_results from anon;
revoke all on public.feedback from anon;
grant insert on public.test_results to anon;
grant insert on public.feedback to anon;
