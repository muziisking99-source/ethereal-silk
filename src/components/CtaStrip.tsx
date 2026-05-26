import { motion } from "framer-motion";
import { useCtaContent } from "@/hooks/useSiteContent";
import { DEFAULT_CTA, DEFAULT_SETTINGS } from "@/lib/siteContentDefaults";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Link } from "@tanstack/react-router";

export default function CtaStrip() {
  const { data: cta } = useCtaContent();
  const content = cta ?? DEFAULT_CTA;
  const waUrl = buildWhatsAppUrl(
    DEFAULT_SETTINGS.whatsapp_number,
    "Hi Liyah, I'd like to see what's available this week."
  );

  return (
    <div
      id="contact"
      className="py-24 px-6 lg:px-12 text-center relative overflow-hidden bg-[#0D0D0D] text-[#F5F0EB] border-t border-[rgba(255,45,107,0.15)]"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-[Bodoni_Moda] text-[20vw] font-bold italic whitespace-nowrap pointer-events-none select-none"
        style={{ color: "rgba(255,45,107,0.05)" }}
        aria-hidden
      >
        {content.watermark}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="font-[DM_Mono] text-[0.62rem] tracking-[0.35em] uppercase text-[#FF2D6B] mb-4 relative z-[1]"
      >
        Ready?
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="font-[Cormorant_Garamond] text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] mb-6 relative z-[1] text-[#F5F0EB]"
      >
        {content.heading_line1}
        <br />
        <em className="text-[#FF2D6B] italic">{content.heading_accent}</em>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="text-[0.95rem] max-w-[520px] mx-auto mb-10 leading-[1.8] relative z-[1] text-[#B8AEA8] font-[Jost]"
      >
        {content.body}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-[1] flex flex-col sm:flex-row gap-5 items-center justify-center"
      >
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white px-12 py-4 rounded-[2px] text-[0.8rem] tracking-[0.2em] uppercase font-semibold transition-all duration-300 hover:translate-y-[-2px] shadow-[0_8px_24px_rgba(37,211,102,0.35)] font-[Jost]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.2 4.6 2.6 1.1 3.1.9 3.7.8.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/>
          </svg>
          {content.button_text}
        </a>
        <Link
          to="/shop"
          className="text-[#F5F0EB] hover:text-[#FF2D6B] text-[0.78rem] tracking-[0.12em] uppercase flex items-center gap-2 transition-colors duration-300 font-[Jost] group"
        >
          Browse Full Catalogue
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </motion.div>
    </div>
  );
}
