import type { Metadata } from "next";
import { JsonLd, PageHeader } from "@/components/ui/misc";
import { FaqList } from "@/components/widgets/faq-list";
import { ButtonLink } from "@/components/ui/button";
import { faq } from "@/data/content";
import { waLink } from "@/config/site";
import { WhatsAppIcon } from "@/components/widgets/icons";

export const metadata: Metadata = {
  title: "FAQ — Questions fréquentes",
  description: "Livraison, installation, paiement Mobile Money, garantie LG, SAV : toutes les réponses à vos questions sur SODIS Electronics.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageHeader crumbs={[{ href: "/faq", label: "FAQ" }]} eyebrow="Aide" title="Vos questions, nos réponses." lead="Tout ce qu'il faut savoir sur les commandes, la livraison, le paiement et le SAV. Et si votre question n'y est pas, demandez-nous." />
      <section className="container-x">
        <FaqList />
        <div className="mt-20 flex flex-col items-start justify-between gap-6 rounded-[32px] bg-soft p-8 sm:flex-row sm:items-center sm:p-12">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight">Vous n&apos;avez pas trouvé ?</p>
            <p className="mt-1 text-muted">Un conseiller vous répond en quelques minutes.</p>
          </div>
          <ButtonLink href={waLink("Bonjour SODIS, j'ai une question.")} variant="whatsapp" size="lg">
            <WhatsAppIcon className="h-5 w-5" /> Poser ma question
          </ButtonLink>
        </div>
      </section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.flatMap((g) => g.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } }))),
        }}
      />
    </>
  );
}
