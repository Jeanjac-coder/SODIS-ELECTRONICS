/**
 * Contenus éditoriaux du site.
 * ⚠️ Témoignages, note Google et timeline : EXEMPLES à remplacer par vos
 * avis clients réels (ou à alimenter via l'API Google Places) avant la mise en ligne.
 */

export const testimonials = [
  { name: "Aïcha K.", city: "Cocody", rating: 5, product: "LG OLED evo C5 65\"", text: "Livrée le lendemain, installée et réglée en 30 minutes. Le technicien a même configuré Netflix. Service vraiment premium." },
  { name: "Serge T.", city: "Yopougon", rating: 5, product: "LG XBOOM XL9T", text: "Pour le mariage de ma sœur, l'XL9T a tenu toute la nuit. Les gens demandaient où j'avais acheté ça. C'était doux !" },
  { name: "Responsable technique, hôtel", city: "Grand-Bassam", rating: 5, product: "24 climatiseurs DUAL Inverter", text: "Devis clair en 24 h, pose sur deux jours sans gêner nos clients. La facture d'électricité a vraiment baissé." },
  { name: "Mariam D.", city: "Marcory", rating: 4, product: "Réfrigérateur 4 portes 512 L", text: "Très bon conseil en showroom, on m'a aidée à choisir selon la taille de ma cuisine. Paiement Wave sans souci." },
  { name: "Kouadio B.", city: "Bouaké", rating: 5, product: "LG Lave-linge 15 kg", text: "Livré à Bouaké en 3 jours, comme annoncé. Matériel garanti, SAV joignable sur WhatsApp. Je recommande." },
  { name: "Directrice administrative, cabinet conseil", city: "Plateau", rating: 5, product: "Écrans QNED 75\" salles de réunion", text: "Interlocuteur unique, facture pro, installation murale propre. Exactement ce qu'on attendait d'un distributeur officiel." },
];

export const googleRating = { score: 4.8, count: 320 }; // À CONFIRMER

export const timeline = [
  { year: "Origines", title: "Naissance de SODIS-MAD CI", text: "Société de Distribution de Matériaux Divers en Côte d'Ivoire : une ambition, rendre accessibles les meilleurs équipements." },
  { year: "Partenariat", title: "Distributeur officiel LG", text: "SODIS devient distributeur officiel LG et structure son offre TV, audio, froid, lavage et climatisation." },
  { year: "Expansion", title: "Showrooms & SAV", text: "Ouverture d'espaces d'exposition et d'un service après-vente dédié, avec techniciens formés aux technologies LG." },
  { year: "Aujourd'hui", title: "SODIS Electronics", text: "Plus de 100 références LG, livraison nationale, installation pro et accompagnement des entreprises." },
];

export const values = [
  { title: "Authenticité", text: "Produits 100 % officiels LG, importés par le circuit agréé. Pas de contrefaçon, pas de mauvaise surprise." },
  { title: "Proximité", text: "Un conseiller qui vous répond vraiment, en showroom, au téléphone ou sur WhatsApp." },
  { title: "Exigence", text: "Installation soignée, SAV réactif, garantie respectée. La qualité, chez nous, ce n'est pas palabre." },
  { title: "Transparence", text: "Devis clairs, délais tenus, prix justes. Ce qu'on annonce, on le fait." },
];

