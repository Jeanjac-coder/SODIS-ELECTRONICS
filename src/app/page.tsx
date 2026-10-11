import { Hero } from "@/components/home/hero";
import { BigCta, CategoryBento, FlashDeals, PackConfigurator, ProductTabs, Reassurance, ServiceBlock, Stats, Testimonials, TrustBlock, VideoGallery } from "@/components/home/sections";
import { StoresMap } from "@/components/home/stores-map";
import { BlogCards } from "@/components/home/blog-cards";
import { SectionHeading, Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { RecentlyViewed } from "@/components/product/product-extras";
import { posts } from "@/data/content";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Reassurance />

      {/* Manifeste */}
      <section className="container-x mt-32">
        <Reveal>
          <p className="mx-auto max-w-5xl text-balance text-center font-display text-[clamp(1.6rem,3.4vw,3rem)] font-medium leading-[1.2] tracking-[-0.02em]">
            Chez SODIS Electronics, on ne vend pas seulement des appareils.{" "}
            <span className="text-muted">On équipe votre quotidien avec ce qui se fait de meilleur — et on reste là après la livraison.</span>
          </p>
        </Reveal>
      </section>

      <CategoryBento />
      <ProductTabs />
      <FlashDeals />
      <PackConfigurator />
      <Stats />
      <ServiceBlock />
      <Testimonials />
      <TrustBlock />
      <VideoGallery />

      <section className="container-x mt-32" aria-labelledby="stores-title">
        <SectionHeading eyebrow="Nos magasins" title={<span id="stores-title">Passez nous voir, on vous montre tout.</span>} lead="Venez voir l'OLED en vrai, écouter les XBOOM et repartir avec les bons conseils." />
        <StoresMap />
      </section>

      <section className="container-x mt-32" aria-labelledby="blog-title">
        <SectionHeading eyebrow="Blog & conseils" title={<span id="blog-title">Bien choisir, sans se tromper.</span>}>
          <ButtonLink href="/blog" variant="outline" size="sm" className="mt-2 w-fit">
            Tous les articles
          </ButtonLink>
        </SectionHeading>
        <BlogCards posts={posts.slice(0, 3)} />
      </section>

      <RecentlyViewed />
      <BigCta />
    </>
  );
}
