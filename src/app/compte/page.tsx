import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/misc";
import { AccountView } from "@/components/widgets/user-pages";

export const metadata: Metadata = { title: "Mon espace", robots: { index: false } };

export default function AccountPage() {
  return (
    <>
      <PageHeader crumbs={[{ href: "/compte", label: "Mon espace" }]} eyebrow="Mon espace" title="Akwaba dans votre espace." lead="Panier de devis, favoris, comparateur et historique sont enregistrés sur cet appareil, sans création de compte." />
      <section className="container-x">
        <AccountView />
      </section>
    </>
  );
}
