import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/categories";
import { byCategory, families } from "@/data/products";
import { CategoryIcon, PageHeader } from "@/components/ui/misc";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Catégories",
  description: "Téléviseurs, audio, climatisation, réfrigérateurs, lave-linge et cuisine : explorez tous les univers LG chez SODIS Electronics.",
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
  return (
    <>
      <PageHeader crumbs={[{ href: "/categories", label: "Catégories" }]} eyebrow="Univers" title="Six univers. Une seule exigence." lead="Choisissez votre univers, on s'occupe du reste : conseil, livraison, installation et SAV." />
      <section className="container-x space-y-4">
        {categories.map((c, i) => {
          const list = byCategory(c.slug);
          return (
            <Reveal key={c.slug} delay={0.04 * i}>
              <Link href={`/categories/${c.slug}`} className="group grid items-center gap-8 overflow-hidden rounded-[36px] bg-soft p-8 transition hover:shadow-[0_40px_80px_-40px_rgb(0_0_0/0.3)] md:grid-cols-[1.2fr_1fr] md:p-12">
                <div className={i % 2 ? "md:order-2" : ""}>
                  <span className="mb-6 inline-grid h-12 w-12 place-items-center rounded-2xl bg-elev">
                    <CategoryIcon icon={c.icon} className="h-6 w-6" />
                  </span>
                  <h2 className="h-section">{c.name}</h2>
                  <p className="lead mt-4 max-w-md">{c.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {families(list).map((f) => (
                      <span key={f} className="rounded-full bg-elev px-3 py-1.5 text-[12px] text-ink-soft">
                        {f}
                      </span>
                    ))}
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium">
                    {list.length} produits <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>
                <div className="relative aspect-[4/3]">
                  <Image src={c.hero} alt={c.name} fill sizes="(max-width: 768px) 90vw, 40vw" className="object-contain transition duration-[1200ms] ease-[var(--ease-premium)] group-hover:scale-105" />
                </div>
              </Link>
            </Reveal>
          );
        })}
      </section>
    </>
  );
}