export const faq = [
  {
    cat: "Commandes & devis",
    items: [
      { q: "Comment obtenir un prix ?", a: "Ajoutez vos produits au panier de devis puis envoyez la demande, ou écrivez-nous directement sur WhatsApp. Vous recevez une offre personnalisée sous 24 h ouvrées, souvent dans l'heure." },
      { q: "Proposez-vous des tarifs entreprise ?", a: "Oui. Hôtels, bureaux, commerces, promoteurs immobiliers et revendeurs bénéficient de conditions dédiées et d'un interlocuteur unique. Indiquez « Entreprise » dans le formulaire de devis." },
      { q: "Les produits sont-ils neufs et officiels ?", a: "Tous nos produits sont neufs, d'origine LG, fournis via le circuit de distribution officiel avec garantie constructeur." },
    ],
  },
  {
    cat: "Livraison & installation",
    items: [
      { q: "Livrez-vous partout en Côte d'Ivoire ?", a: "Oui. Abidjan et environs sous 24 à 48 h, grandes villes de l'intérieur (Yamoussoukro, Bouaké, San-Pédro, Korhogo, Daloa…) sous 2 à 5 jours ouvrés." },
      { q: "L'installation est-elle comprise ?", a: "Elle est proposée pour les TV (fixation murale), climatiseurs, lave-linge et home cinéma. Elle est offerte sur une sélection de produits et chiffrée dans votre devis dans les autres cas." },
      { q: "Puis-je retirer ma commande en showroom ?", a: "Bien sûr. Choisissez « retrait » et nous vous prévenons dès que votre commande est prête." },
    ],
  },
  {
    cat: "Paiement",
    items: [
      { q: "Quels moyens de paiement acceptez-vous ?", a: "Wave, Orange Money, MTN Mobile Money, Moov Money, carte Visa / Mastercard, virement bancaire et, selon la zone, paiement à la livraison." },
      { q: "Peut-on payer en plusieurs fois ?", a: "Un paiement échelonné peut être proposé selon le montant et le profil. Utilisez notre simulateur puis précisez-le dans votre demande de devis." },
      { q: "Le paiement est-il sécurisé ?", a: "Oui. Aucun paiement n'est demandé sans facture pro forma, et chaque règlement donne lieu à un reçu officiel SODIS Electronics." },
    ],
  },
  {
    cat: "Garantie & SAV",
    items: [
      { q: "Quelle est la durée de garantie ?", a: "Tous les produits bénéficient de la garantie constructeur LG. Sa durée dépend de la catégorie et vous est précisée sur votre facture." },
      { q: "Comment déclarer une panne ?", a: "Via la page Installation & SAV, par WhatsApp ou par téléphone. Munissez-vous de votre facture et du numéro de série ; un technicien vous recontacte rapidement." },
      { q: "Intervenez-vous à domicile ?", a: "Oui, pour les gros appareils (TV grand format, climatiseurs, réfrigérateurs, lave-linge), nos techniciens se déplacent." },
    ],
  },
];

export type Post = { slug: string; title: string; excerpt: string; category: string; date: string; read: number; image: string; body: { h?: string; p: string }[] };

