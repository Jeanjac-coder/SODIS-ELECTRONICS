import { z } from "zod";

const phone = z
  .string()
  .trim()
  .min(8, "Numéro trop court")
  .regex(/^[+\d\s().-]{8,20}$/, "Numéro invalide");
const consent = z.literal(true, { message: "Merci d'accepter le traitement de vos données." });

export const newsletterSchema = z.object({ email: z.string().trim().email("Adresse email invalide") });

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Votre nom, s'il vous plaît"),
  phone,
  email: z.string().trim().email("Adresse email invalide").optional().or(z.literal("")),
  subject: z.enum(["Information produit", "Commande", "Livraison", "SAV / Garantie", "Partenariat", "Autre"]),
  message: z.string().trim().min(10, "Dites-nous en un peu plus (10 caractères min.)"),
  consent,
});

export const callbackSchema = z.object({
  name: z.string().trim().min(2, "Votre nom, s'il vous plaît"),
  phone,
  slot: z.enum(["Dès que possible", "Matin (8h – 12h)", "Après-midi (12h – 16h)", "Fin de journée (16h – 19h)"]),
});

export const appointmentSchema = z.object({
  name: z.string().trim().min(2, "Votre nom, s'il vous plaît"),
  phone,
  date: z.string().min(1, "Choisissez une date"),
  time: z.string().min(1, "Choisissez un créneau"),
  store: z.string().min(1, "Choisissez un showroom"),
  reason: z.enum(["Découverte en showroom", "Conseil personnalisé", "Visite technique (installation)", "Intervention SAV"]),
});

export const quoteSchema = z
  .object({
    customerType: z.enum(["particulier", "entreprise"]),
    company: z.string().trim().optional(),
    name: z.string().trim().min(2, "Votre nom, s'il vous plaît"),
    phone,
    email: z.string().trim().email("Adresse email invalide"),
    city: z.string().trim().min(2, "Indiquez votre ville"),
    projectType: z.enum(["Équipement maison", "Rénovation / emménagement", "Bureau / entreprise", "Hôtel / résidence", "Commerce / restaurant", "Revente", "Autre"]),
    items: z.array(z.object({ slug: z.string(), qty: z.number().int().min(1).max(999) })).min(1, "Ajoutez au moins un produit"),
    budget: z.enum(["< 500 000 FCFA", "500 000 – 1 500 000 FCFA", "1 500 000 – 5 000 000 FCFA", "> 5 000 000 FCFA", "À définir"]),
    delivery: z.boolean(),
    installation: z.boolean(),
    payment: z.enum(["Paiement à la livraison", "À discuter"]),
    message: z.string().trim().max(2000).optional(),
    consent,
  })
  .refine((d) => d.customerType === "particulier" || (d.company && d.company.length > 1), {
    path: ["company"],
    message: "Nom de l'entreprise requis",
  });

export const formSchemas = {
  newsletter: newsletterSchema,
  contact: contactSchema,
  callback: callbackSchema,
  appointment: appointmentSchema,
  quote: quoteSchema,
} as const;

export type FormKind = keyof typeof formSchemas;
export type QuoteInput = z.infer<typeof quoteSchema>;
