import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/misc";
import { BlogCards } from "@/components/home/blog-cards";
import { posts } from "@/data/content";

export const metadata: Metadata = {
  title: "Blog & conseils",
  description: "Guides d'achat, conseils d'entretien et astuces d'experts pour bien choisir et bien utiliser vos appareils LG.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHeader crumbs={[{ href: "/blog", label: "Blog" }]} eyebrow="Blog & conseils" title="Les conseils de nos experts, sans jargon." lead="Bien choisir sa TV, dimensionner sa clim, faire durer son frigo : tout ce qu'il faut savoir avant (et après) l'achat." />
      <section className="container-x">
        <BlogCards posts={posts} />
      </section>
    </>
  );
}
