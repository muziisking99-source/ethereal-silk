import { motion } from "framer-motion";
import { Package, Sparkles } from "lucide-react";

export default function BentoSection() {
  return (
    <section className="luxury-section bg-[#F2ECE6] border-t border-[rgba(196,120,138,0.15)]">
      <div className="max-w-[1200px] mx-auto">
        <div className="font-[DM_Mono] text-[0.62rem] tracking-[0.35em] uppercase text-[#C4788A] mb-3">
          The Experience
        </div>
        <h2 className="font-[Cormorant_Garamond] text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.1] mb-14 text-[#1A0E14]">
          Everything You Deserve
        </h2>
      </div>

      <div className="max-w-[1200px] mx-auto mt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:grid-rows-[220px_220px] lg:auto-rows-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden min-h-[220px] border border-[rgba(196,120,138,0.15)] rounded-[4px] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(100,50,80,0.1)]"
        >
          <img
            src="https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&h=500&fit=crop"
            alt="Lingerie editorial"
            className="absolute inset-0 w-full h-full object-cover saturate-[0.7] transition-transform duration-700 hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(107,53,86,0.8)] to-transparent via-transparent via-[60%]" />
          <div className="absolute bottom-6 left-6 font-[Cormorant_Garamond] text-[1.1rem] italic text-white z-[1]">
            Crafted for you
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.08 }}
          className="sm:col-span-2 lg:col-span-2 bg-[#6B3556] border border-[#6B3556] text-white p-8 min-h-[220px] rounded-[4px] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(100,50,80,0.1)] hover:translate-y-[-2px]"
        >
          <div className="font-[Cormorant_Garamond] text-[3.5rem] font-bold leading-none mb-2 bg-gradient-to-br from-[#C4788A] to-[#D4A0AD] bg-clip-text text-transparent">
            Curated
          </div>
          <h3 className="font-[Cormorant_Garamond] text-[1.15rem] font-bold mb-2 text-white">
            Handpicked Lingerie Sets
          </h3>
          <p className="text-[0.82rem] leading-[1.75] text-[rgba(255,255,255,0.6)] font-light">
            Each piece is selected for fabric, fit, and finish — lace, silk, and satin
            designed to feel as exquisite as it looks.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.16 }}
          className="bg-white border border-[rgba(196,120,138,0.15)] p-8 min-h-[220px] rounded-[4px] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(100,50,80,0.1)] hover:border-[#C4788A] hover:translate-y-[-2px]"
        >
          <div className="w-10 h-10 rounded-[10px] bg-[rgba(107,53,86,0.08)] border border-[rgba(196,120,138,0.15)] flex items-center justify-center mb-5">
            <Package className="w-[18px] h-[18px] text-[#6B3556]" strokeWidth={1.5} />
          </div>
          <h3 className="font-[Cormorant_Garamond] text-[1.15rem] font-bold mb-2 text-[#1A0E14]">Order via WhatsApp</h3>
          <p className="text-[0.82rem] leading-[1.75] text-[#6B5260] font-light">
            Add to basket, share your details, and confirm your order in one elegant
            message — no complicated checkout.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.24 }}
          className="sm:col-span-2 lg:col-span-2 bg-white border border-[rgba(196,120,138,0.15)] p-8 min-h-[220px] rounded-[4px] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(100,50,80,0.1)] hover:border-[#C4788A] hover:translate-y-[-2px]"
        >
          <div className="font-[Cormorant_Garamond] text-[2.8rem] font-bold leading-none mb-2 bg-gradient-to-br from-[#C4788A] to-[#D4A0AD] bg-clip-text text-transparent">
            9 Provinces
          </div>
          <h3 className="font-[Cormorant_Garamond] text-[1.15rem] font-bold mb-2 text-[#1A0E14]">
            Nationwide Discreet Delivery
          </h3>
          <p className="text-[0.82rem] leading-[1.75] text-[#6B5260] font-light">
            Tracked courier delivery across South Africa in plain, unmarked packaging within
            3–5 business days.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.32 }}
          className="bg-[#6B3556] border border-[#6B3556] text-white p-8 min-h-[220px] rounded-[4px] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(100,50,80,0.1)] hover:translate-y-[-2px]"
        >
          <div className="w-10 h-10 rounded-[10px] bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.15)] flex items-center justify-center mb-5">
            <Sparkles className="w-[18px] h-[18px] text-white" strokeWidth={1.5} />
          </div>
          <h3 className="font-[Cormorant_Garamond] text-[1.15rem] font-bold mb-2 text-white">
            Premium Fabrics
          </h3>
          <p className="text-[0.82rem] leading-[1.75] text-[rgba(255,255,255,0.6)] font-light">
            European lace, silk, and satin — every set inspected by hand before it reaches
            you.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
