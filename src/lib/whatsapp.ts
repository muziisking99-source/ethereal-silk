export function buildWhatsAppUrl(number: string, message: string) {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(url: string): boolean {
  try {
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    return opened != null;
  } catch {
    return false;
  }
}
