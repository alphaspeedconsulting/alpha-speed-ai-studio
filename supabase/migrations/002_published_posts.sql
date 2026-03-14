-- Published posts table — written to by the Alpha AI content gen flow
-- Website reads with anon key (public feed). Content gen writes with service role key.
-- Run this in Supabase Dashboard → SQL Editor

create table if not exists public.published_posts (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  posted_at   timestamptz not null default now(),
  platform    text not null,           -- 'instagram', 'tiktok', etc.
  image_url   text,                    -- public URL to the image/video thumbnail
  caption     text,
  post_url    text,                    -- deep link to the post (e.g. instagram.com/p/...)
  tags        text[]                   -- e.g. ARRAY['#ai', '#automation']
);

alter table public.published_posts enable row level security;

-- Website (anon key) can read all posts
drop policy if exists "Allow anon select" on public.published_posts;
create policy "Allow anon select"
  on public.published_posts for select
  to anon using (true);

-- Only service role can insert (content gen flow uses service role key)
-- No explicit insert policy needed — service role bypasses RLS by default

-- Test row so the website has data before the content gen flow is live
-- Remove this row after the first real post is published
insert into public.published_posts (platform, image_url, caption, post_url, posted_at)
values (
  'instagram',
  'https://alphaspeedai.com/og-image.jpeg',
  '🤖 AI automation is changing how DFW businesses work. From workflow automation to custom AI agents — we help you save time and grow. Link in bio. #DFW #AIAutomation #AlphaSpeedAI',
  'https://www.instagram.com/alphaspeedai',
  now()
);
