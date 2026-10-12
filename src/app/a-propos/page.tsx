import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/misc";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { Stats, TrustBlock, BigCta } from "@/components/home/sections";
import { timeline, values } from "@/data/content";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "À propos",
  description: "SODIS Electronics (SODIS-MAD CI), distributeur officiel LG en Côte d'Ivoire : notre histoire, nos valeurs, notre engagement qualité.",
  alternates: { canonical: "/a-propos" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader crumbs={[{ href: "/a-propos", label: "À propos" }]} eyebrow="Notre histoire" title="On équipe la Côte d'Ivoire avec ce qui se fait de meilleur." lead={`${site.name} est la marque de ${site.legalName}. Notre métier : rendre la technologie premium accessible, avec le service qui va avec.`} />
      <section className="container-x grid gap-4 md:grid-cols-3">
        {["/images/products/oled83c56la.webp", "/images/products/xl9t.webp", "/images/products/gcfb50fplam.webp"].map((src, i) => (
          <Reveal key={src} delay={i * 0.08} className={i === 0 ? "md:col-span-2" : ""}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] bg-soft md:aspect-auto md:h-[420px]">
              <Image src={src} alt="" fill sizes="(max-width: 768px) 90vw, 50vw" className="object-contain p-12" />
            </div>
          </Reveal>
        ))}
      </section>
      <section className="container-x mt-32 grid gap-10 lg:grid-cols-2">
        <SectionHeading eyebrow="Mission" title="La qualité, chez nous, ce n'est pas palabre." className="mb-0" />
        <div className="space-y-5 text-[17px] leading-relaxed text-ink-soft">
          <p>Tout est parti d&apos;un constat simple : trop de clients achetaient du matériel sans garantie, sans conseil et sans suivi. Nous avons voulu faire autrement.</p>
          <p>En devenant distributeur officiel LG, nous avons fait un choix clair : des produits authentiques, une garantie respectée, des techniciens formés, et un conseiller qui décroche quand vous appelez.</p>
          <p>Aujourd&apos;hui, particuliers, familles, hôtels, bureaux et commerces nous font confiance pour équiper leur quotidien. Et on compte bien continuer à mériter cette confiance, livraison après livraison.</p>
        </div>
      </section>
      <section className="container-x mt-32">
        <SectionHeading eyebrow="Nos valeurs" title="Ce qui nous guide, chaque jour." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <div className="h-full rounded-[28px] border border-line p-7">
                <span className="font-display text-sm font-semibold text-secondary">0{i + 1}</span>
                <h3 className="mt-4 text-[20px] font-semibold">{v.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="container-x mt-32">
        <SectionHeading eyebrow="Timeline" title="Notre parcours." />
        <ol className="relative border-l border-line pl-8 md:pl-12">
          {timeline.map((t, i) => (
            <Reveal as="li" key={t.title} delay={i * 0.08} x={-20} y={0} className="relative pb-14 last:pb-0">
              <span className="absolute -left-[41px] top-1 grid h-4 w-4 place-items-center rounded-full border-2 border-secondary bg-bg md:-left-[57px]" />
              <p className="eyebrow">{t.year}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{t.title}</h3>
              <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted">{t.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>
      <Stats />
      <TrustBlock />
      <BigCta />
    </>
  );
}
