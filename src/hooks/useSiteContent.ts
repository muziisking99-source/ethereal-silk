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

export type HeroContent = {
  background_image_url: string;
  line1: string;
  line2: string;
  line3: string;
  subtitle: string;
  primary_cta: string;
  secondary_cta: string;
  proof_strong: string;
  proof_sub: string;
  card1_label: string;
  card1_value: string;
  card1_sub: string;
  card2_label: string;
  card2_value: string;
};

export type MarqueeContent = {
  items: string[];
};

export type CtaContent = {
  watermark: string;
  heading_line1: string;
  heading_accent: string;
  body: string;
  button_text: string;
};

export const DEFAULT_HERO: HeroContent = {
  background_image_url:
    "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&h=1000&fit=crop",
  line1: "Sensual.",
  line2: "Elegant.",
  line3: "Only Liyah.",
  subtitle:
    "A curated world of luxury lingerie crafted for those who appreciate the art of femininity. Every set is designed to feel intimate, confident, and unmistakably yours.",
  primary_cta: "Shop Collection",
  secondary_cta: "View Catalogue",
  proof_strong: "500+ happy clients",
  proof_sub: "Handcrafted luxury · South Africa",
  card1_label: "New Arrivals",
  card1_value: "Weekly",
  card1_sub: "Fresh sets every week",
  card2_label: "Boutique Rating",
  card2_value: "4.9★",
};

export const DEFAULT_MARQUEE: MarqueeContent = {
  items: [
    "Luxury Lace",
    "Silk Essentials",
    "Boudoir Sets",
    "Bridal Collection",
    "Evening Wear",
    "Comfort First",
    "South African Made",
    "Handcrafted Details",
  ],
};

export const DEFAULT_CTA: CtaContent = {
  watermark: "Liyah",
  heading_line1: "Ready to Indulge in",
  heading_accent: "Only Liyah?",
  body: "Curated lingerie sets from R299. Add to your basket and complete your order via WhatsApp — discreet delivery across South Africa.",
  button_text: "Shop the Collection",
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
