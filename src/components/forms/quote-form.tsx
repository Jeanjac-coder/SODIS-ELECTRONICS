"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Home, Minus, Plus, Search, Trash2, Truck, Wrench, ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { quoteSchema, type QuoteInput } from "@/lib/schemas";
import { useFormSubmit } from "@/lib/forms";
import { products, getProduct } from "@/data/products";
import { clearQuote, quoteStore } from "@/lib/store";
import { cn, normalize } from "@/lib/utils";
import { Consent, Field, SubmitButton, SuccessPanel } from "./fields";

const steps = ["Vous", "Produits", "Projet", "Coordonnées"] as const;

function Choice({ active, onClick, icon, title, desc }: { active: boolean; onClick: () => void; icon: React.ReactNode; title: string; desc?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex items-start gap-4 rounded-3xl border p-5 text-left transition duration-300",
        active ? "border-ink bg-ink text-bg shadow-xl" : "border-line bg-elev hover:border-ink/40",
      )}
    >
      <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-2xl", active ? "bg-red text-white" : "bg-soft text-ink")}>{icon}</span>
      <span>
        <span className="block text-[15px] font-semibold">{title}</span>
        {desc && <span className={cn("mt-1 block text-[13px]", active ? "opacity-70" : "text-muted")}>{desc}</span>}
      </span>
    </button>
  );
}

