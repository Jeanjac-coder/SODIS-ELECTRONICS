"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { CategoryIcon } from "@/components/ui/misc";
import { InlineSearch } from "@/components/widgets/search";
import { HeroPromos } from "@/components/home/sections";
import { categories } from "@/data/categories";
import { waLink } from "@/config/site";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

type Slide = {
  image: string;
  alt: string;
  label: string;
  href: string;
  cta: string;
  external?: boolean;
  /** Texte superposé (uniquement pour les visuels sans texte intégré) */
  overlay?: { eyebrow: string; title: string[]; text: string };
  position?: string;
};

const slides: Slide[] = [
  {
    image: "/images/hero/lg-lave-vaisselle.webp",
    alt: "Un couple souriant dans sa cuisine devant un lave-vaisselle LG ouvert. « Avec le lave-vaisselle LG, vous êtes sûr c'est propre ». LG Life's Good.",
    label: "LG Lave-vaisselle",
    href: waLink("Bonjour SODIS, je suis intéressé(e) par le lave-vaisselle LG. Pouvez-vous me donner le prix et la disponibilité ?"),
    cta: "Commander",
    external: true,
  },
  {
    image: "/images/hero/lg-dualcool.webp",
    alt: "« Rendez chaque instant inoubliable avec LG DUALCOOL » : climatiseur LG DUALCOOL, ThinQ, 70 % d'économie d'énergie, compresseur garanti 10 ans, Mosquito Away.",
    label: "LG DUALCOOL · Climatisation",
    href: "/categories/climatisation",
    cta: "Acheter",
  },
  {
    image: "/images/hero/lg-refrigerateur-instaview.webp",
    alt: "Une famille de supporters fait la fête devant un réfrigérateur LG InstaView. « Obtenez plus d'attention ». LG Life's Good.",
    label: "LG Réfrigérateurs",
    href: "/categories/refrigeration",
    cta: "Acheter",
  },
  {
    image: "/images/hero/lg-tv-ai.webp",
    alt: "Téléviseur LG avec processeur IA α11 : AI Picture, AI Sound, AI Customization, AI Experience et télécommande AI Magic Remote.",
    label: "LG TV · Intelligence artificielle",
    href: "/categories/televiseurs",
    cta: "Acheter",
    overlay: {
      eyebrow: "LG TV · Processeur IA",
      title: ["L'IA au service", "de votre écran."],
      text: "Image, son et contenus optimisés en temps réel. Découvrez les TV LG OLED et QNED, garanties et installées chez vous.",
    },
  },
];

