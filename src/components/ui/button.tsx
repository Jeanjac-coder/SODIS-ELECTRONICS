"use client";

import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { useRef, type ComponentProps, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "relative inline-flex select-none items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full font-medium transition-[background,color,box-shadow,transform] duration-300 ease-[var(--ease-premium)] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary: "bg-ink text-bg hover:bg-red hover:text-white shadow-[0_8px_24px_-8px_rgb(0_0_0/0.35)]",
        red: "bg-red text-white hover:bg-red-strong shadow-[0_10px_30px_-10px_var(--red)]",
        outline: "border border-line bg-transparent text-ink hover:border-ink",
        ghost: "text-ink hover:bg-soft",
        glass: "glass border border-white/40 text-ink hover:bg-white/80 dark:border-white/10 dark:hover:bg-white/10",
        whatsapp: "bg-[#25D366] text-white hover:bg-[#1ebe5a]",
      },
      size: {
        sm: "h-9 px-4 text-[13px]",
        md: "h-11 px-6 text-[14px]",
        lg: "h-14 px-8 text-[15px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Common = VariantProps<typeof buttonVariants> & { magnetic?: boolean; className?: string; children?: ReactNode };

function useFx(magnetic?: boolean) {
  const ref = useRef<HTMLElement | null>(null);
  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (!magnetic || !ref.current || window.matchMedia("(pointer: coarse)").matches) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    ref.current.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  const onDown = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const d = Math.max(r.width, r.height);
    const dot = document.createElement("span");
    dot.className = "ripple-dot";
    dot.style.width = dot.style.height = `${d}px`;
    dot.style.left = `${e.clientX - r.left - d / 2}px`;
    dot.style.top = `${e.clientY - r.top - d / 2}px`;
    el.appendChild(dot);
    setTimeout(() => dot.remove(), 700);
  };
  return { ref, onMove, onLeave, onDown };
}

export function Button({ className, variant, size, magnetic, children, onMouseDown, ...props }: Common & ComponentProps<"button">) {
  const fx = useFx(magnetic);
  return (
    <button
      ref={fx.ref as React.Ref<HTMLButtonElement>}
      className={cn(buttonVariants({ variant, size }), className)}
      onMouseMove={fx.onMove}
      onMouseLeave={fx.onLeave}
      onMouseDown={(e) => {
        fx.onDown(e);
        onMouseDown?.(e);
      }}
      data-cursor="hover"
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  className,
  variant,
  size,
  magnetic,
  children,
  external,
  ...props
}: Common & { href: string; external?: boolean } & Omit<ComponentProps<"a">, "href">) {
  const fx = useFx(magnetic);
  const cls = cn(buttonVariants({ variant, size }), className);
  const handlers = { onMouseMove: fx.onMove, onMouseLeave: fx.onLeave, onMouseDown: fx.onDown, "data-cursor": "hover" };
  if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a
        ref={fx.ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cls}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...handlers}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <Link ref={fx.ref as React.Ref<HTMLAnchorElement>} href={href} className={cls} {...handlers} {...props}>
      {children}
    </Link>
  );
}
