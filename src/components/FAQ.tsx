import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [open, setOpen] = React.useState<number | null>(0);

  const faqs = [
    {
      q: "What sizes do you offer?",
      a: "Our lingerie ranges from XS to 3XL across all collections. Each product page includes a detailed size guide. We believe every body deserves luxury, which is why we offer inclusive sizing with the same attention to detail.",
    },
    {
      q: "How long does delivery take?",
      a: "Standard delivery across South Africa takes 3–5 business days. We offer express 1–2 day delivery to major cities (Johannesburg, Cape Town, Durban, Pretoria) at an additional R120.",
    },
    {
      q: "Is the packaging discreet?",
      a: "Absolutely. All orders are shipped in plain, unmarked packaging with no branding or product descriptions visible on the exterior. Your privacy is our priority.",
    },
    {
      q: "What is your return policy?",
      a: "We accept exchanges within 14 days of delivery for unworn items with original tags attached. For hygiene reasons, briefs and bodysuits are final sale unless defective.",
    },
    {
      q: "Do you offer gift wrapping?",
      a: "Yes! Complimentary gift wrapping is available at checkout. Each gift set comes in our signature blush tissue paper and a luxury gift box with a handwritten note option.",
    },
    {
      q: "How do I place an order via WhatsApp?",
      a: "Simply add items to your cart, click 'Place Order via WhatsApp', fill in your details, and we'll generate a formatted message for you. Confirm via WhatsApp and we'll process your order.",
    },
  ];

  return (
    <section id="faq" className="luxury-section border-t border-[rgba(180,140,160,0.18)] bg-[#f4efe9]">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-14">
          <div className="font-[DM_Mono] text-[0.62rem] tracking-[0.35em] uppercase text-[#e8849a] mb-3">
            Common Questions
          </div>
          <h2 className="font-[Bodoni_Moda] text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.1]">
            Frequently Asked
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-white border border-[rgba(180,140,160,0.18)] overflow-hidden transition-all duration-300 hover:border-[rgba(180,140,160,0.35)]"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-[Bodoni_Moda] text-[1.05rem] font-bold text-[#1e1218]">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#6b3a5e] transition-transform duration-300 flex-shrink-0 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? "max-h-48" : "max-h-0"
                }`}
              >
                <p className="px-5 pb-5 text-[0.85rem] leading-[1.8] text-[#8a6e7a]">
                  {faq.a}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
