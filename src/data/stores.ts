import { site } from "@/config/site";

/**
 * Points de vente SODIS Electronics.
 * La carte et l'itinéraire Google Maps utilisent `query` : pour un repère exact,
 * remplacez-le par les coordonnées GPS du magasin (ex. "5.3364,-4.0890").
 */
export type Store = {
  id: string;
  name: string;
  area: string;
  address: string;
  city: string;
  query: string;
  phone: string;
  hours: readonly { days: string; time: string }[];
  services: string[];
  main?: boolean;
};

const base = { city: "Abidjan", phone: site.phone, hours: site.openingHours };

export const stores: Store[] = [
  {
    ...base,
    id: "siege-yopougon",
    name: "Showroom au siège — SODIS-MAD CI",
    area: "Yopougon",
    address: "Siège SODIS-MAD CI, Yopougon, Abidjan",
    query: "Yopougon, Abidjan, Côte d'Ivoire",
    services: ["Showroom LG", "Conseil entreprise", "Retrait de commande"],
    main: true,
  },
  {
    ...base,
    id: "yopougon-siporex",
    name: "Boutique Yopougon Siporex",
    area: "Yopougon",
    address: "Siporex, Yopougon, Abidjan",
    query: "Siporex, Yopougon, Abidjan, Côte d'Ivoire",
    services: ["Boutique", "Retrait de commande"],
  },
  {
    ...base,
    id: "yopougon-sable",
    name: "Yopougon Sable (Dady Shop)",
    area: "Yopougon",
    address: "Dady Shop, Sable, Yopougon, Abidjan",
    query: "Yopougon Sable, Abidjan, Côte d'Ivoire",
    services: ["Boutique", "Retrait de commande"],
  },
  {
    ...base,
    id: "koumassi-remblais",
    name: "Koumassi Remblais",
    area: "Koumassi",
    address: "Remblais, Koumassi, Abidjan",
    query: "Koumassi Remblais, Abidjan, Côte d'Ivoire",
    services: ["Boutique", "Retrait de commande"],
  },
  {
    ...base,
    id: "treichville-rue-11",
    name: "Treichville Rue 11",
    area: "Treichville",
    address: "Rue 11, Treichville, Abidjan",
    query: "Rue 11, Treichville, Abidjan, Côte d'Ivoire",
    services: ["Boutique", "Retrait de commande"],
  },
  {
    ...base,
    id: "treichville-rue-12",
    name: "Treichville Rue 12",
    area: "Treichville",
    address: "Rue 12, Treichville, Abidjan",
    query: "Rue 12, Treichville, Abidjan, Côte d'Ivoire",
    services: ["Boutique", "Retrait de commande"],
  },
  {
    ...base,
    id: "bonoua",
    name: "Bonoua",
    area: "Bonoua",
    address: "Bonoua",
    city: "Bonoua",
    query: "Bonoua, Côte d'Ivoire",
    services: ["Boutique", "Retrait de commande"],
  },
  {
    ...base,
    id: "faya-cite-sir",
    name: "Faya Cité SIR",
    area: "Faya",
    address: "Cité SIR, Faya, Abidjan",
    query: "Cité SIR Faya, Abidjan, Côte d'Ivoire",
    services: ["Boutique", "Retrait de commande"],
  },
  {
    ...base,
    id: "autoroute-songon",
    name: "Autoroute Songon",
    area: "Songon",
    address: "Autoroute, Songon",
    city: "Songon",
    query: "Songon, Côte d'Ivoire",
    services: ["Boutique", "Retrait de commande"],
  },
  {
    ...base,
    id: "bingerville",
    name: "Bingerville",
    area: "Bingerville",
    address: "Bingerville",
    city: "Bingerville",
    query: "Bingerville, Côte d'Ivoire",
    services: ["Boutique", "Retrait de commande"],
  },
];

export const storesTagline = "…et bientôt dans toutes les grandes villes du pays.";

export const mapsEmbed = (s: Pick<Store, "query">, zoom = 15) => `https://maps.google.com/maps?q=${encodeURIComponent(s.query)}&z=${zoom}&hl=fr&output=embed`;
export const mapsDirections = (s: Pick<Store, "query">) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(s.query)}`;
