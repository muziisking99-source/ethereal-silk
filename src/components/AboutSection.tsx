import { motion } from "framer-motion";
import { useAboutContent } from "@/hooks/useSiteContent";
import { DEFAULT_ABOUT } from "@/lib/siteContentDefaults";

export default function AboutSection() {
  const { data: about, isLoading } = useAboutContent();
  const content = about ?? DEFAULT_ABOUT;

  return (
    <section id="about" className="luxury-section border-t border-[rgba(255,45,107,0.15)] bg-[#0D0D0D]">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <img
            src={content.image_url}
            alt="About Only Liyah"
            className="w-full aspect-[4/5] object-cover saturate-[0.85] contrast-110 rounded-[4px] transition-transform duration-700 hover:scale-[1.02]"
          />
          <div className="absolute bottom-8 -right-4 lg:-right-8 bg-[#1F1F1F] border border-[rgba(255,45,107,0.25)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)] rounded-[4px]">
            <div className="font-[DM_Mono] text-[0.58rem] tracking-[0.25em] uppercase text-[#FF2D6B] mb-1">
              {content.badge_label}
            </div>
            <div className="font-[Cormorant_Garamond] text-[2rem] font-bold text-[#F5F0EB] leading-none">
              {content.badge_year}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {isLoading ? (
            <div className="h-64 bg-[#1A1A1A] animate-pulse rounded-[4px]" />
          ) : (
            <>
              <div className="font-[DM_Mono] text-[0.62rem] tracking-[0.35em] uppercase text-[#FF2D6B] mb-3">
                {content.eyebrow}
              </div>
              <h2 className="font-[Cormorant_Garamond] text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.1] mb-6 text-[#F5F0EB]">
                {content.heading}
              </h2>
              <p className="text-[0.95rem] leading-[1.9] text-[#B8AEA8] mb-5 font-light font-[Jost]">
                {content.paragraph1}
              </p>
              <p className="text-[0.95rem] leading-[1.9] text-[#B8AEA8] mb-8 font-light font-[Jost]">
                {content.paragraph2}
              </p>
              <div className="grid grid-cols-3 gap-6">
                {content.stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-[Cormorant_Garamond] text-[1.8rem] font-bold text-[#FF2D6B] leading-none mb-1">
                      {s.num}
                    </div>
                    <div className="text-[0.7rem] text-[#B8AEA8] tracking-[0.05em] font-[Jost]">{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
