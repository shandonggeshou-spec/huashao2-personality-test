-- 在独立 Supabase 项目的 SQL Editor 中完整执行。
-- 测试网站的匿名访客只允许提交，不允许读取、修改或删除。
-- 站长仅通过 Supabase Dashboard 的 Table Editor / SQL Editor 查看数据。

create extension if not exists pgcrypto;

create table if not exists public.test_results (
  id uuid primary key default gen_random_uuid(),
  public_id text not null unique check (public_id ~ '^HL-[A-Z0-9]+-[A-Z0-9]{4}$'),
  assessment_version text not null default '3.0.0' check (char_length(assessment_version) between 1 and 20),
  primary_type text not null check (primary_type in ('jing','ning','xu','zheng','mao','chen','yang')),
  secondary_type text not null check (secondary_type in ('jing','ning','xu','zheng','mao','chen','yang')),
  scores jsonb not null default '{}'::jsonb check (jsonb_typeof(scores) = 'object'),
  calibrated_scores jsonb not null default '{}'::jsonb check (jsonb_typeof(calibrated_scores) = 'object'),
  dimensions jsonb not null default '{}'::jsonb check (jsonb_typeof(dimensions) = 'object'),
  dimension_raw_scores jsonb not null default '{}'::jsonb check (jsonb_typeof(dimension_raw_scores) = 'object'),
  dimension_calibrated_scores jsonb not null default '{}'::jsonb check (jsonb_typeof(dimension_calibrated_scores) = 'object'),
  question_ids jsonb not null default '[]'::jsonb check (jsonb_typeof(question_ids) = 'array' and jsonb_array_length(question_ids) = 24),
  answers jsonb not null default '[]'::jsonb check (jsonb_typeof(answers) = 'array' and jsonb_array_length(answers) = 24),
  answer_records jsonb not null default '[]'::jsonb check (jsonb_typeof(answer_records) = 'array' and jsonb_array_length(answer_records) = 24),
  duration_seconds integer check (duration_seconds between 0 and 86400),
  check (primary_type <> secondary_type),
  check (octet_length(scores::text) <= 2000),
  check (octet_length(calibrated_scores::text) <= 3000),
  check (octet_length(dimensions::text) <= 1000),
  check (octet_length(dimension_raw_scores::text) <= 1000),
  check (octet_length(dimension_calibrated_scores::text) <= 1500),
  check (octet_length(question_ids::text) <= 1000),
  check (octet_length(answer_records::text) <= 16000),
  check (answers <@ '[0, 1, 2, 3]'::jsonb),
  created_at timestamptz not null default now()
);
comment on table public.test_results is 'Anonymous entertainment-test submissions. No identity, location, or IP fields.';

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('result','question','bug','idea','other')),
  message text not null check (char_length(message) between 1 and 1000),
  result_public_id text check (result_public_id is null or result_public_id ~ '^HL-[A-Z0-9]+-[A-Z0-9]{4}$'),
  result_type text check (result_type is null or result_type in ('jing','ning','xu','zheng','mao','chen','yang')),
  page_url text check (page_url is null or char_length(page_url) <= 500),
  status text not null default 'new' check (status in ('new','reviewing','resolved','archived')),
  created_at timestamptz not null default now()
);
comment on table public.feedback is 'Feedback without identity, contact, location, or IP fields.';

-- 兼容曾执行过开发版脚本的项目：删除不再收集的地域字段和自建后台名单。
alter table public.test_results add column if not exists assessment_version text not null default '3.0.0';
alter table public.test_results add column if not exists calibrated_scores jsonb not null default '{}'::jsonb;
alter table public.test_results add column if not exists dimension_raw_scores jsonb not null default '{}'::jsonb;
alter table public.test_results add column if not exists dimension_calibrated_scores jsonb not null default '{}'::jsonb;
alter table public.test_results add column if not exists question_ids jsonb not null default '[]'::jsonb;
alter table public.test_results add column if not exists answer_records jsonb not null default '[]'::jsonb;
alter table public.test_results alter column assessment_version set default '3.0.0';
alter table public.test_results drop column if exists city;
alter table public.test_results drop column if exists region;
alter table public.test_results drop column if exists country_code;
alter table public.feedback drop column if exists contact;

create index if not exists test_results_created_at_idx on public.test_results(created_at desc);
create index if not exists test_results_primary_type_idx on public.test_results(primary_type);
create index if not exists feedback_created_at_idx on public.feedback(created_at desc);

alter table public.test_results enable row level security;
alter table public.feedback enable row level security;

drop policy if exists "anonymous can submit results" on public.test_results;
create policy "anonymous can submit results" on public.test_results for insert to anon with check (true);

drop policy if exists "anonymous can submit feedback" on public.feedback;
create policy "anonymous can submit feedback" on public.feedback for insert to anon with check (true);

drop policy if exists "admins can read results" on public.test_results;
drop policy if exists "admins can read feedback" on public.feedback;
drop policy if exists "admins can update feedback" on public.feedback;
drop table if exists public.admin_users;

revoke all on public.test_results from anon, authenticated;
revoke all on public.feedback from anon, authenticated;
grant insert on public.test_results to anon;
grant insert on public.feedback to anon;

-- Dashboard 专用的简洁结果视图。打开 Table Editor > test_result_overview 查看。
create or replace view public.test_result_overview as
select created_at as tested_at,
       duration_seconds,
       case primary_type
         when 'jing' then '井柏然'
         when 'ning' then '宁静'
         when 'xu' then '许晴'
         when 'zheng' then '郑爽'
         when 'mao' then '毛阿敏'
         when 'chen' then '陈意涵'
         when 'yang' then '杨洋'
       end as result_name,
       public_id
from public.test_results
order by created_at desc;

create or replace view public.feedback_overview as
select created_at as submitted_at, category, message, result_public_id, result_type, status
from public.feedback
order by created_at desc;

revoke all on public.test_result_overview from anon, authenticated;
revoke all on public.feedback_overview from anon, authenticated;
grant select on public.test_result_overview to service_role;
grant select on public.feedback_overview to service_role;

-- 可选：定期执行，落实最长 12 个月的数据保留期。
-- delete from public.test_results where created_at < now() - interval '12 months';
-- delete from public.feedback where created_at < now() - interval '12 months' and status in ('resolved','archived');
