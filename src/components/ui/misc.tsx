import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Tv, Speaker, Wind, WashingMachine, Refrigerator, CookingPot } from "lucide-react";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import type { Category } from "@/data/categories";

export function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" aria-label={`${site.name} — accueil`} className={cn("relative inline-flex items-center", className)} data-cursor="hover">
      <Image src="/brand/sodis-logo.webp" alt="SODIS Electronics" width={667} height={218} priority={priority} className="h-9 w-auto dark:hidden md:h-10" />
      <Image src="/brand/sodis-logo-light.webp" alt="" aria-hidden width={667} height={218} priority={priority} className="hidden h-9 w-auto dark:block md:h-10" />
    </Link>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export type Crumb = { href: string; label: string };

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const all = [{ href: "/", label: "Accueil" }, ...items];
  return (
    <>
      <nav aria-label="Fil d'Ariane" className={cn("text-[13px] text-muted", className)}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((c, i) => (
            <li key={c.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden />}
              {i === all.length - 1 ? (
                <span aria-current="page" className="text-ink">
                  {c.label}
                </span>
              ) : (
                <Link href={c.href} className="transition hover:text-ink">
                  {c.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: `${site.url}${c.href}` })),
        }}
      />
    </>
  );
}

export function PageHeader({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
  className,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("container-x pt-32 pb-14 md:pt-40 md:pb-20", className)}>
      <Breadcrumbs items={crumbs} className="mb-10" />
      {eyebrow && (
        <Reveal>
          <p className="eyebrow mb-5">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h1 className="h-display max-w-5xl text-balance">{title}</h1>
      </Reveal>
      {lead && (
        <Reveal delay={0.12}>
          <p className="lead mt-6 max-w-2xl text-pretty">{lead}</p>
        </Reveal>
      )}
      {children}
    </section>
  );
}

const icons = { tv: Tv, speaker: Speaker, wind: Wind, washing: WashingMachine, refrigerator: Refrigerator, cooking: CookingPot };
export function CategoryIcon({ icon, className }: { icon: Category["icon"]; className?: string }) {
  const I = icons[icon];
  return <I className={className} strokeWidth={1.5} aria-hidden />;
}

export function Badge({ children, tone = "neutral", className }: { children: React.ReactNode; tone?: "neutral" | "red" | "green" | "dark" | "gold"; className?: string }) {
  const tones = {
    neutral: "bg-soft text-ink-soft",
    red: "bg-accent text-[#253060]",
    green: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    dark: "bg-primary text-white",
    gold: "bg-gold/15 text-[#8a6410] dark:text-gold",
  };
  return <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide", tones[tone], className)}>{children}</span>;
}
