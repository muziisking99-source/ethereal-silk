import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/hooks/useProducts";

export type GalleryCardVariant = "portrait" | "landscape" | "square";

const variantClasses: Record<GalleryCardVariant, string> = {
  portrait: "w-[280px] h-[420px]",
  landscape: "w-[380px] h-[280px]",
  square: "w-[310px] h-[310px]",
};

interface ProductGalleryCardProps {
  product: Product;
  variant: GalleryCardVariant;
  index: number;
  className?: string;
}

export default function ProductGalleryCard({
  product,
  variant,
  index,
  className = "",
}: ProductGalleryCardProps) {
  const { addItem } = useCart();
  const image =
    product.images?.[0] ??
    "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=600&fit=crop";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`group g-card flex-shrink-0 relative overflow-hidden cursor-pointer border border-[rgba(196,120,138,0.15)] rounded-[4px] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(100,50,80,0.1)] ${variantClasses[variant]} ${className}`}
    >
      <img
        src={image}
        alt={product.name}
        className="w-full h-full object-cover saturate-[0.75] contrast-110 transition-all duration-700 group-hover:scale-[1.05]"
        loading="lazy"
      />
      <div className="absolute inset-0 backdrop-blur-[12px] bg-[rgba(250,247,244,0.5)] flex flex-col items-center justify-center gap-4 opacity-0 hover:opacity-100 hover:bg-[rgba(250,247,244,0.35)] transition-all duration-300">
        <button
          type="button"
          onClick={() =>
            addItem({
              productId: product.id,
              name: product.name,
              sku: product.sku,
              price: product.price,
              image,
            })
          }
          className="w-[52px] h-[52px] rounded-full border border-[#6B3556] flex items-center justify-center bg-white/80 hover:bg-[#C4788A] hover:border-[#C4788A] hover:text-white transition-all duration-300"
          aria-label={`Add ${product.name} to basket`}
        >
          <ShoppingBag className="w-5 h-5 text-[#6B3556] group-hover:text-inherit" strokeWidth={1.5} />
        </button>
        <span className="font-[DM_Mono] text-[0.6rem] tracking-[0.25em] uppercase text-[#6B3556]">
          Add to Order · R{product.price.toLocaleString()}
        </span>
      </div>
      <div className="absolute bottom-4 left-4 z-[2]">
        <div className="font-[Cormorant_Garamond] text-[0.9rem] italic text-[#6B3556]">
          {product.name}
        </div>
        <div className="font-[DM_Mono] text-[0.55rem] tracking-[0.2em] uppercase text-[#C4788A] mt-0.5">
          {product.sku}
        </div>
      </div>
    </motion.div>
  );
}
