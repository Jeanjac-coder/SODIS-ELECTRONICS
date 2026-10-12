import type { Metadata } from "next";
import { Truck, Wrench, ShieldCheck, Building2, Headphones, CalendarCheck, PackageCheck, Recycle } from "lucide-react";
import { PageHeader } from "@/components/ui/misc";
import { Reveal, SectionHeading, TiltCard } from "@/components/ui/reveal";
import { PackConfigurator, ServiceBlock } from "@/components/home/sections";
import { AppointmentForm, CallbackForm } from "@/components/forms/contact-forms";

export const metadata: Metadata = {
  title: "Nos services",
  description: "Livraison partout en Côte d'Ivoire, installation par techniciens, SAV, solutions entreprises, prise de rendez-vous et rappel gratuit : les services SODIS Electronics.",
  alternates: { canonical: "/services" },
};

const services = [
  { icon: Truck, title: "Livraison nationale", text: "Abidjan en 24–48 h, intérieur du pays en 2 à 5 jours. Suivi par SMS / WhatsApp." },
  { icon: Wrench, title: "Installation pro", text: "Fixation murale TV, pose de climatiseurs, raccordement lave-linge et home cinéma." },
  { icon: ShieldCheck, title: "Garantie gérée", text: "Nous gérons la garantie constructeur LG pour vous, de la déclaration à la réparation." },
  { icon: Headphones, title: "SAV réactif", text: "Diagnostic à distance, intervention à domicile, atelier de réparation." },
  { icon: Building2, title: "Solutions entreprises", text: "Hôtels, bureaux, commerces, promoteurs : volumes, facturation pro, planning de pose." },
  { icon: CalendarCheck, title: "Conseil sur rendez-vous", text: "Un expert vous reçoit en showroom pour une démonstration personnalisée." },
  { icon: PackageCheck, title: "Retrait en showroom", text: "Commandez, nous préparons, vous récupérez à l'heure qui vous arrange." },
  { icon: Recycle, title: "Reprise & recyclage", text: "Enlèvement de votre ancien appareil lors de la livraison, sur demande." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader crumbs={[{ href: "/services", label: "Services" }]} eyebrow="Services" title="L'achat, ce n'est que le début." lead="Livraison, installation, garantie, SAV : chez SODIS, on vous accompagne du premier conseil à la dernière vis." />
      <section className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={(i % 4) * 0.05}>
            <TiltCard className="h-full rounded-[28px]">
              <div className="flex h-full flex-col gap-6 rounded-[28px] border border-line bg-elev p-7">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-soft">
                  <s.icon className="h-5 w-5 text-secondary" strokeWidth={1.6} />
                </span>
                <div>
                  <h2 className="text-[18px] font-semibold">{s.title}</h2>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{s.text}</p>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </section>
      <ServiceBlock />
      <PackConfigurator />
      <section id="rendez-vous" className="container-x mt-32 grid scroll-mt-28 gap-10 lg:grid-cols-[1fr_1.3fr]">
        <SectionHeading eyebrow="Prise de rendez-vous" title="Réservez votre moment avec un expert." lead="Démonstration en showroom, visite technique avant installation ou intervention SAV : choisissez votre créneau." className="mb-0" />
        <div className="rounded-[32px] border border-line bg-elev p-6 sm:p-10">
          <AppointmentForm />
        </div>
      </section>
      <section id="rappel" className="container-x mt-24 scroll-mt-28 rounded-[32px] bg-soft p-6 sm:p-10">
        <h2 className="mb-2 font-display text-2xl font-semibold tracking-tight">Pas le temps maintenant ? On vous rappelle.</h2>
        <p className="mb-8 text-muted">Gratuit et sans engagement.</p>
        <CallbackForm />
      </section>
    </>
  );
}
