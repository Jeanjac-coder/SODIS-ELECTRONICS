import type { Metadata } from "next";
import { Clock, FileCheck2, Handshake, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/misc";
import { QuoteForm } from "@/components/forms/quote-form";
import { site, waLink } from "@/config/site";
import { WhatsAppIcon } from "@/components/widgets/icons";

export const metadata: Metadata = {
  title: "Demande de devis gratuit",
  description: "Demandez votre devis LG gratuit : produits, quantités, budget, livraison et installation. Réponse sous 24 h. Particuliers et entreprises en Côte d'Ivoire.",
  alternates: { canonical: "/devis" },
};

export default function QuotePage() {
  return (
    <>
      <PageHeader crumbs={[{ href: "/devis", label: "Demande de devis" }]} eyebrow="Devis gratuit · Réponse sous 24 h" title="Votre projet, notre meilleur prix." lead="Quatre étapes, deux minutes. Particulier ou entreprise, vous recevez une offre claire et détaillée, livraison et installation comprises si vous le souhaitez." />
      <section className="container-x grid gap-10 lg:grid-cols-[1fr_340px]">
        <QuoteForm />
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          {[
            { i: Clock, t: "Réponse sous 24 h", d: "Souvent dans l'heure, aux horaires d'ouverture." },
            { i: FileCheck2, t: "Devis détaillé", d: "Produits, livraison, installation : tout est écrit." },
            { i: Handshake, t: "Tarifs entreprise", d: "Conditions dédiées pour les volumes et projets." },
            { i: ShieldCheck, t: "Sans engagement", d: "Vos données restent confidentielles." },
          ].map(({ i: I, t, d }) => (
            <div key={t} className="flex gap-4 rounded-3xl bg-soft p-5">
              <I className="h-5 w-5 shrink-0 text-red" />
              <div>
                <p className="text-[15px] font-semibold">{t}</p>
                <p className="text-[13px] text-muted">{d}</p>
              </div>
            </div>
          ))}
          <a href={waLink("Bonjour SODIS, je souhaite un devis.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-3xl bg-[#25D366] p-5 text-white">
            <WhatsAppIcon className="h-6 w-6" />
            <span>
              <span className="block text-[15px] font-semibold">Plus rapide sur WhatsApp</span>
              <span className="block text-[13px] opacity-80">{site.phone}</span>
            </span>
          </a>
        </aside>
      </section>
    </>
  );
}
