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
    <section id="gallery" className="luxury-section border-t border-[rgba(180,140,160,0.18)]">
      <div className="max-w-[1200px] mx-auto mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <div className="font-[DM_Mono] text-[0.62rem] tracking-[0.35em] uppercase text-[#e8849a] mb-3">
            The Collection
          </div>
          <h2 className="font-[Bodoni_Moda] text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.1]">
            Curated Lingerie Sets
          </h2>
        </div>
        <Link
          to="/shop"
          className="bg-gradient-to-br from-[#6b3a5e] to-[#a87cad] text-white px-8 py-4 rounded-[2px] text-[0.8rem] tracking-[0.18em] uppercase font-medium transition-all duration-[350ms] hover:translate-y-[-2px] shadow-[0_8px_24px_rgba(107,58,94,0.25)] hover:shadow-[0_14px_32px_rgba(107,58,94,0.35)] shrink-0"
        >
          View Full Catalogue
        </Link>
      </div>

      {isLoading ? (
        <div className="max-w-[1200px] mx-auto flex gap-3 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-[280px] h-[420px] bg-[#f4efe9] animate-pulse shrink-0" />
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
        <div className="max-w-[1200px] mx-auto text-center py-16 text-[#8a6e7a]">
          New sets arriving soon. Visit the shop to browse.
        </div>
      )}
    </section>
  );
}
