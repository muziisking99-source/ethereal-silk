import { Link } from "@tanstack/react-router";
import { useFeaturedProducts, useNewArrivals } from "@/hooks/useProducts";
import type { Product } from "@/hooks/useProducts";
import ProductGalleryCard from "@/components/ProductGalleryCard";

export default function FeaturedCollection() {
  const { data: featured, isLoading: loadingFeatured } = useFeaturedProducts();
  const { data: arrivals, isLoading: loadingArrivals } = useNewArrivals();

  const products: Product[] =
    featured && featured.length > 0
      ? featured
      : arrivals && arrivals.length > 0
        ? arrivals
        : [];
  const isLoading = loadingFeatured || loadingArrivals;

  const [first, second, third, fourth, fifth] = products;

  return (
    <section id="gallery" className="luxury-section bg-[var(--bg)] border-t border-[rgba(var(--accent-rgb),0.15)]">
      <div className="max-w-[1200px] mx-auto mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <div className="font-[DM_Mono] text-[0.62rem] tracking-[0.35em] uppercase text-[var(--accent)] mb-3">
            This Week's Drops
          </div>
          <h2 className="font-[Cormorant_Garamond] text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.1] text-[var(--text)]">
            Fresh <span className="italic text-[var(--accent)]">Inventory</span>
          </h2>
        </div>
        <Link
          to="/shop"
          className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-8 py-4 rounded-[2px] text-[0.8rem] tracking-[0.18em] uppercase font-medium transition-all duration-[350ms] hover:translate-y-[-2px] shadow-[0_8px_24px_rgba(var(--accent-rgb),0.35)] hover:shadow-[0_14px_32px_rgba(var(--accent-rgb),0.5)] shrink-0 font-[Jost]"
        >
          View Full Catalogue
        </Link>
      </div>

      {isLoading ? (
        <div className="max-w-[1200px] mx-auto flex gap-3 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-[280px] h-[420px] bg-[var(--bg2)] animate-pulse shrink-0" />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="overflow-x-auto overflow-y-hidden pb-4 -mx-6 px-6 lg:mx-0 lg:px-0">
          <div className="flex gap-3 max-w-[1200px] mx-auto items-end min-w-max">
            {first && (
              <ProductGalleryCard product={first} variant="portrait" index={0} />
            )}
            {(second || third) && (
              <div className="flex flex-col gap-3 shrink-0">
                {second && (
                  <ProductGalleryCard product={second} variant="landscape" index={1} />
                )}
                {third && (
                  <ProductGalleryCard product={third} variant="landscape" index={2} />
                )}
              </div>
            )}
            {fourth && (
              <ProductGalleryCard product={fourth} variant="portrait" index={3} />
            )}
            {fifth && (
              <ProductGalleryCard
                product={fifth}
                variant="square"
                index={4}
                className="self-center"
              />
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-[1200px] mx-auto text-center py-16 text-[var(--muted)] font-[Jost]">
          New drops loading. Check back Monday.
        </div>
      )}
    </section>
  );
}
