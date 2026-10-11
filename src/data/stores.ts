import { site } from "@/config/site";

/**
 * Showrooms SODIS Electronics.
 *
 * ⚠️ À CONFIRMER : le catalogue source ne mentionne pas d'adresse.
 * Les entrées ci-dessous sont des EXEMPLES à remplacer par les adresses,
 * coordonnées GPS, téléphones et horaires réels avant la mise en ligne.
 * La carte Google Maps et les itinéraires se mettent à jour automatiquement.
 */
export type Store = {
  id: string;
  name: string;
  area: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  phone: string;
  hours: { days: string; time: string }[];
  services: string[];
  main?: boolean;
};

export const stores: Store[] = [
  {
    id: "abidjan-plateau",
    name: "SODIS Showroom — Plateau",
    area: "Plateau",
    address: "Plateau, Abidjan (adresse à confirmer)",
    city: "Abidjan",
    lat: 5.3236,
    lng: -4.0197,
    phone: site.phone,
    hours: [
      { days: "Lundi – Vendredi", time: "8h30 – 19h00" },
      { days: "Samedi", time: "9h00 – 18h00" },
      { days: "Dimanche", time: "Fermé" },
    ],
    services: ["Showroom LG", "Retrait de commande", "Conseil entreprise"],
    main: true,
  },
  {
    id: "abidjan-cocody",
    name: "SODIS Showroom — Cocody",
    area: "Cocody",
    address: "Cocody, Abidjan (adresse à confirmer)",
    city: "Abidjan",
    lat: 5.3599,
    lng: -3.9874,
    phone: site.phone,
    hours: [
      { days: "Lundi – Samedi", time: "9h00 – 19h00" },
      { days: "Dimanche", time: "Fermé" },
    ],
    services: ["Showroom TV & Audio", "Démonstration OLED", "Retrait de commande"],
  },
  {
    id: "abidjan-marcory",
    name: "SODIS Point SAV — Marcory",
    area: "Marcory",
    address: "Marcory, Abidjan (adresse à confirmer)",
    city: "Abidjan",
    lat: 5.3029,
    lng: -3.9845,
    phone: site.phone,
    hours: [
      { days: "Lundi – Vendredi", time: "8h00 – 18h00" },
      { days: "Samedi", time: "9h00 – 13h00" },
    ],
    services: ["Atelier SAV", "Dépôt / retrait réparation", "Pièces détachées"],
  },
];

export const mapsEmbed = (s: Pick<Store, "lat" | "lng">, zoom = 14) => `https://maps.google.com/maps?q=${s.lat},${s.lng}&z=${zoom}&hl=fr&output=embed`;
export const mapsDirections = (s: Pick<Store, "lat" | "lng">) => `https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`;
