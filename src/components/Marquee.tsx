import { useMarqueeContent } from "@/hooks/useSiteContent";
import { DEFAULT_MARQUEE } from "@/lib/siteContentDefaults";

export default function Marquee() {
  const { data: marquee } = useMarqueeContent();
  const items = marquee?.items?.length ? marquee.items : DEFAULT_MARQUEE.items;

  return (
    <div className="py-4 overflow-hidden" style={{ background: "var(--marquee-bg)" }}>
      <div className="inline-flex gap-12 animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-[Bodoni_Moda] text-[0.85rem] italic text-[rgba(255,255,255,0.6)] flex items-center gap-3"
          >
            <span className="text-[var(--blush)] not-italic text-[0.5rem]">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
