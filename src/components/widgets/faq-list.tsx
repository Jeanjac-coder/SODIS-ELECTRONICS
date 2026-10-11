"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { faq } from "@/data/content";
import { cn, normalize } from "@/lib/utils";

/** FAQ dynamique : recherche instantanée + filtres + accordéon animé */
export function FaqList({ limit }: { limit?: number }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  const groups = useMemo(() => {
    const t = normalize(q.trim());
    return faq
      .filter((g) => !cat || g.cat === cat)
      .map((g) => ({ ...g, items: g.items.filter((i) => !t || normalize(i.q + " " + i.a).includes(t)).slice(0, limit) }))
      .filter((g) => g.items.length);
  }, [q, cat, limit]);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher une question : livraison, Wave, garantie…" aria-label="Rechercher dans la FAQ" className="h-14 w-full rounded-full border border-line bg-elev pl-12 pr-5 text-[15px] outline-none focus:border-ink" />
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {[null, ...faq.map((g) => g.cat)].map((c) => (
            <button key={c ?? "all"} onClick={() => setCat(c)} aria-pressed={cat === c} className={cn("shrink-0 rounded-full border px-4 py-2.5 text-[13px] transition", cat === c ? "border-ink bg-ink text-bg" : "border-line hover:border-ink/40")}>
              {c ?? "Toutes"}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-12">
        {groups.map((g) => (
          <section key={g.cat}>
            <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-muted">{g.cat}</h2>
            <ul className="divide-y divide-line border-y border-line">
              {g.items.map((it) => {
                const id = g.cat + it.q;
                const isOpen = open === id;
                return (
                  <li key={id}>
                    <button onClick={() => setOpen(isOpen ? null : id)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-6 py-6 text-left">
                      <span className="text-[17px] font-medium">{it.q}</span>
                      <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line transition duration-500", isOpen && "rotate-45 border-ink bg-ink text-bg")}>
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                          <p className="max-w-3xl pb-6 text-[15px] leading-relaxed text-muted">{it.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
        {!groups.length && <p className="rounded-3xl bg-soft p-10 text-center text-muted">Aucune réponse trouvée. Posez-nous la question directement, on répond vite !</p>}
      </div>
    </div>
  );
}
