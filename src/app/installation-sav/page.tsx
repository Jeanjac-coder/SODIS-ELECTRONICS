import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardCheck, PhoneCall, Search, Wrench, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/ui/misc";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { CallbackForm, ContactForm } from "@/components/forms/contact-forms";
import { site, waLink } from "@/config/site";
import { WhatsAppIcon } from "@/components/widgets/icons";

export const metadata: Metadata = {
  title: "Installation & SAV",
  description: "Installation de TV, climatiseurs, lave-linge et home cinéma par nos techniciens. SAV et garantie constructeur LG gérés par SODIS Electronics.",
  alternates: { canonical: "/installation-sav" },
};

const installs = [
  { title: "Téléviseurs", items: ["Fixation murale (support fixe ou orientable)", "Passage de câbles soigné", "Configuration webOS, chaînes et applis", "Réglages image & son"] },
  { title: "Climatiseurs", items: ["Visite technique si nécessaire", "Pose split mural ou armoire", "Mise en service et tests d'étanchéité", "Conseils d'entretien"] },
  { title: "Lave-linge & froid", items: ["Mise en place et calage", "Raccordement eau / évacuation", "Retrait des cales de transport", "Premier cycle de contrôle"] },
  { title: "Audio & home cinéma", items: ["Placement des enceintes", "Connexion HDMI eARC / optique", "Calibrage du son", "Appairage Bluetooth & Wi-Fi"] },
];

const steps = [
  { icon: PhoneCall, title: "Vous nous contactez", text: "WhatsApp, téléphone ou formulaire, avec votre facture et le numéro de série." },
  { icon: Search, title: "Diagnostic", text: "Un technicien qualifie la panne, à distance si possible." },
  { icon: Wrench, title: "Intervention", text: "À domicile pour les gros appareils, ou en atelier." },
  { icon: ClipboardCheck, title: "Contrôle & suivi", text: "Tests, compte rendu et suivi jusqu'à résolution." },
];

export default function SavPage() {
  return (
    <>
      <PageHeader crumbs={[{ href: "/installation-sav", label: "Installation & SAV" }]} eyebrow="Installation & SAV" title="Bien installé. Bien suivi. Longtemps." lead="Nos techniciens sont formés aux technologies LG. Ils installent proprement, expliquent clairement, et reviennent si besoin.">
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={waLink("Bonjour SODIS, j'ai besoin du SAV pour mon appareil.")} variant="whatsapp" size="lg">
            <WhatsAppIcon className="h-5 w-5" /> Déclarer une panne
          </ButtonLink>
          <ButtonLink href="/services#rendez-vous" variant="outline" size="lg">
            Planifier une installation
          </ButtonLink>
        </div>
      </PageHeader>

      <section className="container-x">
        <SectionHeading eyebrow="Installation" title="Ce que comprend notre installation." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {installs.map((x, i) => (
            <Reveal key={x.title} delay={i * 0.05}>
              <div className="h-full rounded-[28px] bg-soft p-7">
                <h3 className="text-[18px] font-semibold">{x.title}</h3>
                <ul className="mt-5 space-y-3">
                  {x.items.map((it) => (
                    <li key={it} className="flex gap-2.5 text-[14px] text-ink-soft">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x mt-32">
        <SectionHeading eyebrow="Service après-vente" title="Une panne ? On s'en occupe, en 4 étapes." />
        <ol className="grid gap-4 md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.06} className="relative rounded-[28px] border border-line p-7">
              <span className="font-display text-5xl font-semibold text-line">0{i + 1}</span>
              <s.icon className="mt-6 h-6 w-6 text-secondary" strokeWidth={1.6} />
              <h3 className="mt-4 text-[17px] font-semibold">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-x mt-32 grid gap-6 lg:grid-cols-3">
        <div className="rounded-[32px] bg-primary p-8 text-white lg:col-span-1">
          <p className="eyebrow mb-3">Garantie</p>
          <h2 className="font-display text-2xl font-semibold tracking-tight">Garantie constructeur LG sur tout le catalogue.</h2>
          <p className="mt-4 text-[15px] leading-relaxed opacity-70">Conservez votre facture : elle fait foi. La durée et les conditions de garantie dépendent de la catégorie de produit et sont indiquées sur votre facture.</p>
          <Link href="/conditions-generales#garanties" className="mt-6 inline-block text-[14px] underline underline-offset-4">
            Conditions de garantie
          </Link>
          <p className="mt-10 text-[13px] opacity-60">SAV : {site.emailSav}</p>
        </div>
        <div className="rounded-[32px] border border-line p-6 sm:p-10 lg:col-span-2">
          <h2 className="mb-6 font-display text-2xl font-semibold tracking-tight">Écrire au SAV</h2>
          <ContactForm />
        </div>
      </section>
      <section className="container-x mt-6 rounded-[32px] bg-soft p-6 sm:p-10">
        <h2 className="mb-6 font-display text-2xl font-semibold tracking-tight">Demande de rappel SAV</h2>
        <CallbackForm />
      </section>
    </>
  );
}
