import { motion } from "framer-motion";
import { useAboutContent } from "@/hooks/useSiteContent";
import { DEFAULT_ABOUT } from "@/lib/siteContentDefaults";

export default function AboutSection() {
  const { data: about, isLoading } = useAboutContent();
  const content = about ?? DEFAULT_ABOUT;

  return (
    <section id="about" className="luxury-section border-t border-[rgba(196,120,138,0.15)] bg-[#FAF7F4]">
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
            className="w-full aspect-[4/5] object-cover saturate-[0.7] contrast-105 rounded-[4px] transition-transform duration-700 hover:scale-[1.02]"
          />
          <div className="absolute bottom-8 -right-4 lg:-right-8 bg-white border border-[rgba(196,120,138,0.25)] p-6 shadow-[0_20px_60px_rgba(107,53,86,0.12)] rounded-[4px]">
            <div className="font-[DM_Mono] text-[0.58rem] tracking-[0.25em] uppercase text-[#C4788A] mb-1">
              {content.badge_label}
            </div>
            <div className="font-[Cormorant_Garamond] text-[2rem] font-bold text-[#6B3556] leading-none">
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
            <div className="h-64 bg-[#F2ECE6] animate-pulse rounded-[4px]" />
          ) : (
            <>
              <div className="font-[DM_Mono] text-[0.62rem] tracking-[0.35em] uppercase text-[#C4788A] mb-3">
                {content.eyebrow}
              </div>
              <h2 className="font-[Cormorant_Garamond] text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.1] mb-6 text-[#1A0E14]">
                {content.heading}
              </h2>
              <p className="text-[0.95rem] leading-[1.9] text-[#6B5260] mb-5 font-light">
                {content.paragraph1}
              </p>
              <p className="text-[0.95rem] leading-[1.9] text-[#6B5260] mb-8 font-light">
                {content.paragraph2}
              </p>
              <div className="grid grid-cols-3 gap-6">
                {content.stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-[Cormorant_Garamond] text-[1.8rem] font-bold text-[#6B3556] leading-none mb-1">
                      {s.num}
                    </div>
                    <div className="text-[0.7rem] text-[#6B5260] tracking-[0.05em]">{s.label}</div>
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
