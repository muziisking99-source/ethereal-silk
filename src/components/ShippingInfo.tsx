import { motion } from "framer-motion";
import { Truck, Clock, MessageCircle } from "lucide-react";

export default function ShippingInfo() {
  const info = [
    {
      icon: Truck,
      title: "Nationwide Delivery",
      desc: "We ship across all 9 provinces via trusted couriers in plain, unmarked packaging.",
    },
    {
      icon: Clock,
      title: "Same Week Shipping",
      desc: "Orders placed and confirmed via WhatsApp are processed within 24 hours on business days.",
    },
    {
      icon: MessageCircle,
      title: "Order via WhatsApp",
      desc: "Browse the collection, pick your item, and confirm in one simple WhatsApp message — no complicated checkout.",
    },
  ];

  return (
    <section
      id="shipping"
      className="luxury-section bg-[#1A1A1A] border-t border-[rgba(255,45,107,0.15)]"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-14">
          <div className="font-[DM_Mono] text-[0.62rem] tracking-[0.35em] uppercase text-[#FF2D6B] mb-3">
            How It Works
          </div>
          <h2 className="font-[Cormorant_Garamond] text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.1] mb-4 text-[#F5F0EB]">
            Simple. Discreet. Direct.
          </h2>
          <p className="text-[0.88rem] text-[#B8AEA8] max-w-[480px] mx-auto leading-[1.8] font-[Jost]">
            All prices in South African Rand. Order via WhatsApp and receive discreet,
            tracked delivery straight to your door.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {info.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[#1F1F1F] border border-[rgba(255,45,107,0.2)] p-8 text-center rounded-[2px] transition-all duration-300 hover:border-[#FF2D6B] hover:translate-y-[-4px] hover:shadow-[0_20px_50px_rgba(255,45,107,0.15)]"
            >
              <div className="w-12 h-12 mx-auto rounded-[10px] bg-[rgba(255,45,107,0.1)] border border-[rgba(255,45,107,0.25)] flex items-center justify-center mb-5">
                <item.icon className="w-[20px] h-[20px] text-[#FF2D6B]" strokeWidth={1.5} />
              </div>
              <h3 className="font-[Cormorant_Garamond] text-[1.25rem] font-bold mb-3 text-[#F5F0EB]">{item.title}</h3>
              <p className="text-[0.82rem] leading-[1.75] text-[#B8AEA8] font-[Jost]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
