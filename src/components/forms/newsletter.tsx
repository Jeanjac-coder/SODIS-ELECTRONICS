"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { newsletterSchema } from "@/lib/schemas";
import { useFormSubmit } from "@/lib/forms";
import type { z } from "zod";

export function NewsletterForm() {
  const m = useFormSubmit("newsletter");
  const { register, handleSubmit, formState, reset } = useForm<z.infer<typeof newsletterSchema>>({ resolver: zodResolver(newsletterSchema) });

  return (
    <form onSubmit={handleSubmit((d) => m.mutate(d, { onSuccess: () => reset() }))} className="w-full" noValidate>
      <div className="flex h-16 items-center gap-2 rounded-full border border-line bg-elev p-2 pl-6 transition focus-within:border-primary">
        <label htmlFor="nl-email" className="sr-only">
          Adresse email
        </label>
        <input id="nl-email" type="email" placeholder="votre@email.com" autoComplete="email" {...register("email")} className="h-full min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted" />
        <button type="submit" disabled={m.isPending} className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-[14px] font-medium text-white transition hover:bg-secondary hover:text-white">
          {m.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : m.isSuccess ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
          <span className="hidden sm:inline">{m.isSuccess ? "Inscrit !" : "S'inscrire"}</span>
        </button>
      </div>
      <p className="mt-3 pl-6 text-[12px] text-muted" role="status">
        {formState.errors.email?.message ?? (m.isSuccess ? "Merci ! Bienvenue dans la famille SODIS." : m.isError ? m.error.message : "Désinscription en un clic, à tout moment.")}
      </p>
    </form>
  );
}
