import React from "react";
import { Image, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  useHeroContent,
  useMarqueeContent,
  useCtaContent,
  useUpdateSiteContent,
  DEFAULT_HERO,
  DEFAULT_MARQUEE,
  DEFAULT_CTA,
  type HeroContent,
  type MarqueeContent,
  type CtaContent,
} from "@/hooks/useSiteContent";

async function uploadImage(file: File, folder: string) {
  const fileName = `${folder}/${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("product-images")
    .upload(fileName, file, { upsert: true });
  if (error || !data) return null;
  const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(fileName);
  return urlData.publicUrl;
}

export default function AdminHomeEditor() {
  const { data: heroData, isLoading: heroLoading } = useHeroContent();
  const { data: marqueeData, isLoading: marqueeLoading } = useMarqueeContent();
  const { data: ctaData, isLoading: ctaLoading } = useCtaContent();
  const updateContent = useUpdateSiteContent();

  const [hero, setHero] = React.useState<HeroContent>(DEFAULT_HERO);
  const [marquee, setMarquee] = React.useState<MarqueeContent>(DEFAULT_MARQUEE);
  const [cta, setCta] = React.useState<CtaContent>(DEFAULT_CTA);
  const [uploading, setUploading] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    if (heroData) setHero(heroData);
  }, [heroData]);
  React.useEffect(() => {
    if (marqueeData) setMarquee(marqueeData);
  }, [marqueeData]);
  React.useEffect(() => {
    if (ctaData) setCta(ctaData);
  }, [ctaData]);

  const handleHeroImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file, "hero");
    if (url) setHero((h) => ({ ...h, background_image_url: url }));
    setUploading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateContent.mutateAsync({ key: "hero", value: hero });
    await updateContent.mutateAsync({
      key: "marquee",
      value: { items: marquee.items.filter((s) => s.trim()) },
    });
    await updateContent.mutateAsync({ key: "cta", value: cta });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (heroLoading || marqueeLoading || ctaLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 text-[#6b3a5e] animate-spin" strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-10">
      <div className="flex justify-between items-center">
        <h2 className="font-[Bodoni_Moda] text-[1.5rem] font-bold">Homepage</h2>
        <button
          type="submit"
          disabled={updateContent.isPending}
          className="flex items-center gap-2 bg-gradient-to-br from-[#6b3a5e] to-[#a87cad] text-white px-6 py-2.5 text-[0.72rem] tracking-[0.15em] uppercase disabled:opacity-60"
        >
          {updateContent.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" strokeWidth={1.5} />
          )}
          {saved ? "Saved!" : "Save Homepage"}
        </button>
      </div>

      {/* Hero */}
      <section className="bg-white border border-[rgba(180,140,160,0.18)] p-6 space-y-4">
        <h3 className="font-[Bodoni_Moda] text-[1.2rem] font-bold">Hero Section</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="text-[0.72rem] tracking-[0.15em] uppercase text-[#8a6e7a] mb-2">
              Background Image
            </p>
            <img
              src={hero.background_image_url}
              alt="Hero preview"
              className="w-full aspect-[16/10] object-cover mb-3"
            />
            <label className="inline-flex items-center gap-2 px-4 py-2 border cursor-pointer hover:border-[#6b3a5e] text-[0.78rem] text-[#8a6e7a]">
              <Image className="w-4 h-4" />
              {uploading ? "Uploading..." : "Upload Image"}
              <input type="file" accept="image/*" className="hidden" onChange={handleHeroImage} />
            </label>
            <input
              type="url"
              value={hero.background_image_url}
              onChange={(e) => setHero((h) => ({ ...h, background_image_url: e.target.value }))}
              className="w-full mt-3 px-4 py-3 bg-[#faf7f4] border text-[0.85rem] focus:outline-none focus:border-[#6b3a5e]"
              placeholder="Image URL"
            />
          </div>
          <div className="space-y-3">
            {(
              [
                ["line1", "Headline line 1"],
                ["line2", "Headline line 2 (italic)"],
                ["line3", "Headline line 3 (gradient)"],
                ["subtitle", "Subtitle paragraph"],
                ["primary_cta", "Primary button"],
                ["secondary_cta", "Secondary link"],
                ["proof_strong", "Social proof — bold"],
                ["proof_sub", "Social proof — sub"],
              ] as const
            ).map(([key, label]) => (
              <div key={key}>
                <label className="block text-[0.65rem] uppercase tracking-[0.12em] text-[#8a6e7a] mb-1">
                  {label}
                </label>
                {key === "subtitle" ? (
                  <textarea
                    rows={3}
                    value={hero[key]}
                    onChange={(e) => setHero((h) => ({ ...h, [key]: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#faf7f4] border text-[0.85rem] resize-none focus:outline-none focus:border-[#6b3a5e]"
                  />
                ) : (
                  <input
                    value={hero[key]}
                    onChange={(e) => setHero((h) => ({ ...h, [key]: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#faf7f4] border text-[0.85rem] focus:outline-none focus:border-[#6b3a5e]"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-4 border-t">
          {(
            [
              ["card1_label", "Card 1 label"],
              ["card1_value", "Card 1 value"],
              ["card1_sub", "Card 1 sub"],
              ["card2_label", "Card 2 label"],
              ["card2_value", "Card 2 value"],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <label className="block text-[0.65rem] uppercase text-[#8a6e7a] mb-1">{label}</label>
              <input
                value={hero[key]}
                onChange={(e) => setHero((h) => ({ ...h, [key]: e.target.value }))}
                className="w-full px-3 py-2 bg-[#faf7f4] border text-[0.85rem] focus:outline-none focus:border-[#6b3a5e]"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Marquee */}
      <section className="bg-white border border-[rgba(180,140,160,0.18)] p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-[Bodoni_Moda] text-[1.2rem] font-bold">Scrolling Banner</h3>
          <button
            type="button"
            onClick={() => setMarquee((m) => ({ items: [...m.items, "New phrase"] }))}
            className="flex items-center gap-1 text-[0.72rem] uppercase tracking-[0.12em] text-[#6b3a5e]"
          >
            <Plus className="w-4 h-4" /> Add phrase
          </button>
        </div>
        <p className="text-[0.82rem] text-[#8a6e7a]">
          These phrases rotate in the plum banner below the hero.
        </p>
        <div className="space-y-2">
          {marquee.items.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={item}
                onChange={(e) =>
                  setMarquee((m) => ({
                    items: m.items.map((t, j) => (j === i ? e.target.value : t)),
                  }))
                }
                className="flex-1 px-3 py-2 bg-[#faf7f4] border text-[0.85rem] focus:outline-none focus:border-[#6b3a5e]"
              />
              <button
                type="button"
                onClick={() =>
                  setMarquee((m) => ({ items: m.items.filter((_, j) => j !== i) }))
                }
                className="p-2 text-[#8a6e7a] hover:text-[#e8849a]"
                aria-label="Remove phrase"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white border border-[rgba(180,140,160,0.18)] p-6 space-y-4">
        <h3 className="font-[Bodoni_Moda] text-[1.2rem] font-bold">Bottom CTA Strip</h3>
        {(
          [
            ["watermark", "Background watermark text"],
            ["heading_line1", "Heading line 1"],
            ["heading_accent", "Heading accent (blush)"],
            ["body", "Body paragraph"],
            ["button_text", "Button text"],
          ] as const
        ).map(([key, label]) => (
          <div key={key}>
            <label className="block text-[0.65rem] uppercase tracking-[0.12em] text-[#8a6e7a] mb-1">
              {label}
            </label>
            {key === "body" ? (
              <textarea
                rows={3}
                value={cta[key]}
                onChange={(e) => setCta((c) => ({ ...c, [key]: e.target.value }))}
                className="w-full px-3 py-2 bg-[#faf7f4] border text-[0.85rem] resize-none focus:outline-none focus:border-[#6b3a5e]"
              />
            ) : (
              <input
                value={cta[key]}
                onChange={(e) => setCta((c) => ({ ...c, [key]: e.target.value }))}
                className="w-full px-3 py-2 bg-[#faf7f4] border text-[0.85rem] focus:outline-none focus:border-[#6b3a5e]"
              />
            )}
          </div>
        ))}
      </section>
    </form>
  );
}
