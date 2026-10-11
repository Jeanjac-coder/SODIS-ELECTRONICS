import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/legal";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Comment SODIS Electronics collecte, utilise et protège vos données personnelles, conformément à la loi ivoirienne n° 2013-450.",
  alternates: { canonical: "/politique-de-confidentialite" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      slug="politique-de-confidentialite"
      title="Politique de confidentialité"
      updated="11 octobre 2026"
      lead="Vos données vous appartiennent. Voici, en termes clairs, ce que nous collectons, pourquoi, combien de temps, et comment exercer vos droits."
      sections={[
        {
          id: "responsable",
          title: "Responsable du traitement",
          body: (
            <p>
              Le responsable du traitement est {site.legalName} (« SODIS Electronics »), {site.address.city}, Côte d&apos;Ivoire. Contact : <a href={`mailto:${site.email}`}>{site.email}</a> · {site.phone}. Les
              traitements sont mis en œuvre conformément à la loi n° 2013-450 du 19 juin 2013 relative à la protection des données à caractère personnel et aux exigences de l&apos;Autorité de
              Régulation des Télécommunications/TIC de Côte d&apos;Ivoire (ARTCI).
            </p>
          ),
        },
        {
          id: "collecte",
          title: "Données collectées",
          body: (
            <>
              <p>Nous collectons uniquement les données nécessaires :</p>
              <ul>
                <li>
                  <strong>Identité et contact</strong> : nom, téléphone, email, ville, entreprise (formulaires de devis, contact, rappel, rendez-vous, newsletter).
                </li>
                <li>
                  <strong>Projet</strong> : produits souhaités, quantités, budget, besoins de livraison et d&apos;installation.
                </li>
                <li>
                  <strong>Données techniques</strong> : adresse IP, type de navigateur, pages consultées, à des fins de sécurité et de mesure d&apos;audience.
                </li>
                <li>
                  <strong>Préférences locales</strong> : panier de devis, favoris, comparateur, thème clair/sombre, stockés uniquement dans votre navigateur (localStorage).
                </li>
              </ul>
              <p>Aucune donnée bancaire n&apos;est collectée sur ce site.</p>
            </>
          ),
        },
        {
          id: "finalites",
          title: "Finalités et bases légales",
          body: (
            <ul>
              <li>Répondre à vos demandes de devis, de contact et de rendez-vous (mesures précontractuelles).</li>
              <li>Exécuter vos commandes, livraisons, installations et le SAV (exécution du contrat).</li>
              <li>Vous envoyer la newsletter et des offres, uniquement avec votre consentement, retirable à tout moment.</li>
              <li>Améliorer le site et assurer sa sécurité (intérêt légitime).</li>
              <li>Respecter nos obligations comptables et fiscales (obligation légale).</li>
            </ul>
          ),
        },
        {
          id: "cookies",
          title: "Cookies et traceurs",
          body: (
            <>
              <p>
                Le site utilise le stockage local de votre navigateur pour mémoriser vos préférences (panier de devis, favoris, thème). Ces éléments sont strictement nécessaires au service et ne sont
                pas transmis à des tiers.
              </p>
              <p>
                Les contenus intégrés (Google Maps, vidéos YouTube, boutons WhatsApp / Messenger) peuvent déposer leurs propres cookies lorsque vous interagissez avec eux, selon les politiques de ces
                services. Si des outils de mesure d&apos;audience sont activés, ils ne le seront qu&apos;avec votre consentement lorsque la réglementation l&apos;exige.
              </p>
            </>
          ),
        },
        {
          id: "destinataires",
          title: "Destinataires",
          body: (
            <p>
              Vos données sont destinées aux équipes habilitées de SODIS Electronics (commercial, logistique, SAV) et, le cas échéant, à nos prestataires techniques (hébergement, envoi d&apos;emails,
              livraison) agissant sur nos instructions. Elles ne sont jamais vendues. Certains prestataires pouvant être situés hors de Côte d&apos;Ivoire, les transferts sont encadrés par des garanties
              appropriées.
            </p>
          ),
        },
        {
          id: "conservation",
          title: "Durée de conservation",
          body: (
            <table>
              <thead>
                <tr>
                  <th>Données</th>
                  <th>Durée</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Demandes de devis / contact sans suite</td>
                  <td>3 ans après le dernier contact</td>
                </tr>
                <tr>
                  <td>Données clients (commandes, SAV)</td>
                  <td>Durée de la relation + durée de garantie</td>
                </tr>
                <tr>
                  <td>Pièces comptables</td>
                  <td>10 ans (obligation légale)</td>
                </tr>
                <tr>
                  <td>Newsletter</td>
                  <td>Jusqu&apos;à désinscription</td>
                </tr>
                <tr>
                  <td>Journaux techniques</td>
                  <td>12 mois maximum</td>
                </tr>
              </tbody>
            </table>
          ),
        },
        {
          id: "securite",
          title: "Sécurité",
          body: <p>Connexion chiffrée (HTTPS), accès restreints et journalisés, prestataires sélectionnés pour leurs garanties de sécurité : nous mettons en œuvre des mesures techniques et organisationnelles adaptées pour protéger vos données contre la perte, l&apos;accès non autorisé ou la divulgation.</p>,
        },
        {
          id: "droits",
          title: "Vos droits",
          body: (
            <>
              <p>Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;opposition, de suppression et de retrait de votre consentement à tout moment.</p>
              <p>
                Pour les exercer : <a href={`mailto:${site.email}`}>{site.email}</a> ou par courrier à notre siège, en justifiant de votre identité. Réponse sous 30 jours. En cas de désaccord, vous pouvez
                saisir l&apos;ARTCI.
              </p>
            </>
          ),
        },
        {
          id: "contact",
          title: "Contact",
          body: (
            <p>
              Une question sur vos données ? Écrivez-nous à <a href={`mailto:${site.email}`}>{site.email}</a> ou via la page <Link href="/contact">Contact</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
