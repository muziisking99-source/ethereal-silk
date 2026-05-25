INSERT INTO public.site_content (key, value) VALUES
(
  'hero',
  '{
    "background_image_url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&h=1000&fit=crop",
    "line1": "Sensual.",
    "line2": "Elegant.",
    "line3": "Only Liyah.",
    "subtitle": "A curated world of luxury lingerie crafted for those who appreciate the art of femininity. Every set is designed to feel intimate, confident, and unmistakably yours.",
    "primary_cta": "Shop Collection",
    "secondary_cta": "View Catalogue",
    "proof_strong": "500+ happy clients",
    "proof_sub": "Handcrafted luxury · South Africa",
    "card1_label": "New Arrivals",
    "card1_value": "Weekly",
    "card1_sub": "Fresh sets every week",
    "card2_label": "Boutique Rating",
    "card2_value": "4.9★"
  }'::jsonb
),
(
  'marquee',
  '{
    "items": [
      "Luxury Lace",
      "Silk Essentials",
      "Boudoir Sets",
      "Bridal Collection",
      "Evening Wear",
      "Comfort First",
      "South African Made",
      "Handcrafted Details"
    ]
  }'::jsonb
),
(
  'cta',
  '{
    "watermark": "Liyah",
    "heading_line1": "Ready to Indulge in",
    "heading_accent": "Only Liyah?",
    "body": "Curated lingerie sets from R299. Add to your basket and complete your order via WhatsApp — discreet delivery across South Africa.",
    "button_text": "Shop the Collection"
  }'::jsonb
)
ON CONFLICT (key) DO NOTHING;
