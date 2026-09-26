-- EYS-Kids Dance Academy — backend schema.
-- Figures shown on the site (member count, survey results) live here so they can be
-- updated from the Supabase dashboard without a deploy. The site hides a figure
-- when its row is missing rather than showing a made-up number.

-- Headline numbers, e.g. key = 'members_total'
create table public.site_stats (
  key         text primary key,
  value       bigint not null check (value >= 0),
  as_of       date,
  updated_at  timestamptz not null default now()
);

-- Yearly membership for the 2009 → today bar chart on the home page
create table public.member_history (
  year     int primary key check (year between 2000 and 2100),
  members  int not null check (members >= 0)
);

-- Enrollment survey behind the ranking page
create table public.surveys (
  id           text primary key,
  title        text not null,
  fiscal_year  text,
  respondents  int check (respondents >= 0),
  published    boolean not null default false,
  created_at   timestamptz not null default now()
);

create table public.ranking_reasons (
  id         uuid primary key default gen_random_uuid(),
  survey_id  text not null references public.surveys (id) on delete cascade,
  title      text not null,
  votes      int not null default 0 check (votes >= 0),
  published  boolean not null default true
);
create index ranking_reasons_survey_idx on public.ranking_reasons (survey_id);

-- Real parent / student comments attached to a reason
create table public.ranking_voices (
  id         uuid primary key default gen_random_uuid(),
  reason_id  uuid not null references public.ranking_reasons (id) on delete cascade,
  platform   text not null check (platform in ('facebook', 'instagram', 'twitter')),
  name       text not null,
  profile    text,
  body       text not null,
  posted_at  timestamptz not null default now(),
  published  boolean not null default true
);
create index ranking_voices_reason_idx on public.ranking_voices (reason_id);

-- Video cards. placement decides where a card appears on the site.
create table public.videos (
  id          uuid primary key default gen_random_uuid(),
  placement   text not null check (placement in ('home', 'workshop', 'activity')),
  youtube_id  text check (youtube_id ~ '^[A-Za-z0-9_-]{11}$'),
  title       text not null,
  subtitle    text,   -- school / studio line
  meta        text,   -- region / genre line
  instructor  text,
  image       text,   -- optional custom thumbnail; YouTube's is used otherwise
  sort        int not null default 0,
  published   boolean not null default true,
  created_at  timestamptz not null default now()
);
create index videos_placement_idx on public.videos (placement, sort);

-- Free trial bookings submitted from /freetrial
create table public.trial_bookings (
  id           text primary key,
  created_at   timestamptz not null default now(),
  status       text not null default 'new' check (status in ('new', 'contacted', 'scheduled', 'done', 'cancelled')),
  child_name   text not null,
  child_kana   text not null,
  grade        text not null,
  parent_name  text not null,
  phone        text not null,
  email        text not null,
  studio       text not null,
  genre        text,
  date1        date not null,
  time1        text not null,
  date2        date not null,
  time2        text not null,
  notes        text,
  class_id     text,
  plan_id      text,
  email_sent   boolean not null default false
);
create index trial_bookings_created_idx on public.trial_bookings (created_at desc);

-- Row level security: the site reads and writes with the service role on the
-- server, so anon gets read access to published content only and nothing else.
alter table public.site_stats      enable row level security;
alter table public.member_history  enable row level security;
alter table public.surveys         enable row level security;
alter table public.ranking_reasons enable row level security;
alter table public.ranking_voices  enable row level security;
alter table public.videos          enable row level security;
alter table public.trial_bookings  enable row level security;

create policy "public read" on public.site_stats      for select using (true);
create policy "public read" on public.member_history  for select using (true);
create policy "public read" on public.surveys         for select using (published);
create policy "public read" on public.ranking_reasons for select using (published);
create policy "public read" on public.ranking_voices  for select using (published);
create policy "public read" on public.videos          for select using (published);
-- trial_bookings: no policies → only the service role can read or insert.
