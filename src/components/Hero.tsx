import React from "react";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useHeroContent } from "@/hooks/useSiteContent";
import { DEFAULT_HERO } from "@/lib/siteContentDefaults";

export default function Hero() {
  const { data: hero } = useHeroContent();
  const content = hero ?? DEFAULT_HERO;
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const stagger = {
    hidden: { opacity: 0, y: 35 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.4 + i * 0.13 },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] pt-20 overflow-hidden bg-[#FAF7F4]"
    >
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <img
          src={content.background_image_url}
          alt=""
          className="w-full h-full object-cover object-top brightness-110 saturate-100 contrast-100 scale-100"
        />
        {/* Dark gradient overlay from bottom */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(20,8,14,0.75) 0%, rgba(20,8,14,0.2) 50%, transparent 100%)",
          }}
        />
      </motion.div>

      <div className="relative z-[2] min-h-[calc(100dvh-5rem)] grid grid-cols-1 lg:grid-cols-[58%_42%]">
        <div className="flex flex-col justify-center px-6 sm:px-10 lg:pl-12 lg:pr-8 py-16 lg:py-24">
          <motion.h1
            custom={0}
            initial="hidden"
            animate="show"
            variants={stagger}
            className="font-[Cormorant_Garamond] text-[clamp(3.2rem,5.5vw,6rem)] font-bold leading-[1] tracking-[-0.01em] mb-8"
          >
            <span className="block text-white drop-shadow-lg">{content.line1}</span>
            <span className="block italic font-light text-[#D4A0AD] ml-4 lg:ml-6 drop-shadow-lg">
              {content.line2}
            </span>
            <span className="block bg-gradient-to-br from-[#E8A4C8] to-[#D4A0AD] bg-clip-text text-transparent drop-shadow-lg">
              {content.line3}
            </span>
          </motion.h1>

          <motion.p
            custom={1}
            initial="hidden"
            animate="show"
            variants={stagger}
            className="text-[1rem] leading-[1.9] text-white max-w-[420px] mb-12 font-light drop-shadow"
          >
            {content.subtitle}
          </motion.p>

          <motion.div
            custom={2}
            initial="hidden"
            animate="show"
            variants={stagger}
            className="flex flex-wrap gap-4 items-center"
          >
            <Link
              to="/shop"
              className="text-white px-10 py-4 rounded-[4px] text-[0.8rem] tracking-[0.18em] uppercase font-medium transition-all duration-[350ms] hover:translate-y-[-2px] shadow-[0_8px_24px_rgba(107,53,86,0.2)] hover:shadow-[0_12px_40px_rgba(100,50,80,0.15)]"
              style={{
                background: `linear-gradient(135deg, #6B3556, #C4788A)`,
              }}
            >
              {content.primary_cta}
            </Link>
            <Link
              to="/shop"
              className="text-white text-[0.78rem] tracking-[0.12em] uppercase flex items-center gap-2 transition-colors duration-300 hover:text-[#D4A0AD] bg-transparent border-none group drop-shadow"
            >
              {content.secondary_cta}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>

          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            variants={stagger}
            className="flex items-center gap-5 mt-14 pt-10 border-t border-[rgba(255,255,255,0.2)]"
          >
            <div className="flex">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://picsum.photos/seed/onlyliyah${i}/60/60`}
                  alt=""
                  className="w-8 h-8 rounded-full border-2 border-white object-cover -ml-2 first:ml-0"
                />
              ))}
            </div>
            <div className="text-[0.78rem] text-white leading-[1.5] drop-shadow">
              <strong className="text-white font-medium">{content.proof_strong}</strong>
              <br />
              {content.proof_sub}
            </div>
          </motion.div>
        </div>

        <div className="hidden lg:block relative">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-16 left-0 border border-[rgba(196,120,138,0.25)] p-6 min-w-[200px] shadow-[0_20px_60px_rgba(107,53,86,0.12)] rounded-[4px] z-[3] bg-white"
          >
            <div className="font-[DM_Mono] text-[0.58rem] tracking-[0.25em] uppercase text-[#C4788A] mb-2">
              {content.card1_label}
            </div>
            <div className="font-[Cormorant_Garamond] text-[1.8rem] font-bold text-[#6B3556] leading-none">
              {content.card1_value}
            </div>
            <div className="text-[0.7rem] text-[#6B5260] mt-1">{content.card1_sub}</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute top-16 right-8 p-5 shadow-[0_12px_30px_rgba(107,53,86,0.15)] z-[3] text-white rounded-[4px] bg-[#6B3556]"
          >
            <div className="font-[DM_Mono] text-[0.58rem] tracking-[0.25em] uppercase text-[rgba(255,255,255,0.5)] mb-1">
              {content.card2_label}
            </div>
            <div className="font-[Cormorant_Garamond] text-[1.4rem] font-bold leading-none">
              {content.card2_value}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
