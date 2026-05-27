import React from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useHeroContent } from "@/hooks/useSiteContent";
import { DEFAULT_HERO } from "@/lib/siteContentDefaults";

export default function Hero() {
  const { data: hero } = useHeroContent();
  const content = hero ?? DEFAULT_HERO;
  const sectionRef = React.useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "15%"]);

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
      className="relative min-h-[100dvh] pt-20 overflow-hidden bg-[var(--bg)]"
    >
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <img
          src={content.background_image_url}
          alt=""
          className="w-full h-full object-cover object-top brightness-75 saturate-[0.85] contrast-110"
          style={{ objectPosition: content.image_position ?? "50% 35%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--hero-scrim-to) 0%, var(--hero-scrim-from) 55%, transparent 100%)",
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
            <span className="block italic font-light text-[var(--accent)] ml-4 lg:ml-6 drop-shadow-lg">
              {content.line2}
            </span>
            <span className="block text-white drop-shadow-lg">{content.line3}</span>
          </motion.h1>

          <motion.p
            custom={1}
            initial="hidden"
            animate="show"
            variants={stagger}
            className="text-[1rem] leading-[1.9] text-[var(--text)] max-w-[420px] mb-12 font-light drop-shadow font-[Jost]"
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
              className="text-white px-10 py-4 rounded-[4px] text-[0.8rem] tracking-[0.18em] uppercase font-medium transition-all duration-[350ms] hover:translate-y-[-2px] bg-[var(--accent)] hover:bg-[var(--accent-hover)] shadow-[0_8px_24px_rgba(var(--accent-rgb),0.35)] hover:shadow-[0_12px_40px_rgba(var(--accent-rgb),0.5)] font-[Jost]"
            >
              {content.primary_cta}
            </Link>
            <Link
              to="/"
              hash="gallery"
              className="text-white text-[0.78rem] tracking-[0.12em] uppercase flex items-center gap-2 transition-colors duration-300 hover:text-[var(--accent)] bg-transparent border-none group drop-shadow font-[Jost]"
            >
              {content.secondary_cta}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>

          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            variants={stagger}
            className="flex items-center gap-5 mt-14 pt-10 border-t border-[rgba(var(--accent-rgb),0.25)]"
          >
            <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <div className="text-[0.78rem] text-white leading-[1.5] drop-shadow font-[Jost]">
              <strong className="text-white font-medium">{content.proof_strong}</strong>
              <br />
              <span className="text-[var(--muted)]">{content.proof_sub}</span>
            </div>
          </motion.div>
        </div>

        <div className="hidden lg:block relative">
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={
              reduceMotion ? undefined : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
            }
            className="absolute bottom-16 left-0 border border-[rgba(var(--accent-rgb),0.25)] p-6 min-w-[200px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-[4px] z-[3] bg-[var(--surface-2)]"
          >
            <div className="font-[DM_Mono] text-[0.58rem] tracking-[0.25em] uppercase text-[var(--accent)] mb-2">
              {content.card1_label}
            </div>
            <div className="font-[Cormorant_Garamond] text-[1.8rem] font-bold text-[var(--text)] leading-none">
              {content.card1_value}
            </div>
            <div className="text-[0.7rem] text-[var(--muted)] mt-1 font-[Jost]">
              {content.card1_sub}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
