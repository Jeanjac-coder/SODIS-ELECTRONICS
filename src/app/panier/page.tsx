import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/misc";
import { QuoteCartView } from "@/components/widgets/user-pages";

export const metadata: Metadata = { title: "Panier de devis", robots: { index: false } };

export default function CartPage() {
  return (
    <>
      <PageHeader crumbs={[{ href: "/panier", label: "Panier" }]} eyebrow="Panier de devis" title="Votre sélection." lead="Ajustez les quantités puis envoyez votre demande : un conseiller vous répond avec le meilleur prix." />
      <section className="container-x">
        <QuoteCartView />
      </section>
    </>
  );
}