export const posts: Post[] = [
  {
    slug: "oled-qned-nanocell-quelle-tv-choisir",
    title: "OLED, QNED, NanoCell, UHD : quelle TV LG choisir ?",
    excerpt: "Les quatre technologies LG décryptées simplement, pour choisir l'écran qui correspond vraiment à votre salon et à votre budget.",
    category: "Guide d'achat",
    date: "2026-09-12",
    read: 6,
    image: "/images/products/oled77c56la.webp",
    body: [
      { p: "Devant un mur de téléviseurs, tout se ressemble. Pourtant, derrière les sigles se cachent des technologies très différentes. Voici l'essentiel pour bien choisir." },
      { h: "OLED evo : le meilleur de l'image", p: "Chaque pixel produit sa propre lumière et peut s'éteindre complètement : noirs parfaits, contraste infini, angles de vision impeccables. Les gammes C5 et G5 montent à 144 et 165 Hz, idéales pour le cinéma, le sport et le gaming." },
      { h: "QNED et QNED MiniLED : la luminosité", p: "Les boîtes quantiques (Quantum Dot) et NanoCell offrent des couleurs riches, et le rétroéclairage MiniLED des QNED86 apporte une luminosité élevée. Parfait pour les pièces très lumineuses, et disponible jusqu'à 100 pouces." },
      { h: "NanoCell et UHD : le juste équilibre", p: "La gamme NANO80 filtre les couleurs pour plus de pureté ; les UHD UA85 / UA73 / UT80 apportent la 4K, l'IA et webOS à prix maîtrisé." },
      { h: "Quelle taille ?", p: "Règle simple : distance canapé-écran (en cm) ÷ 1,5 ≈ diagonale idéale (en cm). À 2,5 m, visez 65 pouces ; à 3 m et plus, 75 pouces ou davantage." },
    ],
  },
  {
    slug: "bien-choisir-son-climatiseur-btu",
    title: "9 000, 12 000 ou 18 000 BTU ? Bien dimensionner sa clim",
    excerpt: "Une clim trop faible tourne sans arrêt, une clim trop puissante gaspille. Notre méthode pour choisir la bonne puissance.",
    category: "Climatisation",
    date: "2026-08-28",
    read: 5,
    image: "/images/products/s4-q18klrte.webp",
    body: [
      { p: "Sous notre climat, un climatiseur bien dimensionné fait toute la différence sur le confort… et sur la facture CIE." },
      { h: "La règle de base", p: "Comptez environ 9 000 BTU (1 CV) jusqu'à 15 m², 12 000 BTU (1,5 CV) de 15 à 25 m², 18 000 BTU (2 CV) de 25 à 35 m² et 24 000 BTU (3 CV) au-delà. Ajoutez une marge pour une pièce très exposée ou sous toiture." },
      { h: "Pourquoi l'Inverter ?", p: "Le compresseur DUAL Inverter LG module sa vitesse au lieu de s'arrêter et redémarrer. Résultat : jusqu'à 70 % d'économie d'énergie et un fonctionnement plus silencieux." },
      { h: "Le mode Gen", p: "Il limite la consommation pour fonctionner sur groupe électrogène ou onduleur. Un vrai plus en cas de délestage." },
    ],
  },
  {
    slug: "organiser-une-soiree-avec-xboom",
    title: "Organiser une soirée réussie avec LG XBOOM",
    excerpt: "Party Link, karaoké, effets DJ : nos astuces pour transformer votre cour en piste de danse.",
    category: "Audio",
    date: "2026-08-03",
    read: 4,
    image: "/images/products/xl7t.webp",
    body: [
      { p: "Anniversaire, mariage, fin d'année : avec la bonne enceinte, l'ambiance se crée toute seule." },
      { h: "Choisir selon l'espace", p: "XL5T pour un salon, XL7T pour une terrasse, XL9T ou une mini chaîne CL98 pour une cour ou une salle." },
      { h: "Party Link", p: "Reliez plusieurs enceintes XBOOM compatibles pour diffuser la même musique partout, sans câble." },
      { h: "Karaoké et effets", p: "Branchez un micro, activez l'annulation de voix et laissez les invités faire le show depuis l'application XBOOM." },
    ],
  },
  {
    slug: "entretenir-son-refrigerateur",
    title: "5 gestes pour faire durer votre réfrigérateur",
    excerpt: "Température, joints, aération : les bons réflexes pour garder vos aliments frais et votre frigo en forme.",
    category: "Entretien",
    date: "2026-07-15",
    read: 3,
    image: "/images/products/gcfb50fplam.webp",
    body: [
      { p: "Un réfrigérateur fonctionne 24 h/24. Quelques gestes simples prolongent sa vie et réduisent sa consommation." },
      { h: "Régler la bonne température", p: "4 °C pour le compartiment frais, −18 °C pour le congélateur." },
      { h: "Laisser respirer", p: "Gardez 5 à 10 cm entre l'arrière de l'appareil et le mur, loin d'une source de chaleur." },
      { h: "Protéger contre les coupures", p: "Un régulateur de tension protège le compresseur lors des variations de courant." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** Galerie vidéo : renseignez `youtubeId` pour intégrer une vidéo officielle LG. */
export const videos = [
  { title: "LG OLED evo C5 — l'image auto-éclairée", product: "oled65c56la", image: "/images/products/oled65c56la.webp", youtubeId: "", query: "LG OLED evo C5" },
  { title: "LG XBOOM XL9T — 1000 W de fête", product: "xl9t", image: "/images/products/xl9t.webp", youtubeId: "", query: "LG XBOOM XL9T" },
  { title: "LG QNED evo MiniLED", product: "86qned86a6a", image: "/images/products/86qned86a6a.webp", youtubeId: "", query: "LG QNED evo 2025" },
  { title: "LG DUAL Inverter — économie d'énergie", product: "s4-q12jartb", image: "/images/products/s4-q12jartb.webp", youtubeId: "", query: "LG DUAL Inverter air conditioner" },
];
