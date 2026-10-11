"use client";

import { useState } from "react";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { mapsDirections, mapsEmbed, stores } from "@/data/stores";
import { cn } from "@/lib/utils";

/** Carte Google Maps des showrooms avec itinéraire, téléphone et horaires */
export function StoresMap() {
  const [active, setActive] = useState(stores[0].id);
  const s = stores.find((x) => x.id === active)!;
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="grid gap-4 lg:grid-cols-[400px_1fr]">
      <ul className="space-y-3" aria-label="Liste des magasins">
        {stores.map((st) => (
          <li key={st.id}>
            <div
              role="button"
              tabIndex={0}
              aria-pressed={active === st.id}
              onClick={() => setActive(st.id)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActive(st.id)}
              className={cn("cursor-pointer rounded-[28px] border p-6 transition", active === st.id ? "border-ink bg-elev shadow-xl" : "border-line hover:border-ink/40")}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[16px] font-semibold">{st.name}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-[13px] text-muted">
                    <MapPin className="h-3.5 w-3.5" /> {st.address}
                  </p>
                </div>
                {st.main && <span className="rounded-full bg-red px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">Siège</span>}
              </div>
              {active === st.id && (
                <div className="mt-5 space-y-4 border-t border-line pt-5">
                  <ul className="space-y-1.5 text-[13px]">
                    {st.hours.map((h) => (
                      <li key={h.days} className="flex justify-between gap-4">
                        <span className="flex items-center gap-2 text-muted">
                          <Clock className="h-3.5 w-3.5" /> {h.days}
                        </span>
                        <span className="font-medium">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {st.services.map((x) => (
                      <span key={x} className="rounded-full bg-soft px-2.5 py-1 text-[11px] text-ink-soft">
                        {x}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <a href={mapsDirections(st)} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-ink text-[13px] font-medium text-bg hover:bg-red hover:text-white">
                      <Navigation className="h-4 w-4" /> Nous trouver
                    </a>
                    <a href={`tel:${st.phone.replace(/\s/g, "")}`} className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-line text-[13px] font-medium hover:border-ink">
                      <Phone className="h-4 w-4" /> Appeler
                    </a>
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="relative min-h-[420px] overflow-hidden rounded-[32px] border border-line bg-soft">
        {!loaded && <div className="skeleton absolute inset-0" aria-hidden />}
        <iframe
          key={s.id}
          title={`Carte — ${s.name}`}
          src={mapsEmbed(s)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setLoaded(true)}
          className="absolute inset-0 h-full w-full grayscale-[0.4] dark:invert-[0.9] dark:hue-rotate-180"
        />
      </div>
    </div>
  );
}
