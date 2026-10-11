"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Pause, Play, ShieldCheck, Truck, Wrench } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { CategoryIcon } from "@/components/ui/misc";
import { InlineSearch } from "@/components/widgets/search";
import { categories } from "@/data/categories";
import { waLink } from "@/config/site";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

const slides = [
  {
    eyebrow: "Nouveau · LG OLED evo AI C5",
    title: ["L'image qui vous", "coupe le souffle."],
    text: "Noirs parfaits, couleurs infinies, 144 Hz. L'OLED evo débarque chez SODIS, garanti et installé chez vous.",
    image: "/images/products/oled65c56la.webp",
    alt: "Téléviseur LG OLED evo AI C5 65 pouces",
    href: "/produits/oled65c56la",
    glow: "from-orange-400/40 via-rose-500/25 to-transparent",
    w: 494,
    h: 378,
  },
  {
    eyebrow: "LG XBOOM XL9T · 1000 W",
    title: ["Le son qui met", "toute la cour debout."],
    text: "Basses profondes, lumières LED pixel, karaoké. Quand XBOOM est là, l'ambiance n'est pas palabre.",
    image: "/images/products/xl9t.webp",
    alt: "Enceinte de soirée LG XBOOM XL9T",
    href: "/produits/xl9t",
    glow: "from-fuchsia-500/40 via-violet-500/25 to-transparent",
    w: 294,
    h: 538,
  },
  {
    eyebrow: "LG QNED evo · 100 pouces",
    title: ["Le stade,", "dans votre salon."],
    text: "100 pouces de QNED pour vivre chaque match comme au premier rang. Livraison et fixation murale incluses sur devis.",
    image: "/images/products/100qned86a6.webp",
    alt: "Téléviseur LG QNED evo 100 pouces",
    href: "/produits/100qned86a6",
    glow: "from-emerald-400/35 via-sky-400/25 to-transparent",
    w: 498,
    h: 364,
  },
  {
    eyebrow: "LG ARTCOOL · DUAL Inverter",
    title: ["La fraîcheur", "qui fait des économies."],
    text: "Jusqu'à 70 % d'économie d'énergie, refroidissement 40 % plus rapide. Installation par nos techniciens certifiés.",
    image: "/images/products/s4-q12jartb.webp",
    alt: "Climatiseur LG ARTCOOL façade miroir",
    href: "/produits/s4-q12jartb",
    glow: "from-sky-400/40 via-indigo-400/20 to-transparent",
    w: 1610,
    h: 626,
  },
  {
    eyebrow: "LG Réfrigérateurs · Portes françaises",
    title: ["Fraîcheur XXL,", "élégance absolue."],
    text: "570 litres, UVnano, LinearCooling™. Des aliments frais plus longtemps, dans une cuisine qui a du style.",
    image: "/images/products/gc-l22ffqpb.webp",
    alt: "Réfrigérateur LG portes françaises GC-L22FFQPB",
    href: "/produits/gc-l22ffqpb",
    glow: "from-slate-400/40 via-zinc-300/20 to-transparent",
    w: 302,
    h: 616,
  },
];

