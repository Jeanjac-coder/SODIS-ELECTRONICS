import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/misc";
import { FlashDeals, PackConfigurator } from "@/components/home/sections";
import { ProductRail } from "@/components/product/product-extras";
import { SectionHeading } from "@/components/ui/reveal";
import { byTag } from "@/data/products";

export const metadata: Metadata = {
  title: "Promotions & offres flash",
  description: "Offres flash LG, packs TV + barre de son, installation et livraison offertes : les bons plans SODIS Electronics en Côte d'Ivoire.",
  alternates: { canonical: "/promotions" },
};

export default function PromotionsPage() {
  return (
    <>
      <PageHeader crumbs={[{ href: "/promotions", label: "Promotions" }]} eyebrow="Bons plans" title="Les bonnes affaires, sans les mauvaises surprises." lead="Services offerts, packs avantageux, paiement à la livraison : des offres claires, sur des produits LG officiels et garantis." />
      <FlashDeals compact />
      <section className="container-x mt-32">
        <SectionHeading eyebrow="Sélection" title="Produits en offre" />
        <ProductRail items={[...byTag("promo"), ...byTag("best-seller")].filter((p, i, a) => a.findIndex((x) => x.slug === p.slug) === i)} label="Produits en promotion" />
      </section>
      <PackConfigurator />
    </>
  );
}
