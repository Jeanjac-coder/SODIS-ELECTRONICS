import { ProductCardSkeleton } from "@/components/product/product-card";

export default function Loading() {
  return (
    <div className="container-x pt-40" aria-busy="true" aria-label="Chargement">
      <div className="skeleton mb-6 h-4 w-40 rounded-full" />
      <div className="skeleton mb-16 h-16 w-3/4 rounded-3xl" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
