import type { CategorySlug } from "./products";

export type Category = {
  slug: CategorySlug;
  name: string;
  short: string;
  description: string;
  hero: string;
  icon: "tv" | "speaker" | "wind" | "washing" | "refrigerator" | "cooking";
};

export const categories: Category[] = [
  {
    slug: "televiseurs",
    name: "Téléviseurs",
    short: "TV",
    description: "OLED evo, QNED MiniLED, NanoCell et UHD 4K : l'image LG dans toutes les tailles, de 43 à 100 pouces.",
    hero: "/images/products/oled65c56la.webp",
    icon: "tv",
  },
  {
    slug: "audio",
    name: "Audio & Son",
    short: "Audio",
    description: "XBOOM, barres de son Dolby Atmos, home cinéma et mini chaînes : le son qui met l'ambiance.",
    hero: "/images/products/xl9t.webp",
    icon: "speaker",
  },
  {
    slug: "climatisation",
    name: "Climatisation",
    short: "Clim",
    description: "Splits DUAL Inverter, ARTCOOL et armoires : la fraîcheur qui fait des économies.",
    hero: "/images/products/s4-q12jartb.webp",
    icon: "wind",
  },
  {
    slug: "refrigeration",
    name: "Réfrigérateurs",
    short: "Froid",
    description: "Combinés, multi-portes et congélateurs : LinearCooling™ et DoorCooling+™ pour une fraîcheur durable.",
    hero: "/images/products/gc-l22ffqpb.webp",
    icon: "refrigerator",
  },
  {
    slug: "lavage",
    name: "Lave-linge",
    short: "Lavage",
    description: "AI DD™, Steam™ et TurboWash : des lave-linge et lavantes-séchantes qui prennent soin de vos tissus.",
    hero: "/images/products/f0l9dyp2s.webp",
    icon: "washing",
  },
  {
    slug: "cuisine",
    name: "Cuisine",
    short: "Cuisine",
    description: "Micro-ondes NeoChef Smart Inverter et cuisinière 5 feux : cuisiner devient un plaisir.",
    hero: "/images/products/fa415rma.webp",
    icon: "cooking",
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