export function QuoteForm() {
  const m = useFormSubmit("quote");
  const [step, setStep] = useState(0);
  const [q, setQ] = useState("");
  const cart = quoteStore.use();

  const form = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    mode: "onTouched",
    defaultValues: {
      customerType: "particulier",
      items: [],
      budget: "À définir",
      projectType: "Équipement maison",
      delivery: true,
      installation: true,
      payment: "À discuter",
    },
  });
  const { register, control, watch, setValue, handleSubmit, trigger, formState: f, getValues } = form;
  const items = useFieldArray({ control, name: "items" });
  const type = watch("customerType");

  // Pré-remplit avec le panier de devis
  useEffect(() => {
    if (cart.length && getValues("items").length === 0) setValue("items", cart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.length]);

  const results = useMemo(() => {
    const t = normalize(q.trim());
    if (!t) return [];
    return products.filter((p) => normalize(`${p.model} ${p.name} ${p.family}`).includes(t)).slice(0, 6);
  }, [q]);

  const next = async () => {
    const fields: (keyof QuoteInput)[][] = [["customerType", "company"], ["items"], ["projectType", "budget", "delivery", "installation", "payment"], []];
    if (await trigger(fields[step])) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  if (m.isSuccess) {
    const v = getValues();
    return (
      <SuccessPanel
        title="Votre demande de devis est partie !"
        body={`Merci ${v.name.split(" ")[0]}. Un conseiller SODIS prépare votre offre personnalisée et vous recontacte sous 24 h ouvrées (souvent bien avant).`}
        refId={m.data.ref}
        delivered={m.data.delivered}
        whatsappText={`Bonjour SODIS, demande de devis (${v.customerType}${v.company ? ` – ${v.company}` : ""}) :\n${v.items
          .map((i) => `• ${i.qty} × ${getProduct(i.slug)?.name ?? i.slug}`)
          .join("\n")}\nBudget : ${v.budget}\nLivraison : ${v.delivery ? "oui" : "non"} · Installation : ${v.installation ? "oui" : "non"}\nVille : ${v.city}`}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit((d) => m.mutate(d, { onSuccess: () => clearQuote() }))}
      noValidate
      className="rounded-[32px] border border-line bg-elev p-6 shadow-[var(--shadow)] sm:p-10"
    >
      {/* Progression */}
      <ol className="mb-10 grid grid-cols-4 gap-2" aria-label="Étapes">
        {steps.map((s, i) => (
          <li key={s}>
            <button type="button" onClick={() => i < step && setStep(i)} className="w-full text-left" aria-current={i === step ? "step" : undefined}>
              <span className="block h-1 overflow-hidden rounded-full bg-line">
                <motion.span className="block h-full bg-red" initial={false} animate={{ width: i <= step ? "100%" : "0%" }} transition={{ duration: 0.5 }} />
              </span>
              <span className={cn("mt-2 block text-[12px] font-medium", i <= step ? "text-ink" : "text-muted")}>
                {i + 1}. {s}
              </span>
            </button>
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
          {step === 0 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-semibold tracking-tight">Vous êtes…</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Choice active={type === "particulier"} onClick={() => setValue("customerType", "particulier")} icon={<Home className="h-5 w-5" />} title="Particulier" desc="Pour équiper votre maison ou votre appartement." />
                <Choice active={type === "entreprise"} onClick={() => setValue("customerType", "entreprise")} icon={<Building2 className="h-5 w-5" />} title="Entreprise" desc="Bureaux, hôtels, commerces, revendeurs, projets." />
              </div>
              {type === "entreprise" && (
                <Field label="Nom de l'entreprise" error={f.errors.company?.message}>
                  <input className="input mt-2" autoComplete="organization" {...register("company")} />
                </Field>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-semibold tracking-tight">Quels produits vous intéressent ?</h3>
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Référence ou nom : OLED65, XL9T, 12000 BTU…" className="input pl-11" aria-label="Rechercher un produit à ajouter" />
                {results.length > 0 && (
                  <ul className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-line bg-elev shadow-xl">
                    {results.map((p) => (
                      <li key={p.slug}>
                        <button
                          type="button"
                          className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-soft"
                          onClick={() => {
                            const idx = getValues("items").findIndex((i) => i.slug === p.slug);
                            if (idx >= 0) items.update(idx, { slug: p.slug, qty: getValues(`items.${idx}.qty`) + 1 });
                            else items.append({ slug: p.slug, qty: 1 });
                            setQ("");
                          }}
                        >
                          <Image src={p.image} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
                          <span className="flex-1 text-[14px]">{p.name}</span>
                          <span className="text-[12px] text-muted">{p.model}</span>
                          <Plus className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {items.fields.length === 0 ? (
                <p className="rounded-2xl bg-soft p-6 text-center text-[14px] text-muted">Aucun produit pour l&apos;instant. Recherchez ci-dessus ou ajoutez-les depuis le catalogue.</p>
              ) : (
                <ul className="divide-y divide-line rounded-3xl border border-line">
                  {items.fields.map((it, i) => {
                    const p = getProduct(it.slug);
                    return (
                      <li key={it.id} className="flex items-center gap-4 p-4">
                        {p && <Image src={p.image} alt="" width={56} height={56} className="h-14 w-14 rounded-xl bg-soft object-contain p-1" />}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[14px] font-medium">{p?.name ?? it.slug}</p>
                          <p className="text-[12px] text-muted">{p?.model}</p>
                        </div>
                        <Controller
                          control={control}
                          name={`items.${i}.qty`}
                          render={({ field }) => (
                            <div className="flex items-center rounded-full border border-line">
                              <button type="button" aria-label="Diminuer" className="grid h-9 w-9 place-items-center" onClick={() => field.onChange(Math.max(1, field.value - 1))}>
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <input
                                aria-label="Quantité"
                                inputMode="numeric"
                                value={field.value}
                                onChange={(e) => field.onChange(Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-10 bg-transparent text-center text-[14px] outline-none"
                              />
                              <button type="button" aria-label="Augmenter" className="grid h-9 w-9 place-items-center" onClick={() => field.onChange(field.value + 1)}>
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          )}
                        />
                        <button type="button" aria-label="Retirer" onClick={() => items.remove(i)} className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-soft hover:text-red">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
              {f.errors.items?.message && <p className="text-[13px] text-red">{f.errors.items.message}</p>}
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-6 sm:grid-cols-2">
              <h3 className="font-display text-2xl font-semibold tracking-tight sm:col-span-2">Parlez-nous de votre projet</h3>
              <Field label="Type de projet" error={f.errors.projectType?.message}>
                <select className="input mt-2" {...register("projectType")}>
                  {quoteSchema.shape.projectType.options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="Budget estimé" error={f.errors.budget?.message}>
                <select className="input mt-2" {...register("budget")}>
                  {quoteSchema.shape.budget.options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Controller
                control={control}
                name="delivery"
                render={({ field }) => <Choice active={field.value} onClick={() => field.onChange(!field.value)} icon={<Truck className="h-5 w-5" />} title="Livraison" desc={field.value ? "Oui, livrez-moi" : "Non, je retire en showroom"} />}
              />
              <Controller
                control={control}
                name="installation"
                render={({ field }) => <Choice active={field.value} onClick={() => field.onChange(!field.value)} icon={<Wrench className="h-5 w-5" />} title="Installation" desc={field.value ? "Oui, par un technicien SODIS" : "Non merci"} />}
              />
              <Field label="Mode de paiement envisagé" error={f.errors.payment?.message} className="sm:col-span-2">
                <select className="input mt-2" {...register("payment")}>
                  {quoteSchema.shape.payment.options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <h3 className="font-display text-2xl font-semibold tracking-tight sm:col-span-2">Où vous envoyer l&apos;offre ?</h3>
              <Field label="Nom complet" error={f.errors.name?.message}>
                <input className="input mt-2" autoComplete="name" {...register("name")} />
              </Field>
              <Field label="Téléphone / WhatsApp" error={f.errors.phone?.message}>
                <input className="input mt-2" type="tel" autoComplete="tel" {...register("phone")} />
              </Field>
              <Field label="Email" error={f.errors.email?.message}>
                <input className="input mt-2" type="email" autoComplete="email" {...register("email")} />
              </Field>
              <Field label="Ville / commune" error={f.errors.city?.message}>
                <input className="input mt-2" autoComplete="address-level2" placeholder="Cocody, Yamoussoukro, Bouaké…" {...register("city")} />
              </Field>
              <Field label="Précisions (facultatif)" error={f.errors.message?.message} className="sm:col-span-2">
                <textarea className="input mt-2 min-h-28" placeholder="Délais, contraintes d'installation, nombre de pièces…" {...register("message")} />
              </Field>
              <div className="sm:col-span-2">
                <Consent register={register("consent")} error={f.errors.consent?.message} />
              </div>
              {m.isError && <p className="text-[13px] text-red sm:col-span-2">{m.error.message}</p>}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-6">
        <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} className={cn("inline-flex items-center gap-2 text-[14px] text-muted hover:text-ink", step === 0 && "invisible")}>
          <ArrowLeft className="h-4 w-4" /> Retour
        </button>
        {step < steps.length - 1 ? (
          <button type="button" onClick={next} className="inline-flex h-14 items-center gap-2 rounded-full bg-ink px-8 text-[15px] font-medium text-bg transition hover:bg-red hover:text-white">
            Continuer <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <SubmitButton pending={m.isPending}>Recevoir mon devis</SubmitButton>
        )}
      </div>
    </form>
  );
}
