import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/misc";
import { Catalog } from "@/components/product/catalog";
import { CatalogFallback } from "@/components/product/product-card";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Tous les produits LG",
  description: "Catalogue complet SODIS Electronics : TV OLED, QNED, NanoCell, audio XBOOM, barres de son, climatiseurs, réfrigérateurs, lave-linge, micro-ondes. Distributeur officiel LG en Côte d'Ivoire.",
  alternates: { canonical: "/produits" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/produits", label: "Produits" }]}
        eyebrow={`${products.length} références LG`}
        title="Le meilleur de LG, sélectionné pour vous."
        lead="Filtrez, comparez, ajoutez à votre devis. Et si vous hésitez, notre assistant ou un conseiller WhatsApp vous oriente en deux minutes."
      />
      <Suspense fallback={<CatalogFallback />}>
        <Catalog items={products} />
      </Suspense>
    </>
  );
}