const DURATION = 6500;

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const s = slides[i];

  // Défilement automatique
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setI((x) => (x + 1) % slides.length), DURATION);
    return () => clearTimeout(id);
  }, [i, paused]);

  // Animation d'entrée de chaque slide (GSAP)
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(".h-eyebrow", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
        .fromTo(".h-line > span", { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.08 }, "<0.05")
        .fromTo(".h-text", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "<0.3")
        .fromTo(".h-product", { scale: 0.86, opacity: 0, y: 40, rotate: -2 }, { scale: 1, opacity: 1, y: 0, rotate: 0, duration: 1.4 }, 0.1)
        .fromTo(".h-glow", { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6 }, 0);
    },
    { scope: root, dependencies: [i] },
  );

  // Parallax souris + scroll
  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      const qx = gsap.quickTo(".h-parallax", "x", { duration: 1, ease: "power3" });
      const qy = gsap.quickTo(".h-parallax", "y", { duration: 1, ease: "power3" });
      const onMove = (e: PointerEvent) => {
        qx((e.clientX / window.innerWidth - 0.5) * -30);
        qy((e.clientY / window.innerHeight - 0.5) * -20);
      };
      const onScroll = () => {
        const y = Math.min(window.scrollY, 900);
        gsap.set(".h-scroll-slow", { y: y * 0.25 });
        gsap.set(".h-scroll-fast", { y: y * -0.12, opacity: 1 - y / 900 });
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
    <section ref={root} className="relative isolate overflow-hidden pt-28 md:pt-32" aria-roledescription="carrousel" aria-label="Produits à la une">
      {/* Fond */}
      <div aria-hidden className="h-scroll-slow pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--bg-soft),var(--bg)_60%)]" />
        <div className="absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-line to-transparent" />
      </div>

      <div className="container-x grid items-center gap-10 pb-10 lg:min-h-[calc(100svh-15rem)] lg:grid-cols-12 lg:gap-6">
        {/* Texte */}
        <div className="h-scroll-fast relative z-10 lg:col-span-7" aria-live="polite">
          <p className="h-eyebrow eyebrow mb-6">{s.eyebrow}</p>
          <h1 className="font-display text-[clamp(2.4rem,5.4vw,4.9rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
            {s.title.map((l) => (
              <span key={l} className="h-line block overflow-hidden pb-[0.08em]">
                <span className="block">{l}</span>
              </span>
            ))}
          </h1>
          <p className="h-text lead mt-6 max-w-lg text-pretty">{s.text}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={s.href} variant="red" size="lg" magnetic>
              Acheter <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/devis" variant="outline" size="lg" magnetic>
              Demander un devis
            </ButtonLink>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-muted">
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-ink" /> Garantie constructeur LG
            </li>
            <li className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-ink" /> Livraison partout en CI
            </li>
            <li className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-ink" /> Installation pro
            </li>
          </ul>
        </div>

        {/* Visuel */}
        <div className="relative lg:col-span-5">
          <div className="h-parallax relative mx-auto aspect-square w-full max-w-[520px]">
            <div aria-hidden className={cn("h-glow absolute inset-[8%] rounded-full bg-radial blur-3xl", s.glow)} />
            <div aria-hidden className="absolute inset-[14%] rounded-full border border-line/70" />
            <div aria-hidden className="absolute inset-[26%] rounded-full border border-line/50" />
            <Link href={s.href} className="h-product absolute inset-0 grid place-items-center p-6" aria-label={s.alt}>
              <Image
                key={s.image}
                src={s.image}
                alt={s.alt}
                width={s.w}
                height={s.h}
                priority
                sizes="(max-width: 1024px) 80vw, 560px"
                className="max-h-[78%] w-auto max-w-[92%] object-contain drop-shadow-[0_40px_50px_rgb(0_0_0/0.25)]"
              />
            </Link>
          </div>

          {/* Pagination */}
          <div className="mt-2 flex items-center justify-center gap-3 lg:justify-end">
            <div className="flex items-center gap-2" role="tablist" aria-label="Choisir une diapositive">
              {slides.map((x, k) => (
                <button
                  key={x.href}
                  role="tab"
                  aria-selected={k === i}
                  aria-label={`Diapositive ${k + 1} : ${x.eyebrow}`}
                  onClick={() => setI(k)}
                  className="relative h-1.5 overflow-hidden rounded-full bg-line transition-all duration-500"
                  style={{ width: k === i ? 48 : 14 }}
                >
                  {k === i && (
                    <span
                      key={`${i}-${paused}`}
                      className="absolute inset-y-0 left-0 bg-ink"
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

      {/* Recherche intelligente + catégories rapides (glassmorphism) */}
      <div className="container-x relative z-20 -mt-4 pb-6">
        <div className="glass rounded-[32px] border border-white/60 p-4 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.25)] dark:border-white/10 sm:p-5">
          <InlineSearch />
          <nav aria-label="Catégories rapides" className="no-scrollbar mt-4 flex gap-2 overflow-x-auto">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}`}
                className="group flex shrink-0 items-center gap-2.5 rounded-full border border-line/80 bg-elev/60 px-4 py-2.5 text-[13px] font-medium text-ink-soft transition hover:border-ink hover:text-ink"
              >
                <CategoryIcon icon={c.icon} className="h-4 w-4 transition group-hover:text-red" />
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
