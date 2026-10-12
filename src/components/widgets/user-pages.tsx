"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, GitCompare, ShoppingBag, Trash2, Minus, Plus, X } from "lucide-react";
import { getProduct, type Product } from "@/data/products";
import { compareStore, quoteStore, setQuoteQty, toggleCompare, wishlistStore, clearQuote } from "@/lib/store";
import { waLink } from "@/config/site";
import { ProductCard } from "@/components/product/product-card";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "./icons";

const resolve = (slugs: string[]) => slugs.map(getProduct).filter(Boolean) as Product[];

function Empty({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex flex-col items-center rounded-[32px] bg-soft px-6 py-20 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-elev">{icon}</span>
      <p className="mt-6 font-display text-2xl font-semibold">{title}</p>
      <p className="mt-2 max-w-md text-muted">{text}</p>
      <ButtonLink href="/produits" className="mt-8">
        Parcourir les produits
      </ButtonLink>
    </div>
  );
}

export function WishlistView() {
  const items = resolve(wishlistStore.use());
  if (!items.length) return <Empty icon={<Heart className="h-6 w-6" />} title="Aucun favori pour l'instant" text="Touchez le cœur sur un produit pour le retrouver ici, sur cet appareil." />;
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((p, i) => (
        <ProductCard key={p.slug} product={p} index={i} />
      ))}
    </div>
  );
}

export function CompareView() {
  const items = resolve(compareStore.use());
  if (!items.length) return <Empty icon={<GitCompare className="h-6 w-6" />} title="Le comparateur est vide" text="Ajoutez jusqu'à 4 produits avec l'icône « Comparer » pour les voir côte à côte." />;
  const rows = Math.max(...items.map((p) => p.specs.length));
  return (
    <div className="overflow-x-auto rounded-[32px] border border-line">
      <table className="w-full min-w-[720px] text-left text-[14px]">
        <thead>
          <tr>
            <th className="w-40 p-6 align-bottom text-[12px] font-semibold uppercase tracking-wider text-muted">Produit</th>
            {items.map((p) => (
              <th key={p.slug} className="p-6 align-top font-normal">
                <div className="relative">
                  <button onClick={() => toggleCompare(p.slug)} aria-label={`Retirer ${p.name}`} className="absolute -right-2 -top-2 grid h-8 w-8 place-items-center rounded-full bg-soft hover:bg-primary hover:text-white">
                    <X className="h-4 w-4" />
                  </button>
                  <div className="relative mb-4 aspect-square rounded-2xl bg-soft">
                    <Image src={p.image} alt={p.name} fill sizes="200px" className="object-contain p-6" />
                  </div>
                  <Link href={`/produits/${p.slug}`} className="text-[15px] font-semibold hover:text-secondary">
                    {p.name}
                  </Link>
                  <p className="text-[12px] text-muted">{p.model}</p>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ["Gamme", (p: Product) => p.family],
            ["Disponibilité", (p: Product) => (p.available ? "✓ Disponible" : "Bientôt")],
            ["Caractéristique clé", (p: Product) => (p.key ? `${p.key.value.toLocaleString("fr-FR")} ${p.key.unit}` : "—")],
            ["Finition", (p: Product) => p.finish ?? "—"],
          ].map(([label, fn]) => (
            <tr key={label as string} className="border-t border-line">
              <th scope="row" className="p-6 text-[13px] font-medium text-muted">
                {label as string}
              </th>
              {items.map((p) => (
                <td key={p.slug} className="p-6 font-medium">
                  {(fn as (p: Product) => string)(p)}
                </td>
              ))}
            </tr>
          ))}
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="border-t border-line">
              <th scope="row" className="p-6 text-[13px] font-medium text-muted">
                {i === 0 ? "Caractéristiques" : ""}
              </th>
              {items.map((p) => (
                <td key={p.slug} className="p-6 text-ink-soft">
                  {p.specs[i] ?? ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function QuoteCartView() {
  const cart = quoteStore.use();
  if (!cart.length) return <Empty icon={<ShoppingBag className="h-6 w-6" />} title="Votre panier de devis est vide" text="Ajoutez des produits avec « + Devis » : nous vous enverrons une offre personnalisée." />;
  const total = cart.reduce((n, i) => n + i.qty, 0);
  const text = `Bonjour SODIS, je souhaite un devis pour :\n${cart.map((i) => `• ${i.qty} × ${getProduct(i.slug)?.name} (${getProduct(i.slug)?.model})`).join("\n")}`;
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
      <ul className="divide-y divide-line rounded-[32px] border border-line">
        {cart.map((it) => {
          const p = getProduct(it.slug);
          if (!p) return null;
          return (
            <li key={it.slug} className="flex flex-wrap items-center gap-5 p-5 sm:flex-nowrap">
              <Link href={`/produits/${p.slug}`} className="relative h-24 w-24 shrink-0 rounded-2xl bg-soft">
                <Image src={p.image} alt={p.name} fill sizes="96px" className="object-contain p-3" />
              </Link>
              <div className="min-w-0 flex-1">
                <Link href={`/produits/${p.slug}`} className="text-[16px] font-semibold hover:text-secondary">
                  {p.name}
                </Link>
                <p className="text-[13px] text-muted">
                  {p.model} · {p.available ? "Disponible" : "Bientôt disponible"}
                </p>
              </div>
              <div className="flex items-center rounded-full border border-line">
                <button aria-label="Diminuer" className="grid h-10 w-10 place-items-center" onClick={() => setQuoteQty(p.slug, it.qty - 1)}>
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center">{it.qty}</span>
                <button aria-label="Augmenter" className="grid h-10 w-10 place-items-center" onClick={() => setQuoteQty(p.slug, it.qty + 1)}>
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <button aria-label="Retirer" onClick={() => setQuoteQty(p.slug, 0)} className="grid h-10 w-10 place-items-center rounded-full text-muted hover:bg-soft hover:text-secondary">
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          );
        })}
      </ul>
      <aside className="h-fit space-y-4 rounded-[32px] bg-soft p-8 lg:sticky lg:top-24">
        <p className="font-display text-2xl font-semibold">Récapitulatif</p>
        <p className="text-muted">
          {total} article{total > 1 ? "s" : ""} · {cart.length} référence{cart.length > 1 ? "s" : ""}
        </p>
        <p className="text-[13px] leading-relaxed text-muted">Les prix, la livraison et l&apos;installation sont calculés dans votre devis personnalisé, envoyé sous 24 h.</p>
        <ButtonLink href="/devis" size="lg" className="w-full">
          Finaliser ma demande de devis
        </ButtonLink>
        <ButtonLink href={waLink(text)} variant="whatsapp" size="lg" className="w-full">
          <WhatsAppIcon className="h-5 w-5" /> Envoyer sur WhatsApp
        </ButtonLink>
        <button onClick={clearQuote} className="w-full text-center text-[13px] text-muted underline underline-offset-4 hover:text-ink">
          Vider le panier
        </button>
      </aside>
    </div>
  );
}
