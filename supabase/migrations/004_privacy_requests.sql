-- Privacy request intake table (CCPA / user rights)
-- Run in Supabase Dashboard → SQL Editor

create table if not exists public.privacy_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  request_type text not null check (request_type in ('access', 'delete', 'correct', 'opt-out')),
  details text,
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'completed', 'dismissed'))
);

alter table public.privacy_requests enable row level security;

-- Anon users can INSERT a request (submit the form)
drop policy if exists "Allow anon insert privacy_requests" on public.privacy_requests;
create policy "Allow anon insert privacy_requests"
  on public.privacy_requests for insert
  to anon with check (true);

-- Anon and authenticated users cannot read requests (admin only via service role)
-- No SELECT policy for anon or authenticated intentionally.
