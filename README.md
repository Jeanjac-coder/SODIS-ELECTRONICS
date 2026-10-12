# SODIS Electronics — site vitrine

Site vitrine multi-pages de **SODIS Electronics** (SODIS-MAD CI), distributeur officiel LG en Côte d'Ivoire.

**Stack :** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · GSAP · Lenis · Embla Carousel · React Hook Form + Zod · TanStack Query · Lucide · next/image (AVIF/WebP).

```bash
npm install
cp .env.example .env.local   # puis renseigner les clés
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Pages
Accueil · Produits (+ fiche produit et fiche technique imprimable pour les 109 références) · Catégories · Promotions · Marques partenaires · Installation & SAV · Demande de devis · À propos · Nos magasins · Blog · FAQ · Contact · Comparateur · Favoris · Panier de devis · Téléchargements. Paiement : à la livraison uniquement (`src/components/ui/payments.tsx`) · Confidentialité · Livraison · CGV · Mentions légales.

## Où modifier quoi
| Fichier | Contenu |
|---|---|
| `src/config/site.ts` | Coordonnées, réseaux sociaux, horaires, chiffres clés, paiement échelonné, indicateurs « en direct » |
| `src/data/products.ts` | Catalogue (issu du PDF LG). Ajouter `price` pour afficher un prix |
| `src/data/stores.ts` | Points de vente (adresse, recherche Google Maps, horaires) → carte et itinéraires |
| `public/images/hero/*.webp` + `src/components/home/hero.tsx` | Bannières du hero (1600×800) et leurs liens |
| `src/data/content.ts` | Avis, note Google, timeline, FAQ, blog, vidéos (`youtubeId`) |
| `src/app/globals.css` | Design tokens : principale #253060, secondaire #1938A5, troisième #E9C46A, dark mode |
| `public/images/products/*.webp` | Visuels produits — remplacer par les versions HD officielles en gardant le même nom |

## À compléter avant la mise en ligne
Tout ce qui est marqué **« À CONFIRMER »** / **« à compléter »** dans le code : URL Facebook/LinkedIn/Messenger, chiffres clés, note Google et avis (exemples), mentions légales (RCCM, hébergeur…). Les indicateurs « X visiteurs en ligne » sont **simulés** (`site.liveSignals`).

## Formulaires — réception des devis par email
Chaque demande de devis est envoyée automatiquement à **serviceclient@sodis-electronics.com** (modifiable via `QUOTE_TO_EMAIL`), avec le détail du client, du projet et des produits. « Répondre » répond directement au client, qui reçoit aussi un accusé de réception.

Pour activer l'envoi, renseignez sur l'hébergement (ex. Vercel → Settings → Environment Variables) les paramètres SMTP de la boîte `serviceclient@` : `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` (voir `.env.example`). Alternative : `RESEND_API_KEY` + `FORMS_FROM_EMAIL`.

Sans configuration, aucune demande n'est perdue côté client : l'écran de confirmation propose de l'envoyer par email (pré-rempli) ou par WhatsApp.
