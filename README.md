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
Accueil · Produits (+ fiche produit et fiche technique imprimable pour les 109 références) · Catégories · Promotions · Marques partenaires · Services · Installation & SAV · Demande de devis · À propos · Nos magasins · Blog · FAQ · Contact · Comparateur · Favoris · Panier de devis · Mon espace · Téléchargements · Confidentialité · Livraison · CGV · Mentions légales.

## Où modifier quoi
| Fichier | Contenu |
|---|---|
| `src/config/site.ts` | Coordonnées, réseaux sociaux, horaires, chiffres clés, paiement échelonné, indicateurs « en direct » |
| `src/data/products.ts` | Catalogue (issu du PDF LG). Ajouter `price` pour afficher un prix |
| `src/data/stores.ts` | Showrooms (adresse, GPS, horaires) → carte Google Maps |
| `src/data/content.ts` | Avis, note Google, timeline, FAQ, blog, vidéos (`youtubeId`) |
| `src/app/globals.css` | Design tokens (Rouge SODIS, marine du logo, dark mode) |
| `public/images/products/*.webp` | Visuels produits — remplacer par les versions HD officielles en gardant le même nom |

## À compléter avant la mise en ligne
Tout ce qui est marqué **« À CONFIRMER »** / **« à compléter »** dans le code : email, adresses des showrooms, horaires, URL Facebook/LinkedIn/Messenger, chiffres clés, note Google et avis (exemples), mentions légales (RCCM, hébergeur…). Les indicateurs « X visiteurs en ligne » sont **simulés** (`site.liveSignals`).

## Formulaires
`/api/forms` valide (Zod) puis envoie par email (Resend) et/ou webhook. Sans configuration, la demande est journalisée et l'utilisateur peut la renvoyer sur WhatsApp.
