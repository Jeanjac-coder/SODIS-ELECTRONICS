"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, CheckCircle2, Sparkles, XCircle, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { site, waLink } from "@/config/site";
import { useToasts } from "@/lib/store";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./icons";

/** Boutons flottants : WhatsApp, assistant, retour en haut */
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const on = () => setShowTop(window.scrollY > 900);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div className="no-print fixed bottom-5 right-4 z-[70] flex flex-col items-end gap-2.5 sm:right-6">
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => {
              window.dispatchEvent(new Event("sodis:top"));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Retour en haut"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-elev text-ink shadow-md"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
      <button
        onClick={() => window.dispatchEvent(new Event("sodis:assistant"))}
        aria-label="Ouvrir l'assistant SODIS"
        title="Assistant SODIS"
        className="grid h-10 w-10 place-items-center rounded-full bg-primary text-white shadow-md transition hover:scale-105"
      >
        <Sparkles className="h-4 w-4" />
      </button>
      <a
        href={waLink("Bonjour SODIS Electronics, je souhaite un renseignement.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Discuter sur WhatsApp"
        className="grid h-13 w-13 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
      >
        <WhatsAppIcon className="h-6 w-6" />
      </a>
    </div>
  );
}

export function Toaster() {
  const toasts = useToasts();
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 top-20 z-[95] flex flex-col items-center gap-2 px-4">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            className="glass pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border border-line p-4 shadow-2xl"
          >
            {t.tone === "error" ? <XCircle className="mt-0.5 h-5 w-5 text-danger" /> : <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />}
            <div>
              <p className="text-[14px] font-medium text-ink">{t.title}</p>
              {t.body && <p className="text-[13px] text-muted">{t.body}</p>}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/**
 * Indicateurs de fréquentation. Valeurs SIMULÉES (voir site.liveSignals)
 * tant qu'aucune source analytics temps réel n'est branchée.
 */
function useSimulated(min: number, max: number, every = 7000) {
  const [n, setN] = useState<number | null>(null);
  useEffect(() => {
    if (!site.liveSignals.enabled) return;
    const rnd = () => Math.floor(min + Math.random() * (max - min));
    setN(rnd());
    const id = setInterval(() => setN((v) => Math.max(min, Math.min(max, (v ?? rnd()) + Math.round((Math.random() - 0.5) * 4)))), every);
    return () => clearInterval(id);
  }, [min, max, every]);
  return n;
}

export function LiveVisitors({ className }: { className?: string }) {
  const n = useSimulated(18, 64);
  if (n === null) return null;
  return (
    <span className={cn("inline-flex items-center gap-2 text-[12px] text-muted", className)}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      {n} visiteurs en ligne
    </span>
  );
}

export function ViewingNow({ className }: { className?: string }) {
  const n = useSimulated(3, 14, 9000);
  if (n === null) return null;
  return (
    <p className={cn("inline-flex items-center gap-2 rounded-full bg-soft px-3 py-1.5 text-[12px] text-ink-soft", className)}>
      <Eye className="h-3.5 w-3.5 text-secondary" /> {n} personnes consultent ce produit
    </p>
  );
}
