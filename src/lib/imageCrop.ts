export type CropPreset = {
  ratio: number;
  width: number;
  height: number;
};

export type CropSettings = {
  zoom: number;
  x: number;
  y: number;
};

export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Unable to read file."));
    reader.readAsDataURL(file);
  });
}

export async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Unable to load image."));
    image.src = src;
  });
}

export async function cropImageToBlob(args: {
  src: string;
  preset: CropPreset;
  settings: CropSettings;
  mimeType?: string;
  quality?: number;
}): Promise<Blob> {
  const { src, preset, settings, mimeType = "image/jpeg", quality = 0.92 } = args;
  const image = await loadImage(src);
  const canvas = document.createElement("canvas");
  canvas.width = preset.width;
  canvas.height = preset.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable.");

  const baseScale = Math.max(preset.width / image.width, preset.height / image.height);
  const scale = baseScale * settings.zoom;
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;

  const offsetX = (preset.width - drawWidth) / 2 + settings.x;
  const offsetY = (preset.height - drawHeight) / 2 + settings.y;

  ctx.fillStyle = "#111111";
  ctx.fillRect(0, 0, preset.width, preset.height);
  ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Image crop export failed."));
          return;
        }
        resolve(blob);
      },
      mimeType,
      quality,
    );
  });
}

export function toObjectPosition(x: number, y: number): string {
  return `${x}% ${y}%`;
}
