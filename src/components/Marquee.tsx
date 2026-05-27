import { useReducedMotion } from "framer-motion";
import { useMarqueeContent } from "@/hooks/useSiteContent";
import { DEFAULT_MARQUEE } from "@/lib/siteContentDefaults";

export default function Marquee() {
  const { data: marquee } = useMarqueeContent();
  const items = marquee?.items?.length ? marquee.items : DEFAULT_MARQUEE.items;
  const reduceMotion = useReducedMotion();

  return (
    <div className="py-4 overflow-hidden bg-[var(--accent)]">
      <div
        className={`inline-flex gap-12 whitespace-nowrap ${reduceMotion ? "" : "animate-marquee"}`}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-[Jost] text-[0.7rem] font-medium tracking-[0.25em] uppercase text-white flex items-center gap-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
