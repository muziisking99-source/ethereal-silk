import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type AboutStat = { num: string; label: string };

export type AboutContent = {
  eyebrow: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  image_url: string;
  badge_label: string;
  badge_year: string;
  stats: AboutStat[];
};

export type SiteSettings = {
  whatsapp_number: string;
};

export const DEFAULT_ABOUT: AboutContent = {
  eyebrow: "Our Story",
  heading: "Crafted with Intention, Designed for You",
  paragraph1:
    "Only Liyah was born from a simple belief: every woman deserves to feel luxurious in her own skin. What started as a passion project in Cape Town has grown into a trusted boutique for handcrafted lingerie.",
  paragraph2:
    "We source the finest European laces, silks, and satins, then design each set with meticulous attention to fit and finish. Confidence is the most beautiful thing a woman can wear.",
  image_url:
    "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&h=750&fit=crop",
  badge_label: "Est.",
  badge_year: "2023",
  stats: [
    { num: "500+", label: "Happy Clients" },
    { num: "150+", label: "Unique Sets" },
    { num: "9", label: "Provinces Served" },
  ],
};

export const DEFAULT_SETTINGS: SiteSettings = {
  whatsapp_number: "27722865579",
};

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
