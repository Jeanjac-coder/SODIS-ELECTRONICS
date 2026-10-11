import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";

export function BlogCards({ posts }: { posts: Post[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((p, i) => (
        <Reveal key={p.slug} delay={i * 0.06} as="article">
          <Link href={`/blog/${p.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-soft">
              <Image src={p.image} alt="" fill sizes="(max-width: 768px) 90vw, 33vw" className="object-contain p-12 transition duration-[1200ms] ease-[var(--ease-premium)] group-hover:scale-105" />
              <span className="glass absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold">{p.category}</span>
            </div>
            <p className="mt-5 text-[12px] text-muted">
              {new Date(p.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} · {p.read} min de lecture
            </p>
            <h3 className="mt-2 text-[20px] font-semibold leading-snug tracking-tight transition group-hover:text-red">{p.title}</h3>
            <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-muted">{p.excerpt}</p>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
