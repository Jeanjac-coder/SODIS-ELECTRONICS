import { Hero } from "@/components/home/hero";
import { BrandBand, ProductTabs } from "@/components/home/sections";
import { CategoryGrid, ContactCta, HomeHeading, WhySodis } from "@/components/home/home-sections";
import { StoresMap } from "@/components/home/stores-map";
import { BlogCards } from "@/components/home/blog-cards";
import { posts } from "@/data/content";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandBand />
      <CategoryGrid />
      <ProductTabs />
      <WhySodis />

      <section className="container-x mt-24" aria-labelledby="stores-title">
        <HomeHeading eyebrow="Nos magasins" title="Passez nous voir" id="stores-title" href="/magasins" linkLabel="Tous les magasins" />
        <StoresMap />
      </section>

      <ContactCta />

      <section className="container-x mt-24" aria-labelledby="blog-title">
        <HomeHeading eyebrow="Conseils" title="Bien choisir, sans se tromper" id="blog-title" href="/blog" linkLabel="Tous les articles" />
        <BlogCards posts={posts.slice(0, 3)} />
      </section>
    </>
  );
}
