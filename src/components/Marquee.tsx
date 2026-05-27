import { useMarqueeContent } from "@/hooks/useSiteContent";
import { DEFAULT_MARQUEE } from "@/lib/siteContentDefaults";

export default function Marquee() {
  const { data: marquee } = useMarqueeContent();
  const items = marquee?.items?.length ? marquee.items : DEFAULT_MARQUEE.items;

  return (
    <div className="py-4 overflow-hidden bg-[var(--accent)]">
      <div className="inline-flex gap-12 animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-[Jost] text-[0.7rem] font-medium tracking-[0.25em] uppercase text-white flex items-center gap-3"
          >
            <span className="text-white text-[0.5rem]">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
