import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/misc";
import { CompareView } from "@/components/widgets/user-pages";

export const metadata: Metadata = { title: "Comparateur de produits", description: "Comparez jusqu'à 4 produits LG côte à côte.", alternates: { canonical: "/comparateur" } };

export default function ComparePage() {
  return (
    <>
      <PageHeader crumbs={[{ href: "/comparateur", label: "Comparateur" }]} eyebrow="Comparateur" title="Comparez, puis choisissez sereinement." lead="Jusqu'à 4 produits côte à côte, caractéristique par caractéristique." />
      <section className="container-x">
        <CompareView />
      </section>
    </>
  );
}
