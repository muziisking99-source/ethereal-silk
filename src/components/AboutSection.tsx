import React from "react";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 px-6 lg:px-12 border-t border-[rgba(180,140,160,0.18)]">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <img
            src="https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&h=750&fit=crop"
            alt="About OnlyLiyah"
            className="w-full aspect-[4/5] object-cover saturate-[0.7] contrast-105"
          />
          <div className="absolute bottom-8 -right-4 lg:-right-8 bg-white border border-[rgba(180,140,160,0.35)] p-6 shadow-[0_20px_60px_rgba(107,58,94,0.12)]">
            <div className="font-[DM_Mono] text-[0.58rem] tracking-[0.25em] uppercase text-[#e8849a] mb-1">
              Est.
            </div>
            <div className="font-[Bodoni_Moda] text-[2rem] font-bold text-[#6b3a5e] leading-none">
              2023
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="font-[DM_Mono] text-[0.62rem] tracking-[0.35em] uppercase text-[#e8849a] mb-3">
            Our Story
          </div>
          <h2 className="font-[Bodoni_Moda] text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.1] mb-6">
            Crafted with Intention, Designed for You
          </h2>
          <p className="text-[0.95rem] leading-[1.9] text-[#8a6e7a] mb-5 font-light">
            OnlyLiyah was born from a simple belief: every woman deserves to feel
            luxurious in her own skin. What started as a passion project in Cape
            Town has grown into South Africa's most trusted boutique for
            handcrafted lingerie.
          </p>
          <p className="text-[0.95rem] leading-[1.9] text-[#8a6e7a] mb-8 font-light">
            We source the finest European laces, silks, and satins, then design
            each piece in-house with meticulous attention to fit and finish. Our
            mission is to celebrate every body — because confidence is the most
            beautiful thing a woman can wear.
          </p>
          <div className="grid grid-cols-3 gap-6">
            {[
              { num: "500+", label: "Happy Clients" },
              { num: "150+", label: "Unique Designs" },
              { num: "9", label: "Provinces Served" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-[Bodoni_Moda] text-[1.8rem] font-bold text-[#6b3a5e] leading-none mb-1">
                  {s.num}
                </div>
                <div className="text-[0.7rem] text-[#8a6e7a] tracking-[0.05em]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
