"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { appointmentSchema, callbackSchema, contactSchema } from "@/lib/schemas";
import { useFormSubmit } from "@/lib/forms";
import { stores } from "@/data/stores";
import { Consent, Field, SubmitButton, SuccessPanel } from "./fields";

export function ContactForm() {
  const m = useFormSubmit("contact");
  const { register, handleSubmit, formState: f, getValues } = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: "Information produit" },
  });
  if (m.isSuccess)
    return (
      <SuccessPanel
        title="Message bien reçu !"
        body="Un conseiller SODIS vous répond très vite — généralement dans l'heure, aux horaires d'ouverture."
        refId={m.data.ref}
        delivered={m.data.delivered}
        whatsappText={`Bonjour SODIS, je suis ${getValues("name")}. ${getValues("message")}`}
      />
    );
  return (
    <form onSubmit={handleSubmit((d) => m.mutate(d))} className="grid gap-5 sm:grid-cols-2" noValidate>
      <Field label="Nom complet" error={f.errors.name?.message}>
        <input className="input mt-2" autoComplete="name" {...register("name")} />
      </Field>
      <Field label="Téléphone / WhatsApp" error={f.errors.phone?.message}>
        <input className="input mt-2" type="tel" autoComplete="tel" placeholder="07 00 00 00 00" {...register("phone")} />
      </Field>
      <Field label="Email (facultatif)" error={f.errors.email?.message}>
        <input className="input mt-2" type="email" autoComplete="email" {...register("email")} />
      </Field>
      <Field label="Sujet" error={f.errors.subject?.message}>
        <select className="input mt-2" {...register("subject")}>
          {contactSchema.shape.subject.options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </Field>
      <Field label="Votre message" error={f.errors.message?.message} className="sm:col-span-2">
        <textarea className="input mt-2 min-h-36 resize-y" {...register("message")} />
      </Field>
      <div className="sm:col-span-2">
        <Consent register={register("consent")} error={f.errors.consent?.message} />
      </div>
      {m.isError && <p className="text-[13px] text-red sm:col-span-2">{m.error.message}</p>}
      <SubmitButton pending={m.isPending} className="sm:col-span-2 sm:w-fit">
        Envoyer le message
      </SubmitButton>
    </form>
  );
}

export function CallbackForm({ compact }: { compact?: boolean }) {
  const m = useFormSubmit("callback");
  const { register, handleSubmit, formState: f } = useForm<z.infer<typeof callbackSchema>>({
    resolver: zodResolver(callbackSchema),
    defaultValues: { slot: "Dès que possible" },
  });
  if (m.isSuccess) return <SuccessPanel title="C'est noté !" body="Un conseiller vous rappelle sur le créneau choisi. Gardez votre téléphone à portée de main." refId={m.data.ref} delivered />;
  return (
    <form onSubmit={handleSubmit((d) => m.mutate(d))} className={compact ? "grid gap-4" : "grid gap-5 sm:grid-cols-3"} noValidate>
      <Field label="Nom" error={f.errors.name?.message}>
        <input className="input mt-2" autoComplete="name" {...register("name")} />
      </Field>
      <Field label="Téléphone" error={f.errors.phone?.message}>
        <input className="input mt-2" type="tel" autoComplete="tel" {...register("phone")} />
      </Field>
      <Field label="Quand vous rappeler ?" error={f.errors.slot?.message}>
        <select className="input mt-2" {...register("slot")}>
          {callbackSchema.shape.slot.options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </Field>
      {m.isError && <p className="text-[13px] text-red">{m.error.message}</p>}
      <SubmitButton pending={m.isPending} className={compact ? "" : "sm:col-span-3 sm:w-fit"}>
        Être rappelé gratuitement
      </SubmitButton>
    </form>
  );
}

export function AppointmentForm() {
  const m = useFormSubmit("appointment");
  const today = new Date().toISOString().slice(0, 10);
  const { register, handleSubmit, formState: f } = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: { reason: "Conseil personnalisé", store: stores[0]?.name, time: "10:00" },
  });
  if (m.isSuccess)
    return <SuccessPanel title="Rendez-vous demandé" body="Nous vous confirmons le créneau par SMS ou WhatsApp. On vous attend avec le café !" refId={m.data.ref} delivered />;
  return (
    <form onSubmit={handleSubmit((d) => m.mutate(d))} className="grid gap-5 sm:grid-cols-2" noValidate>
      <Field label="Nom complet" error={f.errors.name?.message}>
        <input className="input mt-2" autoComplete="name" {...register("name")} />
      </Field>
      <Field label="Téléphone" error={f.errors.phone?.message}>
        <input className="input mt-2" type="tel" autoComplete="tel" {...register("phone")} />
      </Field>
      <Field label="Motif" error={f.errors.reason?.message}>
        <select className="input mt-2" {...register("reason")}>
          {appointmentSchema.shape.reason.options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </Field>
      <Field label="Showroom" error={f.errors.store?.message}>
        <select className="input mt-2" {...register("store")}>
          {stores.map((s) => (
            <option key={s.id}>{s.name}</option>
          ))}
        </select>
      </Field>
      <Field label="Date" error={f.errors.date?.message}>
        <input className="input mt-2" type="date" min={today} {...register("date")} />
      </Field>
      <Field label="Heure" error={f.errors.time?.message}>
        <select className="input mt-2" {...register("time")}>
          {["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      {m.isError && <p className="text-[13px] text-red sm:col-span-2">{m.error.message}</p>}
      <SubmitButton pending={m.isPending} className="sm:col-span-2 sm:w-fit">
        Réserver mon créneau
      </SubmitButton>
    </form>
  );
}
