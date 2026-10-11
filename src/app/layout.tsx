import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/layout/providers";
import { SearchDialog } from "@/components/widgets/search";
import { Assistant } from "@/components/widgets/assistant";
import { FloatingActions, Toaster } from "@/components/widgets/floating";
import { SmoothScroll, CustomCursor } from "@/components/widgets/fx";
import { CompareBar } from "@/components/product/catalog";
import { themeScript } from "@/components/widgets/theme";
import { JsonLd } from "@/components/ui/misc";
import { stores } from "@/data/stores";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Distributeur officiel LG en Côte d'Ivoire`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: ["LG Côte d'Ivoire", "distributeur LG Abidjan", "TV OLED Abidjan", "climatiseur LG", "réfrigérateur LG", "XBOOM", "électroménager Abidjan", "SODIS Electronics"],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Distributeur officiel LG en Côte d'Ivoire`,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CI" suppressHydrationWarning className={`${inter.variable} ${display.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-bg">
          Aller au contenu
        </a>
        <Providers>
          <SmoothScroll />
          <Navbar />
          <main id="contenu">{children}</main>
          <Footer />
          <FloatingActions />
          <CompareBar />
          <SearchDialog />
          <Assistant />
          <Toaster />
          <CustomCursor />
        </Providers>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ElectronicsStore",
            "@id": `${site.url}/#organization`,
            name: site.name,
            legalName: site.legalName,
            description: site.description,
            url: site.url,
            logo: `${site.url}/brand/sodis-logo.png`,
            image: `${site.url}/opengraph-image`,
            telephone: site.phone,
            email: site.email,
            address: { "@type": "PostalAddress", addressLocality: site.address.city, addressCountry: site.address.country },
            areaServed: { "@type": "Country", name: "Côte d'Ivoire" },
            sameAs: [site.social.instagram, site.social.facebook, site.social.linkedin],
            brand: { "@type": "Brand", name: "LG" },
            department: stores.map((s) => ({
              "@type": "ElectronicsStore",
              name: s.name,
              telephone: s.phone,
              address: { "@type": "PostalAddress", streetAddress: s.address, addressLocality: s.city, addressCountry: "CI" },
              geo: { "@type": "GeoCoordinates", latitude: s.lat, longitude: s.lng },
            })),
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: site.url,
            name: site.name,
            inLanguage: "fr-CI",
            potentialAction: { "@type": "SearchAction", target: `${site.url}/produits?q={search_term_string}`, "query-input": "required name=search_term_string" },
          }}
        />
      </body>
    </html>
  );
}
