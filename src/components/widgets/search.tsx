"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, X, CornerDownLeft } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { search, popularSearches, type SearchHit } from "@/lib/search";
import { cn } from "@/lib/utils";

export const openSearch = (q = "") => window.dispatchEvent(new CustomEvent("sodis:search", { detail: q }));

function Results({ hits, active, onPick }: { hits: SearchHit[]; active: number; onPick: () => void }) {
  return (
    <ul role="listbox" className="max-h-[60vh] overflow-y-auto p-2">
      {hits.map((h, i) => (
        <li key={h.kind === "product" ? h.product.slug : h.href} role="option" aria-selected={i === active}>
          <Link
            href={h.kind === "product" ? `/produits/${h.product.slug}` : h.href}
            onClick={onPick}
            className={cn("flex items-center gap-4 rounded-2xl p-3 transition", i === active ? "bg-soft" : "hover:bg-soft")}
          >
            {h.kind === "product" ? (
              <>
                <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-soft">
                  <Image src={h.product.image} alt="" width={56} height={56} className="h-11 w-11 object-contain" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-medium text-ink">{h.product.name}</span>
                  <span className="block truncate text-[12px] text-muted">
                    {h.product.model} · {h.product.family}
                  </span>
                </span>
                <span className={cn("text-[11px] font-medium", h.product.available ? "text-emerald-600" : "text-muted")}>
                  {h.product.available ? "Disponible" : "Bientôt"}
                </span>
              </>
            ) : (
              <>
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-ink text-bg">
                  <ArrowRight className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-medium text-ink">{h.label}</span>
                  <span className="block text-[12px] text-muted">{h.hint}</span>
                </span>
              </>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function useSearchState(initial = "") {
  const [q, setQ] = useState(initial);
  const [active, setActive] = useState(0);
  const hits = useMemo(() => search(q, 8), [q]);
  useEffect(() => setActive(0), [q]);
  return { q, setQ, hits, active, setActive };
}

/** Barre de recherche intelligente intégrée (Hero) */
export function InlineSearch({ className }: { className?: string }) {
  const router = useRouter();
  const s = useSearchState();
  const [open, setOpen] = useState(false);
  const id = useId();
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => !wrap.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={wrap} className={cn("relative", className)}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          const h = s.hits[s.active];
          if (h) router.push(h.kind === "product" ? `/produits/${h.product.slug}` : h.href);
          else router.push(`/produits?q=${encodeURIComponent(s.q)}`);
          setOpen(false);
        }}
        className="glass flex h-16 items-center gap-3 rounded-full border border-white/50 pl-6 pr-2 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.35)] dark:border-white/10"
      >
        <Search className="h-5 w-5 shrink-0 text-muted" aria-hidden />
        <label htmlFor={id} className="sr-only">
          Rechercher un produit
        </label>
        <input
          id={id}
          value={s.q}
          onChange={(e) => {
            s.setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") s.setActive((a) => Math.min(a + 1, s.hits.length - 1));
            if (e.key === "ArrowUp") s.setActive((a) => Math.max(a - 1, 0));
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder="TV OLED 65 pouces, clim 12000 BTU, XBOOM…"
          className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted"
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-autocomplete="list"
        />
        <button type="submit" className="grid h-12 shrink-0 place-items-center rounded-full bg-ink px-5 text-[13px] font-medium text-bg transition hover:bg-red hover:text-white" data-cursor="hover">
          Rechercher
        </button>
      </form>
      <AnimatePresence>
        {open && (
          <motion.div
            id={`${id}-list`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-[calc(100%+10px)] z-30 overflow-hidden rounded-3xl border border-line bg-elev text-left shadow-2xl"
          >
            {s.hits.length ? (
              <Results hits={s.hits} active={s.active} onPick={() => setOpen(false)} />
            ) : (
              <div className="p-5">
                <p className="mb-3 text-[12px] font-medium uppercase tracking-wider text-muted">Recherches populaires</p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((p) => (
                    <button key={p} type="button" onClick={() => s.setQ(p)} className="rounded-full border border-line px-3.5 py-1.5 text-[13px] text-ink-soft transition hover:border-ink hover:text-ink">
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Palette de recherche plein écran (⌘K / bouton de la navbar) */
export function SearchDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const s = useSearchState();
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onOpen = (e: Event) => {
      s.setQ((e as CustomEvent<string>).detail ?? "");
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("sodis:search", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("sodis:search", onOpen);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => input.current?.focus(), 50);
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[90] flex items-start justify-center p-4 pt-[12vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Recherche"
            initial={{ y: 20, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-line bg-elev shadow-2xl"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const h = s.hits[s.active];
                router.push(h ? (h.kind === "product" ? `/produits/${h.product.slug}` : h.href) : `/produits?q=${encodeURIComponent(s.q)}`);
                setOpen(false);
              }}
              className="flex items-center gap-3 border-b border-line px-5"
            >
              <Search className="h-5 w-5 text-muted" aria-hidden />
              <input
                ref={input}
                value={s.q}
                onChange={(e) => s.setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") s.setActive((a) => Math.min(a + 1, s.hits.length - 1));
                  if (e.key === "ArrowUp") s.setActive((a) => Math.max(a - 1, 0));
                }}
                placeholder="Rechercher un produit, une référence, un service…"
                aria-label="Rechercher"
                className="h-16 flex-1 bg-transparent text-[16px] text-ink outline-none placeholder:text-muted"
              />
              <button type="button" onClick={() => setOpen(false)} className="rounded-full p-2 text-muted hover:bg-soft hover:text-ink" aria-label="Fermer">
                <X className="h-5 w-5" />
              </button>
            </form>
            {s.hits.length ? (
              <Results hits={s.hits} active={s.active} onPick={() => setOpen(false)} />
            ) : (
              <div className="p-6">
                <p className="mb-3 text-[12px] font-medium uppercase tracking-wider text-muted">{s.q ? "Aucun résultat — essayez :" : "Recherches populaires"}</p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((p) => (
                    <button key={p} type="button" onClick={() => s.setQ(p)} className="rounded-full border border-line px-3.5 py-1.5 text-[13px] text-ink-soft transition hover:border-ink hover:text-ink">
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center justify-between border-t border-line px-5 py-3 text-[12px] text-muted">
              <span className="flex items-center gap-1.5">
                <CornerDownLeft className="h-3.5 w-3.5" /> pour ouvrir
              </span>
              <span>Échap pour fermer</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
