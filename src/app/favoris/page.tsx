import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/misc";
import { WishlistView } from "@/components/widgets/user-pages";

export const metadata: Metadata = { title: "Mes favoris", robots: { index: false } };

export default function WishlistPage() {
  return (
    <>
      <PageHeader crumbs={[{ href: "/favoris", label: "Favoris" }]} eyebrow="Wishlist" title="Vos coups de cœur." lead="Retrouvez les produits que vous avez aimés, et ajoutez-les à votre devis quand vous êtes prêt." />
      <section className="container-x">
        <WishlistView />
      </section>
    </>
  );
}
