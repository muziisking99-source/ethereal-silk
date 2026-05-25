import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export default function CtaStrip() {
  return (
    <div className="bg-[#6b3a5e] py-24 px-6 lg:px-12 text-center relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-[Bodoni_Moda] text-[20vw] font-bold italic text-[rgba(255,255,255,0.04)] whitespace-nowrap pointer-events-none select-none"
        aria-hidden
      >
        Liyah
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="font-[Bodoni_Moda] text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-white leading-[1.05] mb-6 relative z-[1]"
      >
        Ready to Indulge in
        <br />
        <em className="text-[#e8849a] not-italic">Only Liyah?</em>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="text-[0.95rem] text-[rgba(255,255,255,0.55)] max-w-[460px] mx-auto mb-10 leading-[1.8] relative z-[1]"
      >
        Curated lingerie sets from R299. Add to your basket and complete your order via
        WhatsApp — discreet delivery across South Africa.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-[1]"
      >
        <Link
          to="/shop"
          className="inline-block bg-white text-[#6b3a5e] px-12 py-4 rounded-[2px] text-[0.8rem] tracking-[0.2em] uppercase font-semibold transition-all duration-300 hover:bg-[#e8849a] hover:text-white hover:translate-y-[-2px]"
        >
          Shop the Collection
        </Link>
      </motion.div>
    </div>
  );
}
