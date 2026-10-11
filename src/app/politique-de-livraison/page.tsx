import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/legal";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Politique de livraison, retours & garanties",
  description: "Délais de livraison selon les villes de Côte d'Ivoire, frais, installation, suivi de commande, retours, échanges et garanties chez SODIS Electronics.",
  alternates: { canonical: "/politique-de-livraison" },
};

/** Délais indicatifs — à ajuster selon votre organisation logistique. */
const zones = [
  { zone: "Abidjan (toutes communes)", delay: "24 à 48 h ouvrées", fee: "Selon volume — indiqué dans le devis" },
  { zone: "Grand Abidjan (Bingerville, Anyama, Grand-Bassam, Songon…)", delay: "48 h ouvrées", fee: "Selon volume et distance" },
  { zone: "Yamoussoukro, Bouaké, San-Pédro, Daloa", delay: "2 à 4 jours ouvrés", fee: "Selon volume et distance" },
  { zone: "Korhogo, Man, Abengourou, Gagnoa et autres villes", delay: "3 à 5 jours ouvrés", fee: "Selon volume et distance" },
  { zone: "Zones rurales / difficiles d'accès", delay: "Sur étude", fee: "Sur devis" },
];

export default function DeliveryPage() {
  return (
    <LegalPage
      slug="politique-de-livraison"
      title="Livraison, retours & garanties"
      updated="11 octobre 2026"
      lead="Livraison rapide partout en Côte d'Ivoire, installation par nos techniciens, suivi en temps réel : voici comment ça se passe, noir sur blanc."
      sections={[
        {
          id: "delais",
          title: "Délais selon les villes",
          body: (
            <>
              <p>Les délais courent à compter de la confirmation de commande et du paiement (ou de l&apos;acompte convenu), pour un produit disponible en stock.</p>
              <table>
                <thead>
                  <tr>
                    <th>Zone</th>
                    <th>Délai indicatif</th>
                    <th>Frais</th>
                  </tr>
                </thead>
                <tbody>
                  {zones.map((z) => (
                    <tr key={z.zone}>
                      <td>{z.zone}</td>
                      <td>{z.delay}</td>
                      <td>{z.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>Pour les produits « bientôt disponibles », le délai d&apos;approvisionnement vous est communiqué dans le devis.</p>
            </>
          ),
        },
        {
          id: "frais",
          title: "Frais de livraison",
          body: (
            <>
              <p>Les frais dépendent de la zone, du volume et du nombre d&apos;appareils. Ils figurent toujours clairement sur votre devis ou votre facture pro forma, avant tout paiement.</p>
              <p>
                <strong>Livraison offerte</strong> : lors d&apos;opérations promotionnelles signalées sur la page <Link href="/promotions">Promotions</Link>, et selon les conditions précisées dans votre devis
                (notamment pour les commandes entreprises).
              </p>
              <p>Retrait gratuit dans nos showrooms : voir <Link href="/magasins">Nos magasins</Link>.</p>
            </>
          ),
        },
        {
          id: "installation",
          title: "Installation",
          body: (
            <ul>
              <li>TV : fixation murale, raccordements et configuration.</li>
              <li>Climatiseurs : pose, mise en service et tests (une visite technique préalable peut être nécessaire).</li>
              <li>Lave-linge, réfrigérateurs : mise en place, raccordement, contrôle.</li>
              <li>Home cinéma et barres de son : placement, connexion et calibrage.</li>
            </ul>
          ),
        },
        {
          id: "suivi",
          title: "Suivi de commande",
          body: <p>Vous êtes informé par SMS ou WhatsApp à chaque étape : confirmation, préparation, départ, créneau de livraison. Pour toute question, contactez-nous au {site.phone} avec votre référence de commande.</p>,
        },
        {
          id: "reception",
          title: "Réception",
          body: <p>Vérifiez l&apos;état du colis et de l&apos;appareil en présence du livreur. En cas de dommage visible, notez des réserves précises sur le bon de livraison et prévenez-nous sous 48 h avec photos.</p>,
        },
        {
          id: "retours",
          title: "Retours",
          body: (
            <>
              <p>Un produit défectueux à la livraison ou non conforme à la commande est repris ou échangé sans frais, après constat par nos équipes.</p>
              <p>Pour un retour de convenance, contactez-nous sous 7 jours : le produit doit être neuf, non installé, complet et dans son emballage d&apos;origine. Les éventuels frais de reprise vous sont indiqués au préalable.</p>
            </>
          ),
        },
        {
          id: "echanges",
          title: "Échanges",
          body: <p>Vous souhaitez une autre taille ou un autre modèle ? L&apos;échange est possible dans les mêmes conditions que le retour, avec ajustement de prix le cas échéant.</p>,
        },
        {
          id: "garanties",
          title: "Garanties",
          body: (
            <p>
              Tous nos produits bénéficient de la garantie constructeur LG, dont la durée et les conditions dépendent de la catégorie et figurent sur votre facture. Elle couvre les défauts de fabrication, à
              l&apos;exclusion des dommages liés à une mauvaise utilisation, une installation non conforme ou des surtensions. SODIS Electronics gère la prise en charge pour vous : voir{" "}
              <Link href="/installation-sav">Installation & SAV</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
