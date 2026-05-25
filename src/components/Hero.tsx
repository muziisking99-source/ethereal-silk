import React from "react";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const stagger = {
    hidden: { opacity: 0, y: 35 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.5 + i * 0.13 },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-[100dvh] grid grid-cols-1 lg:grid-cols-[55%_45%] pt-20 relative overflow-hidden"
    >
      <div className="flex flex-col justify-center px-6 sm:px-10 lg:pl-12 lg:pr-16 py-16 lg:py-24 relative z-[2]">
        <div
          className="absolute -top-[10%] -left-[20%] w-[600px] h-[600px] rounded-full pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(168,124,173,0.1) 0%, transparent 70%)",
          }}
          aria-hidden
        />

        <motion.div
          custom={0}
          initial="hidden"
          animate="show"
          variants={stagger}
          className="flex items-center gap-3 mb-10 relative z-[1]"
        >
          <span className="font-[DM_Mono] text-[0.65rem] tracking-[0.3em] uppercase text-[#e8849a]">
            Luxury Lingerie Boutique
          </span>
          <span className="flex-1 max-w-[50px] h-px bg-[#e8849a] opacity-50" />
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={stagger}
          className="font-[Bodoni_Moda] text-[clamp(3.2rem,5.5vw,6rem)] font-bold leading-[1] tracking-[-0.01em] mb-8 relative z-[1]"
        >
          <span className="block text-[#1e1218]">Sensual.</span>
          <span className="block italic font-light text-[#6b3a5e] ml-4 lg:ml-6">Elegant.</span>
          <span className="block bg-gradient-to-br from-[#e8849a] to-[#a87cad] bg-clip-text text-transparent">
            Only Liyah.
          </span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="show"
          variants={stagger}
          className="text-[1rem] leading-[1.9] text-[#8a6e7a] max-w-[420px] mb-12 font-light relative z-[1]"
        >
          A curated world of luxury lingerie crafted for those who appreciate the art of
          femininity. Every set is designed to feel intimate, confident, and unmistakably
          yours.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="show"
          variants={stagger}
          className="flex flex-wrap gap-4 items-center relative z-[1]"
        >
          <Link
            to="/shop"
            className="bg-gradient-to-br from-[#6b3a5e] to-[#a87cad] text-white px-10 py-4 rounded-[2px] text-[0.8rem] tracking-[0.18em] uppercase font-medium transition-all duration-[350ms] hover:translate-y-[-2px] shadow-[0_8px_24px_rgba(107,58,94,0.25)] hover:shadow-[0_14px_32px_rgba(107,58,94,0.35)]"
          >
            Shop Collection
          </Link>
          <Link
            to="/shop"
            className="text-[#8a6e7a] text-[0.78rem] tracking-[0.12em] uppercase flex items-center gap-2 transition-colors duration-300 hover:text-[#6b3a5e] bg-transparent border-none group"
          >
            View Catalogue
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>

        <motion.div
          custom={4}
          initial="hidden"
          animate="show"
          variants={stagger}
          className="flex items-center gap-5 mt-14 pt-10 border-t border-[rgba(180,140,160,0.18)] relative z-[1]"
        >
          <div className="flex">
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src={`https://picsum.photos/seed/onlyliyah${i}/60/60`}
                alt=""
                className="w-8 h-8 rounded-full border-2 border-[#faf7f4] object-cover -ml-2 first:ml-0 saturate-[0.8]"
              />
            ))}
          </div>
          <div className="text-[0.78rem] text-[#8a6e7a] leading-[1.5]">
            <strong className="text-[#6b3a5e] font-medium">500+ happy clients</strong>
            <br />
            Handcrafted luxury · South Africa
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="hidden lg:block relative overflow-hidden bg-[#f4efe9]"
      >
        <motion.div className="absolute inset-0" style={{ y: imageY }}>
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=700&h=900&fit=crop"
            alt="Luxury lingerie editorial"
            className="w-full h-[120%] object-cover object-top saturate-[0.85] contrast-105"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(250,247,244,0.1)] via-transparent via-[60%] to-[rgba(250,247,244,0.6)]" />

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 -left-10 bg-white border border-[rgba(180,140,160,0.35)] p-6 min-w-[200px] shadow-[0_20px_60px_rgba(107,58,94,0.12)] z-[3]"
        >
          <div className="font-[DM_Mono] text-[0.58rem] tracking-[0.25em] uppercase text-[#e8849a] mb-2">
            New Arrivals
          </div>
          <div className="font-[Bodoni_Moda] text-[1.8rem] font-bold text-[#6b3a5e] leading-none">
            Weekly
          </div>
          <div className="text-[0.7rem] text-[#8a6e7a] mt-1">Fresh sets every week</div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="absolute top-12 right-8 bg-[#6b3a5e] p-5 shadow-[0_12px_30px_rgba(107,58,94,0.3)] z-[3]"
        >
          <div className="font-[DM_Mono] text-[0.58rem] tracking-[0.25em] uppercase text-[rgba(255,255,255,0.5)] mb-1">
            Boutique Rating
          </div>
          <div className="font-[Bodoni_Moda] text-[1.4rem] font-bold text-white leading-none">
            4.9★
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
