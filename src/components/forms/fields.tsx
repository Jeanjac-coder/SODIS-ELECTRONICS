"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { waLink } from "@/config/site";
import { WhatsAppIcon } from "@/components/widgets/icons";

export function Field({ label, error, children, className, hint }: { label: string; error?: string; children: React.ReactNode; className?: string; hint?: string }) {
  return (
    <div className={className}>
      <label className="label">
        {label}
        {children}
      </label>
      {hint && !error && <p className="-mt-1 text-[12px] text-muted">{hint}</p>}
      {error && (
        <p role="alert" className="mt-1.5 text-[12px] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function Consent({ error, register }: { error?: string; register: object }) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-muted">
        <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-[var(--secondary)]" {...register} />
        <span>
          J&apos;accepte que SODIS Electronics utilise ces informations pour traiter ma demande, conformément à la{" "}
          <Link href="/politique-de-confidentialite" className="text-ink underline underline-offset-4">
            politique de confidentialité
          </Link>
          .
        </span>
      </label>
      {error && (
        <p role="alert" className="mt-1.5 text-[12px] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function SubmitButton({ pending, children, className }: { pending: boolean; children: React.ReactNode; className?: string }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 text-[15px] font-medium text-white transition hover:bg-secondary hover:text-white disabled:opacity-60",
        className,
      )}
      data-cursor="hover"
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}

export function SuccessPanel({ title, body, refId, delivered, whatsappText }: { title: string; body: string; refId?: string; delivered?: boolean; whatsappText?: string }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-start gap-4 rounded-3xl bg-soft p-8" role="status">
      <CheckCircle2 className="h-10 w-10 text-emerald-500" />
      <h3 className="font-display text-2xl font-semibold tracking-tight">{title}</h3>
      <p className="text-[15px] leading-relaxed text-ink-soft">{body}</p>
      {refId && (
        <p className="text-[13px] text-muted">
          Référence : <span className="font-mono text-ink">{refId}</span>
        </p>
      )}
      {!delivered && whatsappText && (
        <a
          href={waLink(`${whatsappText}${refId ? `\nRéf. ${refId}` : ""}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-6 text-[14px] font-medium text-white"
        >
          <WhatsAppIcon className="h-5 w-5" /> Envoyer aussi sur WhatsApp
        </a>
      )}
    </motion.div>
  );
}
