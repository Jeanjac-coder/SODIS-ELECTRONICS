import Link from "next/link";
import { Mail, MapPin, Phone, Clock, Download } from "lucide-react";
import { footerNav, site, waLink } from "@/config/site";
import { Logo } from "@/components/ui/misc";
import { PaymentLogos } from "@/components/ui/payments";
import { NewsletterForm } from "@/components/forms/newsletter";
import { SocialIcon, WhatsAppIcon } from "@/components/widgets/icons";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="container-x">
        <div className="grid gap-12 py-14 lg:grid-cols-[1.1fr_2fr] lg:gap-16 lg:py-16">
          {/* Marque + contact */}
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-muted">Distributeur officiel LG en Côte d&apos;Ivoire. Livraison, installation et SAV partout dans le pays.</p>
            <ul className="mt-6 space-y-2.5 text-[14px] text-ink-soft">
              <li>
                <a href={site.phoneHref} className="flex items-center gap-3 hover:text-secondary">
                  <Phone className="h-4 w-4 text-muted" /> {site.phone}
                </a>
              </li>
              <li>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-secondary">
                  <WhatsAppIcon className="h-4 w-4 text-muted" /> WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-secondary">
                  <Mail className="h-4 w-4 text-muted" /> {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted" /> {site.address.street}, {site.address.city}
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-muted" /> {site.hours}
              </li>
            </ul>
            <div className="mt-6 flex gap-2">
              {(["instagram", "facebook", "linkedin"] as const).map((s) => (
                <a
                  key={s}
                  href={site.social[s]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`SODIS Electronics sur ${s}`}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-soft transition hover:border-primary hover:text-ink"
                >
                  <SocialIcon name={s} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Liens + newsletter */}
          <div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {Object.entries(footerNav).map(([title, links]) => (
                <div key={title}>
                  <p className="mb-4 text-[13px] font-semibold text-ink">{title}</p>
                  <ul className="space-y-2.5">
                    {links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="text-[14px] text-muted transition hover:text-ink">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-12 grid gap-6 border-t border-line pt-10 md:grid-cols-[1fr_1.2fr] md:items-center">
              <div>
                <p className="text-[15px] font-semibold">Les bons plans, en premier</p>
                <p className="mt-1 text-[14px] text-muted">Nouveautés et offres LG, un email par mois.</p>
              </div>
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-6 text-[12px] text-muted md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <PaymentLogos size="sm" />
            <a href="/catalogue/catalogue-sodis-electronics-lg.pdf" download className="inline-flex items-center gap-1.5 hover:text-ink">
              <Download className="h-3.5 w-3.5" /> Catalogue LG (PDF)
            </a>
          </div>
          <p>
            © {new Date().getFullYear()} {site.name} · {site.legalName.split(" — ")[0]}. LG et les noms de produits associés sont des marques de LG Electronics.
          </p>
        </div>
      </div>
    </footer>
  );
}
