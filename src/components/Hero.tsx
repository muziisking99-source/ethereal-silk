import React from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-[100dvh] grid grid-cols-1 lg:grid-cols-[55%_45%] pt-20 relative overflow-hidden">
      {/* Left — text */}
      <div className="flex flex-col justify-center px-6 lg:px-12 py-16 lg:py-24 relative z-[2]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="font-[DM_Mono] text-[0.65rem] tracking-[0.3em] uppercase text-[#e8849a]">
            Luxury Lingerie Boutique
          </span>
          <span className="flex-1 max-w-[50px] h-px bg-[#e8849a] opacity-50" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          className="font-[Bodoni_Moda] text-[clamp(2.8rem,5.5vw,5.5rem)] font-bold leading-[1] tracking-[-0.01em] mb-8"
        >
          <span className="block text-[#1e1218]">Sensual.</span>
          <span className="block italic font-light text-[#6b3a5e] ml-4 lg:ml-6">Elegant.</span>
          <span className="block bg-gradient-to-br from-[#e8849a] to-[#a87cad] bg-clip-text text-transparent">
            Only Liyah.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="text-[1rem] leading-[1.9] text-[#8a6e7a] max-w-[420px] mb-10 font-light"
        >
          A curated collection of luxury lingerie crafted for those who appreciate
          the art of femininity. Every piece tells a story of confidence and grace.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="flex gap-4 items-center"
        >
          <Link
            to="/shop"
            className="bg-gradient-to-br from-[#6b3a5e] to-[#a87cad] text-white px-8 py-4 text-[0.8rem] tracking-[0.18em] uppercase font-medium cursor-pointer transition-all duration-300 hover:translate-y-[-2px] shadow-[0_8px_24px_rgba(107,58,94,0.25)] hover:shadow-[0_14px_32px_rgba(107,58,94,0.35)]"
          >
            Shop Now
          </Link>
          <Link
            to="/shop"
            className="text-[#8a6e7a] text-[0.78rem] tracking-[0.12em] uppercase flex items-center gap-2 transition-colors duration-300 hover:text-[#6b3a5e]"
          >
            View Collection <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center gap-5 mt-14 pt-10 border-t border-[rgba(180,140,160,0.18)]"
        >
          <div className="flex">
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src={`https://picsum.photos/seed/av${i}/60/60`}
                alt=""
                className="w-8 h-8 rounded-full border-2 border-[#faf7f4] object-cover -ml-2 first:ml-0"
              />
            ))}
          </div>
          <div className="text-[0.78rem] text-[#8a6e7a] leading-[1.5]">
            <strong className="text-[#6b3a5e] font-medium">Handmade with care</strong>
            <br />
            South African luxury boutique
          </div>
        </motion.div>
      </div>

      {/* Right — visual */}
      <div className="hidden lg:block relative overflow-hidden bg-[#f4efe9]">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=700&h=900&fit=crop"
            alt="Luxury lingerie editorial"
            className="w-full h-full object-cover saturate-[0.85] contrast-105"
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
          <div className="text-[0.7rem] text-[#8a6e7a] mt-1">
            Fresh drops every week
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="absolute top-12 right-8 bg-[#6b3a5e] p-5 shadow-[0_12px_30px_rgba(107,58,94,0.3)] z-[3]"
        >
          <div className="font-[DM_Mono] text-[0.58rem] tracking-[0.25em] uppercase text-[rgba(255,255,255,0.5)] mb-1">
            Satisfaction
          </div>
          <div className="font-[Bodoni_Moda] text-[1.4rem] font-bold text-white leading-none">
            100%
          </div>
        </motion.div>
      </div>
    </section>
  );
}
