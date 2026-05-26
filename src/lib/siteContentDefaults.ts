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
  line1: "Worn.",
  line2: "Intimate.",
  line3: "Yours.",
  subtitle:
    "Freshly worn pieces direct from me — limited stock, real and authentic.",
  primary_cta: "Shop This Week's Drops",
  secondary_cta: "View Full Catalogue",
  proof_strong: "Limited weekly inventory",
  proof_sub: "New drops every Monday",
  card1_label: "This Week",
  card1_value: "Fresh",
  card1_sub: "New drops every Monday",
  card2_label: "Stock",
  card2_value: "Limited",
};

export const DEFAULT_MARQUEE: MarqueeContent = {
  items: [
    "FRESHLY WORN",
    "LIMITED STOCK",
    "DIRECT FROM ME",
    "NEW DROPS WEEKLY",
    "AUTHENTIC",
    "DISCREET DELIVERY",
    "CLAIM YOURS",
  ],
};

export const DEFAULT_CTA: CtaContent = {
  watermark: "Liyah",
  heading_line1: "Claim Yours",
  heading_accent: "Before It's Gone",
  body: "Stock is limited and sells fast. Send a WhatsApp message with the item you want and we'll confirm availability, take payment, and get it shipped — all in one conversation.",
  button_text: "Order on WhatsApp",
};

export const DEFAULT_ABOUT: AboutContent = {
  eyebrow: "The Creator",
  heading: "Real. Raw. Unapologetically Me.",
  paragraph1:
    "This started as something personal — a way to connect and share something intimate with people who appreciate authenticity.",
  paragraph2:
    "Every piece in this collection has been worn by me personally. No gimmicks, no fakes. Just real, limited items direct from my hands to yours.",
  image_url:
    "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&h=750&fit=crop",
  badge_label: "Est.",
  badge_year: "2023",
  stats: [
    { num: "100%", label: "Authentic" },
    { num: "9", label: "Provinces" },
    { num: "24h", label: "Ship Window" },
  ],
};

export const DEFAULT_SETTINGS: SiteSettings = {
  whatsapp_number: "27722865579",
};
