import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/data/products";
import { getCategory } from "@/data/categories";
import { site } from "@/config/site";
import { Breadcrumbs } from "@/components/ui/misc";
import { PrintButton } from "@/components/product/product-extras";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return p ? { title: `Fiche technique ${p.model}`, description: `Fiche technique ${p.name} (${p.model}) à télécharger.`, alternates: { canonical: `/produits/${p.slug}/fiche` } } : {};
}

/** Fiche technique imprimable / exportable en PDF (via la boîte d'impression du navigateur) */
export default async function SpecSheet({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const cat = getCategory(p.category)!;
  return (
    <section className="container-x max-w-4xl pt-28 md:pt-36">
      <Breadcrumbs
        className="no-print mb-8"
        items={[
          { href: "/produits", label: "Produits" },
          { href: `/produits/${p.slug}`, label: p.model },
          { href: `/produits/${p.slug}/fiche`, label: "Fiche technique" },
        ]}
      />
      <article className="rounded-[32px] border border-line bg-elev p-8 print:border-0 print:p-0 sm:p-12">
        <header className="flex flex-wrap items-start justify-between gap-6 border-b border-line pb-8">
          <div>
            <Image src="/brand/sodis-logo.webp" alt="SODIS Electronics" width={667} height={218} className="h-10 w-auto" />
            <p className="mt-2 text-[12px] text-muted">Distributeur officiel LG en Côte d&apos;Ivoire</p>
          </div>
          <PrintButton />
        </header>
        <div className="grid gap-10 py-10 sm:grid-cols-[1fr_1.2fr]">
          <div className="relative aspect-square rounded-3xl bg-soft">
            <Image src={p.image} alt={p.name} fill sizes="400px" className="object-contain p-8" />
          </div>
          <div>
            <p className="eyebrow">{cat.name} · {p.family}</p>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">{p.name}</h1>
            <p className="mt-2 font-mono text-[14px] text-muted">{p.model}</p>
            <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">{p.tagline}</p>
            <dl className="mt-6 grid grid-cols-2 gap-3 text-[13px]">
              <div className="rounded-2xl bg-soft p-4">
                <dt className="text-muted">Marque</dt>
                <dd className="font-semibold">LG Electronics</dd>
              </div>
              <div className="rounded-2xl bg-soft p-4">
                <dt className="text-muted">Disponibilité</dt>
                <dd className="font-semibold">{p.available ? "Disponible" : "Bientôt disponible"}</dd>
              </div>
              {p.key && (
                <div className="rounded-2xl bg-soft p-4">
                  <dt className="text-muted">{p.key.label}</dt>
                  <dd className="font-semibold">
                    {p.key.value.toLocaleString("fr-FR")} {p.key.unit}
                  </dd>
                </div>
              )}
              {p.finish && (
                <div className="rounded-2xl bg-soft p-4">
                  <dt className="text-muted">Finition</dt>
                  <dd className="font-semibold">{p.finish}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
        <h2 className="mb-4 text-[18px] font-semibold">Caractéristiques techniques</h2>
        <table className="w-full text-left text-[14px]">
          <tbody>
            {p.specs.map((s, i) => (
              <tr key={s} className="border-b border-line">
                <th scope="row" className="w-12 py-3 font-normal text-muted">
                  {String(i + 1).padStart(2, "0")}
                </th>
                <td className="py-3">{s}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <footer className="mt-10 flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-[12px] text-muted">
          <span>{site.name} · {site.phone} · {site.email}</span>
          <span>Caractéristiques fournies par le constructeur, susceptibles d&apos;évoluer.</span>
        </footer>
      </article>
    </section>
  );
}
