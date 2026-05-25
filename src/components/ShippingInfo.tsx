import React from "react";
import { motion } from "framer-motion";
import { Truck, Clock, Package, MapPin } from "lucide-react";

export default function ShippingInfo() {
  const info = [
    {
      icon: Truck,
      title: "Nationwide Delivery",
      desc: "We deliver across all provinces in South Africa via trusted courier partners.",
    },
    {
      icon: Clock,
      title: "Processing Time",
      desc: "Orders are processed within 24 hours on business days.",
    },
    {
      icon: Package,
      title: "Discreet Packaging",
      desc: "Every order arrives in plain, unbranded packaging.",
    },
    {
      icon: MapPin,
      title: "Major Cities",
      desc: "1–2 day express available for JHB, CT, DBN, and PTA.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 px-6 lg:px-12 border-t border-[rgba(180,140,160,0.18)]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-14">
          <div className="font-[DM_Mono] text-[0.62rem] tracking-[0.35em] uppercase text-[#e8849a] mb-3">
            Delivery & Shipping
          </div>
          <h2 className="font-[Bodoni_Moda] text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.1]">
            How We Deliver
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {info.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white border border-[rgba(180,140,160,0.18)] p-6 text-center transition-all duration-300 hover:border-[#a87cad] hover:translate-y-[-4px] hover:shadow-[0_20px_50px_rgba(107,58,94,0.08)]"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-[rgba(107,58,94,0.08)] border border-[rgba(180,140,160,0.18)] flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-[#6b3a5e]" strokeWidth={1.5} />
              </div>
              <h3 className="font-[Bodoni_Moda] text-[1.05rem] font-bold mb-2">
                {item.title}
              </h3>
              <p className="text-[0.82rem] leading-[1.7] text-[#8a6e7a]">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-[#6b3a5e] text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-[Bodoni_Moda] text-[20vw] font-bold italic text-[rgba(255,255,255,0.04)] whitespace-nowrap pointer-events-none select-none">
            Liyah
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-[Bodoni_Moda] text-[clamp(2rem,4vw,3.5rem)] font-bold text-white leading-[1.05] mb-4 relative z-[1]"
          >
            Ready to Indulge?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[0.95rem] text-[rgba(255,255,255,0.55)] max-w-[460px] mx-auto mb-8 leading-[1.8] relative z-[1]"
          >
            Browse our collection and find the perfect piece that makes you feel
            absolutely irresistible.
          </motion.p>
          <motion.a
            href="/shop"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block bg-white text-[#6b3a5e] px-10 py-4 text-[0.8rem] tracking-[0.2em] uppercase font-semibold cursor-pointer transition-all duration-300 hover:bg-[#e8849a] hover:text-white hover:translate-y-[-2px] relative z-[1]"
          >
            Shop Collection
          </motion.a>
        </div>
      </div>
    </section>
  );
}
