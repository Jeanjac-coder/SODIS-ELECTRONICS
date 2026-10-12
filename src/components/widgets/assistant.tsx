"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Sparkles, X, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { categories } from "@/data/categories";
import { products, type CategorySlug, type Product } from "@/data/products";
import { search } from "@/lib/search";
import { addToQuote, toast } from "@/lib/store";
import { waLink } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Assistant SODIS : guide conversationnel par règles (sans API externe)
 * qui qualifie le besoin puis recommande des produits du catalogue.
 */
type Msg = { from: "bot" | "me"; text: string; products?: Product[]; choices?: Choice[] };
type Choice = { label: string; value: string };

type Step = { cat?: CategorySlug; need?: string };

const needs: Record<CategorySlug, { q: string; choices: (Choice & { pick: (p: Product) => boolean })[] }> = {
  televiseurs: {
    q: "Pour quelle pièce ? Ça nous aide à choisir la bonne taille.",
    choices: [
      { label: "Chambre / bureau", value: "s", pick: (p) => (p.key?.value ?? 0) <= 50 },
      { label: "Salon moyen", value: "m", pick: (p) => (p.key?.value ?? 0) >= 55 && (p.key?.value ?? 0) <= 65 },
      { label: "Grand salon", value: "l", pick: (p) => (p.key?.value ?? 0) >= 75 },
      { label: "Le top de l'image (OLED)", value: "oled", pick: (p) => p.family === "OLED" },
    ],
  },
  audio: {
    q: "Quel usage pour le son ?",
    choices: [
      { label: "Soirées & fêtes", value: "party", pick: (p) => /soirée|Mini chaîne|One Body/.test(p.family) },
      { label: "Cinéma à la maison", value: "cine", pick: (p) => /Barre de son|Home cinéma/.test(p.family) },
      { label: "Nomade / extérieur", value: "nomad", pick: (p) => p.family === "Enceinte portable" },
    ],
  },
  climatisation: {
    q: "Quelle surface faut-il rafraîchir ?",
    choices: [
      { label: "Jusqu'à 15 m²", value: "9", pick: (p) => p.key?.value === 9000 },
      { label: "15 à 25 m²", value: "12", pick: (p) => p.key?.value === 12000 },
      { label: "25 à 35 m²", value: "18", pick: (p) => p.key?.value === 18000 },
      { label: "Plus de 35 m² / pro", value: "24", pick: (p) => (p.key?.value ?? 0) >= 24000 },
    ],
  },
  refrigeration: {
    q: "Combien de personnes dans le foyer ?",
    choices: [
      { label: "1 à 2", value: "s", pick: (p) => (p.key?.value ?? 0) < 300 },
      { label: "3 à 5", value: "m", pick: (p) => (p.key?.value ?? 0) >= 380 && (p.key?.value ?? 0) <= 480 },
      { label: "6 et plus", value: "l", pick: (p) => (p.key?.value ?? 0) > 480 },
    ],
  },
  lavage: {
    q: "Quel volume de linge par semaine ?",
    choices: [
      { label: "Petit foyer", value: "s", pick: (p) => (p.key?.value ?? 0) <= 8 },
      { label: "Famille", value: "m", pick: (p) => (p.key?.value ?? 0) > 8 && (p.key?.value ?? 0) <= 10.5 },
      { label: "Grande famille", value: "l", pick: (p) => (p.key?.value ?? 0) >= 10 },
    ],
  },
  cuisine: {
    q: "Vous cherchez plutôt…",
    choices: [
      { label: "Un micro-ondes compact", value: "s", pick: (p) => p.family === "Micro-ondes" && (p.key?.value ?? 0) <= 25 },
      { label: "Un grand micro-ondes / gril", value: "l", pick: (p) => p.family === "Micro-ondes" && (p.key?.value ?? 0) >= 42 },
      { label: "Une cuisinière", value: "c", pick: (p) => p.family === "Cuisinière" },
    ],
  },
};

