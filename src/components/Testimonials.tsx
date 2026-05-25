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
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <section className="luxury-section border-t border-[rgba(196,120,138,0.15)] bg-[#F2ECE6]">
      <div className="max-w-[1100px] mx-auto">
        <div className="font-[DM_Mono] text-[0.62rem] tracking-[0.35em] uppercase text-[#C4788A] mb-3">
          Customer Reviews
        </div>
        <h2 className="font-[Cormorant_Garamond] text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.1] mb-14 text-[#1A0E14]">
          They Keep Coming Back
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="font-[Cormorant_Garamond] text-[clamp(1.3rem,2.5vw,2rem)] italic font-light leading-[1.55] text-[#1A0E14] border-l-4 border-[#C4788A] pl-8 mb-8">
              "{bigTestimonial.big}"
            </div>
            <div className="flex items-center gap-4 pl-8">
              <div className="w-11 h-11 rounded-full bg-[#FAF7F4] border border-[rgba(196,120,138,0.25)] flex items-center justify-center">
                <span className="font-[Cormorant_Garamond] text-[0.9rem] text-[#6B3556]">
                  {bigTestimonial.name[0]}
                </span>
              </div>
              <div>
                <div className="text-[0.75rem] font-medium text-[#6B3556] tracking-[0.05em]">
                  {bigTestimonial.name}
                </div>
                <div className="font-[DM_Mono] text-[0.6rem] tracking-[0.1em] text-[#6B5260] mt-0.5">
                  {bigTestimonial.location}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Carousel Container */}
          <div className="flex flex-col gap-8">
            {/* Main Carousel Display */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-white border border-[rgba(196,120,138,0.15)] rounded-[4px] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(100,50,80,0.1)]"
            >
              <div className="text-[#C4788A] text-[0.6rem] tracking-[0.15em] mb-3">
                {miniTestimonials[activeIndex].stars}
              </div>
              <p className="text-[0.82rem] text-[#6B5260] leading-[1.7] mb-4 font-light">
                "{miniTestimonials[activeIndex].text}"
              </p>
              <div className="font-[DM_Mono] text-[0.6rem] tracking-[0.15em] uppercase text-[#D4A0AD]">
                {miniTestimonials[activeIndex].auth}
              </div>
            </motion.div>

            {/* Dot Navigation */}
            <div className="flex justify-center gap-3">
              {miniTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-[#C4788A] w-8"
                      : "bg-[rgba(196,120,138,0.3)] hover:bg-[rgba(196,120,138,0.5)]"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === activeIndex}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
