import type { Metadata } from "next";
import { Mail, Phone, Clock, MapPin } from "lucide-react";
import { PageHeader } from "@/components/ui/misc";
import { ContactForm, CallbackForm } from "@/components/forms/contact-forms";
import { StoresMap } from "@/components/home/stores-map";
import { site, waLink } from "@/config/site";
import { MessengerIcon, WhatsAppIcon, SocialIcon } from "@/components/widgets/icons";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contactez SODIS Electronics : WhatsApp, téléphone ${site.phone}, email, Messenger. Réponse rapide, du lundi au samedi.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const channels = [
    { icon: <WhatsAppIcon className="h-5 w-5" />, label: "WhatsApp", value: site.responseTime, href: waLink("Bonjour SODIS !"), cls: "bg-[#25D366] text-white" },
    { icon: <Phone className="h-5 w-5" />, label: "Téléphone", value: site.phone, href: site.phoneHref, cls: "bg-primary text-white" },
    { icon: <MessengerIcon className="h-5 w-5" />, label: "Messenger", value: "Sodis electronics", href: site.social.messenger, cls: "bg-gradient-to-br from-[#00B2FF] to-[#A033FF] text-white" },
    { icon: <Mail className="h-5 w-5" />, label: "Email", value: site.email, href: `mailto:${site.email}`, cls: "bg-soft text-ink" },
  ];
  return (
    <>
      <PageHeader crumbs={[{ href: "/contact", label: "Contact" }]} eyebrow="Contact" title="Parlons de votre projet." lead="Une question, un devis, un souci technique ? Choisissez le canal qui vous arrange : on répond vite, et on répond bien." />
      <section className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {channels.map((c) => (
          <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="group flex items-center gap-4 rounded-[28px] border border-line p-6 transition hover:shadow-xl">
            <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${c.cls}`}>{c.icon}</span>
            <span className="min-w-0">
              <span className="block text-[15px] font-semibold">{c.label}</span>
              <span className="block truncate text-[13px] text-muted">{c.value}</span>
            </span>
          </a>
        ))}
      </section>
      <section className="container-x mt-16 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-[32px] border border-line p-6 sm:p-10">
          <h2 className="mb-8 font-display text-2xl font-semibold tracking-tight">Écrivez-nous</h2>
          <ContactForm />
        </div>
        <div className="space-y-6">
          <div className="rounded-[32px] bg-soft p-8">
            <h2 className="mb-6 font-display text-xl font-semibold">Infos pratiques</h2>
            <ul className="space-y-4 text-[14px]">
              <li className="flex gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-secondary" /> {site.address.street}, {site.address.city}, Côte d&apos;Ivoire
              </li>
              <li className="flex gap-3">
                <Clock className="h-4 w-4 shrink-0 text-secondary" /> {site.hours}
              </li>
              <li className="flex gap-3">
                <Phone className="h-4 w-4 shrink-0 text-secondary" /> {site.phone}
              </li>
            </ul>
            <div className="mt-6 flex gap-2">
              {(["instagram", "facebook", "linkedin"] as const).map((s) => (
                <a key={s} href={site.social[s]} target="_blank" rel="noopener noreferrer" aria-label={s} className="grid h-10 w-10 place-items-center rounded-full bg-elev">
                  <SocialIcon name={s} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-[32px] border border-line p-8">
            <h2 className="mb-6 font-display text-xl font-semibold">Demande de rappel</h2>
            <CallbackForm compact />
          </div>
        </div>
      </section>
      <section className="container-x mt-24">
        <StoresMap />
      </section>
    </>
  );
}
