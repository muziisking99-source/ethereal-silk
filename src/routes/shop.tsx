import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, ShoppingBag, Loader2 } from "lucide-react";
import { useProducts, useCategories, type Product } from "@/hooks/useProducts";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import MobileCartFab from "@/components/MobileCartFab";
import Footer from "@/components/Footer";

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart();
  const image =
    product.images?.[0] ??
    "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=600&fit=crop";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08 }}
      className="group relative overflow-hidden border border-[var(--border-color)] bg-[var(--surface)]"
    >
      <div className="relative overflow-hidden aspect-[3/4]">
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover saturate-[0.75] contrast-110 transition-all duration-700 group-hover:scale-[1.06] group-hover:saturate-[0.9]"
          loading="lazy"
        />
        <div className="absolute inset-0 backdrop-blur-[12px] bg-[var(--bg)] opacity-0 group-hover:opacity-90 group-hover:bg-[rgba(var(--bg),0.8)] transition-all duration-300 flex flex-col items-center justify-center gap-4">
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
            className="w-[52px] h-[52px] rounded-full border border-[var(--plum)] flex items-center justify-center bg-[var(--surface)] hover:bg-[var(--blush)] hover:border-[var(--blush)] hover:text-white transition-all duration-300"
            aria-label={`Add ${product.name} to basket`}
          >
            <ShoppingBag className="w-5 h-5 text-[var(--plum)]" strokeWidth={1.5} />
          </button>
          <span className="font-[DM_Mono] text-[0.6rem] tracking-[0.25em] uppercase text-[var(--plum)]">
            Add to Order
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="font-[DM_Mono] text-[0.55rem] tracking-[0.25em] uppercase text-[var(--blush)] mb-1">
          {product.sku}
        </div>
        <h3 className="font-[Bodoni_Moda] text-[1rem] font-bold text-[var(--text)] mb-1 truncate">
          {product.name}
        </h3>
        <p className="text-[0.78rem] text-[var(--muted-text)] leading-[1.6] line-clamp-2 mb-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="font-[DM_Mono] text-[0.85rem] text-[var(--plum)] font-medium">
            R{product.price.toLocaleString()}
          </div>
          {product.featured && (
            <span className="text-[0.55rem] tracking-[0.2em] uppercase text-[var(--blush)] bg-[var(--blush-dim)] px-2 py-1">
              Featured
            </span>
          )}
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
          className="mt-4 w-full py-3 border border-[var(--border-color)] text-[var(--plum)] text-[0.72rem] tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[var(--plum)] hover:border-[var(--plum)] hover:text-white"
        >
          Add to Basket
        </button>
      </div>
    </motion.div>
  );
}

export const Route = createFileRoute("/shop")({
  component: ShopPage,
});

function ShopPage() {
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const { data: products, isLoading } = useProducts(category, debouncedSearch);
  const { data: categories } = useCategories();

  React.useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  return (
    <div className="min-h-screen theme-page">
      <Navbar />
      <CartDrawer />
      <MobileCartFab />

      <div className="pt-32 pb-8 px-6 lg:px-12 border-b border-[var(--border-color)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="font-[DM_Mono] text-[0.62rem] tracking-[0.35em] uppercase text-[var(--blush)] mb-3">
            Browse Collection
          </div>
          <h1 className="font-[Bodoni_Moda] text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.1] mb-8 text-[var(--text)]">
            The Collection
          </h1>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--dim)]"
                strokeWidth={1.5}
              />
              <input
                type="text"
                placeholder="Search sets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[var(--surface)] border border-[var(--border-color)] text-[0.85rem] text-[var(--text)] placeholder:text-[var(--dim)] focus:border-[var(--plum)] focus:outline-none transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setCategory("")}
                className={`px-4 py-2.5 text-[0.72rem] tracking-[0.15em] uppercase border transition-all duration-300 whitespace-nowrap rounded-[2px] ${
                  category === ""
                    ? "bg-[var(--plum)] text-white border-[var(--plum)]"
                    : "bg-[var(--surface)] text-[var(--muted-text)] border-[var(--border-color)] hover:border-[var(--plum)]"
                }`}
              >
                All
              </button>
              {categories?.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c === category ? "" : c)}
                  className={`px-4 py-2.5 text-[0.72rem] tracking-[0.15em] uppercase border transition-all duration-300 whitespace-nowrap rounded-[2px] ${
                    category === c
                      ? "bg-[var(--plum)] text-white border-[var(--plum)]"
                      : "bg-[var(--surface)] text-[var(--muted-text)] border-[var(--border-color)] hover:border-[var(--plum)]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="luxury-section !pt-12 !pb-16">
        <div className="max-w-[1200px] mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-[var(--plum)] animate-spin" strokeWidth={1.5} />
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-[var(--muted-text)]">
              <SlidersHorizontal className="w-10 h-10 mx-auto mb-4 opacity-40" strokeWidth={1} />
              <p className="text-[1rem] mb-1">No products found</p>
              <p className="text-[0.85rem]">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
