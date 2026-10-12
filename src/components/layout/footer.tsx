import Link from "next/link";
import { Mail, MapPin, Phone, Clock, ArrowUpRight, Download } from "lucide-react";
import { footerNav, site, waLink } from "@/config/site";
import { Logo } from "@/components/ui/misc";
import { PaymentLogos } from "@/components/ui/payments";
import { NewsletterForm } from "@/components/forms/newsletter";
import { SocialIcon, WhatsAppIcon } from "@/components/widgets/icons";
import { LiveVisitors } from "@/components/widgets/floating";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-line bg-soft/60">
      <div className="container-x">
        {/* Newsletter */}
        <div className="grid gap-10 border-b border-line py-16 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <p className="eyebrow mb-4">Newsletter</p>
            <h2 className="h-section text-balance">Les bons plans arrivent d&apos;abord chez vous.</h2>
            <p className="lead mt-4 max-w-md">Nouveautés LG, ventes flash, conseils d&apos;experts. Un email par mois, pas plus — promis, on ne va pas vous fatiguer.</p>
          </div>
          <NewsletterForm />
        </div>

        <div className="grid gap-12 py-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-muted">
              Distributeur officiel LG en Côte d&apos;Ivoire. On ne vend pas seulement des appareils : on équipe votre quotidien avec ce qui se fait de meilleur.
            </p>
            <ul className="mt-8 space-y-3 text-[14px] text-ink-soft">
              <li>
                <a href={site.phoneHref} className="flex items-center gap-3 hover:text-secondary">
                  <Phone className="h-4 w-4" /> {site.phone}
                </a>
              </li>
              <li>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-secondary">
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp · {site.responseTime}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-secondary">
                  <Mail className="h-4 w-4" /> {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4" /> {site.address.street}, {site.address.city}, Côte d&apos;Ivoire
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4" /> {site.hours}
              </li>
            </ul>
            <div className="mt-8 flex gap-2">
              {(["instagram", "facebook", "linkedin"] as const).map((s) => (
                <a
                  key={s}
                  href={site.social[s]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`SODIS Electronics sur ${s}`}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink-soft transition hover:border-primary hover:text-ink"
                >
                  <SocialIcon name={s} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 md:col-span-8">
            {Object.entries(footerNav).map(([title, links]) => (
              <div key={title}>
                <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-ink">{title}</p>
                <ul className="space-y-3">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="group inline-flex items-center gap-1 text-[14px] text-muted transition hover:text-ink">
                        {l.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <a
              href="/catalogue/catalogue-sodis-electronics-lg.pdf"
              download
              className="col-span-2 flex items-center justify-between gap-4 rounded-3xl bg-primary p-6 text-white transition hover:bg-secondary hover:text-white sm:col-span-4"
            >
              <span>
                <span className="block text-[12px] uppercase tracking-[0.18em] opacity-70">Catalogue 2025</span>
                <span className="mt-1 block font-display text-xl font-semibold">Télécharger le catalogue LG (PDF)</span>
              </span>
              <Download className="h-6 w-6 shrink-0" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-line py-8 lg:flex-row lg:items-center lg:justify-between">
          <PaymentLogos size="sm" />
          <div className="flex flex-col gap-2 text-[12px] text-muted sm:flex-row sm:items-center sm:gap-6">
            <LiveVisitors />
            <p>© {new Date().getFullYear()} {site.name} · {site.legalName.split(" — ")[0]}. Tous droits réservés.</p>
          </div>
        </div>
        <p className="pb-8 text-[11px] leading-relaxed text-muted/80">
          LG, OLED evo, QNED, NanoCell, XBOOM, ThinQ, DUALCOOL, ARTCOOL et les logos associés sont des marques de LG Electronics. Les visuels produits sont issus du catalogue officiel LG distribué par SODIS Electronics.
        </p>
      </div>
    </footer>
  );
}
