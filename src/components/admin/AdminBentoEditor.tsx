import React from "react";
import { Image, Loader2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  useBentoContent,
  useUpdateSiteContent,
  DEFAULT_BENTO,
  type BentoContent,
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

export default function AdminBentoEditor() {
  const { data: bentoData, isLoading: bentoLoading } = useBentoContent();
  const updateContent = useUpdateSiteContent();

  const [bento, setBento] = React.useState<BentoContent>(DEFAULT_BENTO);
  const [uploading, setUploading] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    if (bentoData) setBento(bentoData);
  }, [bentoData]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file, "bento");
    if (url) setBento((b) => ({ ...b, card1_image_url: url }));
    setUploading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateContent.mutateAsync({ key: "bento", value: bento });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (bentoLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 text-[var(--accent)] animate-spin" strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="font-[Bodoni_Moda] text-[1.5rem] font-bold">Bento Section</h2>
        <button
          type="submit"
          disabled={updateContent.isPending}
          className="flex items-center gap-2 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-white px-6 py-2.5 text-[0.72rem] tracking-[0.15em] uppercase disabled:opacity-60"
        >
          {updateContent.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" strokeWidth={1.5} />
          )}
          {saved ? "Saved!" : "Save Section"}
        </button>
      </div>

      {/* Bento Card 1 Image */}
      <section className="bg-white border border-[rgba(var(--border-rgb),0.18)] p-6 space-y-4">
        <h3 className="font-[Bodoni_Moda] text-[1.2rem] font-bold">
          Card 1: "Limited Stock - Direct from me"
        </h3>
        <p className="text-[0.82rem] text-[var(--muted)]">
          This is the image displayed in the first card of your Bento grid section (220x220px recommended).
        </p>

        <div className="space-y-4">
          <div>
            <p className="text-[0.72rem] tracking-[0.15em] uppercase text-[var(--muted)] mb-3">
              Current Image Preview
            </p>
            <img
              src={bento.card1_image_url}
              alt="Bento card preview"
              className="w-full aspect-square object-cover mb-4 border border-[rgba(var(--border-rgb),0.18)]"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[var(--muted)] mb-3">
                Upload New Image
              </label>
              <label className="inline-flex items-center gap-2 px-4 py-3 border border-[rgba(var(--border-rgb),0.18)] cursor-pointer hover:border-[var(--accent)] transition-colors text-[0.78rem] text-[var(--muted)]">
                <Image className="w-4 h-4" />
                {uploading ? "Uploading..." : "Choose File"}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
              <p className="text-[0.7rem] text-[var(--muted)] mt-2">
                Recommended: 600x500px or larger. Aspect ratio: any. File size: up to 5MB.
              </p>
            </div>

            <div>
              <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[var(--muted)] mb-3">
                Or paste a direct URL
              </label>
              <input
                type="url"
                value={bento.card1_image_url}
                onChange={(e) => setBento((b) => ({ ...b, card1_image_url: e.target.value }))}
                className="w-full px-4 py-3 bg-[var(--bg)] border border-[rgba(var(--border-rgb),0.18)] text-[0.85rem] focus:outline-none focus:border-[var(--accent)]"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        </div>
      </section>
    </form>
  );
}
