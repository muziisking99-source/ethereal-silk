import React from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useFeaturedProducts } from "@/hooks/useProducts";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Eye } from "lucide-react";
import type { Product } from "@/hooks/useProducts";

function FeaturedCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart();
  const image = product.images?.[0] ?? "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=600&fit=crop";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className="group relative overflow-hidden border border-[rgba(180,140,160,0.18)] bg-white cursor-pointer"
    >
      <Link to={`/shop`} className="block relative overflow-hidden aspect-[3/4]">
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover saturate-[0.75] contrast-110 transition-all duration-700 group-hover:scale-[1.06] group-hover:saturate-[0.9]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(30,18,24,0.3)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem({
                productId: product.id,
                name: product.name,
                sku: product.sku,
                price: product.price,
                image,
              });
            }}
            className="w-11 h-11 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg hover:bg-[#e8849a] hover:text-white transition-all duration-300"
          >
            <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <Link
            to="/shop"
            className="w-11 h-11 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg hover:bg-[#e8849a] hover:text-white transition-all duration-300"
          >
            <Eye className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>
      </Link>
      <div className="p-4">
        <div className="font-[DM_Mono] text-[0.55rem] tracking-[0.25em] uppercase text-[#e8849a] mb-1">
          {product.sku}
        </div>
        <h3 className="font-[Bodoni_Moda] text-[1rem] font-bold text-[#1e1218] mb-1 truncate">
          {product.name}
        </h3>
        <p className="font-[DM_Mono] text-[0.8rem] text-[#6b3a5e] font-medium">
          R{product.price.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
}

export default function FeaturedCollection() {
  const { data: products, isLoading } = useFeaturedProducts();

  return (
    <section className="py-20 lg:py-28 px-6 lg:px-12 border-t border-[rgba(180,140,160,0.18)]">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="font-[DM_Mono] text-[0.62rem] tracking-[0.35em] uppercase text-[#e8849a] mb-3">
              Curated Selection
            </div>
            <h2 className="font-[Bodoni_Moda] text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.1]">
              Featured Collection
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden md:inline-flex items-center gap-2 text-[0.78rem] tracking-[0.12em] uppercase text-[#8a6e7a] hover:text-[#6b3a5e] transition-colors"
          >
            View All →
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[3/4] bg-[#f4efe9] animate-pulse" />
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {products.map((product, i) => (
              <FeaturedCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-[#8a6e7a]">
            No featured products yet. Check back soon.
          </div>
        )}
      </div>
    </section>
  );
}
