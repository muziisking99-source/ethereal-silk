import React from "react";
import { Loader2 } from "lucide-react";
import type { CropPreset } from "@/lib/imageCrop";
import { cropImageToBlob } from "@/lib/imageCrop";

type ImageCropModalProps = {
  open: boolean;
  imageSrc: string | null;
  preset: CropPreset;
  title: string;
  confirmLabel?: string;
  onClose: () => void;
  onConfirm: (
    blob: Blob,
    previewUrl: string,
    position: { xPercent: number; yPercent: number },
  ) => Promise<void>;
};

export default function ImageCropModal({
  open,
  imageSrc,
  preset,
  title,
  confirmLabel = "Save Crop",
  onClose,
  onConfirm,
}: ImageCropModalProps) {
  const [zoom, setZoom] = React.useState(1);
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    setZoom(1);
    setX(0);
    setY(0);
  }, [open, imageSrc]);

  if (!open || !imageSrc) return null;

  const handleConfirm = async () => {
    setSaving(true);
    try {
      const blob = await cropImageToBlob({
        src: imageSrc,
        preset,
        settings: { zoom, x, y },
      });
      const previewUrl = URL.createObjectURL(blob);
      const xPercent = Math.max(0, Math.min(100, 50 - x / 4));
      const yPercent = Math.max(0, Math.min(100, 50 - y / 4));
      await onConfirm(blob, previewUrl, { xPercent, yPercent });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] bg-[rgba(0,0,0,0.72)] flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-[var(--surface)] border border-[var(--border-color)] p-5 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-[Bodoni_Moda] text-[1.05rem] font-bold text-[var(--text)]">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[0.7rem] tracking-[0.12em] uppercase text-[var(--muted-text)] hover:text-[var(--accent)]"
            disabled={saving}
          >
            Cancel
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6">
          <div>
            <div
              className="relative overflow-hidden border border-[var(--border-color)] mx-auto bg-[var(--bg)]"
              style={{ aspectRatio: `${preset.width}/${preset.height}` }}
            >
              <img
                src={imageSrc}
                alt="Crop preview"
                className="w-full h-full object-cover select-none pointer-events-none"
                style={{ transform: `translate(${x}px, ${y}px) scale(${zoom})` }}
              />
            </div>
            <p className="mt-3 text-[0.72rem] text-[var(--muted-text)]">
              Drag framing with sliders. The crop is exported before upload.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[0.68rem] tracking-[0.14em] uppercase text-[var(--muted-text)] mb-2">
                Zoom
              </label>
              <input
                type="range"
                min={1}
                max={2.6}
                step={0.01}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full accent-[var(--accent)]"
              />
            </div>
            <div>
              <label className="block text-[0.68rem] tracking-[0.14em] uppercase text-[var(--muted-text)] mb-2">
                Horizontal
              </label>
              <input
                type="range"
                min={-180}
                max={180}
                step={1}
                value={x}
                onChange={(e) => setX(Number(e.target.value))}
                className="w-full accent-[var(--accent)]"
              />
            </div>
            <div>
              <label className="block text-[0.68rem] tracking-[0.14em] uppercase text-[var(--muted-text)] mb-2">
                Vertical
              </label>
              <input
                type="range"
                min={-180}
                max={180}
                step={1}
                value={y}
                onChange={(e) => setY(Number(e.target.value))}
                className="w-full accent-[var(--accent)]"
              />
            </div>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={saving}
              className="w-full mt-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white py-3 text-[0.72rem] tracking-[0.14em] uppercase disabled:opacity-60"
            >
              {saving ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing
                </span>
              ) : (
                confirmLabel
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