const DURATION = 6500;

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const s = slides[i];
  const go = (d: number) => setI((x) => (x + d + slides.length) % slides.length);

  // Défilement automatique
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setI((x) => (x + 1) % slides.length), DURATION);
    return () => clearTimeout(id);
  }, [i, paused]);

  // Transition de slide (GSAP) : fondu + zoom lent (effet Ken Burns)
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(`.h-slide-${i}`, { opacity: 0 }, { opacity: 1, duration: 1.1 })
        .set(`.h-slide:not(.h-slide-${i})`, { opacity: 0 })
        .fromTo(`.h-slide-${i} .h-img`, { scale: 1.08 }, { scale: 1, duration: DURATION / 1000 + 1.2, ease: "power1.out" }, 0)
        .fromTo(".h-ov > *", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 }, 0.25)
        .fromTo(".h-cta > *", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.06 }, 0.35);
    },
    { scope: root, dependencies: [i] },
  );

  // Parallax souris + scroll
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const qx = gsap.quickTo(".h-parallax", "x", { duration: 1.2, ease: "power3" });
      const qy = gsap.quickTo(".h-parallax", "y", { duration: 1.2, ease: "power3" });
      const onMove = (e: PointerEvent) => {
        qx((e.clientX / window.innerWidth - 0.5) * -18);
        qy((e.clientY / window.innerHeight - 0.5) * -12);
      };
      const onScroll = () => {
        const y = Math.min(window.scrollY, 900);
        gsap.set(".h-scroll", { y: y * 0.18 });
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("scroll", onScroll);
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative isolate overflow-hidden pt-24 md:pt-28" aria-roledescription="carrousel" aria-label="À la une chez SODIS Electronics">
      <h1 className="sr-only">SODIS Electronics — distributeur officiel LG en Côte d&apos;Ivoire : TV, audio, climatisation, réfrigérateurs, lave-linge et électroménager</h1>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--bg-soft),var(--bg)_60%)]" />

      <div className="container-x">
        {/* Bannières */}
        <div className="group/hero relative aspect-[2/1] overflow-hidden rounded-[22px] bg-soft shadow-[0_40px_90px_-40px_rgb(37_48_96/0.55)] sm:rounded-[32px]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {slides.map((x, k) => (
            <div key={x.image} className={cn("h-slide", `h-slide-${k}`, "absolute inset-0", k === i ? "z-10" : "pointer-events-none z-0 opacity-0")} aria-hidden={k !== i}>
              <div className="h-scroll absolute inset-0">
                <div className="h-parallax absolute inset-0 md:-inset-3">
                  <Image
                    src={x.image}
                    alt={x.alt}
                    fill
                    priority={k === 0}
                    loading={k === 0 ? undefined : "lazy"}
                    sizes="(max-width: 1320px) 100vw, 1320px"
                    className="h-img object-cover will-change-transform"
                    style={{ objectPosition: x.position ?? "center" }}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Texte superposé (visuel TV) */}
          {s.overlay && (
            <div className="h-ov absolute inset-y-0 left-0 z-20 flex w-[44%] flex-col justify-center pl-[5%] text-white" aria-live="polite">
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-accent sm:text-[11px]">{s.overlay.eyebrow}</p>
              <p className="mt-2 font-display text-[clamp(1.1rem,3.6vw,3.6rem)] font-semibold leading-[1] tracking-[-0.03em] sm:mt-4">
                {s.overlay.title.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </p>
              <p className="mt-4 hidden max-w-[21rem] text-[15px] leading-relaxed text-white/70 lg:block">{s.overlay.text}</p>
            </div>
          )}

          {/* Flèches */}
          <button onClick={() => go(-1)} aria-label="Diapositive précédente" className="glass absolute left-3 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/40 text-ink opacity-0 transition group-hover/hero:opacity-100 sm:grid">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={() => go(1)} aria-label="Diapositive suivante" className="glass absolute right-3 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/40 text-ink opacity-0 transition group-hover/hero:opacity-100 sm:grid">
            <ChevronRight className="h-5 w-5" />
          </button>

        </div>

        {/* CTA + réassurance + pagination */}
        <div className="mt-4 flex flex-col gap-4 md:mt-5 md:flex-row md:flex-wrap md:items-center md:justify-between">
          <div className="h-cta flex items-center gap-2">
            <span className="hidden rounded-full border border-line px-4 py-2.5 text-[13px] font-medium text-ink-soft lg:inline-block">{s.label}</span>
            <ButtonLink href={s.href} variant="accent" size="md" magnetic className="flex-1 md:flex-none" external={s.external}>
              {s.cta} <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/devis" variant="primary" size="md" magnetic className="flex-1 md:flex-none">
              Demander un devis
            </ButtonLink>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2" role="tablist" aria-label="Choisir une diapositive">
              {slides.map((x, k) => (
                <button
                  key={x.image}
                  role="tab"
                  aria-selected={k === i}
                  aria-label={`Diapositive ${k + 1} : ${x.label}`}
                  onClick={() => setI(k)}
                  className="relative h-1.5 overflow-hidden rounded-full bg-line transition-all duration-500"
                  style={{ width: k === i ? 48 : 14 }}
                >
                  {k === i && (
                    <span
                      key={`${i}-${paused}`}
                      className="absolute inset-y-0 left-0 bg-primary"
                      style={{ animation: paused ? "none" : `hero-progress ${DURATION}ms linear forwards`, width: paused ? "100%" : undefined }}
                    />
                  )}
                </button>
              ))}
            </div>
            <button onClick={() => setPaused((p) => !p)} aria-label={paused ? "Lecture" : "Pause"} className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink-soft hover:text-ink">
              {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
            </button>
          </div>
        </div>
      </div>

      {/* Promotions de la semaine + recherche intelligente + catégories rapides (glassmorphism) */}
      <div className="container-x relative z-20 mt-6 pb-6">
        <div className="glass rounded-[32px] border border-white/60 p-4 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.25)] dark:border-white/10 sm:p-5">
          <HeroPromos />
          <div className="my-4 h-px bg-line/70" />
          <InlineSearch />
          <nav aria-label="Catégories rapides" className="no-scrollbar mt-4 flex gap-2 overflow-x-auto">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}`}
                className="group flex shrink-0 items-center gap-2.5 rounded-full border border-line/80 bg-elev/60 px-4 py-2.5 text-[13px] font-medium text-ink-soft transition hover:border-primary hover:text-ink"
              >
                <CategoryIcon icon={c.icon} className="h-4 w-4 transition group-hover:text-secondary" />
                {c.name}
              </Link>
            ))}
            <a href={waLink("Bonjour SODIS, j'aimerais être conseillé.")} target="_blank" rel="noopener noreferrer" className="flex shrink-0 items-center gap-2 rounded-full bg-[#25D366]/10 px-4 py-2.5 text-[13px] font-medium text-[#128C7E] transition hover:bg-[#25D366] hover:text-white">
              Conseil WhatsApp
            </a>
          </nav>
        </div>
      </div>
      <style>{`@keyframes hero-progress{from{width:0}to{width:100%}}`}</style>
    </section>
  );
}
