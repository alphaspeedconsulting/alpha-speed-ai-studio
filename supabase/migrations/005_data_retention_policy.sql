-- Data retention: auto-purge analytics_events older than 90 days
-- Requires pg_cron extension (available on Supabase Pro plans).
-- If pg_cron is not available, use a Supabase Edge Function with a cron schedule instead.

create extension if not exists pg_cron;

-- Schedule daily at 03:00 UTC
select cron.schedule(
  'purge-analytics-events-90d',
  '0 3 * * *',
  $$ delete from public.analytics_events where created_at < now() - interval '90 days'; $$
);
