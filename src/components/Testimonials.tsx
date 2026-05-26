import { motion } from "framer-motion";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { DEFAULT_SETTINGS } from "@/lib/siteContentDefaults";

type PriceCard = {
  name: string;
  condition: string;
  price: number;
  badge?: string;
};

const priceCards: PriceCard[] = [
  { name: "Classic Brief", condition: "Lightly worn, 1 day", price: 250 },
  { name: "Lace Set", condition: "Well loved, 3 days", price: 380, badge: "Most Wanted" },
  { name: "Thong", condition: "Freshly worn, same day", price: 200 },
];

export default function Testimonials() {
  return (
    <section className="luxury-section border-t border-[rgba(255,45,107,0.15)] bg-[#1A1A1A]">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <div className="font-[DM_Mono] text-[0.62rem] tracking-[0.35em] uppercase text-[#FF2D6B] mb-3">
            Current Inventory
          </div>
          <h2 className="font-[Cormorant_Garamond] text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.1] text-[#F5F0EB]">
            What's <span className="italic text-[#FF2D6B]">Available Now</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {priceCards.map((card, i) => {
            const msg = `Hi Liyah, I'd like to claim the ${card.name} (R${card.price}). Is it still available?`;
            const href = buildWhatsAppUrl(DEFAULT_SETTINGS.whatsapp_number, msg);
            const featured = !!card.badge;
            return (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative bg-[#1F1F1F] border p-8 rounded-[4px] transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_20px_50px_rgba(255,45,107,0.2)] ${
                  featured ? "border-[#FF2D6B]" : "border-[rgba(255,45,107,0.2)] hover:border-[#FF2D6B]"
                }`}
              >
                {card.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF2D6B] text-white font-[DM_Mono] text-[0.55rem] tracking-[0.25em] uppercase px-3 py-1 rounded-full">
                    {card.badge}
                  </div>
                )}
                <h3 className="font-[Cormorant_Garamond] text-[1.6rem] font-bold text-[#F5F0EB] mb-2">
                  {card.name}
                </h3>
                <div className="font-[DM_Mono] text-[0.62rem] tracking-[0.2em] uppercase text-[#B8AEA8] mb-6">
                  {card.condition}
                </div>
                <div className="font-[Cormorant_Garamond] text-[3rem] font-bold text-[#FF2D6B] leading-none mb-6">
                  R{card.price}
                </div>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="block text-center w-full py-3 bg-[#FF2D6B] hover:bg-[#e02560] text-white text-[0.75rem] tracking-[0.18em] uppercase font-medium rounded-[2px] transition-all duration-300 font-[Jost]"
                >
                  Claim This
                </a>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-[0.78rem] text-[#B8AEA8] mt-10 max-w-[640px] mx-auto leading-[1.8] font-[Jost]">
          Prices in ZAR. Items ship once payment confirmed via WhatsApp. Stock is not reserved until payment is received.
        </p>
      </div>
    </section>
  );
}
