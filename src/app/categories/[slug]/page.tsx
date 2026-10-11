import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/data/categories";
import { byCategory } from "@/data/products";
import { site } from "@/config/site";
import { JsonLd, PageHeader } from "@/components/ui/misc";
import { Catalog } from "@/components/product/catalog";
import { CatalogFallback } from "@/components/product/product-card";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCategory((await params).slug);
  if (!c) return {};
  return {
    title: `${c.name} LG`,
    description: `${c.description} Distributeur officiel LG en Côte d'Ivoire — livraison, installation et SAV.`,
    alternates: { canonical: `/categories/${c.slug}` },
    openGraph: { images: [{ url: c.hero, alt: c.name }] },
  };
}

export default async function CategoryPage({ params }: Props) {
  const c = getCategory((await params).slug);
  if (!c) notFound();
  const items = byCategory(c.slug);
  return (
    <>
      <PageHeader crumbs={[{ href: "/categories", label: "Catégories" }, { href: `/categories/${c.slug}`, label: c.name }]} eyebrow={`${items.length} produits`} title={c.name} lead={c.description} />
      <Suspense fallback={<CatalogFallback />}>
        <Catalog items={items} lockCategory />
      </Suspense>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: c.name,
          itemListElement: items.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${site.url}/produits/${p.slug}`, name: p.name })),
        }}
      />
    </>
  );
}
