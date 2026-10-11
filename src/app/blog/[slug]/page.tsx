import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/data/content";
import { site } from "@/config/site";
import { Breadcrumbs, JsonLd } from "@/components/ui/misc";
import { BlogCards } from "@/components/home/blog-cards";
import { ButtonLink } from "@/components/ui/button";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.excerpt, publishedTime: p.date, images: [{ url: p.image }] },
  };
}

export default async function PostPage({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  return (
    <>
      <article className="container-x max-w-3xl pt-28 md:pt-36">
        <Breadcrumbs items={[{ href: "/blog", label: "Blog" }, { href: `/blog/${p.slug}`, label: p.title }]} className="mb-10" />
        <p className="eyebrow">{p.category}</p>
        <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-balance">{p.title}</h1>
        <p className="mt-6 text-[14px] text-muted">
          {new Date(p.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} · {p.read} min de lecture · Par l&apos;équipe SODIS
        </p>
        <div className="relative my-12 aspect-[16/9] overflow-hidden rounded-[32px] bg-soft">
          <Image src={p.image} alt="" fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-contain p-12" />
        </div>
        <div className="prose-sodis text-[17px]">
          {p.body.map((b, i) => (
            <div key={i}>
              {b.h && <h2>{b.h}</h2>}
              <p>{b.p}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 rounded-[28px] bg-soft p-8">
          <p className="font-display text-xl font-semibold">Besoin d&apos;un avis personnalisé ?</p>
          <p className="mt-2 text-muted">Nos conseillers vous répondent sur WhatsApp ou en showroom.</p>
          <ButtonLink href="/devis" className="mt-6">
            Demander un devis
          </ButtonLink>
        </div>
      </article>
      <section className="container-x mt-32">
        <h2 className="h-section mb-10">À lire aussi</h2>
        <BlogCards posts={posts.filter((x) => x.slug !== p.slug).slice(0, 3)} />
      </section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: p.title,
          description: p.excerpt,
          datePublished: p.date,
          image: `${site.url}${p.image}`,
          author: { "@type": "Organization", name: site.name },
          publisher: { "@id": `${site.url}/#organization` },
          mainEntityOfPage: `${site.url}/blog/${p.slug}`,
        }}
      />
    </>
  );
}
