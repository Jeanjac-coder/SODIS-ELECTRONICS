import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui/misc";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Marques partenaires",
  description: "SODIS Electronics est distributeur officiel LG en Côte d'Ivoire. Découvrez nos marques partenaires et nos technologies phares.",
  alternates: { canonical: "/marques" },
};

const techs = [
  { name: "OLED evo", text: "Pixels auto-éclairés, noirs parfaits, contraste infini." },
  { name: "QNED MiniLED", text: "Luminosité et couleurs Quantum Dot, jusqu'à 100 pouces." },
  { name: "webOS & ThinQ™", text: "Une maison connectée, pilotée depuis votre smartphone." },
  { name: "DUAL Inverter", text: "Jusqu'à 70 % d'économie d'énergie sur la climatisation." },
  { name: "AI DD™ & Steam™", text: "Le lave-linge qui reconnaît vos textiles et les protège." },
  { name: "LinearCooling™", text: "Une température stable pour des aliments frais plus longtemps." },
];

export default function BrandsPage() {
  return (
    <>
      <PageHeader crumbs={[{ href: "/marques", label: "Marques partenaires" }]} eyebrow="Partenaires" title="Distributeur officiel LG en Côte d'Ivoire." lead="Nous avons choisi de travailler avec les marques qui partagent notre exigence. Au cœur de notre offre : LG Electronics, leader mondial de l'électronique grand public." />
      <section className="container-x">
        <Reveal>
          <div className="grid items-center gap-10 overflow-hidden rounded-[40px] bg-ink p-10 text-bg md:grid-cols-[auto_1fr] md:p-16">
            <span className="grid h-40 w-40 place-items-center rounded-full bg-[#A50034] font-display text-6xl font-bold text-white">LG</span>
            <div>
              <p className="eyebrow mb-3">Partenaire principal</p>
              <h2 className="h-section">LG Electronics — Life&apos;s Good</h2>
              <p className="mt-4 max-w-2xl text-[16px] leading-relaxed opacity-70">
                TV, audio, froid, lavage, climatisation et cuisson : SODIS Electronics distribue {products.length} références LG via le circuit officiel, avec garantie constructeur et
                accompagnement local.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Link key={c.slug} href={`/categories/${c.slug}`} className="rounded-full bg-white/10 px-4 py-2 text-[13px] transition hover:bg-white hover:text-ink">
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>
      <section className="container-x mt-32">
        <SectionHeading eyebrow="Technologies" title="L'innovation LG, expliquée simplement." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techs.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05}>
              <div className="h-full rounded-[28px] border border-line p-8">
                <p className="font-display text-2xl font-semibold tracking-tight">{t.name}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="container-x mt-32 grid items-center gap-10 rounded-[40px] bg-soft p-10 md:grid-cols-2 md:p-16">
        <div>
          <h2 className="h-section text-balance">Vous êtes une marque ? Devenons partenaires.</h2>
          <p className="lead mt-4">Nous développons notre portefeuille avec des marques premium d&apos;électronique et d&apos;électroménager. Parlons distribution en Côte d&apos;Ivoire.</p>
          <ButtonLink href="/contact" className="mt-8" size="lg">
            Proposer un partenariat
          </ButtonLink>
        </div>
        <div className="relative aspect-[4/3]">
          <Image src="/images/products/oled83g56la.webp" alt="" fill sizes="40vw" className="object-contain" />
        </div>
      </section>
    </>
  );
}
