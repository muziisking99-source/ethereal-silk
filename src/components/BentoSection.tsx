import { motion } from "framer-motion";
import { Package, Sparkles } from "lucide-react";

export default function BentoSection() {
  return (
    <section className="luxury-section bg-[#1A1A1A] border-t border-[rgba(255,45,107,0.15)]">
      <div className="max-w-[1200px] mx-auto">
        <div className="font-[DM_Mono] text-[0.62rem] tracking-[0.35em] uppercase text-[#FF2D6B] mb-3">
          Why Order Here
        </div>
        <h2 className="font-[Cormorant_Garamond] text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.1] mb-14 text-[#F5F0EB]">
          Real. Discreet. <span className="italic text-[#FF2D6B]">Yours.</span>
        </h2>
      </div>

      <div className="max-w-[1200px] mx-auto mt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:grid-rows-[220px_220px] lg:auto-rows-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden min-h-[220px] border border-[rgba(255,45,107,0.2)] rounded-[4px] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(255,45,107,0.2)]"
        >
          <img
            src="https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&h=500&fit=crop"
            alt="Authentic pieces"
            className="absolute inset-0 w-full h-full object-cover saturate-[0.6] brightness-75 transition-transform duration-700 hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.9)] to-transparent via-transparent via-[60%]" />
          <div className="absolute bottom-6 left-6 z-[1]">
            <div className="font-[DM_Mono] text-[0.55rem] tracking-[0.25em] uppercase text-[#FF2D6B] mb-1">
              Limited stock
            </div>
            <div className="font-[Cormorant_Garamond] text-[1.2rem] italic text-white">
              Direct from me
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.08 }}
          className="sm:col-span-2 lg:col-span-2 bg-[#1F1F1F] border border-[rgba(255,45,107,0.2)] text-white p-8 min-h-[220px] rounded-[4px] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(255,45,107,0.2)] hover:translate-y-[-2px] hover:border-[#FF2D6B]"
        >
          <div className="font-[Cormorant_Garamond] text-[3.5rem] font-bold leading-none mb-2 text-[#FF2D6B]">
            9 Provinces
          </div>
          <h3 className="font-[Cormorant_Garamond] text-[1.15rem] font-bold mb-2 text-white">
            Fully Discreet Delivery
          </h3>
          <p className="text-[0.82rem] leading-[1.75] text-[#B8AEA8] font-light font-[Jost]">
            Plain unmarked packaging, tracked courier, delivered within 3–5 business days nationwide.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.16 }}
          className="bg-[#1F1F1F] border border-[rgba(255,45,107,0.2)] p-8 min-h-[220px] rounded-[4px] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(255,45,107,0.2)] hover:border-[#FF2D6B] hover:translate-y-[-2px]"
        >
          <div className="w-10 h-10 rounded-[10px] bg-[rgba(255,45,107,0.1)] border border-[rgba(255,45,107,0.25)] flex items-center justify-center mb-5">
            <Package className="w-[18px] h-[18px] text-[#FF2D6B]" strokeWidth={1.5} />
          </div>
          <h3 className="font-[Cormorant_Garamond] text-[1.15rem] font-bold mb-2 text-[#F5F0EB]">Express Available</h3>
          <p className="text-[0.82rem] leading-[1.75] text-[#B8AEA8] font-light font-[Jost]">
            1–2 day delivery available for Johannesburg, Cape Town, Durban and Pretoria.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.24 }}
          className="sm:col-span-2 lg:col-span-2 bg-[#1F1F1F] border border-[rgba(255,45,107,0.2)] p-8 min-h-[220px] rounded-[4px] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(255,45,107,0.2)] hover:border-[#FF2D6B] hover:translate-y-[-2px]"
        >
          <div className="font-[Cormorant_Garamond] text-[2.8rem] font-bold leading-none mb-2 text-[#FF2D6B]">
            Authentic
          </div>
          <h3 className="font-[Cormorant_Garamond] text-[1.15rem] font-bold mb-2 text-[#F5F0EB]">
            Authentic Pieces
          </h3>
          <p className="text-[0.82rem] leading-[1.75] text-[#B8AEA8] font-light font-[Jost]">
            Every item is personally worn and carefully prepared before it reaches you — real, not staged.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.32 }}
          className="bg-[#FF2D6B] border border-[#FF2D6B] text-white p-8 min-h-[220px] rounded-[4px] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(255,45,107,0.4)] hover:translate-y-[-2px]"
        >
          <div className="w-10 h-10 rounded-[10px] bg-[rgba(255,255,255,0.15)] border border-[rgba(255,255,255,0.25)] flex items-center justify-center mb-5">
            <Sparkles className="w-[18px] h-[18px] text-white" strokeWidth={1.5} />
          </div>
          <h3 className="font-[Cormorant_Garamond] text-[1.15rem] font-bold mb-2 text-white">
            New Drops Weekly
          </h3>
          <p className="text-[0.82rem] leading-[1.75] text-[rgba(255,255,255,0.85)] font-light font-[Jost]">
            Stock is limited and moves fast. Follow on WhatsApp for first access every Monday.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
