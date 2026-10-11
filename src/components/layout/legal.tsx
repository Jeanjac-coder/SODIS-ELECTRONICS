import { PageHeader } from "@/components/ui/misc";

export function LegalPage({ slug, title, lead, updated, sections }: { slug: string; title: string; lead: string; updated: string; sections: { id: string; title: string; body: React.ReactNode }[] }) {
  return (
    <>
      <PageHeader crumbs={[{ href: `/${slug}`, label: title }]} eyebrow={`Mise à jour : ${updated}`} title={title} lead={lead} />
      <div className="container-x grid gap-12 lg:grid-cols-[260px_1fr]">
        <nav aria-label="Sommaire" className="hidden lg:block">
          <ol className="sticky top-28 space-y-2 border-l border-line pl-5 text-[14px]">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-muted transition hover:text-ink">
                  {i + 1}. {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <article className="prose-sodis max-w-3xl text-[16px]">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-28">
              <h2>
                {i + 1}. {s.title}
              </h2>
              {s.body}
            </section>
          ))}
        </article>
      </div>
    </>
  );
}
