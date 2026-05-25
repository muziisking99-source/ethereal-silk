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
      desc: "Orders are processed within 24 hours on business days after WhatsApp confirmation.",
    },
    {
      icon: Package,
      title: "Discreet Packaging",
      desc: "Every order arrives in plain, unbranded packaging — your privacy is protected.",
    },
    {
      icon: MapPin,
      title: "Express Cities",
      desc: "1–2 day express available for Johannesburg, Cape Town, Durban, and Pretoria.",
    },
  ];

  return (
    <section
      id="shipping"
      className="luxury-section bg-[#f4efe9] border-t border-[rgba(180,140,160,0.18)]"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-14">
          <div className="font-[DM_Mono] text-[0.62rem] tracking-[0.35em] uppercase text-[#e8849a] mb-3">
            Delivery & Shipping
          </div>
          <h2 className="font-[Bodoni_Moda] text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.1] mb-4">
            How We Deliver
          </h2>
          <p className="text-[0.88rem] text-[#8a6e7a] max-w-[440px] mx-auto leading-[1.8]">
            All prices in South African Rand. Order via WhatsApp and receive discreet,
            tracked delivery to your door.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {info.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white border border-[rgba(180,140,160,0.18)] p-6 text-center rounded-[2px] transition-all duration-300 hover:border-[#a87cad] hover:translate-y-[-4px] hover:shadow-[0_20px_50px_rgba(107,58,94,0.1)]"
            >
              <div className="w-10 h-10 mx-auto rounded-[10px] bg-[rgba(107,58,94,0.08)] border border-[rgba(180,140,160,0.18)] flex items-center justify-center mb-4">
                <item.icon className="w-[18px] h-[18px] text-[#6b3a5e]" strokeWidth={1.5} />
              </div>
              <h3 className="font-[Bodoni_Moda] text-[1.05rem] font-bold mb-2">{item.title}</h3>
              <p className="text-[0.82rem] leading-[1.75] text-[#8a6e7a]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
