import React from "react";
import { Image, Loader2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  useAboutContent,
  useSiteSettings,
  useUpdateSiteContent,
  DEFAULT_ABOUT,
  type AboutContent,
} from "@/hooks/useSiteContent";

export default function AdminAboutEditor() {
  const { data: about, isLoading } = useAboutContent();
  const { data: settings } = useSiteSettings();
  const updateContent = useUpdateSiteContent();
  const [uploading, setUploading] = React.useState(false);
  const [form, setForm] = React.useState<AboutContent>(DEFAULT_ABOUT);
  const [whatsapp, setWhatsapp] = React.useState("27722865579");
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    if (about) setForm(about);
  }, [about]);

  React.useEffect(() => {
    if (settings?.whatsapp_number) setWhatsapp(settings.whatsapp_number);
  }, [settings]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileName = `about/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(fileName, file, { upsert: true });
    if (!error && data) {
      const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(fileName);
      setForm((f) => ({ ...f, image_url: urlData.publicUrl }));
    }
    setUploading(false);
  };

  const updateStat = (index: number, field: "num" | "label", value: string) => {
    setForm((f) => ({
      ...f,
      stats: f.stats.map((s, i) => (i === index ? { ...s, [field]: value } : s)),
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateContent.mutateAsync({ key: "about", value: form });
    await updateContent.mutateAsync({
      key: "settings",
      value: { whatsapp_number: whatsapp.replace(/\D/g, "") },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 text-[var(--accent)] animate-spin" strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="font-[Bodoni_Moda] text-[1.5rem] font-bold">About Page</h2>
        <button
          type="submit"
          disabled={updateContent.isPending}
          className="flex items-center gap-2 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-white px-6 py-2.5 text-[0.72rem] tracking-[0.15em] uppercase transition-all duration-300 hover:translate-y-[-2px] shadow-[0_8px_24px_rgba(var(--accent-rgb),0.25)] disabled:opacity-60"
        >
          {updateContent.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" strokeWidth={1.5} />
          )}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="bg-white border border-[rgba(var(--border-rgb),0.18)] p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[var(--muted)] mb-3">
            Main Image
          </label>
          <img
            src={form.image_url}
            alt="About preview"
            className="w-full aspect-[4/5] object-cover mb-4 saturate-[0.7]"
          />
          <label className="inline-flex items-center gap-2 px-4 py-2 border border-[rgba(var(--border-rgb),0.35)] text-[0.78rem] text-[var(--muted)] cursor-pointer hover:border-[var(--accent)] transition-colors">
            <Image className="w-4 h-4" strokeWidth={1.5} />
            {uploading ? "Uploading..." : "Upload New Image"}
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
          <div className="mt-4">
            <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[var(--muted)] mb-2">
              Or paste image URL
            </label>
            <input
              type="url"
              value={form.image_url}
              onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
              className="w-full px-4 py-3 bg-[var(--bg)] border border-[rgba(var(--border-rgb),0.18)] text-[0.9rem] focus:border-[var(--accent)] focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[var(--muted)] mb-2">
              Section Label
            </label>
            <input
              value={form.eyebrow}
              onChange={(e) => setForm((f) => ({ ...f, eyebrow: e.target.value }))}
              className="w-full px-4 py-3 bg-[var(--bg)] border border-[rgba(var(--border-rgb),0.18)] text-[0.9rem] focus:border-[var(--accent)] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[var(--muted)] mb-2">
              Heading
            </label>
            <input
              value={form.heading}
              onChange={(e) => setForm((f) => ({ ...f, heading: e.target.value }))}
              className="w-full px-4 py-3 bg-[var(--bg)] border border-[rgba(var(--border-rgb),0.18)] text-[0.9rem] focus:border-[var(--accent)] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[var(--muted)] mb-2">
              Paragraph 1
            </label>
            <textarea
              rows={4}
              value={form.paragraph1}
              onChange={(e) => setForm((f) => ({ ...f, paragraph1: e.target.value }))}
              className="w-full px-4 py-3 bg-[var(--bg)] border border-[rgba(var(--border-rgb),0.18)] text-[0.9rem] focus:border-[var(--accent)] focus:outline-none resize-none"
            />
          </div>
          <div>
            <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[var(--muted)] mb-2">
              Paragraph 2
            </label>
            <textarea
              rows={4}
              value={form.paragraph2}
              onChange={(e) => setForm((f) => ({ ...f, paragraph2: e.target.value }))}
              className="w-full px-4 py-3 bg-[var(--bg)] border border-[rgba(var(--border-rgb),0.18)] text-[0.9rem] focus:border-[var(--accent)] focus:outline-none resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[var(--muted)] mb-2">
                Badge Label
              </label>
              <input
                value={form.badge_label}
                onChange={(e) => setForm((f) => ({ ...f, badge_label: e.target.value }))}
                className="w-full px-4 py-3 bg-[var(--bg)] border border-[rgba(var(--border-rgb),0.18)] text-[0.9rem] focus:border-[var(--accent)] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[var(--muted)] mb-2">
                Badge Year
              </label>
              <input
                value={form.badge_year}
                onChange={(e) => setForm((f) => ({ ...f, badge_year: e.target.value }))}
                className="w-full px-4 py-3 bg-[var(--bg)] border border-[rgba(var(--border-rgb),0.18)] text-[0.9rem] focus:border-[var(--accent)] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[rgba(var(--border-rgb),0.18)] p-6">
        <h3 className="font-[Bodoni_Moda] text-[1.1rem] font-bold mb-4">Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {form.stats.map((stat, i) => (
            <div key={i} className="space-y-2 p-4 bg-[var(--bg)] border border-[rgba(var(--border-rgb),0.18)]">
              <input
                value={stat.num}
                onChange={(e) => updateStat(i, "num", e.target.value)}
                placeholder="500+"
                className="w-full px-3 py-2 bg-white border border-[rgba(var(--border-rgb),0.18)] text-[0.9rem] focus:border-[var(--accent)] focus:outline-none"
              />
              <input
                value={stat.label}
                onChange={(e) => updateStat(i, "label", e.target.value)}
                placeholder="Happy Clients"
                className="w-full px-3 py-2 bg-white border border-[rgba(var(--border-rgb),0.18)] text-[0.85rem] focus:border-[var(--accent)] focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-[rgba(var(--border-rgb),0.18)] p-6">
        <h3 className="font-[Bodoni_Moda] text-[1.1rem] font-bold mb-2">WhatsApp Orders</h3>
        <p className="text-[0.82rem] text-[var(--muted)] mb-4">
          Number used when customers place orders (country code, no + or spaces). Example:
          27722865579
        </p>
        <input
          type="tel"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="w-full max-w-sm px-4 py-3 bg-[var(--bg)] border border-[rgba(var(--border-rgb),0.18)] text-[0.9rem] focus:border-[var(--accent)] focus:outline-none"
        />
      </div>
    </form>
  );
}
