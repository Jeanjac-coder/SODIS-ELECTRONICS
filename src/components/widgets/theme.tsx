"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";
const listeners = new Set<() => void>();

const read = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

export function useTheme() {
  const theme = useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    read,
    () => "light" as Theme,
  );
  const toggle = () => {
    const next: Theme = read() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("sodis:theme", next);
    } catch {
      /* ignore */
    }
    listeners.forEach((l) => l());
  };
  return { theme, toggle };
}

/** Script inline exécuté avant le rendu pour éviter le flash de thème */
export const themeScript = `(function(){try{var t=localStorage.getItem('sodis:theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})();`;
