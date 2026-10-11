"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, BadgeCheck, CreditCard, Headphones, Play, ShieldCheck, Star, Truck, Wrench, Zap, Clock, Check, Plus } from "lucide-react";
import { categories } from "@/data/categories";
import { byCategory, byTag, getProduct, products, type Product } from "@/data/products";
import { googleRating, testimonials, videos } from "@/data/content";
import { site, waLink } from "@/config/site";
import { addToQuote, toast } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Counter, Reveal, SectionHeading, TiltCard } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { CategoryIcon } from "@/components/ui/misc";
import { PaymentLogos } from "@/components/ui/payments";
import { ProductRail } from "@/components/product/product-extras";
import { ProductCard } from "@/components/product/product-card";
import { MessengerIcon, WhatsAppIcon } from "@/components/widgets/icons";

/* ───────────── Bandeau de réassurance ───────────── */
const reassurance = [
  { icon: ShieldCheck, label: "Garantie constructeur LG" },
  { icon: Truck, label: "Livraison rapide partout en Côte d'Ivoire" },
  { icon: CreditCard, label: "Paiement sécurisé · Mobile Money & carte" },
  { icon: Wrench, label: "Installation par nos techniciens" },
  { icon: Headphones, label: "SAV disponible, vraiment" },
  { icon: BadgeCheck, label: "Distributeur officiel LG" },
];
export function Reassurance() {
  const row = [...reassurance, ...reassurance];
  return (
    <section aria-label="Nos engagements" className="border-y border-line bg-soft/50 py-5">
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <ul className="flex w-max animate-marquee gap-12 hover:[animation-play-state:paused]">
          {row.map((r, i) => (
            <li key={i} className="flex shrink-0 items-center gap-3 text-[14px] font-medium text-ink-soft" aria-hidden={i >= reassurance.length}>
              <r.icon className="h-5 w-5 text-red" strokeWidth={1.6} /> {r.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────── Catégories (bento) ───────────── */
export function CategoryBento() {
  return (
    <section className="container-x mt-32" aria-labelledby="cat-title">
      <SectionHeading eyebrow="Univers" title={<span id="cat-title">Tout pour équiper votre quotidien.</span>} lead="Six univers, une seule exigence : le meilleur de LG, sélectionné et accompagné par SODIS." />
      <div className="grid auto-rows-[260px] gap-4 md:grid-cols-4 md:auto-rows-[300px]">
        {categories.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.06} className={cn(i === 0 && "md:col-span-2 md:row-span-2", (i === 1 || i === 2 || i === 5) && "md:col-span-2")}>
            <Link href={`/categories/${c.slug}`} className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[32px] bg-soft p-7 transition duration-500 hover:shadow-[0_40px_80px_-40px_rgb(0_0_0/0.35)]">
              <div className="relative z-10">
                <span className="mb-4 inline-grid h-11 w-11 place-items-center rounded-2xl bg-elev">
                  <CategoryIcon icon={c.icon} className="h-5 w-5" />
                </span>
                <h3 className={cn("font-display font-semibold tracking-tight", i === 0 ? "text-4xl" : "text-2xl")}>{c.name}</h3>
                <p className="mt-2 max-w-xs text-[14px] text-muted">{byCategory(c.slug).length} références</p>
              </div>
              <Image
                src={c.hero}
                alt=""
                width={600}
                height={600}
                sizes="(max-width: 768px) 70vw, 30vw"
                className={cn(
                  "pointer-events-none absolute bottom-0 right-0 h-auto object-contain transition duration-[1200ms] ease-[var(--ease-premium)] group-hover:-translate-y-2 group-hover:scale-105",
                  i === 0 ? "w-[78%] translate-x-[6%]" : "max-h-[62%] w-[56%]",
                )}
              />
              <span className="relative z-10 inline-flex w-fit items-center gap-1.5 rounded-full bg-elev px-4 py-2 text-[13px] font-medium transition group-hover:bg-ink group-hover:text-bg">
                Découvrir <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───────────── Produits tendance / meilleures ventes / nouveautés ───────────── */
const tabs = [
  { id: "tendance", label: "Tendances" },
  { id: "best-seller", label: "Meilleures ventes" },
  { id: "nouveau", label: "Nouveautés" },
] as const;
export function ProductTabs() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("tendance");
  const items = useMemo(() => byTag(tab), [tab]);
  return (
    <section className="container-x mt-32" aria-labelledby="tabs-title">
      <SectionHeading eyebrow="Sélection" title={<span id="tabs-title">Ce que nos clients s&apos;arrachent.</span>}>
        <div role="tablist" aria-label="Sélections" className="mt-4 inline-flex w-fit rounded-full bg-soft p-1">
          {tabs.map((t) => (
            <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)} className="relative rounded-full px-5 py-2.5 text-[14px] font-medium">
              {tab === t.id && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-elev shadow-sm" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <span className={cn("relative", tab === t.id ? "text-ink" : "text-muted")}>{t.label}</span>
            </button>
          ))}
        </div>
      </SectionHeading>
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
          <ProductRail items={items} label={tabs.find((t) => t.id === tab)!.label} />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

/* ───────────── Promotions flash avec compte à rebours ───────────── */
function useCountdown(target: number) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const d = Math.max(0, target - (now ?? target));
  return { d: Math.floor(d / 864e5), h: Math.floor(d / 36e5) % 24, m: Math.floor(d / 6e4) % 60, s: Math.floor(d / 1e3) % 60, ready: now !== null };
}
/** Fin de l'offre flash : dimanche 23:59 de la semaine en cours (glissant). */
function endOfWeek() {
  const n = new Date();
  const e = new Date(n);
  e.setDate(n.getDate() + ((7 - n.getDay()) % 7));
  e.setHours(23, 59, 59, 0);
  return e.getTime();
}
export const flashOffers = [
  { slug: "s4-q12jaqal", label: "Installation offerte", note: "Pose standard incluse" },
  { slug: "55ua73006la", label: "Fixation murale offerte", note: "Support + pose" },
  { slug: "s60tr", label: "Prix pack TV + barre", note: "Sur devis" },
  { slug: "xl7t", label: "Livraison offerte Abidjan", note: "Sous 48 h" },
];
/** Promotions de la semaine (page d'accueil) — à mettre à jour chaque semaine */
export const weeklyPromos = [
  ...flashOffers,
  { slug: "oled65c56la", label: "Installation offerte", note: "Fixation + réglages" },
  { slug: "s65tr", label: "Livraison offerte", note: "Partout à Abidjan" },
  { slug: "gr-f882hlhm", label: "Livraison offerte", note: "Mise en service incluse" },
  { slug: "f4v5rgp2t", label: "Installation offerte", note: "Raccordement inclus" },
];

/** Version compacte intégrée au Hero : bandeau défilant des promotions de la semaine */
export function HeroPromos() {
  const [end, setEnd] = useState(0);
  useEffect(() => setEnd(endOfWeek()), []);
  const t = useCountdown(end);
  return (
    <div aria-labelledby="hero-promos-title">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-1">
        <h2 id="hero-promos-title" className="flex items-center gap-2 font-display text-[18px] font-semibold tracking-tight sm:text-[20px]">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-red text-white">
            <Zap className="h-3.5 w-3.5" />
          </span>
          Les promotions de la semaine
        </h2>
        <div className="flex items-center gap-3">
          <p className="flex items-center gap-1 text-[12px] text-muted" role="timer" aria-label="Temps restant">
            <span className="hidden sm:inline">Fin dans</span>
            {(["d", "h", "m", "s"] as const).map((k) => (
              <span key={k} className="rounded-lg bg-ink px-1.5 py-1 font-mono text-[12px] font-semibold tabular-nums text-bg">
                {t.ready ? String(t[k]).padStart(2, "0") : "--"}
                {k === "d" ? "j" : k}
              </span>
            ))}
          </p>
          <Link href="/promotions" className="hidden items-center gap-1 text-[13px] font-medium text-ink hover:text-red sm:inline-flex">
            Tout voir <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
      <ul className="no-scrollbar -mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-1 [mask-image:linear-gradient(90deg,#000_92%,transparent)]">
        {weeklyPromos.map((o) => {
          const p = getProduct(o.slug);
          if (!p) return null;
          return (
            <li key={o.slug} className="w-[250px] shrink-0 snap-start sm:w-[270px]">
              <Link href={`/produits/${p.slug}`} className="group flex h-full items-center gap-3 rounded-2xl border border-line/80 bg-elev/80 p-2.5 pr-4 transition hover:border-ink hover:shadow-lg">
                <span className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl bg-soft">
                  <Image src={p.image} alt="" width={64} height={64} className="h-12 w-12 object-contain transition duration-700 group-hover:scale-110" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[11px] font-semibold uppercase tracking-wider text-red">{o.label}</span>
                  <span className="mt-0.5 block truncate text-[13px] font-medium text-ink">{p.name}</span>
                  <span className="block truncate text-[11px] text-muted">{o.note}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function WeeklyPromos() {
  const [end, setEnd] = useState(0);
  useEffect(() => setEnd(endOfWeek()), []);
  const t = useCountdown(end);
  return (
    <section id="promotions-semaine" className="container-x mt-24 scroll-mt-28" aria-labelledby="weekly-title">
      <div className="mb-12 flex flex-col gap-8 md:mb-14 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-red px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
              <Zap className="h-3.5 w-3.5" /> Cette semaine
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="weekly-title" className="h-section text-balance">
              Les promotions de la semaine
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead mt-4 max-w-xl">Installation, fixation murale ou livraison offertes sur une sélection LG. Dans la limite des stocks disponibles — faut pas dormir dessus !</p>
          </Reveal>
        </div>
        <div className="flex flex-col gap-3 lg:items-end">
          <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-muted">Fin des offres dans</p>
          <div className="flex gap-2" aria-label="Temps restant" role="timer">
            {(["d", "h", "m", "s"] as const).map((k) => (
              <div key={k} className="w-[68px] rounded-2xl bg-ink py-2.5 text-center text-bg">
                <span className="block font-display text-2xl font-semibold tabular-nums">{t.ready ? String(t[k]).padStart(2, "0") : "--"}</span>
                <span className="text-[10px] uppercase tracking-wider opacity-60">{{ d: "jours", h: "heures", m: "min", s: "sec" }[k]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4">
        {weeklyPromos.map((o, i) => {
          const p = getProduct(o.slug);
          if (!p) return null;
          return (
            <div key={o.slug} className="flex w-[78vw] shrink-0 snap-start flex-col gap-2 sm:w-auto">
              <p className="flex items-center justify-between gap-2 rounded-full bg-red/10 px-4 py-2 text-[12px] font-semibold text-red">
                <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap">
                  <Zap className="h-3.5 w-3.5" /> {o.label}
                </span>
                <span className="min-w-0 truncate font-normal text-ink-soft">{o.note}</span>
              </p>
              <ProductCard product={p} index={i} />
            </div>
          );
        })}
      </div>
      <div className="mt-10 flex justify-center">
        <ButtonLink href="/promotions" variant="outline" size="lg">
          Voir toutes les promotions <ArrowUpRight className="h-4 w-4" />
        </ButtonLink>
      </div>
    </section>
  );
}
export function FlashDeals({ compact }: { compact?: boolean }) {
  const [end, setEnd] = useState(0);
  useEffect(() => setEnd(endOfWeek()), []);
  const t = useCountdown(end);
  return (
    <section className={cn("container-x", !compact && "mt-32")} aria-labelledby="flash-title">
      <div className="relative overflow-hidden rounded-[40px] bg-ink p-8 text-bg sm:p-12 lg:p-16">
        <div aria-hidden className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-red/40 blur-[120px]" />
        <div className="relative grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-red px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
              <Zap className="h-3.5 w-3.5" /> Offres flash
            </p>
            <h2 id="flash-title" className="h-section text-balance">
              Cette semaine seulement. Après, c&apos;est fini.
            </h2>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed opacity-70">Services offerts sur une sélection LG, dans la limite des stocks disponibles. Demandez votre devis avant la fin du compte à rebours.</p>
            <div className="mt-8 flex gap-3" aria-label="Temps restant" role="timer">
              {(["d", "h", "m", "s"] as const).map((k) => (
                <div key={k} className="w-[72px] rounded-2xl bg-white/10 py-3 text-center backdrop-blur">
                  <span className="block font-display text-3xl font-semibold tabular-nums">{t.ready ? String(t[k]).padStart(2, "0") : "--"}</span>
                  <span className="text-[11px] uppercase tracking-wider opacity-60">{{ d: "jours", h: "heures", m: "min", s: "sec" }[k]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {flashOffers.map((o, i) => {
              const p = getProduct(o.slug)!;
              return (
                <Reveal key={o.slug} delay={i * 0.07}>
                  <Link href={`/produits/${p.slug}`} className="group flex items-center gap-4 rounded-3xl bg-white/[0.06] p-4 ring-1 ring-white/10 transition hover:bg-white/[0.12]">
                    <span className="relative grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-white">
                      <Image src={p.image} alt={p.name} width={80} height={80} className="h-16 w-16 object-contain transition duration-700 group-hover:scale-110" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[12px] font-semibold uppercase tracking-wider text-red">{o.label}</span>
                      <span className="mt-1 block truncate text-[14px] font-medium">{p.name}</span>
                      <span className="block text-[12px] opacity-60">{o.note}</span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Configurateur de packs ───────────── */
const installFee = { label: "Installation & fixation murale par un technicien SODIS", slug: "__install" };
export function PackConfigurator() {
  const tvs = products.filter((p) => p.category === "televiseurs" && p.available && ["OLED", "QNED"].includes(p.family)).slice(0, 6);
  const bars = products.filter((p) => p.family === "Barre de son" && p.available);
  const [tv, setTv] = useState(tvs[0].slug);
  const [bar, setBar] = useState(bars[0].slug);
  const [install, setInstall] = useState(true);
  const T = getProduct(tv)!;
  const B = getProduct(bar)!;
  return (
    <section id="configurateur" className="container-x mt-32 scroll-mt-28" aria-labelledby="pack-title">
      <SectionHeading eyebrow="Configurateur" title={<span id="pack-title">Composez votre pack cinéma.</span>} lead="Une TV, une barre de son, une installation propre. Choisissez, on s'occupe du reste — et le prix pack est toujours plus doux." />
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="relative grid min-h-[420px] place-items-center overflow-hidden rounded-[40px] bg-soft p-10">
          <AnimatePresence mode="popLayout">
            <motion.div key={tv} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.6 }} className="relative w-[78%]">
              <Image src={T.image} alt={T.name} width={600} height={460} className="h-auto w-full object-contain drop-shadow-2xl" />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="popLayout">
            <motion.div key={bar} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.6, delay: 0.1 }} className="w-[70%]">
              <Image src={B.image} alt={B.name} width={600} height={260} className="h-auto w-full object-contain" />
            </motion.div>
          </AnimatePresence>
          {install && (
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass absolute bottom-6 left-6 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[13px] font-medium">
              <Wrench className="h-4 w-4 text-red" /> Installation incluse
            </motion.span>
          )}
        </div>
        <div className="space-y-8">
          <fieldset>
            <legend className="mb-3 text-[13px] font-semibold">1. Votre téléviseur</legend>
            <div className="grid grid-cols-2 gap-2">
              {tvs.map((p) => (
                <button key={p.slug} onClick={() => setTv(p.slug)} aria-pressed={tv === p.slug} className={cn("rounded-2xl border p-3 text-left text-[13px] transition", tv === p.slug ? "border-ink bg-ink text-bg" : "border-line hover:border-ink/40")}>
                  <span className="block truncate font-medium">{p.name.replace(/^LG /, "")}</span>
                  <span className={cn("block truncate text-[11px]", tv === p.slug ? "opacity-70" : "text-muted")}>{p.model}</span>
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-3 text-[13px] font-semibold">2. Votre barre de son</legend>
            <div className="grid grid-cols-3 gap-2">
              {bars.map((p) => (
                <button key={p.slug} onClick={() => setBar(p.slug)} aria-pressed={bar === p.slug} className={cn("rounded-2xl border p-3 text-left text-[13px] transition", bar === p.slug ? "border-ink bg-ink text-bg" : "border-line hover:border-ink/40")}>
                  <span className="block font-medium">{p.model}</span>
                  <span className={cn("block text-[11px]", bar === p.slug ? "opacity-70" : "text-muted")}>{p.specs[0]}</span>
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-3 text-[13px] font-semibold">3. Installation</legend>
            <button onClick={() => setInstall((x) => !x)} aria-pressed={install} className={cn("flex w-full items-center gap-3 rounded-2xl border p-4 text-left text-[14px] transition", install ? "border-ink" : "border-line")}>
              <span className={cn("grid h-6 w-6 place-items-center rounded-full border", install ? "border-red bg-red text-white" : "border-line")}>{install && <Check className="h-3.5 w-3.5" />}</span>
              {installFee.label}
            </button>
          </fieldset>
          <button
            onClick={() => {
              addToQuote(tv);
              addToQuote(bar);
              toast({ title: "Pack ajouté au devis", body: `${T.model} + ${B.model}${install ? " + installation" : ""}`, tone: "success" });
            }}
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-ink text-[15px] font-medium text-bg transition hover:bg-red hover:text-white"
          >
            <Plus className="h-4 w-4" /> Ajouter le pack à mon devis
          </button>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Chiffres clés ───────────── */
export function Stats() {
  return (
    <section className="container-x mt-32" aria-label="Chiffres clés">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[32px] border border-line bg-line lg:grid-cols-4">
        {site.stats.map((s) => (
          <div key={s.label} className="bg-bg p-8 sm:p-10">
            <Counter to={s.value} suffix={s.suffix} className="block whitespace-nowrap font-display text-[clamp(1.9rem,4vw,3.5rem)] font-semibold tracking-tight" />
            <p className="mt-2 text-[14px] text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────── Service client premium ───────────── */
export function ServiceBlock() {
  const channels = [
    { icon: <WhatsAppIcon className="h-6 w-6" />, title: "WhatsApp", value: site.responseTime, href: waLink("Bonjour SODIS !"), color: "bg-[#25D366] text-white" },
    { icon: <Headphones className="h-6 w-6" />, title: "Téléphone", value: site.phone, href: site.phoneHref, color: "bg-ink text-bg" },
    { icon: <MessengerIcon className="h-6 w-6" />, title: "Messenger", value: "Réponse < 1 h", href: site.social.messenger, color: "bg-gradient-to-br from-[#00B2FF] to-[#A033FF] text-white" },
    { icon: <Clock className="h-6 w-6" />, title: "Email", value: site.email, href: `mailto:${site.email}`, color: "bg-soft text-ink" },
  ];
  const pillars = [
    { icon: Wrench, title: "Installation", text: "TV murale, clim, lave-linge : posé, testé, expliqué." },
    { icon: ShieldCheck, title: "Garantie", text: "Garantie constructeur LG, gérée par nous, pour vous." },
    { icon: Headphones, title: "Support SAV", text: "Diagnostic rapide, intervention à domicile." },
    { icon: BadgeCheck, title: "FAQ", text: "Les réponses à 90 % de vos questions.", href: "/faq" },
  ];
  return (
    <section className="container-x mt-32" aria-labelledby="svc-title">
      <SectionHeading eyebrow="Service client" title={<span id="svc-title">Un vrai humain, au bout du fil.</span>} lead="Avant, pendant et après l'achat, on reste joignable. C'est ça, la différence SODIS." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {channels.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.06}>
            <TiltCard className="h-full rounded-[28px]">
              <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex h-full flex-col gap-6 rounded-[28px] border border-line bg-elev p-7 transition hover:shadow-xl">
                <span className={cn("grid h-14 w-14 place-items-center rounded-2xl", c.color)}>{c.icon}</span>
                <span>
                  <span className="block text-[18px] font-semibold">{c.title}</span>
                  <span className="mt-1 block break-all text-[14px] text-muted">{c.value}</span>
                </span>
              </a>
            </TiltCard>
          </Reveal>
        ))}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <Link href={p.href ?? "/installation-sav"} className="group flex h-full items-start gap-4 rounded-[28px] bg-soft p-6 transition hover:bg-ink hover:text-bg">
              <p.icon className="mt-0.5 h-5 w-5 shrink-0 text-red" strokeWidth={1.6} />
              <span>
                <span className="block font-semibold">{p.title}</span>
                <span className="mt-1 block text-[13px] text-muted transition group-hover:text-bg/70">{p.text}</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───────────── Avis & témoignages ───────────── */
function Stars({ n, className }: { n: number; className?: string }) {
  return (
    <span className={cn("flex gap-0.5", className)} aria-label={`${n} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("h-4 w-4", i < Math.round(n) ? "fill-amber-400 text-amber-400" : "text-line")} />
      ))}
    </span>
  );
}
export function Testimonials() {
  return (
    <section className="mt-32 overflow-hidden" aria-labelledby="rev-title">
      <div className="container-x">
        <SectionHeading eyebrow="Avis clients" title={<span id="rev-title">Ils nous ont fait confiance.</span>}>
          <div className="mt-2 flex items-center gap-4 rounded-full border border-line px-5 py-3 w-fit">
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8" />
              <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24" />
              <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8z" />
              <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.8 3.6-4.9 6.7-4.9" />
            </svg>
            <span className="text-[24px] font-semibold">{googleRating.score.toFixed(1)}</span>
            <span>
              <Stars n={googleRating.score} />
              <span className="block text-[12px] text-muted">{googleRating.count} avis Google</span>
            </span>
          </div>
        </SectionHeading>
      </div>
      <div className="relative [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <ul className="flex w-max animate-marquee gap-5 py-2 [animation-duration:70s] hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials].map((t, i) => (
            <li key={i} aria-hidden={i >= testimonials.length} className="w-[340px] shrink-0 rounded-[28px] border border-line bg-elev p-7 sm:w-[400px]">
              <Stars n={t.rating} />
              <p className="mt-4 text-[15px] leading-relaxed text-ink">« {t.text} »</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-[13px] font-semibold text-bg">{t.name[0]}</span>
                <span>
                  <span className="block text-[14px] font-medium">{t.name}</span>
                  <span className="block text-[12px] text-muted">
                    {t.city} · {t.product}
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────── Marques, certifications, paiements ───────────── */
export function TrustBlock() {
  const certs = [
    { title: "Distributeur officiel LG", text: "Circuit de distribution agréé" },
    { title: "Garantie constructeur", text: "Sur 100 % du catalogue" },
    { title: "Techniciens formés", text: "Aux technologies LG" },
    { title: "Facture officielle", text: "Particuliers & entreprises" },
  ];
  return (
    <section className="container-x mt-32" aria-labelledby="trust-title">
      <div className="grid gap-12 rounded-[40px] border border-line p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
        <div>
          <p className="eyebrow mb-4">Confiance</p>
          <h2 id="trust-title" className="h-section text-balance">
            Matériel garanti. Paiement sécurisé. Zéro stress.
          </h2>
          <div className="mt-10 flex items-center gap-6">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-[#A50034] font-display text-2xl font-bold text-white" aria-label="LG">
              LG
            </span>
            <p className="max-w-xs text-[14px] leading-relaxed text-muted">SODIS Electronics est distributeur officiel LG Electronics en Côte d&apos;Ivoire.</p>
          </div>
          <div className="mt-10">
            <p className="mb-4 text-[13px] font-semibold">Moyens de paiement acceptés</p>
            <PaymentLogos />
          </div>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {certs.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 0.06} className="flex flex-col justify-between rounded-3xl bg-soft p-6">
              <BadgeCheck className="h-7 w-7 text-red" strokeWidth={1.5} />
              <span className="mt-10">
                <span className="block text-[16px] font-semibold">{c.title}</span>
                <span className="block text-[13px] text-muted">{c.text}</span>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────── Galerie vidéo ───────────── */
export function VideoGallery() {
  const [playing, setPlaying] = useState<string | null>(null);
  return (
    <section className="container-x mt-32" aria-labelledby="vid-title">
      <SectionHeading eyebrow="En vidéo" title={<span id="vid-title">Voyez-les en action.</span>} lead="Démonstrations produits officielles LG." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {videos.map((v, i) => (
          <Reveal key={v.title} delay={i * 0.06}>
            {playing === v.title && v.youtubeId ? (
              <div className="aspect-[4/5] overflow-hidden rounded-[28px] bg-black">
                <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?autoplay=1`} title={v.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen loading="lazy" />
              </div>
            ) : (
              <a
                href={v.youtubeId ? undefined : `https://www.youtube.com/results?search_query=${encodeURIComponent(v.query)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (v.youtubeId) {
                    e.preventDefault();
                    setPlaying(v.title);
                  }
                }}
                className="group relative flex aspect-[4/5] cursor-pointer flex-col justify-end overflow-hidden rounded-[28px] bg-gradient-to-b from-soft to-line/60 p-6"
              >
                <Image src={v.image} alt="" fill sizes="(max-width: 640px) 90vw, 25vw" className="object-contain p-10 pb-24 transition duration-[1200ms] group-hover:scale-105" />
                <span className="absolute left-1/2 top-[38%] grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-xl backdrop-blur transition group-hover:scale-110 group-hover:bg-red group-hover:text-white">
                  <Play className="ml-0.5 h-6 w-6 fill-current" />
                </span>
                <span className="relative text-[15px] font-semibold">{v.title}</span>
              </a>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───────────── Grand CTA ───────────── */
export function BigCta() {
  return (
    <section className="container-x mt-32">
      <Reveal scale={0.97}>
        <div className="relative overflow-hidden rounded-[40px] bg-soft px-8 py-20 text-center sm:px-16 sm:py-28">
          <div aria-hidden className="absolute left-1/2 top-0 h-72 w-[60%] -translate-x-1/2 rounded-full bg-red/15 blur-[100px]" />
          <p className="eyebrow relative mb-5">Projet particulier ou professionnel</p>
          <h2 className="h-display relative mx-auto max-w-4xl text-balance">On vous prépare une offre sur mesure.</h2>
          <p className="lead relative mx-auto mt-6 max-w-xl">Maison, bureau, hôtel, chantier : dites-nous ce qu&apos;il vous faut, on revient vers vous avec le meilleur prix, sous 24 h.</p>
          <div className="relative mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/devis" size="lg" magnetic>
              Demander un devis gratuit
            </ButtonLink>
            <ButtonLink href={waLink("Bonjour SODIS, je souhaite un devis.")} variant="whatsapp" size="lg" magnetic>
              <WhatsAppIcon className="h-5 w-5" /> Devis WhatsApp
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export type { Product };
