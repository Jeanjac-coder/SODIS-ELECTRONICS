"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, ChevronDown, FileText, Heart, Menu, Moon, Search, ShoppingBag, Sun, User, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { nav, site, waLink } from "@/config/site";
import { categories } from "@/data/categories";
import { products, byCategory, families } from "@/data/products";
import { noticeStore, quoteStore, wishlistStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { CategoryIcon, Logo } from "@/components/ui/misc";
import { openSearch } from "@/components/widgets/search";
import { WhatsAppIcon } from "@/components/widgets/icons";
import { useTheme } from "@/components/widgets/theme";

function IconBtn({ label, children, count, onClick, href }: { label: string; children: React.ReactNode; count?: number; onClick?: () => void; href?: string }) {
  const cls = "relative grid h-10 w-10 place-items-center rounded-full text-ink transition hover:bg-soft";
  const inner = (
    <>
      {children}
      {!!count && (
        <motion.span
          key={count}
          initial={{ scale: 0.4 }}
          animate={{ scale: 1 }}
          className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-red px-1 text-[10px] font-semibold text-white"
        >
          {count}
        </motion.span>
      )}
    </>
  );
  return href ? (
    <Link href={href} aria-label={label} title={label} className={cls} data-cursor="hover">
      {inner}
    </Link>
  ) : (
    <button type="button" aria-label={label} title={label} onClick={onClick} className={cls} data-cursor="hover">
      {inner}
    </button>
  );
}

function Notifications() {
  const notices = noticeStore.use();
  const [open, setOpen] = useState(false);
  const unread = notices.filter((n) => !n.read).length;
  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <IconBtn
        label="Notifications"
        count={unread}
        onClick={() => {
          setOpen((o) => !o);
        }}
      >
        <Bell className="h-[19px] w-[19px]" strokeWidth={1.6} />
      </IconBtn>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute right-0 top-12 w-80 overflow-hidden rounded-3xl border border-line bg-elev shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <p className="text-[14px] font-semibold">Notifications</p>
              <button className="text-[12px] text-muted hover:text-ink" onClick={() => noticeStore.set((l) => l.map((n) => ({ ...n, read: true })))}>
                Tout marquer comme lu
              </button>
            </div>
            <ul className="max-h-80 overflow-y-auto">
              {notices.map((n) => (
                <li key={n.id}>
                  <Link
                    href={n.href ?? "#"}
                    onClick={() => {
                      noticeStore.set((l) => l.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
                      setOpen(false);
                    }}
                    className="flex gap-3 px-5 py-4 transition hover:bg-soft"
                  >
                    <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", n.read ? "bg-line" : "bg-red")} />
                    <span>
                      <span className="block text-[13px] font-medium text-ink">{n.title}</span>
                      <span className="block text-[12px] leading-relaxed text-muted">{n.body}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MegaMenu({ onClose }: { onClose: () => void }) {
  const [cat, setCat] = useState(categories[0].slug);
  const current = categories.find((c) => c.slug === cat)!;
  const list = byCategory(cat);
  const featured = list.filter((p) => p.available).slice(0, 3);
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-0 top-full hidden border-b border-line bg-elev/95 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.25)] backdrop-blur-2xl lg:block"
    >
      <div className="container-x grid grid-cols-12 gap-10 py-10">
        <ul className="col-span-3 space-y-1">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/categories/${c.slug}`}
                onMouseEnter={() => setCat(c.slug)}
                onFocus={() => setCat(c.slug)}
                onClick={onClose}
                className={cn("group flex items-center gap-3 rounded-2xl px-4 py-3 text-[15px] transition", cat === c.slug ? "bg-soft text-ink" : "text-ink-soft hover:text-ink")}
              >
                <CategoryIcon icon={c.icon} className="h-5 w-5" />
                <span className="flex-1">{c.name}</span>
                <span className="text-[12px] text-muted">{byCategory(c.slug).length}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="col-span-3 border-l border-line pl-10">
          <p className="eyebrow mb-4">Gammes</p>
          <ul className="space-y-2.5">
            {families(list).map((f) => (
              <li key={f}>
                <Link href={`/categories/${cat}?gamme=${encodeURIComponent(f)}`} onClick={onClose} className="text-[15px] text-ink-soft transition hover:text-red">
                  {f}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[13px] leading-relaxed text-muted">{current.description}</p>
        </div>
        <div className="col-span-6 grid grid-cols-3 gap-4">
          {featured.map((p) => (
            <Link key={p.slug} href={`/produits/${p.slug}`} onClick={onClose} className="group rounded-3xl bg-soft p-4 transition hover:shadow-lg">
              <div className="relative mb-3 aspect-square">
                <Image src={p.image} alt={p.name} fill sizes="200px" className="object-contain transition duration-700 group-hover:scale-105" />
              </div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted">{p.family}</p>
              <p className="line-clamp-2 text-[13px] font-medium text-ink">{p.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const quote = quoteStore.use();
  const wishlist = wishlistStore.use();
  const { theme, toggle } = useTheme();
  const qCount = quote.reduce((n, i) => n + i.qty, 0);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > 400 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobile(false);
    setMega(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background,box-shadow] duration-500 ease-[var(--ease-premium)]",
          hidden && !mega && !mobile ? "-translate-y-full" : "translate-y-0",
          scrolled || mega ? "glass border-b border-line/70 shadow-[0_1px_0_rgb(0_0_0/0.02)]" : "bg-transparent",
        )}
        onMouseLeave={() => setMega(false)}
      >
        <div className={cn("container-x flex items-center gap-6 transition-[height] duration-500", scrolled ? "h-16" : "h-20")}>
          <Logo priority className="shrink-0" />

          <nav aria-label="Navigation principale" className="ml-4 hidden flex-1 lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <li key={item.href} onMouseEnter={() => setMega("mega" in item && !!item.mega)}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group relative flex items-center gap-1 rounded-full px-3.5 py-2 text-[14px] transition-colors",
                        active ? "text-ink" : "text-ink-soft hover:text-ink",
                      )}
                      aria-expanded={"mega" in item ? mega : undefined}
                    >
                      {item.label}
                      {"mega" in item && <ChevronDown className={cn("h-3.5 w-3.5 transition", mega && "rotate-180")} />}
                      <span
                        className={cn(
                          "absolute inset-x-3.5 -bottom-0.5 h-[2px] origin-left rounded-full bg-red transition-transform duration-500 ease-[var(--ease-premium)]",
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-0.5 lg:ml-0">
            <IconBtn label="Rechercher (Ctrl+K)" onClick={() => openSearch()}>
              <Search className="h-[19px] w-[19px]" strokeWidth={1.6} />
            </IconBtn>
            <div className="hidden sm:block">
              <Notifications />
            </div>
            <span className="hidden sm:block">
              <IconBtn label="Favoris" href="/favoris" count={wishlist.length}>
                <Heart className="h-[19px] w-[19px]" strokeWidth={1.6} />
              </IconBtn>
            </span>
            <IconBtn label="Panier de devis" href="/panier" count={qCount}>
              <ShoppingBag className="h-[19px] w-[19px]" strokeWidth={1.6} />
            </IconBtn>
            <span className="hidden md:block">
              <IconBtn label="Mon espace" href="/compte">
                <User className="h-[19px] w-[19px]" strokeWidth={1.6} />
              </IconBtn>
            </span>
            <span className="hidden md:block">
              <IconBtn label={theme === "dark" ? "Mode clair" : "Mode sombre"} onClick={toggle}>
                {theme === "dark" ? <Sun className="h-[19px] w-[19px]" strokeWidth={1.6} /> : <Moon className="h-[19px] w-[19px]" strokeWidth={1.6} />}
              </IconBtn>
            </span>
            <a
              href={waLink("Bonjour SODIS, j'ai une question.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="ml-1 hidden h-10 w-10 place-items-center rounded-full bg-[#25D366] text-white transition hover:scale-105 xl:grid"
              data-cursor="hover"
            >
              <WhatsAppIcon className="h-[18px] w-[18px]" />
            </a>
            <Link
              href="/devis"
              className="ml-2 hidden h-10 items-center gap-2 rounded-full bg-ink px-5 text-[13px] font-medium text-bg transition hover:bg-red hover:text-white lg:inline-flex"
              data-cursor="hover"
            >
              <FileText className="h-4 w-4" /> Devis
            </Link>
            <button
              type="button"
              aria-label={mobile ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobile}
              onClick={() => setMobile((m) => !m)}
              className="ml-1 grid h-10 w-10 place-items-center rounded-full transition hover:bg-soft lg:hidden"
            >
              {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <AnimatePresence>{mega && <MegaMenu onClose={() => setMega(false)} />}</AnimatePresence>
      </header>

      {/* Menu mobile */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-bg pt-20 lg:hidden"
          >
            <motion.nav
              aria-label="Menu mobile"
              initial="h"
              animate="s"
              variants={{ s: { transition: { staggerChildren: 0.04 } } }}
              className="container-x pb-16"
            >
              {nav.map((item) => (
                <motion.div key={item.href} variants={{ h: { opacity: 0, y: 16 }, s: { opacity: 1, y: 0 } }}>
                  <Link href={item.href} className="flex items-center justify-between border-b border-line py-5 font-display text-3xl font-semibold tracking-tight">
                    {item.label}
                    <ArrowUpRight className="h-5 w-5 text-muted" />
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={{ h: { opacity: 0 }, s: { opacity: 1 } }} className="mt-8 grid grid-cols-3 gap-3">
                {categories.map((c) => (
                  <Link key={c.slug} href={`/categories/${c.slug}`} className="flex flex-col items-center gap-2 rounded-2xl bg-soft p-4 text-center text-[12px]">
                    <CategoryIcon icon={c.icon} className="h-6 w-6" />
                    {c.short}
                  </Link>
                ))}
              </motion.div>
              <motion.div variants={{ h: { opacity: 0 }, s: { opacity: 1 } }} className="mt-8 grid grid-cols-2 gap-3">
                <Link href="/devis" className="flex h-14 items-center justify-center rounded-full bg-ink text-[15px] font-medium text-bg">
                  Demander un devis
                </Link>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex h-14 items-center justify-center gap-2 rounded-full bg-[#25D366] text-[15px] font-medium text-white">
                  <WhatsAppIcon className="h-5 w-5" /> WhatsApp
                </a>
              </motion.div>
              <motion.div variants={{ h: { opacity: 0 }, s: { opacity: 1 } }} className="mt-8 flex items-center justify-between text-[14px] text-ink-soft">
                <Link href="/favoris" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" /> Favoris ({wishlist.length})
                </Link>
                <Link href="/compte" className="flex items-center gap-2">
                  <User className="h-4 w-4" /> Mon espace
                </Link>
                <button onClick={toggle} className="flex items-center gap-2">
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />} Thème
                </button>
              </motion.div>
              <p className="mt-10 text-center text-[13px] text-muted">
                {site.phone} · {site.hours}
              </p>
              <p className="sr-only">{products.length} produits au catalogue</p>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
