import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/misc";
import { StoresMap } from "@/components/home/stores-map";
import { AppointmentForm } from "@/components/forms/contact-forms";
import { SectionHeading } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Nos magasins & showrooms",
  description: "Trouvez un showroom SODIS Electronics à Abidjan : adresses, horaires, téléphone et itinéraire Google Maps.",
  alternates: { canonical: "/magasins" },
};

export default function StoresPage() {
  return (
    <>
      <PageHeader crumbs={[{ href: "/magasins", label: "Nos magasins" }]} eyebrow="Showrooms" title="Venez voir, toucher, écouter." lead="L'OLED en vrai, le son XBOOM à plein volume, les conseils d'un expert : nos showrooms vous attendent." />
      <section className="container-x">
        <StoresMap />
      </section>
      <section id="rendez-vous" className="container-x mt-32 grid scroll-mt-28 gap-10 lg:grid-cols-[1fr_1.3fr]">
        <SectionHeading eyebrow="Rendez-vous" title="Réservez une démonstration privée." lead="Un conseiller vous reçoit sans attente, à l'heure choisie." className="mb-0" />
        <div className="rounded-[32px] border border-line p-6 sm:p-10">
          <AppointmentForm />
        </div>
      </section>
    </>
  );
}
