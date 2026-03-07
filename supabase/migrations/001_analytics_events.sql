-- Analytics events table for site-wide traffic (Supabase)
-- Run this in Supabase Dashboard → SQL Editor

create extension if not exists pgcrypto;

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  type text not null,
  name text not null,
  path text not null,
  source text,
  medium text,
  campaign text,
  content text,
  term text,
  referrer text
);

alter table public.analytics_events enable row level security;

-- Allow anonymous insert (your frontend sends events with anon key)
drop policy if exists "Allow anon insert" on public.analytics_events;
create policy "Allow anon insert"
  on public.analytics_events for insert
  to anon with check (true);

-- Aggregated summary: only this function can read; anon can execute it
create or replace function public.get_analytics_summary(days int default 90)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  result json;
begin
  select json_build_object(
    'daily', (
      select json_agg(
        json_build_object('day', x.day, 'pageViews', x."pageViews", 'leadEvents', x."leadEvents")
        order by x.day_ts
      )
      from (
        select
          to_char(l.day, 'Mon DD') as day,
          l.day as day_ts,
          (count(*) filter (where e.type = 'page_view'))::int as "pageViews",
          (count(*) filter (where e.type = 'lead_event'))::int as "leadEvents"
        from (
          select distinct date_trunc('day', created_at at time zone 'UTC') as day
          from analytics_events
          where created_at >= now() - (days || ' days')::interval
          order by 1 desc
          limit 14
        ) l
        left join analytics_events e on date_trunc('day', e.created_at at time zone 'UTC') = l.day
        group by l.day
      ) x
    ),
    'bySource', (
      select json_agg(s order by sessions desc)
      from (
        select
          coalesce(source, 'direct') || ' / ' || coalesce(medium, 'none') as "sourceMedium",
          coalesce(campaign, '-') as campaign,
          count(*) filter (where type = 'page_view') as sessions,
          count(*) filter (where type = 'lead_event') as leads
        from analytics_events
        where created_at >= now() - (days || ' days')::interval
          and type in ('page_view', 'lead_event')
        group by coalesce(source, 'direct'), coalesce(medium, 'none'), coalesce(campaign, '-')
        order by count(*) filter (where type = 'page_view') desc
        limit 10
      ) s
    ),
    'totals', (
      select json_build_object(
        'pageViews', count(*) filter (where type = 'page_view'),
        'leads', count(*) filter (where type = 'lead_event')
      )
      from analytics_events
      where created_at >= now() - (days || ' days')::interval
    )
  ) into result;
  return coalesce(result, '{"daily":[],"bySource":[],"totals":{"pageViews":0,"leads":0}}'::json);
end;
$$;

grant execute on function public.get_analytics_summary(int) to anon;
grant execute on function public.get_analytics_summary(int) to authenticated;
