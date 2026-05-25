import React from "react";
import { motion } from "framer-motion";
import { Star, Truck, Shield, Heart } from "lucide-react";

const features = [
  {
    icon: Star,
    title: "Premium Fabrics",
    desc: "Silk, lace, and satin sourced from the finest European mills for unmatched comfort and elegance.",
    wide: true,
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
    desc: "Discreet packaging with tracked delivery across South Africa within 3–5 business days.",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    desc: "Every piece is inspected by hand. Not satisfied? We offer easy exchanges within 14 days.",
    wide: true,
  },
  {
    icon: Heart,
    title: "Made with Love",
    desc: "Designed in Cape Town by a team passionate about celebrating every body.",
  },
];

export default function BentoSection() {
  return (
    <section className="bg-[#f4efe9] border-t border-[rgba(180,140,160,0.18)] py-20 lg:py-28 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="font-[DM_Mono] text-[0.62rem] tracking-[0.35em] uppercase text-[#e8849a] mb-3">
          Why Choose Us
        </div>
        <h2 className="font-[Bodoni_Moda] text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.1] mb-14">
          The OnlyLiyah Difference
        </h2>
      </div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Image cell */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden min-h-[220px]"
        >
          <img
            src="https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&h=500&fit=crop"
            alt="Lingerie editorial"
            className="absolute inset-0 w-full h-full object-cover saturate-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(107,58,94,0.8)] to-transparent" />
          <div className="absolute bottom-6 left-6 font-[Bodoni_Moda] text-[1.1rem] italic text-white">
            Crafted for you
          </div>
        </motion.div>

        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: i * 0.08 }}
            className={`bg-white border border-[rgba(180,140,160,0.18)] p-8 transition-all duration-300 hover:border-[#e8849a] hover:translate-y-[-2px] ${
              f.wide ? "md:col-span-2 lg:col-span-2" : ""
            }`}
          >
            <div className="w-10 h-10 rounded-[10px] bg-[rgba(107,58,94,0.08)] border border-[rgba(180,140,160,0.18)] flex items-center justify-center mb-5">
              <f.icon className="w-[18px] h-[18px] text-[#6b3a5e]" strokeWidth={1.5} />
            </div>
            <h3 className="font-[Bodoni_Moda] text-[1.15rem] font-bold mb-2">
              {f.title}
            </h3>
            <p className="text-[0.82rem] leading-[1.75] text-[#8a6e7a]">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