const start: Msg = {
  from: "bot",
  text: "Akwaba ! Je suis l'assistant SODIS. Dites-moi ce que vous cherchez, je vous guide en 30 secondes.",
  choices: categories.map((c) => ({ label: c.name, value: c.slug })),
};

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([start]);
  const [step, setStep] = useState<Step>({});
  const [input, setInput] = useState("");
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const o = () => setOpen(true);
    window.addEventListener("sodis:assistant", o);
    return () => window.removeEventListener("sodis:assistant", o);
  }, []);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  const say = (m: Msg | Msg[]) => setTimeout(() => setMsgs((l) => [...l, ...(Array.isArray(m) ? m : [m])]), 350);

  const choose = (c: Choice) => {
    setMsgs((l) => [...l.map((m) => ({ ...m, choices: undefined })), { from: "me", text: c.label }]);
    if (!step.cat) {
      const cat = c.value as CategorySlug;
      setStep({ cat });
      say({ from: "bot", text: needs[cat].q, choices: needs[cat].choices.map(({ label, value }) => ({ label, value })) });
      return;
    }
    const n = needs[step.cat].choices.find((x) => x.value === c.value);
    const list = products.filter((p) => p.category === step.cat && n?.pick(p)).sort((a, b) => Number(b.available) - Number(a.available)).slice(0, 3);
    setStep({ ...step, need: c.value });
    say([
      {
        from: "bot",
        text: list.length ? "Voici ma sélection pour vous. Franchement, vous ne serez pas déçu :" : "Je n'ai pas trouvé de modèle exact — un conseiller va vous aider.",
        products: list,
      },
      {
        from: "bot",
        text: "Je peux aussi vous mettre en relation avec un conseiller.",
        choices: [
          { label: "Parler à un conseiller", value: "__wa" },
          { label: "Recommencer", value: "__reset" },
        ],
      },
    ]);
  };

  const onChoice = (c: Choice) => {
    if (c.value === "__wa") {
      window.open(waLink("Bonjour SODIS, l'assistant du site m'a orienté vers vous."), "_blank", "noopener");
      return;
    }
    if (c.value === "__reset") {
      setStep({});
      setMsgs([start]);
      return;
    }
    choose(c);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setInput("");
    setMsgs((l) => [...l, { from: "me", text: q }]);
    const hits = search(q, 6).flatMap((h) => (h.kind === "product" ? [h.product] : [])).slice(0, 3);
    if (/livr/i.test(q)) say({ from: "bot", text: "Nous livrons partout en Côte d'Ivoire : 24–48 h à Abidjan, 2 à 5 jours ouvrés à l'intérieur du pays. Détails sur la page Livraison." });
    else if (/garant|sav|panne/i.test(q)) say({ from: "bot", text: "Tous nos produits LG sont garantis constructeur, et notre SAV intervient à domicile. Voir la page Installation & SAV." });
    else if (/paie|paye|wave|orange|mtn|moov|carte/i.test(q)) say({ from: "bot", text: "Chez SODIS, vous payez à la livraison : vous réglez une fois l'appareil reçu et vérifié. Simple et sans risque." });
    else if (hits.length) say({ from: "bot", text: "Voici ce que j'ai trouvé :", products: hits });
    else say({ from: "bot", text: "Je n'ai pas bien saisi. Choisissez une catégorie :", choices: start.choices });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-label="Assistant SODIS"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="fixed bottom-24 right-4 z-[80] flex h-[min(620px,calc(100dvh-8rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[28px] border border-line bg-elev shadow-2xl sm:right-6"
        >
          <div className="flex items-center gap-3 border-b border-line bg-primary px-5 py-4 text-white">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="flex-1">
              <p className="text-[14px] font-semibold">Assistant SODIS</p>
              <p className="text-[11px] opacity-70">Conseil produit instantané</p>
            </div>
            <button aria-label="Recommencer" onClick={() => onChoice({ label: "", value: "__reset" })} className="rounded-full p-2 opacity-70 hover:opacity-100">
              <RotateCcw className="h-4 w-4" />
            </button>
            <button aria-label="Fermer l'assistant" onClick={() => setOpen(false)} className="rounded-full p-2 opacity-70 hover:opacity-100">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {msgs.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={cn("flex flex-col gap-2", m.from === "me" && "items-end")}>
                <p className={cn("max-w-[85%] rounded-3xl px-4 py-2.5 text-[14px] leading-relaxed", m.from === "me" ? "rounded-br-md bg-primary text-white" : "rounded-bl-md bg-soft text-ink")}>{m.text}</p>
                {m.products?.map((p) => (
                  <div key={p.slug} className="flex w-full items-center gap-3 rounded-2xl border border-line p-2.5">
                    <Image src={p.image} alt="" width={56} height={56} className="h-14 w-14 rounded-xl bg-soft object-contain p-1" />
                    <div className="min-w-0 flex-1">
                      <Link href={`/produits/${p.slug}`} onClick={() => setOpen(false)} className="line-clamp-1 text-[13px] font-medium hover:text-secondary">
                        {p.name}
                      </Link>
                      <p className="line-clamp-1 text-[11px] text-muted">{p.tagline}</p>
                    </div>
                    <button
                      onClick={() => {
                        addToQuote(p.slug);
                        toast({ title: "Ajouté au devis", body: p.name, tone: "success" });
                      }}
                      className="rounded-full bg-primary px-3 py-1.5 text-[11px] font-medium text-white hover:bg-secondary hover:text-white"
                    >
                      + Devis
                    </button>
                  </div>
                ))}
                {m.choices && (
                  <div className="flex flex-wrap gap-2">
                    {m.choices.map((c) => (
                      <button key={c.value} onClick={() => onChoice(c)} className="rounded-full border border-line bg-elev px-3.5 py-2 text-[13px] text-ink transition hover:border-secondary hover:text-secondary">
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-line p-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Posez votre question…" aria-label="Votre question" className="h-11 flex-1 rounded-full bg-soft px-4 text-[14px] outline-none" />
            <button aria-label="Envoyer" className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-white">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
