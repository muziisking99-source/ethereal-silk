import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  DEFAULT_ABOUT,
  DEFAULT_CTA,
  DEFAULT_HERO,
  DEFAULT_MARQUEE,
  DEFAULT_SETTINGS,
} from "@/lib/siteContentDefaults";

export type {
  AboutStat,
  AboutContent,
  SiteSettings,
  HeroContent,
  MarqueeContent,
  CtaContent,
} from "@/lib/siteContentDefaults";

export {
  DEFAULT_HERO,
  DEFAULT_MARQUEE,
  DEFAULT_CTA,
  DEFAULT_ABOUT,
  DEFAULT_SETTINGS,
} from "@/lib/siteContentDefaults";

async function fetchContent<T>(key: string, fallback: T): Promise<T> {
  const { data, error } = await supabase
    .from("site_content")
    .select("value")
    .eq("key", key)
    .maybeSingle();

  if (error) {
    console.warn(`site_content.${key} unavailable, using defaults:`, error.message);
    return fallback;
  }
  if (!data?.value) return fallback;
  return { ...fallback, ...(data.value as object) } as T;
}

export function useAboutContent() {
  return useQuery({
    queryKey: ["site_content", "about"],
    queryFn: () => fetchContent("about", DEFAULT_ABOUT),
  });
}

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site_content", "settings"],
    queryFn: () => fetchContent("settings", DEFAULT_SETTINGS),
  });
}

export function useHeroContent() {
  return useQuery({
    queryKey: ["site_content", "hero"],
    queryFn: () => fetchContent("hero", DEFAULT_HERO),
  });
}

export function useMarqueeContent() {
  return useQuery({
    queryKey: ["site_content", "marquee"],
    queryFn: () => fetchContent("marquee", DEFAULT_MARQUEE),
  });
}

export function useCtaContent() {
  return useQuery({
    queryKey: ["site_content", "cta"],
    queryFn: () => fetchContent("cta", DEFAULT_CTA),
  });
}

export function useUpdateSiteContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: object }) => {
      const { error } = await supabase.from("site_content").upsert(
        { key, value, updated_at: new Date().toISOString() },
        { onConflict: "key" }
      );
      if (error) throw error;
    },
    onSuccess: (_, { key }) => {
      queryClient.invalidateQueries({ queryKey: ["site_content", key] });
    },
  });
}
