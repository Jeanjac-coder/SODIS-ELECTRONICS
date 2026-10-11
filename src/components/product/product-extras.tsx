"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Download, FileText, GitCompare, Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { getProduct, type Product } from "@/data/products";
import { addToQuote, compareStore, pushRecent, recentStore, toast, toggleCompare, toggleWishlist, wishlistStore, COMPARE_MAX } from "@/lib/store";
import { site, waLink } from "@/config/site";
import { cn, fcfa } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/widgets/icons";
import { ProductCard } from "./product-card";

export function ProductActions({ product: p }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const wish = wishlistStore.use().includes(p.slug);
  const cmp = compareStore.use().includes(p.slug);

  useEffect(() => pushRecent(p.slug), [p.slug]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex h-14 items-center rounded-full border border-line">
          <button aria-label="Diminuer la quantité" className="grid h-14 w-12 place-items-center" onClick={() => setQty((q) => Math.max(1, q - 1))}>
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-[15px] font-medium" aria-live="polite">
            {qty}
          </span>
          <button aria-label="Augmenter la quantité" className="grid h-14 w-12 place-items-center" onClick={() => setQty((q) => q + 1)}>
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button
          onClick={() => {
            addToQuote(p.slug, qty);
            toast({ title: `${qty} × ajouté au panier de devis`, body: p.name, tone: "success" });
          }}
          className="inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-ink px-8 text-[15px] font-medium text-bg transition hover:bg-red hover:text-white"
          data-cursor="hover"
        >
          <ShoppingBag className="h-4 w-4" /> Ajouter au devis
        </button>
      </div>
      <a
        href={waLink(`Bonjour SODIS, je suis intéressé(e) par ${p.name} (${p.model}) × ${qty}. Pouvez-vous me donner le prix et la disponibilité ?`)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 items-center justify-center gap-2 rounded-full bg-[#25D366] text-[15px] font-medium text-white transition hover:bg-[#1ebe5a]"
      >
        <WhatsAppIcon className="h-5 w-5" /> Acheter / prix via WhatsApp
      </a>
      <div className="grid grid-cols-3 gap-2 pt-2">
        <button
          onClick={() => {
            toggleWishlist(p.slug);
            toast({ title: wish ? "Retiré des favoris" : "Ajouté aux favoris" });
          }}
          aria-pressed={wish}
          className="flex flex-col items-center gap-1.5 rounded-2xl bg-soft py-3 text-[12px] text-ink-soft transition hover:text-ink"
        >
          <Heart className={cn("h-4 w-4", wish && "fill-red text-red")} /> Favori
        </button>
        <button
          onClick={() => {
            const r = toggleCompare(p.slug);
            toast(r === "full" ? { title: `Comparateur plein (${COMPARE_MAX} max.)`, tone: "error" } : { title: r === "added" ? "Ajouté au comparateur" : "Retiré du comparateur" });
          }}
          aria-pressed={cmp}
          className={cn("flex flex-col items-center gap-1.5 rounded-2xl py-3 text-[12px] transition", cmp ? "bg-ink text-bg" : "bg-soft text-ink-soft hover:text-ink")}
        >
          <GitCompare className="h-4 w-4" /> Comparer
        </button>
        <Link href={`/produits/${p.slug}/fiche`} className="flex flex-col items-center gap-1.5 rounded-2xl bg-soft py-3 text-[12px] text-ink-soft transition hover:text-ink">
          <FileText className="h-4 w-4" /> Fiche technique
        </Link>
      </div>
    </div>
  );
}

/** Simulateur de mensualités (paiement échelonné) */
export function InstallmentSimulator({ defaultPrice }: { defaultPrice?: number }) {
  const [price, setPrice] = useState(defaultPrice ?? 1_000_000);
  const [deposit, setDeposit] = useState(30);
  const [months, setMonths] = useState<number>(site.installments.months[1] ?? 6);
  if (!site.installments.enabled) return null;
  const financed = price * (1 - deposit / 100);
  const r = site.installments.monthlyRate;
  const monthly = r > 0 ? (financed * r) / (1 - Math.pow(1 + r, -months)) : financed / months;

  return (
    <div className="rounded-[28px] border border-line bg-elev p-6 sm:p-8">
      <p className="eyebrow mb-2">Paiement échelonné</p>
      <h3 className="font-display text-2xl font-semibold tracking-tight">Simulez vos mensualités</h3>
      <div className="mt-6 space-y-6">
        <label className="block">
          <span className="label">Montant de l&apos;achat (FCFA)</span>
          <input type="number" min={50000} step={10000} value={price} onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))} className="input" />
        </label>
        <label className="block">
          <span className="label flex justify-between">
            Apport initial <span className="text-ink">{deposit} %</span>
          </span>
          <input type="range" min={0} max={70} step={5} value={deposit} onChange={(e) => setDeposit(Number(e.target.value))} className="w-full accent-[var(--red)]" />
        </label>
        <div>
          <span className="label">Durée</span>
          <div className="flex gap-2">
            {site.installments.months.map((m) => (
              <button key={m} onClick={() => setMonths(m)} aria-pressed={months === m} className={cn("h-11 flex-1 rounded-full border text-[14px] transition", months === m ? "border-ink bg-ink text-bg" : "border-line")}>
                {m} mois
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 rounded-3xl bg-soft p-5">
        <div>
          <p className="text-[12px] text-muted">Apport</p>
          <p className="text-[16px] font-semibold">{fcfa(price - financed)}</p>
        </div>
        <div>
          <p className="text-[12px] text-muted">Mensualité estimée</p>
          <p className="text-[22px] font-semibold text-red">{fcfa(monthly)}</p>
        </div>
      </div>
      <p className="mt-4 text-[12px] leading-relaxed text-muted">Simulation indicative, sans valeur contractuelle. Conditions définitives communiquées avec votre devis, sous réserve d&apos;acceptation du dossier.</p>
    </div>
  );
}

/** Carrousel produits (Embla) */
export function ProductRail({ items, label }: { items: Product[]; label: string }) {
  const [ref, api] = useEmblaCarousel({ align: "start", dragFree: true, containScroll: "trimSnaps" });
  const [can, setCan] = useState({ prev: false, next: true });
  useEffect(() => {
    if (!api) return;
    const u = () => setCan({ prev: api.canScrollPrev(), next: api.canScrollNext() });
    u();
    api.on("select", u).on("reInit", u).on("scroll", u);
  }, [api]);
  return (
    <div className="relative" role="region" aria-roledescription="carrousel" aria-label={label}>
      <div className="mb-6 flex justify-end gap-2">
        <button aria-label="Précédent" disabled={!can.prev} onClick={() => api?.scrollPrev()} className="grid h-11 w-11 place-items-center rounded-full border border-line transition hover:border-ink disabled:opacity-30">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button aria-label="Suivant" disabled={!can.next} onClick={() => api?.scrollNext()} className="grid h-11 w-11 place-items-center rounded-full border border-line transition hover:border-ink disabled:opacity-30">
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <div ref={ref} className="overflow-hidden">
        <div className="-ml-5 flex touch-pan-y py-2">
          {items.map((p, i) => (
            <div key={p.slug} className="min-w-0 shrink-0 basis-[80%] pl-5 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function RecentlyViewed({ exclude }: { exclude?: string }) {
  const slugs = recentStore.use().filter((s) => s !== exclude);
  const items = slugs.map(getProduct).filter(Boolean) as Product[];
  if (items.length < 2) return null;
  return (
    <section className="container-x mt-32" aria-labelledby="recent-title">
      <p className="eyebrow mb-3">Votre historique</p>
      <h2 id="recent-title" className="h-section">
        Récemment consultés
      </h2>
      <div className="mt-8">
        <ProductRail items={items} label="Produits récemment consultés" />
      </div>
    </section>
  );
}

export function PrintButton() {
  return (
    <button onClick={() => window.print()} className="no-print inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[14px] font-medium text-bg hover:bg-red hover:text-white">
      <Download className="h-4 w-4" /> Télécharger en PDF
    </button>
  );
}
