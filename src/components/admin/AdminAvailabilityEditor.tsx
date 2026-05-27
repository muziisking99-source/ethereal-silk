import React from "react";
import { ArrowDown, ArrowUp, Loader2, Save } from "lucide-react";
import { useAllProducts } from "@/hooks/useProducts";
import {
  DEFAULT_AVAILABILITY,
  useAvailabilityContent,
  useUpdateSiteContent,
} from "@/hooks/useSiteContent";

export default function AdminAvailabilityEditor() {
  const { data: products, isLoading: productsLoading } = useAllProducts();
  const { data: availabilityData, isLoading: availabilityLoading } = useAvailabilityContent();
  const updateContent = useUpdateSiteContent();

  const [eyebrow, setEyebrow] = React.useState(DEFAULT_AVAILABILITY.eyebrow);
  const [heading, setHeading] = React.useState(DEFAULT_AVAILABILITY.heading);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    if (!availabilityData) return;
    setEyebrow(availabilityData.eyebrow || DEFAULT_AVAILABILITY.eyebrow);
    setHeading(availabilityData.heading || DEFAULT_AVAILABILITY.heading);
    setSelectedIds(availabilityData.product_ids || []);
  }, [availabilityData]);

  const toggleProduct = (productId: string) => {
    setSelectedIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    );
  };

  const moveSelected = (productId: string, direction: "up" | "down") => {
    setSelectedIds((prev) => {
      const currentIndex = prev.indexOf(productId);
      if (currentIndex === -1) return prev;
      const nextIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
      if (nextIndex < 0 || nextIndex >= prev.length) return prev;
      const next = [...prev];
      [next[currentIndex], next[nextIndex]] = [next[nextIndex], next[currentIndex]];
      return next;
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateContent.mutateAsync({
      key: "availability",
      value: {
        eyebrow: eyebrow.trim() || DEFAULT_AVAILABILITY.eyebrow,
        heading: heading.trim() || DEFAULT_AVAILABILITY.heading,
        product_ids: selectedIds,
      },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const selectedProducts = selectedIds
    .map((id) => products?.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (productsLoading || availabilityLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 text-[var(--plum)] animate-spin" strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-[Bodoni_Moda] text-[1.5rem] font-bold text-[var(--text)]">
          What's Available Now
        </h2>
        <button
          type="submit"
          disabled={updateContent.isPending}
          className="flex items-center gap-2 bg-gradient-to-br from-[var(--plum)] to-[var(--accent-2)] text-white px-6 py-2.5 text-[0.72rem] tracking-[0.15em] uppercase disabled:opacity-60 transition-all duration-300 hover:shadow-lg"
        >
          {updateContent.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" strokeWidth={1.5} />
          )}
          {saved ? "Saved!" : "Save Section"}
        </button>
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border-color)] p-6 space-y-6">
        <p className="text-[0.82rem] text-[var(--muted-text)]">
          This section now pulls directly from your store products. No separate image upload is
          needed.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[var(--muted-text)] mb-2">
              Eyebrow
            </label>
            <input
              value={eyebrow}
              onChange={(e) => setEyebrow(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border-color)] text-[0.88rem] focus:outline-none focus:border-[var(--plum)]"
            />
          </div>
          <div>
            <label className="block text-[0.72rem] tracking-[0.15em] uppercase text-[var(--muted-text)] mb-2">
              Heading
            </label>
            <input
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border-color)] text-[0.88rem] focus:outline-none focus:border-[var(--plum)]"
            />
          </div>
        </div>
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border-color)] p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-[Bodoni_Moda] text-[1.1rem] font-bold text-[var(--text)]">
            Pick products from store
          </h3>
          <span className="text-[0.72rem] tracking-[0.12em] uppercase text-[var(--muted-text)]">
            {selectedIds.length} selected
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {products?.map((product) => {
            const isSelected = selectedIds.includes(product.id);
            return (
              <label
                key={product.id}
                className={`flex items-center gap-3 border p-3 cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-[var(--plum-dim)] border-[var(--plum)]"
                    : "bg-[var(--bg)] border-[var(--border-color)] hover:border-[var(--plum)]"
                } ${!product.active ? "opacity-60" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleProduct(product.id)}
                  className="accent-[var(--plum)]"
                />
                <img
                  src={product.images?.[0] ?? "https://picsum.photos/seed/storeitem/120/120"}
                  alt={product.name}
                  className="w-12 h-12 object-cover border border-[var(--border-color)]"
                />
                <div className="min-w-0">
                  <div className="text-[0.85rem] font-medium text-[var(--text)] truncate">
                    {product.name}
                  </div>
                  <div className="text-[0.72rem] text-[var(--muted-text)] truncate">
                    {product.sku} · R{product.price.toLocaleString()}{" "}
                    {!product.active ? "· inactive" : ""}
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border-color)] p-6 space-y-4">
        <h3 className="font-[Bodoni_Moda] text-[1.1rem] font-bold text-[var(--text)]">
          Display order on homepage
        </h3>
        {!selectedProducts.length ? (
          <p className="text-[0.82rem] text-[var(--muted-text)]">
            Select products above. If left empty, homepage shows latest active products
            automatically.
          </p>
        ) : (
          <div className="space-y-2">
            {selectedProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-3 border border-[var(--border-color)] bg-[var(--bg)] p-3"
              >
                <div className="text-[0.84rem] text-[var(--text)]">{product.name}</div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveSelected(product.id, "up")}
                    className="p-1.5 border border-[var(--border-color)] text-[var(--muted-text)] hover:text-[var(--plum)]"
                    aria-label={`Move ${product.name} up`}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveSelected(product.id, "down")}
                    className="p-1.5 border border-[var(--border-color)] text-[var(--muted-text)] hover:text-[var(--plum)]"
                    aria-label={`Move ${product.name} down`}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  );
}
