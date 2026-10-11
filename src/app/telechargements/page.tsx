import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download, FileText } from "lucide-react";
import { PageHeader } from "@/components/ui/misc";
import { categories } from "@/data/categories";
import { byCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "Téléchargements : catalogue PDF & fiches techniques",
  description: "Téléchargez le catalogue LG SODIS Electronics (PDF) et les fiches techniques de chaque produit.",
  alternates: { canonical: "/telechargements" },
};

export default function DownloadsPage() {
  return (
    <>
      <PageHeader crumbs={[{ href: "/telechargements", label: "Téléchargements" }]} eyebrow="Espace téléchargement" title="Catalogues, fiches techniques, notices." lead="Toute la documentation utile, à garder sous la main ou à partager." />
      <section className="container-x">
        <a href="/catalogue/catalogue-sodis-electronics-lg.pdf" download className="group flex flex-col items-start justify-between gap-6 rounded-[36px] bg-ink p-8 text-bg transition hover:bg-red sm:flex-row sm:items-center sm:p-12">
          <span className="flex items-center gap-5">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/10">
              <FileText className="h-7 w-7" />
            </span>
            <span>
              <span className="block text-[12px] uppercase tracking-[0.2em] opacity-60">PDF · 13 pages · 1,6 Mo</span>
              <span className="mt-1 block font-display text-2xl font-semibold">Catalogue produits LG — SODIS Electronics</span>
            </span>
          </span>
          <span className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[14px] font-medium text-ink">
            <Download className="h-4 w-4" /> Télécharger
          </span>
        </a>
      </section>
      <section className="container-x mt-16 space-y-14">
        {categories.map((c) => (
          <div key={c.slug}>
            <h2 className="mb-5 font-display text-2xl font-semibold tracking-tight">Fiches techniques — {c.name}</h2>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {byCategory(c.slug).map((p) => (
                <li key={p.slug}>
                  <Link href={`/produits/${p.slug}/fiche`} className="flex items-center gap-4 rounded-2xl border border-line p-3 transition hover:border-ink">
                    <Image src={p.image} alt="" width={48} height={48} className="h-12 w-12 rounded-xl bg-soft object-contain p-1" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-medium">{p.model}</span>
                      <span className="block truncate text-[12px] text-muted">{p.name}</span>
                    </span>
                    <Download className="h-4 w-4 text-muted" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p className="text-[13px] text-muted">Notices d&apos;utilisation officielles : disponibles sur demande auprès de notre SAV ou sur le site LG Afrique.</p>
      </section>
    </>
  );
}
