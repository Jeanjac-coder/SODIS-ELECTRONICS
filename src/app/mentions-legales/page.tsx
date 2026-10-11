import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site SODIS Electronics : éditeur, hébergeur, propriété intellectuelle.",
  alternates: { canonical: "/mentions-legales" },
};

// ⚠️ À COMPLÉTER : forme juridique, capital, RCCM, CC (compte contribuable), adresse du siège, directeur de publication, hébergeur.
export default function LegalNoticePage() {
  return (
    <LegalPage
      slug="mentions-legales"
      title="Mentions légales"
      updated="11 octobre 2026"
      lead="Informations sur l'éditeur et l'hébergeur du site."
      sections={[
        {
          id: "editeur",
          title: "Éditeur du site",
          body: (
            <ul>
              <li>Raison sociale : {site.legalName}</li>
              <li>Nom commercial : {site.name}</li>
              <li>Forme juridique et capital : [à compléter]</li>
              <li>RCCM : [à compléter] · Compte contribuable : [à compléter]</li>
              <li>Siège social : [adresse à compléter], {site.address.city}, Côte d&apos;Ivoire</li>
              <li>Téléphone : {site.phone} · Email : {site.email}</li>
              <li>Directeur de la publication : [à compléter]</li>
            </ul>
          ),
        },
        {
          id: "hebergeur",
          title: "Hébergement",
          body: <p>Le site est hébergé par : [nom, adresse et contact de l&apos;hébergeur à compléter — par ex. Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis].</p>,
        },
        {
          id: "propriete",
          title: "Propriété intellectuelle",
          body: (
            <>
              <p>L&apos;ensemble des contenus du site (textes, mise en page, logo SODIS) est la propriété de SODIS Electronics. Toute reproduction sans autorisation est interdite.</p>
              <p>LG, OLED evo, QNED, NanoCell, XBOOM, ThinQ, DUALCOOL, ARTCOOL et les visuels produits associés sont des marques et contenus de LG Electronics, utilisés dans le cadre de la distribution officielle de ses produits. Les autres marques citées appartiennent à leurs propriétaires respectifs.</p>
            </>
          ),
        },
        {
          id: "donnees",
          title: "Données personnelles",
          body: <p>Voir notre politique de confidentialité. Les traitements sont réalisés conformément à la loi n° 2013-450 du 19 juin 2013.</p>,
        },
        {
          id: "credits",
          title: "Crédits",
          body: <p>Conception et développement : site vitrine SODIS Electronics. Icônes : Lucide (licence ISC). Polices : Inter et Plus Jakarta Sans (SIL Open Font License).</p>,
        },
      ]}
    />
  );
}
