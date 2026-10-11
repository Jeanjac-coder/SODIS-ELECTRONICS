import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/legal";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "Conditions générales de vente de SODIS Electronics : devis, commandes, prix, paiement, livraison, garanties, responsabilité.",
  alternates: { canonical: "/conditions-generales" },
};

export default function TermsPage() {
  return (
    <LegalPage
      slug="conditions-generales"
      title="Conditions générales de vente"
      updated="11 octobre 2026"
      lead="Les règles du jeu, écrites simplement, pour une relation claire et équilibrée."
      sections={[
        {
          id: "objet",
          title: "Objet",
          body: <p>Les présentes conditions régissent les ventes de produits et services conclues entre {site.legalName} (« SODIS Electronics ») et ses clients, particuliers ou professionnels, notamment à la suite d&apos;une demande effectuée sur ce site. Elles s&apos;appliquent dans le respect de la loi n° 2016-412 du 15 juin 2016 relative à la consommation.</p>,
        },
        {
          id: "devis",
          title: "Devis et commande",
          body: <p>Le site est une vitrine : les demandes formulées en ligne (panier de devis, formulaire, WhatsApp) ne constituent pas une commande ferme. Toute vente est formalisée par un devis ou une facture pro forma acceptée par le client. Les devis sont valables 15 jours sauf mention contraire, dans la limite des stocks disponibles.</p>,
        },
        {
          id: "prix",
          title: "Prix",
          body: <p>Les prix sont exprimés en francs CFA (FCFA), toutes taxes comprises pour les particuliers. Les frais de livraison et d&apos;installation sont indiqués séparément sur le devis. Les illustrations sont non contractuelles ; les caractéristiques sont celles communiquées par le constructeur.</p>,
        },
        {
          id: "paiement",
          title: "Paiement",
          body: <p>Moyens acceptés : Wave, Orange Money, MTN Mobile Money, Moov Money, carte bancaire (Visa, Mastercard), virement bancaire et, selon la zone et le montant, paiement à la livraison. Un acompte peut être demandé pour les commandes spéciales ou les projets. Un paiement échelonné peut être proposé selon conditions, précisées par écrit. Chaque paiement donne lieu à un reçu.</p>,
        },
        {
          id: "livraison",
          title: "Livraison et installation",
          body: (
            <p>
              Les modalités, délais et frais sont détaillés dans la <Link href="/politique-de-livraison">politique de livraison</Link>. Le transfert des risques intervient à la remise du produit au
              client.
            </p>
          ),
        },
        {
          id: "garanties",
          title: "Garanties",
          body: <p>Les produits bénéficient de la garantie constructeur LG, dont la durée figure sur la facture, ainsi que des garanties légales prévues par la réglementation ivoirienne. Sont exclus : la casse, l&apos;oxydation, les dommages dus à une surtension, à une installation non conforme ou à une utilisation anormale, et les interventions de tiers non agréés.</p>,
        },
        {
          id: "retours",
          title: "Retours et réclamations",
          body: (
            <p>
              Voir la <Link href="/politique-de-livraison#retours">politique de retours</Link>. Toute réclamation peut être adressée à {site.email} ou au {site.phone}.
            </p>
          ),
        },
        {
          id: "responsabilite",
          title: "Responsabilité",
          body: <p>SODIS Electronics ne saurait être tenue responsable des dommages indirects, ni en cas de force majeure. Sa responsabilité est limitée au montant de la commande concernée, dans les limites permises par la loi.</p>,
        },
        {
          id: "litiges",
          title: "Droit applicable et litiges",
          body: <p>Les présentes conditions sont soumises au droit ivoirien. En cas de litige, une solution amiable sera recherchée en priorité ; à défaut, les juridictions compétentes d&apos;Abidjan seront saisies.</p>,
        },
      ]}
    />
  );
}
