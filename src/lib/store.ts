"use client";

import { useSyncExternalStore } from "react";

/**
 * Mini store persistant (localStorage) sans dépendance :
 * panier de devis, favoris, comparateur, produits récemment consultés, notifications.
 */
type Listener = () => void;

function createStore<T>(key: string, initial: T) {
  let state = initial;
  let hydrated = false;
  const listeners = new Set<Listener>();

  const hydrate = () => {
    if (hydrated || typeof window === "undefined") return;
    hydrated = true;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) state = JSON.parse(raw) as T;
    } catch {
      /* stockage indisponible (navigation privée…) */
    }
  };

  const set = (next: T | ((prev: T) => T)) => {
    hydrate();
    state = typeof next === "function" ? (next as (p: T) => T)(state) : next;
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      /* ignore */
    }
    listeners.forEach((l) => l());
  };

  const subscribe = (l: Listener) => {
    listeners.add(l);
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) {
        hydrated = false;
        hydrate();
        l();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(l);
      window.removeEventListener("storage", onStorage);
    };
  };

  const getSnapshot = () => {
    hydrate();
    return state;
  };

  const use = () => useSyncExternalStore(subscribe, getSnapshot, () => initial);

  return { use, set, get: getSnapshot };
}

export type QuoteItem = { slug: string; qty: number };
export type Notice = { id: string; title: string; body: string; href?: string; read?: boolean; date: string };

export const quoteStore = createStore<QuoteItem[]>("sodis:quote", []);
export const wishlistStore = createStore<string[]>("sodis:wishlist", []);
export const compareStore = createStore<string[]>("sodis:compare", []);
export const recentStore = createStore<string[]>("sodis:recent", []);
export const noticeStore = createStore<Notice[]>("sodis:notices", [
  {
    id: "welcome",
    title: "Bienvenue chez SODIS 👋",
    body: "Installation offerte sur une sélection de climatiseurs. Demandez votre devis !",
    href: "/promotions",
    date: "2026-10-01",
  },
  {
    id: "oled",
    title: "Nouveauté : LG OLED evo C5 & G5",
    body: "Les nouveaux OLED 2025 sont disponibles en showroom.",
    href: "/categories/televiseurs",
    date: "2026-09-20",
  },
]);

/* ─────────── Actions ─────────── */
export const addToQuote = (slug: string, qty = 1) =>
  quoteStore.set((items) => {
    const found = items.find((i) => i.slug === slug);
    if (found) return items.map((i) => (i.slug === slug ? { ...i, qty: i.qty + qty } : i));
    return [...items, { slug, qty }];
  });
export const setQuoteQty = (slug: string, qty: number) =>
  quoteStore.set((items) => (qty <= 0 ? items.filter((i) => i.slug !== slug) : items.map((i) => (i.slug === slug ? { ...i, qty } : i))));
export const clearQuote = () => quoteStore.set([]);

export const toggleWishlist = (slug: string) =>
  wishlistStore.set((l) => (l.includes(slug) ? l.filter((s) => s !== slug) : [...l, slug]));

export const COMPARE_MAX = 4;
export const toggleCompare = (slug: string): "added" | "removed" | "full" => {
  const list = compareStore.get();
  if (list.includes(slug)) {
    compareStore.set(list.filter((s) => s !== slug));
    return "removed";
  }
  if (list.length >= COMPARE_MAX) return "full";
  compareStore.set([...list, slug]);
  return "added";
};

export const pushRecent = (slug: string) =>
  recentStore.set((l) => [slug, ...l.filter((s) => s !== slug)].slice(0, 12));

/* ─────────── Toasts (éphémères, non persistés) ─────────── */
export type Toast = { id: number; title: string; body?: string; tone?: "default" | "success" | "error" };
let toasts: Toast[] = [];
const toastListeners = new Set<Listener>();
export const toast = (t: Omit<Toast, "id">) => {
  const id = Date.now() + Math.random();
  toasts = [...toasts, { id, ...t }];
  toastListeners.forEach((l) => l());
  setTimeout(() => {
    toasts = toasts.filter((x) => x.id !== id);
    toastListeners.forEach((l) => l());
  }, 3800);
};
const emptyToasts: Toast[] = [];
export const useToasts = () =>
  useSyncExternalStore(
    (l) => {
      toastListeners.add(l);
      return () => toastListeners.delete(l);
    },
    () => toasts,
    () => emptyToasts,
  );
