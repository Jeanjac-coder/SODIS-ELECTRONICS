import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ShieldCheck, Truck, Wrench, CreditCard } from "lucide-react";
import { getProduct, products } from "@/data/products";
import { getCategory } from "@/data/categories";
import { site } from "@/config/site";
import { Badge, Breadcrumbs, JsonLd } from "@/components/ui/misc";
import { Reveal } from "@/components/ui/reveal";
import { InstallmentSimulator, ProductActions, ProductRail, RecentlyViewed } from "@/components/product/product-extras";
import { ViewingNow } from "@/components/widgets/floating";
import { PaymentLogos } from "@/components/ui/payments";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  const description = `${p.name} (${p.model}) — ${p.tagline} ${p.specs.slice(0, 3).join(", ")}. Disponible chez SODIS Electronics, distributeur officiel LG en Côte d'Ivoire.`;
  return {
    title: `${p.name} — ${p.model}`,
    description,
    alternates: { canonical: `/produits/${p.slug}` },
    openGraph: { title: p.name, description, images: [{ url: p.image, alt: p.name }], type: "website" },
    twitter: { card: "summary_large_image", title: p.name, description, images: [p.image] },
  };
}

export default async function ProductPage({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const cat = getCategory(p.category)!;
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).sort((a, b) => Number(b.family === p.family) - Number(a.family === p.family)).slice(0, 8);

  return (
    <>
      <section className="container-x pt-28 md:pt-32">
        <Breadcrumbs
          className="mb-8"
          items={[
            { href: "/produits", label: "Produits" },
            { href: `/categories/${cat.slug}`, label: cat.name },
            { href: `/produits/${p.slug}`, label: p.model },
          ]}
        />
        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          {/* Visuel */}
          <Reveal scale={0.97} className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative grid aspect-square place-items-center overflow-hidden rounded-[40px] bg-soft">
              <div aria-hidden className="absolute inset-[18%] rounded-full bg-elev/70 blur-3xl" />
              <Image src={p.image} alt={`${p.name} — ${p.model}`} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-contain p-[12%] drop-shadow-[0_40px_40px_rgb(0_0_0/0.18)]" />
              <div className="absolute left-6 top-6 flex gap-2">
                <Badge tone="dark">LG</Badge>
                {p.tags?.includes("nouveau") && <Badge tone="red">Nouveau</Badge>}
              </div>
            </div>
          </Reveal>

          {/* Infos */}
          <div>
            <p className="eyebrow mb-4">
              {cat.name} · {p.family}
            </p>
            <h1 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em]">{p.name}</h1>
            <p className="mt-3 text-[14px] text-muted">Référence : {p.model}</p>
            <p className="lead mt-6">{p.tagline}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Badge tone={p.available ? "green" : "neutral"}>{p.available ? "● Disponible" : "○ Bientôt disponible"}</Badge>
              {p.finish && <Badge>Finition : {p.finish}</Badge>}
              <ViewingNow />
            </div>

            <div className="my-8 rounded-3xl bg-soft p-6">
              <p className="text-[13px] text-muted">Prix</p>
              <p className="font-display text-3xl font-semibold tracking-tight">{p.price ? `${p.price.toLocaleString("fr-FR")} FCFA` : "Sur devis — réponse sous 24 h"}</p>
              <p className="mt-1 text-[13px] text-muted">Tarifs particuliers & entreprises · livraison et installation chiffrées dans le devis</p>
            </div>

            <ProductActions product={p} />

            <ul className="mt-8 grid grid-cols-2 gap-3 text-[13px]">
              {[
                { i: ShieldCheck, t: "Garantie constructeur LG" },
                { i: Truck, t: "Livraison partout en CI" },
                { i: Wrench, t: "Installation par nos techniciens" },
                { i: CreditCard, t: "Mobile Money, carte, virement" },
              ].map(({ i: I, t }) => (
                <li key={t} className="flex items-center gap-2.5 rounded-2xl border border-line p-3">
                  <I className="h-4 w-4 shrink-0 text-secondary" /> {t}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <h2 className="mb-4 text-[18px] font-semibold">Caractéristiques clés</h2>
              <ul className="divide-y divide-line rounded-3xl border border-line">
                {p.specs.map((s) => (
                  <li key={s} className="flex items-start gap-3 px-5 py-3.5 text-[14px]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> {s}
                  </li>
                ))}
              </ul>
              <Link href={`/produits/${p.slug}/fiche`} className="mt-4 inline-block text-[13px] text-muted underline underline-offset-4 hover:text-ink">
                Voir / télécharger la fiche technique complète
              </Link>
            </div>

            <div className="mt-10">
              <p className="mb-3 text-[13px] font-semibold">Paiement</p>
              <PaymentLogos size="sm" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-x mt-24 grid gap-8 lg:grid-cols-2">
        <InstallmentSimulator defaultPrice={p.price} />
        <div className="flex flex-col justify-between rounded-[28px] bg-primary p-8 text-white">
          <div>
            <p className="eyebrow mb-2">Besoin de conseil ?</p>
            <h3 className="font-display text-2xl font-semibold tracking-tight">Un expert SODIS vous répond.</h3>
            <p className="mt-4 text-[15px] leading-relaxed opacity-70">Compatibilité, installation, taille idéale, alternatives en stock : posez toutes vos questions, sans engagement.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/devis" className="inline-flex h-12 items-center rounded-full bg-bg px-6 text-[14px] font-medium text-ink">
              Demande de devis
            </Link>
            <a href={site.phoneHref} className="inline-flex h-12 items-center rounded-full border border-white/20 px-6 text-[14px] font-medium">
              {site.phone}
            </a>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-x mt-32" aria-labelledby="rel-title">
          <p className="eyebrow mb-3">Dans la même famille</p>
          <h2 id="rel-title" className="h-section">
            Vous aimerez aussi
          </h2>
          <div className="mt-8">
            <ProductRail items={related} label="Produits similaires" />
          </div>
        </section>
      )}
      <RecentlyViewed exclude={p.slug} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: p.name,
          sku: p.model,
          mpn: p.model,
          image: `${site.url}${p.image}`,
          description: `${p.tagline} ${p.specs.join(". ")}`,
          brand: { "@type": "Brand", name: "LG" },
          category: cat.name,
          offers: {
            "@type": "Offer",
            url: `${site.url}/produits/${p.slug}`,
            priceCurrency: "XOF",
            ...(p.price ? { price: p.price } : {}),
            availability: p.available ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
            itemCondition: "https://schema.org/NewCondition",
            seller: { "@id": `${site.url}/#organization` },
          },
        }}
      />
    </>
  );
}
