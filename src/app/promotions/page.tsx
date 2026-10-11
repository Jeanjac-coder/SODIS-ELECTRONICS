import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/misc";
import { FlashDeals, PackConfigurator } from "@/components/home/sections";
import { ProductRail, InstallmentSimulator } from "@/components/product/product-extras";
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
      <PageHeader crumbs={[{ href: "/promotions", label: "Promotions" }]} eyebrow="Bons plans" title="Les bonnes affaires, sans les mauvaises surprises." lead="Services offerts, packs avantageux, paiement échelonné : des offres claires, sur des produits LG officiels et garantis." />
      <FlashDeals compact />
      <section className="container-x mt-32">
        <SectionHeading eyebrow="Sélection" title="Produits en offre" />
        <ProductRail items={[...byTag("promo"), ...byTag("best-seller")].filter((p, i, a) => a.findIndex((x) => x.slug === p.slug) === i)} label="Produits en promotion" />
      </section>
      <PackConfigurator />
      <section className="container-x mt-32 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow mb-4">Payer en plusieurs fois</p>
          <h2 className="h-section text-balance">Équipez-vous maintenant, réglez à votre rythme.</h2>
          <p className="lead mt-4 max-w-md">Selon le montant et votre profil, un paiement échelonné sur 3 à 12 mois peut vous être proposé. Simulez, puis précisez-le dans votre demande de devis.</p>
        </div>
        <InstallmentSimulator />
      </section>
    </>
  );
}
