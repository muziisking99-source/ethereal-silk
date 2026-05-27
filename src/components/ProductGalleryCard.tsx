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
      className={`group g-card flex-shrink-0 relative overflow-hidden cursor-pointer border border-[rgba(var(--accent-rgb),0.2)] rounded-[4px] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(var(--accent-rgb),0.25)] hover:border-[var(--accent)] bg-[var(--surface-2)] ${variantClasses[variant]} ${className}`}
    >
      <img
        src={image}
        alt={product.name}
        className="w-full h-full object-cover saturate-[0.85] contrast-110 brightness-90 transition-all duration-700 group-hover:scale-[1.05]"
        loading="lazy"
      />
      <div className="absolute inset-0 backdrop-blur-[8px] bg-[rgba(var(--bg-rgb),0.7)] flex flex-col items-center justify-center gap-4 opacity-0 hover:opacity-100 transition-all duration-300">
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
          className="w-[52px] h-[52px] rounded-full border border-[var(--accent)] flex items-center justify-center bg-[var(--accent)] hover:bg-white hover:border-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          aria-label={`Add ${product.name} to basket`}
        >
          <ShoppingBag
            className="w-5 h-5 text-white group-hover:text-[var(--accent)]"
            strokeWidth={1.5}
          />
        </button>
        <span className="font-[DM_Mono] text-[0.6rem] tracking-[0.25em] uppercase text-white">
          Add to Order · R{product.price.toLocaleString()}
        </span>
      </div>
      <div className="absolute bottom-4 left-4 right-4 z-[2]">
        <div className="font-[Cormorant_Garamond] text-[1rem] italic text-white drop-shadow-lg">
          {product.name}
        </div>
        <div className="font-[DM_Mono] text-[0.55rem] tracking-[0.2em] uppercase text-[var(--accent)] mt-0.5">
          {product.sku}
        </div>
      </div>
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
        className="md:hidden absolute top-3 right-3 z-[3] bg-[rgba(var(--accent-rgb),0.92)] text-white px-3 py-1.5 text-[0.62rem] tracking-[0.14em] uppercase"
      >
        Add
      </button>
    </motion.div>
  );
}
