"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GitCompare, Heart, Plus, Check } from "lucide-react";
import type { Product } from "@/data/products";
import { addToQuote, compareStore, toast, toggleCompare, toggleWishlist, wishlistStore, COMPARE_MAX } from "@/lib/store";
import { cn, fcfa } from "@/lib/utils";
import { TiltCard } from "@/components/ui/reveal";

const tagLabel = { tendance: "Tendance", "best-seller": "Best-seller", nouveau: "Nouveau", promo: "Offre" } as const;

export function ProductCard({ product: p, index = 0, priority }: { product: Product; index?: number; priority?: boolean }) {
  const wish = wishlistStore.use().includes(p.slug);
  const cmp = compareStore.use().includes(p.slug);
  const tag = p.tags?.[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.06 }}
      className="group h-full"
    >
      <TiltCard intensity={5} className="h-full rounded-[28px]">
        <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-elev transition duration-500 group-hover:border-transparent group-hover:shadow-[0_30px_60px_-25px_rgb(0_0_0/0.25)]">
          <div className="relative aspect-[4/3.4] overflow-hidden bg-soft">
            <Link href={`/produits/${p.slug}`} aria-label={p.name} className="absolute inset-0 z-[1]" />
            <Image
              src={p.image}
              alt={`${p.name} — ${p.model}`}
              fill
              priority={priority}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
              className="object-contain p-8 transition duration-[900ms] ease-[var(--ease-premium)] group-hover:scale-[1.06]"
            />
            <div className="absolute left-4 top-4 z-[2] flex flex-col gap-1.5">
              {tag && <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider", tag === "promo" ? "bg-red text-white" : "bg-ink text-bg")}>{tagLabel[tag]}</span>}
              {!p.available && <span className="rounded-full bg-elev px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted">Bientôt</span>}
            </div>
            <div className="absolute right-3 top-3 z-[2] flex flex-col gap-2 transition duration-500 sm:translate-x-3 sm:opacity-0 sm:group-hover:translate-x-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-x-0 sm:group-focus-within:opacity-100">
              <button
                type="button"
                aria-label={wish ? "Retirer des favoris" : "Ajouter aux favoris"}
                aria-pressed={wish}
                onClick={() => {
                  toggleWishlist(p.slug);
                  toast({ title: wish ? "Retiré des favoris" : "Ajouté aux favoris", body: p.name });
                }}
                className="glass grid h-10 w-10 place-items-center rounded-full border border-line/60 transition hover:scale-110"
              >
                <Heart className={cn("h-4 w-4", wish && "fill-red text-red")} />
              </button>
              <button
                type="button"
                aria-label={cmp ? "Retirer du comparateur" : "Comparer"}
                aria-pressed={cmp}
                onClick={() => {
                  const r = toggleCompare(p.slug);
                  toast(
                    r === "full"
                      ? { title: `Comparateur plein (${COMPARE_MAX} max.)`, tone: "error" }
                      : { title: r === "added" ? "Ajouté au comparateur" : "Retiré du comparateur", body: p.name },
                  );
                }}
                className={cn("glass grid h-10 w-10 place-items-center rounded-full border border-line/60 transition hover:scale-110", cmp && "bg-ink text-bg")}
              >
                <GitCompare className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-2 p-5">
            <div className="flex items-center justify-between gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
              <span>{p.family}</span>
              <span className={cn("flex items-center gap-1 normal-case tracking-normal", p.available ? "text-emerald-600 dark:text-emerald-400" : "text-muted")}>
                <span className={cn("h-1.5 w-1.5 rounded-full", p.available ? "bg-emerald-500" : "bg-muted")} />
                {p.available ? "En stock" : "Bientôt dispo"}
              </span>
            </div>
            <h3 className="text-[16px] font-semibold leading-snug tracking-tight text-ink">
              <Link href={`/produits/${p.slug}`} className="hover:text-red">
                {p.name}
              </Link>
            </h3>
            <p className="line-clamp-2 text-[13px] leading-relaxed text-muted">{p.tagline}</p>
            <div className="mt-auto flex items-center justify-between gap-3 pt-4">
              <div>
                <p className="text-[11px] text-muted">{p.model}</p>
                <p className="text-[14px] font-semibold text-ink">{p.price ? fcfa(p.price) : "Prix sur devis"}</p>
              </div>
              <QuickAdd slug={p.slug} name={p.name} />
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.article>
  );
}

function QuickAdd({ slug, name }: { slug: string; name: string }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        addToQuote(slug);
        toast({ title: "Ajouté au panier de devis", body: name, tone: "success" });
        const b = e.currentTarget;
        b.dataset.done = "1";
        setTimeout(() => delete b.dataset.done, 1400);
      }}
      aria-label={`Ajouter ${name} au devis`}
      className="group/add relative grid h-11 w-11 place-items-center rounded-full bg-ink text-bg transition hover:w-28 hover:bg-red hover:text-white data-[done]:bg-emerald-500"
      data-cursor="hover"
    >
      <Plus className="h-4 w-4 transition group-hover/add:opacity-0 group-data-[done]/add:opacity-0" />
      <Check className="absolute h-4 w-4 opacity-0 transition group-data-[done]/add:opacity-100" />
      <span className="absolute whitespace-nowrap text-[12px] font-medium opacity-0 transition group-hover/add:opacity-100 group-data-[done]/add:opacity-0">+ Devis</span>
    </button>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-line">
      <div className="skeleton aspect-[4/3.4]" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-3 w-1/3 rounded-full" />
        <div className="skeleton h-4 w-4/5 rounded-full" />
        <div className="skeleton h-3 w-full rounded-full" />
        <div className="skeleton h-10 w-full rounded-full" />
      </div>
    </div>
  );
}

export function CatalogFallback() {
  return (
    <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
