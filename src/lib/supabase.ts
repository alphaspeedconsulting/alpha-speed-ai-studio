import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  if (!client) {
    client = createClient(url, anonKey);
  }
  return client;
}

export const supabaseConfigured = Boolean(url && anonKey);

export type AnalyticsSummary = {
  daily: { day: string; pageViews: number; leadEvents: number }[];
  bySource: { sourceMedium: string; campaign: string; sessions: number; leads: number }[];
  totals: { pageViews: number; leads: number };
};

export async function fetchAnalyticsSummary(days = 90): Promise<AnalyticsSummary | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase.rpc("get_analytics_summary", { days });
  if (error) {
    throw new Error(error.message);
  }
  return data as AnalyticsSummary;
}
