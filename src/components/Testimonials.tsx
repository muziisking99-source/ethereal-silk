import React from "react";
import { motion } from "framer-motion";

interface BigTestimonial {
  big: string;
  name: string;
  location: string;
}

interface MiniTestimonial {
  stars: string;
  text: string;
  auth: string;
}

const bigTestimonial: BigTestimonial = {
  big: "The quality of OnlyLiyah pieces is unmatched. Every set I've ordered feels luxurious and fits perfectly. This is my go-to boutique for special occasions.",
  name: "Thandi M.",
  location: "Johannesburg",
};

const miniTestimonials: MiniTestimonial[] = [
  {
    stars: "★★★★★",
    text: "Ordered a bridal set for my wedding day. The packaging was beautiful and the lace detail was exquisite. Highly recommend!",
    auth: "— Verified Customer · Cape Town",
  },
  {
    stars: "★★★★★",
    text: "Fast delivery, discreet packaging, and the fabric quality is incredible. I've already ordered three more sets.",
    auth: "— Verified Customer · Durban",
  },
  {
    stars: "★★★★★",
    text: "Finally a South African lingerie brand that understands luxury. The silk collection is to die for.",
    auth: "— Verified Customer · Pretoria",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 px-6 lg:px-12 border-t border-[rgba(180,140,160,0.18)]">
      <div className="max-w-[1100px] mx-auto">
        <div className="font-[DM_Mono] text-[0.62rem] tracking-[0.35em] uppercase text-[#e8849a] mb-3">
          Customer Reviews
        </div>
        <h2 className="font-[Bodoni_Moda] text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.1] mb-14">
          Loved by Women Across South Africa
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="font-[Bodoni_Moda] text-[clamp(1.3rem,2.5vw,2rem)] italic font-light leading-[1.55] text-[#1e1218] border-l-2 border-[#e8849a] pl-8 mb-8">
              "{bigTestimonial.big}"
            </div>
            <div className="flex items-center gap-4 pl-8">
              <div className="w-11 h-11 rounded-full bg-[#f4efe9] border border-[rgba(180,140,160,0.35)] flex items-center justify-center">
                <span className="font-[Bodoni_Moda] text-[0.9rem] text-[#6b3a5e]">
                  {bigTestimonial.name[0]}
                </span>
              </div>
              <div>
                <div className="text-[0.75rem] font-medium text-[#6b3a5e] tracking-[0.05em]">
                  {bigTestimonial.name}
                </div>
                <div className="font-[DM_Mono] text-[0.6rem] tracking-[0.1em] text-[#8a6e7a] mt-0.5">
                  {bigTestimonial.location}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-5">
            {miniTestimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: (i + 1) * 0.1 }}
                className="p-5 bg-white border border-[rgba(180,140,160,0.18)] transition-all duration-300 hover:border-[#a87cad]"
              >
                <div className="text-[#e8849a] text-[0.6rem] tracking-[0.15em] mb-2">
                  {t.stars}
                </div>
                <p className="text-[0.82rem] text-[#8a6e7a] leading-[1.7] mb-3">
                  "{t.text}"
                </p>
                <div className="font-[DM_Mono] text-[0.6rem] tracking-[0.15em] uppercase text-[#c4aab4]">
                  {t.auth}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
