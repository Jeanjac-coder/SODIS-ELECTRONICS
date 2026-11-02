import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Headphones, Phone, ShieldCheck, Truck, Wallet, Wrench } from "lucide-react";
import { categories } from "@/data/categories";
import { byCategory } from "@/data/products";
import { stores } from "@/data/stores";
import { site, waLink } from "@/config/site";
import { Counter, Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/widgets/icons";

/** En-tête de section sobre : titre à gauche, lien à droite */
export function HomeHeading({ eyebrow, title, href, linkLabel, id }: { eyebrow: string; title: string; href?: string; linkLabel?: string; id: string }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6 md:mb-10">
      <div>
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 id={id} className="h-section text-balance">
          {title}
        </h2>
      </div>
      {href && (
        <Link href={href} className="group hidden shrink-0 items-center gap-1.5 text-[14px] font-medium text-ink hover:text-secondary sm:inline-flex">
          {linkLabel} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

/* ───────────── Catégories : grille simple et homogène ───────────── */
export function CategoryGrid() {
  return (
    <section className="container-x mt-24" aria-labelledby="cat-title">
      <HomeHeading eyebrow="Univers" title="Explorer par catégorie" id="cat-title" href="/categories" linkLabel="Toutes les catégories" />
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {categories.map((c, i) => (
          <Reveal as="li" key={c.slug} delay={i * 0.04}>
            <Link href={`/categories/${c.slug}`} className="group relative flex h-44 overflow-hidden rounded-2xl bg-soft p-5 transition hover:bg-line/60 sm:h-56 sm:p-7">
              <div className="relative z-10 flex flex-col justify-between">
                <div>
                  <h3 className="text-[17px] font-semibold tracking-tight sm:text-[22px]">{c.name}</h3>
                  <p className="mt-1 text-[13px] text-muted">{byCategory(c.slug).length} produits</p>
                </div>
                <span className="inline-flex items-center gap-1 text-[13px] font-medium text-secondary">
                  Voir <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </div>
              <Image
                src={c.hero}
                alt=""
                width={400}
                height={400}
                sizes="(max-width: 1024px) 40vw, 260px"
                className="pointer-events-none absolute bottom-3 right-3 h-[62%] w-auto max-w-[55%] object-contain transition duration-700 group-hover:scale-105 sm:bottom-5 sm:right-5"
              />
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* ───────────── Pourquoi SODIS : chiffres + engagements ───────────── */
const promises = [
  { icon: BadgeCheck, title: "Distributeur officiel LG", text: "Produits neufs et authentiques." },
  { icon: ShieldCheck, title: "Garantie constructeur", text: "Gérée par nous, pour vous." },
  { icon: Truck, title: "Livraison partout en CI", text: "Abidjan en 24 – 48 h." },
  { icon: Wrench, title: "Installation pro", text: "Par nos techniciens formés." },
  { icon: Wallet, title: "Paiement à la livraison", text: "Vous payez à réception." },
  { icon: Headphones, title: "SAV disponible", text: "À domicile ou en atelier." },
];

export function WhySodis() {
  const stats = site.stats.map((s) => ({ ...s, value: s.label === "Points de vente" ? stores.length : s.value }));
  return (
    <section className="mt-24 bg-soft py-20 md:py-24" aria-labelledby="why-title">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-3">Pourquoi SODIS</p>
            <h2 id="why-title" className="h-section text-balance">
              On ne vend pas seulement des appareils. On équipe votre quotidien.
            </h2>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} step={s.step} className="block whitespace-nowrap font-display text-[clamp(1.6rem,3vw,2.5rem)] font-semibold tracking-tight text-primary dark:text-ink" />
                    <span className="mt-1 block text-[13px] text-muted">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {promises.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.04} className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-elev text-secondary">
                  <p.icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <span>
                  <span className="block text-[15px] font-semibold">{p.title}</span>
                  <span className="mt-0.5 block text-[14px] text-muted">{p.text}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Contact & devis : un seul bloc clair ───────────── */
export function ContactCta() {
  return (
    <section className="container-x mt-24" aria-labelledby="cta-title">
      <div className="grid overflow-hidden rounded-3xl bg-primary text-white lg:grid-cols-[1.3fr_1fr]">
        <div className="min-w-0 p-7 sm:p-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Service client</p>
          <h2 id="cta-title" className="mt-3 font-display text-[clamp(1.75rem,3vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-balance">
            Un projet, une question ? On vous répond vite.
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/70">Particulier ou entreprise, recevez une offre sur mesure sous 24 h, livraison et installation comprises si vous le souhaitez.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/devis" variant="accent" size="lg">
              Demander un devis
            </ButtonLink>
            <ButtonLink href={waLink("Bonjour SODIS, j'ai une question.")} variant="whatsapp" size="lg">
              <WhatsAppIcon className="h-5 w-5" /> WhatsApp
            </ButtonLink>
          </div>
        </div>
        <ul className="grid min-w-0 content-center divide-y divide-white/10 border-t border-white/10 lg:border-l lg:border-t-0">
          {[
            { icon: <WhatsAppIcon className="h-5 w-5" />, label: "WhatsApp", value: site.responseTime, href: waLink() },
            { icon: <Phone className="h-5 w-5" />, label: "Téléphone", value: site.phone, href: site.phoneHref },
            { icon: <Headphones className="h-5 w-5" />, label: "Horaires", value: site.hours, href: "/magasins" },
          ].map((c) => (
            <li key={c.label}>
              <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-center gap-4 px-7 py-5 transition hover:bg-white/5 sm:px-12 sm:py-6">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10">{c.icon}</span>
                <span className="min-w-0">
                  <span className="block text-[12px] uppercase tracking-wider text-white/60">{c.label}</span>
                  <span className="block text-[15px] font-medium">{c.value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
