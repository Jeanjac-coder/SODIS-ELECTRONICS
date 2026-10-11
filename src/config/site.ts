/**
 * Configuration centrale du site.
 *
 * ⚠️ Les valeurs marquées « À CONFIRMER » ne figurent pas dans le catalogue
 * source (seuls le téléphone, LinkedIn/Facebook « Sodis electronics » et
 * Instagram « Sodis_electronics » y sont indiqués). Remplacez-les avant
 * la mise en ligne.
 */
export const site = {
  name: "SODIS Electronics",
  legalName: "SODIS-MAD CI — Société de Distribution de Matériaux Divers en Côte d'Ivoire",
  shortName: "SODIS",
  tagline: "Distributeur officiel LG en Côte d'Ivoire",
  description:
    "SODIS Electronics, distributeur officiel LG en Côte d'Ivoire : TV OLED & QNED, audio XBOOM, climatiseurs, réfrigérateurs, lave-linge et électroménager. Livraison, installation et SAV partout en Côte d'Ivoire.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sodis-electronics.ci", // À CONFIRMER
  locale: "fr_CI",
  phone: "+225 07 98 08 08 08",
  phoneHref: "tel:+2250798080808",
  whatsapp: "2250798080808",
  email: "contact@sodis-electronics.ci", // À CONFIRMER
  emailSav: "sav@sodis-electronics.ci", // À CONFIRMER
  address: {
    street: "Abidjan", // À CONFIRMER — adresse du siège / showroom
    city: "Abidjan",
    country: "CI",
  },
  hours: "Lun – Sam · 8h30 – 19h00", // À CONFIRMER
  responseTime: "≈ 15 min sur WhatsApp",
  social: {
    instagram: "https://www.instagram.com/sodis_electronics/",
    facebook: "https://www.facebook.com/", // À CONFIRMER — page « Sodis electronics »
    linkedin: "https://www.linkedin.com/", // À CONFIRMER — page « Sodis electronics »
    messenger: "https://m.me/", // À CONFIRMER — identifiant de la page Facebook
  },
  /**
   * Indicateurs « preuve sociale » (visiteurs en ligne, « X personnes consultent »).
   * Ils sont SIMULÉS côté navigateur tant qu'aucune source analytics n'est branchée.
   * Mettre `enabled: false` pour les masquer.
   */
  liveSignals: { enabled: true, simulated: true },
  /** Paiement échelonné — désactiver si non proposé */
  installments: { enabled: true, months: [3, 6, 12], monthlyRate: 0 },
  /** Chiffres clés — À CONFIRMER */
  stats: [
    { value: 10000, suffix: "+", label: "Clients équipés" },
    { value: 3, suffix: "", label: "Showrooms" },
    { value: 100, suffix: "+", label: "Références LG" },
    { value: 10, suffix: " ans", label: "D'expérience" },
  ],
} as const;

export const waLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const nav = [
  { href: "/", label: "Accueil" },
  { href: "/produits", label: "Produits", mega: true },
  { href: "/categories", label: "Catégories" },
  { href: "/promotions", label: "Promotions" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerNav = {
  Boutique: [
    { href: "/produits", label: "Tous les produits" },
    { href: "/categories", label: "Catégories" },
    { href: "/promotions", label: "Promotions" },
    { href: "/marques", label: "Marques partenaires" },
    { href: "/comparateur", label: "Comparateur" },
    { href: "/telechargements", label: "Téléchargements" },
  ],
  Services: [
    { href: "/services", label: "Nos services" },
    { href: "/installation-sav", label: "Installation & SAV" },
    { href: "/devis", label: "Demande de devis" },
    { href: "/services#configurateur", label: "Configurateur de packs" },
    { href: "/faq", label: "FAQ" },
  ],
  SODIS: [
    { href: "/a-propos", label: "À propos" },
    { href: "/magasins", label: "Nos magasins" },
    { href: "/blog", label: "Blog & conseils" },
    { href: "/contact", label: "Contact" },
  ],
  Légal: [
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/conditions-generales", label: "Conditions générales" },
    { href: "/politique-de-confidentialite", label: "Confidentialité" },
    { href: "/politique-de-livraison", label: "Livraison & retours" },
  ],
};
