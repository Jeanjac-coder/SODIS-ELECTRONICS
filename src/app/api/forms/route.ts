import { NextResponse } from "next/server";
import { formSchemas, type FormKind } from "@/lib/schemas";
import { getProduct } from "@/data/products";
import { site } from "@/config/site";

/**
 * Point d'entrée unique des formulaires (devis, contact, rappel, rendez-vous, newsletter).
 *
 * Envoi automatique :
 *  - par email via Resend si RESEND_API_KEY est défini (destinataire : FORMS_TO_EMAIL) ;
 *  - et/ou vers un webhook (Make, Zapier, n8n, CRM…) si FORMS_WEBHOOK_URL est défini.
 * Sans configuration, la demande est journalisée côté serveur et le client
 * propose d'envoyer le récapitulatif par WhatsApp.
 */
const titles: Record<FormKind, string> = {
  quote: "Nouvelle demande de devis",
  contact: "Nouveau message de contact",
  callback: "Demande de rappel",
  appointment: "Demande de rendez-vous",
  newsletter: "Inscription newsletter",
};

const esc = (s: unknown) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

function toHtml(kind: FormKind, data: Record<string, unknown>, ref: string) {
  const rows = Object.entries(data)
    .filter(([k]) => k !== "items" && k !== "consent")
    .map(([k, v]) => `<tr><td style="padding:6px 12px;color:#6e6e73">${esc(k)}</td><td style="padding:6px 12px">${esc(typeof v === "boolean" ? (v ? "Oui" : "Non") : v)}</td></tr>`)
    .join("");
  const items = Array.isArray(data.items)
    ? `<h3>Produits</h3><ul>${(data.items as { slug: string; qty: number }[])
        .map((i) => {
          const p = getProduct(i.slug);
          return `<li>${i.qty} × ${esc(p?.name ?? i.slug)} (${esc(p?.model ?? "")})</li>`;
        })
        .join("")}</ul>`
    : "";
  return `<div style="font-family:Inter,Arial,sans-serif"><h2>${titles[kind]} — ${ref}</h2><table>${rows}</table>${items}</div>`;
}

export async function POST(req: Request) {
  let body: { kind?: string; data?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide" }, { status: 400 });
  }
  const kind = body.kind as FormKind;
  const schema = formSchemas[kind];
  if (!schema) return NextResponse.json({ ok: false, error: "Formulaire inconnu" }, { status: 400 });

  const parsed = schema.safeParse(body.data);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Champs invalides", issues: parsed.error.issues }, { status: 422 });

  const data = parsed.data as Record<string, unknown>;
  const ref = `${kind === "quote" ? "DEV" : "SOD"}-${Date.now().toString(36).toUpperCase()}`;
  let delivered = false;

  const tasks: Promise<unknown>[] = [];
  if (process.env.RESEND_API_KEY) {
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.FORMS_FROM_EMAIL ?? `SODIS Electronics <no-reply@${new URL(site.url).hostname.replace(/^www\./, "")}>`,
          to: (process.env.FORMS_TO_EMAIL ?? site.email).split(","),
          reply_to: typeof data.email === "string" && data.email ? data.email : undefined,
          subject: `${titles[kind]} · ${ref}`,
          html: toHtml(kind, data, ref),
        }),
      }).then((r) => {
        if (r.ok) delivered = true;
      }),
    );
  }
  if (process.env.FORMS_WEBHOOK_URL) {
    tasks.push(
      fetch(process.env.FORMS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, ref, data, at: new Date().toISOString() }),
      }).then((r) => {
        if (r.ok) delivered = true;
      }),
    );
  }
  await Promise.allSettled(tasks);
  if (!tasks.length) console.info(`[forms] ${titles[kind]} ${ref}`, JSON.stringify(data));

  return NextResponse.json({ ok: true, ref, delivered });
}
