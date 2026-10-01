-- Tiny Explorers Hub: repurpose the EYS schema for a kids' learning-video channel.
-- The EYS-only tables below were empty when this ran (videos held 16 design placeholders).

drop table if exists public.ranking_voices;
drop table if exists public.ranking_reasons;
drop table if exists public.surveys;
drop table if exists public.member_history;
drop table if exists public.trial_bookings;
drop table if exists public.videos;

-- site_stats stays: headline figures (key = 'video_plays', 'recommend_pct', 'reviews', ...).
-- A figure with no row is simply not shown.

-- Video library. A row plays either a self-hosted MP4 (media_file, served from /v/<file>)
-- or a YouTube video (youtube_id).
create table public.videos (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique check (slug ~ '^[a-z0-9-]+$'),
  title        text not null,
  category     text not null check (category in ('abc', 'numbers', 'animals', 'songs', 'faith', 'family')),
  letter       char(1) check (letter ~ '^[A-Z]$'),
  description  text not null default '',
  try_this     text,
  media_file   text check (media_file ~ '^[a-z0-9-]+\.mp4$'),
  youtube_id   text check (youtube_id ~ '^[A-Za-z0-9_-]{11}$'),
  facebook_id  text check (facebook_id ~ '^[0-9]+$'),
  duration     int check (duration > 0),
  published_at date not null default current_date,
  featured     boolean not null default false,
  published    boolean not null default true,
  created_at   timestamptz not null default now(),
  check (media_file is not null or youtube_id is not null)
);
create index videos_category_idx on public.videos (category, published_at desc);

-- One like per visitor per video. visitor is a salted hash of an anonymous browser id:
-- no accounts, nothing that identifies a child.
create table public.video_likes (
  video_id    uuid not null references public.videos (id) on delete cascade,
  visitor     text not null check (length(visitor) = 64),
  created_at  timestamptz not null default now(),
  primary key (video_id, visitor)
);

-- Messages from parents, schools and brands (Work With Us / About forms). Adults only.
create table public.inquiries (
  id            text primary key,
  created_at    timestamptz not null default now(),
  type          text not null check (type in ('parent', 'school', 'brand', 'other')),
  name          text not null,
  email         text not null,
  organization  text,
  package       text,
  message       text not null,
  status        text not null default 'new' check (status in ('new', 'replied', 'closed')),
  email_sent    boolean not null default false
);
create index inquiries_created_idx on public.inquiries (created_at desc);

-- Support payments via Paystack. Status is only ever set from Paystack's verified response.
create table public.donations (
  reference    text primary key,
  created_at   timestamptz not null default now(),
  name         text,
  email        text not null,
  amount_kobo  int not null check (amount_kobo >= 10000),
  currency     text not null default 'NGN',
  message      text,
  status       text not null default 'pending' check (status in ('pending', 'success', 'failed', 'abandoned')),
  paid_at      timestamptz
);

alter table public.videos       enable row level security;
alter table public.video_likes  enable row level security;
alter table public.inquiries    enable row level security;
alter table public.donations    enable row level security;

create policy "public read" on public.videos for select using (published);
-- video_likes, inquiries, donations: no policies → server-only access.
