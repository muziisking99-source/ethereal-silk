import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useCtaContent } from "@/hooks/useSiteContent";
import { DEFAULT_CTA } from "@/lib/siteContentDefaults";

export default function CtaStrip() {
  const { data: cta } = useCtaContent();
  const content = cta ?? DEFAULT_CTA;

  return (
    <div
      className="py-24 px-6 lg:px-12 text-center relative overflow-hidden"
      style={{ background: "var(--cta-bg)", color: "var(--cta-text)" }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-[Bodoni_Moda] text-[20vw] font-bold italic whitespace-nowrap pointer-events-none select-none"
        style={{ color: "rgba(255,255,255,0.04)" }}
        aria-hidden
      >
        {content.watermark}
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="font-[Bodoni_Moda] text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] mb-6 relative z-[1]"
      >
        {content.heading_line1}
        <br />
        <em className="text-[var(--blush)] not-italic">{content.heading_accent}</em>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="text-[0.95rem] max-w-[460px] mx-auto mb-10 leading-[1.8] relative z-[1]"
        style={{ color: "var(--cta-muted)" }}
      >
        {content.body}
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
          className="inline-block bg-white text-[var(--plum)] px-12 py-4 rounded-[2px] text-[0.8rem] tracking-[0.2em] uppercase font-semibold transition-all duration-300 hover:bg-[var(--blush)] hover:text-white hover:translate-y-[-2px]"
        >
          {content.button_text}
        </Link>
      </motion.div>
    </div>
  );
}
