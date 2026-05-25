-- Site content (about page, settings)
CREATE TABLE public.site_content (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site content"
ON public.site_content
FOR SELECT
TO PUBLIC
USING (true);

CREATE POLICY "Only admins can insert site content"
ON public.site_content
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update site content"
ON public.site_content
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Default about page content
INSERT INTO public.site_content (key, value) VALUES
(
  'about',
  '{
    "eyebrow": "Our Story",
    "heading": "Crafted with Intention, Designed for You",
    "paragraph1": "Only Liyah was born from a simple belief: every woman deserves to feel luxurious in her own skin. What started as a passion project in Cape Town has grown into a trusted boutique for handcrafted lingerie.",
    "paragraph2": "We source the finest European laces, silks, and satins, then design each set with meticulous attention to fit and finish. Confidence is the most beautiful thing a woman can wear.",
    "image_url": "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&h=750&fit=crop",
    "badge_label": "Est.",
    "badge_year": "2023",
    "stats": [
      {"num": "500+", "label": "Happy Clients"},
      {"num": "150+", "label": "Unique Sets"},
      {"num": "9", "label": "Provinces Served"}
    ]
  }'::jsonb
),
(
  'settings',
  '{"whatsapp_number": "27722865579"}'::jsonb
);

-- Admins can view all products (including inactive)
CREATE POLICY "Admins can view all products"
ON public.products
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Customers can place orders from checkout (public insert)
CREATE POLICY "Anyone can create orders"
ON public.orders
FOR INSERT
TO PUBLIC
WITH CHECK (true);
