"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/** Scroll fluide Lenis (désactivé si l'utilisateur préfère moins d'animations) */
export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
    lenisRef.current = lenis;
    let id = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    const onTop = () => lenis.scrollTo(0);
    window.addEventListener("sodis:top", onTop);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("sodis:top", onTop);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}

/** Curseur personnalisé (desktop uniquement) — grossit sur les éléments interactifs */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("has-cursor");
    let x = -100,
      y = -100,
      rx = -100,
      ry = -100,
      id = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement;
      const hover = !!t.closest?.("a,button,[data-cursor='hover'],input,select,textarea,label");
      ring.current?.classList.toggle("is-hover", hover);
    };
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      id = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    id = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(id);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dot} aria-hidden className="cursor-dot pointer-events-none fixed left-0 top-0 z-[100] hidden h-1.5 w-1.5 -ml-[3px] -mt-[3px] rounded-full bg-red mix-blend-difference" />
      <div
        ref={ring}
        aria-hidden
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[100] hidden h-9 w-9 -ml-[18px] -mt-[18px] rounded-full border border-ink/30 transition-[width,height,margin,background,border-color] duration-300 [&.is-hover]:-ml-7 [&.is-hover]:-mt-7 [&.is-hover]:h-14 [&.is-hover]:w-14 [&.is-hover]:border-red/50 [&.is-hover]:bg-red/5"
      />
      <style>{`.has-cursor .cursor-dot,.has-cursor .cursor-ring{display:block}`}</style>
    </>
  );
}
