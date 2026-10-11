"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X, GitCompare, Search } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { categories } from "@/data/categories";
import { families, getProduct, type Product } from "@/data/products";
import { compareStore } from "@/lib/store";
import { cn, normalize } from "@/lib/utils";
import { ProductCard, ProductCardSkeleton } from "./product-card";

type Sort = "pertinence" | "nom" | "taille-desc" | "taille-asc";

/** Catalogue filtrable : recherche instantanée, catégorie, gamme, disponibilité, tri */
export function Catalog({ items, lockCategory }: { items: Product[]; lockCategory?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, start] = useTransition();
  const [panel, setPanel] = useState(false);

  const q = params.get("q") ?? "";
  const cat = params.get("categorie") ?? "";
  const fam = params.getAll("gamme");
  const avail = params.get("dispo") === "1";
  const sort = (params.get("tri") as Sort) ?? "pertinence";

  const set = (mut: (p: URLSearchParams) => void) => {
    const next = new URLSearchParams(params.toString());
    mut(next);
    start(() => router.replace(`${pathname}?${next.toString()}`, { scroll: false }));
  };

  const scoped = useMemo(() => (cat ? items.filter((p) => p.category === cat) : items), [items, cat]);
  const fams = families(scoped);

  const list = useMemo(() => {
    const t = normalize(q.trim());
    let r = scoped.filter(
      (p) =>
        (!t || normalize(`${p.model} ${p.name} ${p.family} ${p.specs.join(" ")}`).includes(t)) &&
        (!fam.length || fam.includes(p.family)) &&
        (!avail || p.available),
    );
    if (sort === "nom") r = [...r].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "taille-desc") r = [...r].sort((a, b) => (b.key?.value ?? 0) - (a.key?.value ?? 0));
    if (sort === "taille-asc") r = [...r].sort((a, b) => (a.key?.value ?? 0) - (b.key?.value ?? 0));
    if (sort === "pertinence") r = [...r].sort((a, b) => Number(b.available) - Number(a.available) || (b.tags?.length ?? 0) - (a.tags?.length ?? 0));
    return r;
  }, [scoped, q, fam, avail, sort]);

  const activeCount = (cat && !lockCategory ? 1 : 0) + fam.length + (avail ? 1 : 0);

  const Filters = (
    <div className="space-y-8">
      {!lockCategory && (
        <fieldset>
          <legend className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink">Catégorie</legend>
          <div className="flex flex-wrap gap-2">
            <Chip active={!cat} onClick={() => set((p) => (p.delete("categorie"), p.delete("gamme")))}>
              Tout
            </Chip>
            {categories.map((c) => (
              <Chip key={c.slug} active={cat === c.slug} onClick={() => set((p) => (p.set("categorie", c.slug), p.delete("gamme")))}>
                {c.name}
              </Chip>
            ))}
          </div>
        </fieldset>
      )}
      <fieldset>
        <legend className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink">Gamme</legend>
        <div className="flex flex-wrap gap-2">
          {fams.map((f) => (
            <Chip
              key={f}
              active={fam.includes(f)}
              onClick={() =>
                set((p) => {
                  const cur = p.getAll("gamme");
                  p.delete("gamme");
                  (cur.includes(f) ? cur.filter((x) => x !== f) : [...cur, f]).forEach((x) => p.append("gamme", x));
                })
              }
            >
              {f}
            </Chip>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink">Disponibilité</legend>
        <label className="flex cursor-pointer items-center justify-between rounded-2xl bg-soft px-4 py-3 text-[14px]">
          En stock uniquement
          <input type="checkbox" checked={avail} onChange={(e) => set((p) => (e.target.checked ? p.set("dispo", "1") : p.delete("dispo")))} className="peer sr-only" />
          <span className="relative h-6 w-11 rounded-full bg-line transition peer-checked:bg-red after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition peer-checked:after:translate-x-5" />
        </label>
      </fieldset>
      {activeCount > 0 && (
        <button onClick={() => set((p) => ["categorie", "gamme", "dispo", "q"].forEach((k) => !(lockCategory && k === "categorie") && p.delete(k)))} className="text-[13px] text-muted underline underline-offset-4 hover:text-ink">
          Réinitialiser les filtres
        </button>
      )}
    </div>
  );

  return (
    <div className="container-x">
      {/* Barre d'outils */}
      <div className="sticky top-16 z-30 -mx-4 mb-10 flex flex-wrap items-center gap-3 border-b border-line bg-bg/85 px-4 py-4 backdrop-blur-xl sm:mx-0 sm:rounded-full sm:border sm:px-3 sm:py-2">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            defaultValue={q}
            onChange={(e) => set((p) => (e.target.value ? p.set("q", e.target.value) : p.delete("q")))}
            placeholder="Filtrer par nom, référence, caractéristique…"
            aria-label="Filtrer les produits"
            className="h-11 w-full rounded-full bg-soft pl-11 pr-4 text-[14px] outline-none"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => set((p) => p.set("tri", e.target.value))}
          aria-label="Trier"
          className="h-11 rounded-full bg-soft px-4 text-[14px] outline-none"
        >
          <option value="pertinence">Pertinence</option>
          <option value="nom">Nom A → Z</option>
          <option value="taille-desc">Taille / puissance ↓</option>
          <option value="taille-asc">Taille / puissance ↑</option>
        </select>
        <button onClick={() => setPanel(true)} className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-[14px] font-medium text-bg lg:hidden">
          <SlidersHorizontal className="h-4 w-4" /> Filtres {activeCount > 0 && `(${activeCount})`}
        </button>
        <p className="w-full text-[13px] text-muted sm:w-auto sm:px-3" aria-live="polite">
          {list.length} produit{list.length > 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-36">{Filters}</div>
        </aside>
        <div>
          <div className={cn("grid gap-5 sm:grid-cols-2 xl:grid-cols-3", pending && "opacity-60 transition")}>
            {list.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} priority={i < 3} />
            ))}
            {pending && list.length === 0 && Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
          {list.length === 0 && !pending && (
            <div className="rounded-3xl bg-soft p-12 text-center">
              <p className="font-display text-2xl font-semibold">Aucun produit ne correspond.</p>
              <p className="mt-2 text-muted">Élargissez vos filtres, ou demandez-nous directement : on trouve toujours une solution.</p>
              <Link href="/devis" className="mt-6 inline-flex h-12 items-center rounded-full bg-ink px-6 text-[14px] font-medium text-bg">
                Demander un devis
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Panneau filtres mobile */}
      <AnimatePresence>
        {panel && (
          <motion.div className="fixed inset-0 z-[85] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/40" onClick={() => setPanel(false)} />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-[32px] bg-elev p-6"
              role="dialog"
              aria-label="Filtres"
            >
              <div className="mb-6 flex items-center justify-between">
                <p className="font-display text-xl font-semibold">Filtres</p>
                <button onClick={() => setPanel(false)} aria-label="Fermer" className="grid h-10 w-10 place-items-center rounded-full bg-soft">
                  <X className="h-4 w-4" />
                </button>
              </div>
              {Filters}
              <button onClick={() => setPanel(false)} className="mt-8 h-14 w-full rounded-full bg-ink text-[15px] font-medium text-bg">
                Voir {list.length} produits
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn("rounded-full border px-3.5 py-2 text-[13px] transition", active ? "border-ink bg-ink text-bg" : "border-line text-ink-soft hover:border-ink/50 hover:text-ink")}
    >
      {children}
    </button>
  );
}

/** Barre du comparateur (persistante en bas d'écran) */
export function CompareBar() {
  const list = compareStore.use();
  const pathname = usePathname();
  if (!list.length || pathname === "/comparateur") return null;
  return (
    <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="no-print fixed bottom-5 left-1/2 z-[65] -translate-x-1/2">
      <div className="glass flex items-center gap-3 rounded-full border border-line py-2 pl-3 pr-2 shadow-2xl">
        <div className="flex -space-x-3">
          {list.map((s) => {
            const p = getProduct(s);
            return p ? (
              <span key={s} className="grid h-10 w-10 place-items-center overflow-hidden rounded-full border-2 border-elev bg-soft">
                <Image src={p.image} alt={p.name} width={40} height={40} className="h-8 w-8 object-contain" />
              </span>
            ) : null;
          })}
        </div>
        <Link href="/comparateur" className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-5 text-[13px] font-medium text-bg">
          <GitCompare className="h-4 w-4" /> Comparer ({list.length})
        </Link>
        <button aria-label="Vider le comparateur" onClick={() => compareStore.set([])} className="grid h-10 w-10 place-items-center rounded-full text-muted hover:bg-soft">
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
