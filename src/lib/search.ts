import { products, type Product } from "@/data/products";
import { categories } from "@/data/categories";
import { normalize } from "./utils";

export type SearchHit =
  | { kind: "product"; product: Product; score: number }
  | { kind: "page"; href: string; label: string; hint: string; score: number };

const pages = [
  { href: "/devis", label: "Demande de devis", hint: "Recevez une offre sur mesure", k: "devis prix tarif offre entreprise" },
  { href: "/installation-sav", label: "Installation & SAV", hint: "Pose, réparation, garantie", k: "installation sav panne reparation garantie technicien" },
  { href: "/magasins", label: "Nos magasins", hint: "Showrooms, horaires, itinéraire", k: "magasin showroom adresse horaires itineraire" },
  { href: "/politique-de-livraison", label: "Livraison", hint: "Délais, frais, retours", k: "livraison delai frais retour echange" },
  { href: "/promotions", label: "Promotions", hint: "Offres flash et packs", k: "promo promotion offre solde flash pack" },
  { href: "/faq", label: "FAQ", hint: "Vos questions, nos réponses", k: "faq question aide paiement" },
  { href: "/contact", label: "Contact", hint: "WhatsApp, téléphone, email", k: "contact whatsapp telephone email messenger" },
  { href: "/telechargements", label: "Téléchargements", hint: "Catalogue PDF, fiches techniques", k: "catalogue pdf fiche technique notice telecharger" },
];

const synonyms: Record<string, string> = {
  tele: "tv", television: "tv", televiseur: "tv", ecran: "tv",
  clim: "climatiseur", climatisation: "climatiseur", split: "climatiseur",
  frigo: "refrigerateur", frigidaire: "refrigerateur", congelateur: "congelateur",
  machine: "lave-linge", laver: "lave-linge", lessive: "lave-linge",
  enceinte: "xboom", baffle: "xboom", sono: "xboom", son: "audio",
  micro: "micro-ondes", four: "micro-ondes", gaz: "cuisiniere",
};

const catWords: Record<string, string> = {
  televiseurs: "tv televiseur television ecran smart",
  audio: "audio son enceinte xboom barre home cinema chaine",
  climatisation: "climatiseur clim split btu cv inverter",
  refrigeration: "refrigerateur frigo congelateur froid",
  lavage: "lave-linge machine laver sechant",
  cuisine: "cuisine micro-ondes cuisiniere four gaz",
};

const index = products.map((p) => ({
  p,
  text: normalize([p.model, p.name, p.family, p.tagline, p.specs.join(" "), catWords[p.category], p.finish ?? ""].join(" ")),
}));

export function search(q: string, limit = 8): SearchHit[] {
  const terms = normalize(q)
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => synonyms[t] ?? t);
  if (!terms.length) return [];
  const hits: SearchHit[] = [];
  for (const { p, text } of index) {
    let score = 0;
    for (const t of terms) {
      if (normalize(p.model).includes(t)) score += 6;
      else if (text.includes(t)) score += 2;
      else {
        score = -1;
        break;
      }
    }
    if (score > 0) hits.push({ kind: "product", product: p, score: score + (p.available ? 1 : 0) });
  }
  for (const pg of pages) {
    const t = normalize(pg.label + " " + pg.k);
    if (terms.every((x) => t.includes(x))) hits.push({ kind: "page", href: pg.href, label: pg.label, hint: pg.hint, score: 3 });
  }
  for (const c of categories) {
    const t = normalize(c.name + " " + catWords[c.slug]);
    if (terms.every((x) => t.includes(x)))
      hits.push({ kind: "page", href: `/categories/${c.slug}`, label: c.name, hint: "Catégorie", score: 5 });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}

export const popularSearches = ["OLED", "QNED 75", "XBOOM", "Climatiseur 12000 BTU", "Réfrigérateur", "Barre de son"];
