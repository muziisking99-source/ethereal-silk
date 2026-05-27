import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import { useAvailabilityContent } from "@/hooks/useSiteContent";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { DEFAULT_SETTINGS } from "@/lib/siteContentDefaults";

type PriceCard = {
  id?: string;
  name: string;
  condition: string;
  price: number;
  badge?: string;
  image_url?: string;
};

const priceCards: PriceCard[] = [
  { name: "Classic Brief", condition: "Lightly worn, 1 day", price: 250 },
  { name: "Lace Set", condition: "Well loved, 3 days", price: 380, badge: "Most Wanted" },
  { name: "Thong", condition: "Freshly worn, same day", price: 200 },
];

export default function Testimonials() {
  const { data: products } = useProducts();
  const { data: availability } = useAvailabilityContent();

  const configuredProducts =
    availability?.product_ids
      ?.map((id) => products?.find((product) => product.id === id))
      .filter((product): product is NonNullable<typeof product> => Boolean(product)) ?? [];

  const productCards: PriceCard[] =
    configuredProducts.length > 0
      ? configuredProducts.map((product) => ({
          id: product.id,
          name: product.name,
          condition: product.description || "Available now",
          price: product.price,
          image_url: product.images?.[0],
          badge: product.featured ? "Featured" : undefined,
        }))
      : (products ?? []).slice(0, 3).map((product) => ({
          id: product.id,
          name: product.name,
          condition: product.description || "Available now",
          price: product.price,
          image_url: product.images?.[0],
          badge: product.featured ? "Featured" : undefined,
        }));

  const cards = productCards.length > 0 ? productCards : priceCards;

  return (
    <section className="luxury-section border-t border-[rgba(var(--accent-rgb),0.15)] bg-[var(--bg2)]">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <div className="font-[DM_Mono] text-[0.62rem] tracking-[0.35em] uppercase text-[var(--accent)] mb-3">
            {availability?.eyebrow || "Current Inventory"}
          </div>
          <h2 className="font-[Cormorant_Garamond] text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.1] text-[var(--text)]">
            {availability?.heading || "What's Available Now"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, i) => {
            const priceCopy = ` (R${card.price})`;
            const msg = `Hi Liyah, I'd like to claim the ${card.name}${priceCopy}. Is it still available?`;
            const href = buildWhatsAppUrl(DEFAULT_SETTINGS.whatsapp_number, msg);
            const featured = !!card.badge;
            return (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative bg-[var(--surface-2)] border p-8 rounded-[4px] transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_20px_50px_rgba(var(--accent-rgb),0.2)] ${
                  featured
                    ? "border-[var(--accent)]"
                    : "border-[rgba(var(--accent-rgb),0.2)] hover:border-[var(--accent)]"
                }`}
              >
                {card.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-white font-[DM_Mono] text-[0.55rem] tracking-[0.25em] uppercase px-3 py-1 rounded-full">
                    {card.badge}
                  </div>
                )}
                <h3 className="font-[Cormorant_Garamond] text-[1.6rem] font-bold text-[var(--text)] mb-2">
                  {card.name}
                </h3>
                {card.image_url && (
                  <img
                    src={card.image_url}
                    alt={card.name}
                    className="w-full aspect-[4/3] object-cover rounded-[3px] mb-4 border border-[rgba(var(--accent-rgb),0.2)]"
                  />
                )}
                <div className="font-[DM_Mono] text-[0.62rem] tracking-[0.2em] uppercase text-[var(--muted)] mb-6">
                  {card.condition}
                </div>
                {card.price > 0 && (
                  <div className="font-[Cormorant_Garamond] text-[3rem] font-bold text-[var(--accent)] leading-none mb-6">
                    R{card.price}
                  </div>
                )}
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="block text-center w-full py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[0.75rem] tracking-[0.18em] uppercase font-medium rounded-[2px] transition-all duration-300 font-[Jost]"
                >
                  Claim This
                </a>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-[0.78rem] text-[var(--muted)] mt-10 max-w-[640px] mx-auto leading-[1.8] font-[Jost]">
          This section is linked to your store catalog. Stock is not reserved until payment is
          received.
        </p>
      </div>
    </section>
  );
}
