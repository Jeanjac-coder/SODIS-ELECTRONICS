import { NextResponse } from "next/server";
import { formSchemas, type FormKind } from "@/lib/schemas";
import { getProduct } from "@/data/products";
import { site } from "@/config/site";
import { mailConfigured, sendMail } from "@/lib/mailer";

export const runtime = "nodejs";

/**
 * Point d'entrée unique des formulaires (devis, contact, rappel, rendez-vous, newsletter).
 *
 * Chaque demande est envoyée automatiquement par email à QUOTE_TO_EMAIL (devis)
 * ou FORMS_TO_EMAIL (autres formulaires) — par défaut : site.email
 * (serviceclient@sodis-electronics.com). Le transport (SMTP ou Resend) se
 * configure dans les variables d'environnement, voir .env.example.
 * Optionnel : FORMS_WEBHOOK_URL pour pousser aussi la demande vers un CRM / Make / Zapier.
 */
const titles: Record<FormKind, string> = {
  quote: "Nouvelle demande de devis",
  contact: "Nouveau message de contact",
  callback: "Demande de rappel",
  appointment: "Demande de rendez-vous",
  newsletter: "Inscription newsletter",
};

const labels: Record<string, string> = {
  customerType: "Client",
  company: "Entreprise",
  name: "Nom",
  phone: "Téléphone / WhatsApp",
  email: "Email",
  city: "Ville / commune",
  projectType: "Type de projet",
  budget: "Budget",
  delivery: "Livraison",
  installation: "Installation",
  payment: "Paiement",
  message: "Précisions",
  subject: "Sujet",
  slot: "Créneau de rappel",
  date: "Date",
  time: "Heure",
  store: "Magasin",
  reason: "Motif",
};

const esc = (s: unknown) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
const fmt = (v: unknown) => (typeof v === "boolean" ? (v ? "Oui" : "Non") : v === "particulier" ? "Particulier" : v === "entreprise" ? "Entreprise" : String(v ?? ""));

type Item = { slug: string; qty: number };

function fields(data: Record<string, unknown>) {
  return Object.entries(data)
    .filter(([k, v]) => k !== "items" && k !== "consent" && v !== undefined && v !== "")
    .map(([k, v]) => [labels[k] ?? k, fmt(v)] as const);
}

function itemsOf(data: Record<string, unknown>) {
  return (Array.isArray(data.items) ? (data.items as Item[]) : []).map((i) => {
    const p = getProduct(i.slug);
    return { qty: i.qty, name: p?.name ?? i.slug, model: p?.model ?? "", url: `${site.url}/produits/${i.slug}` };
  });
}

function toHtml(kind: FormKind, data: Record<string, unknown>, ref: string) {
  const rows = fields(data)
    .map(([k, v]) => `<tr><td style="padding:8px 12px;color:#6e6e73;white-space:nowrap;vertical-align:top">${esc(k)}</td><td style="padding:8px 12px;color:#0b0b0d">${esc(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("");
  const items = itemsOf(data);
  const total = items.reduce((n, i) => n + i.qty, 0);
  const itemsHtml = items.length
    ? `<h3 style="margin:28px 0 10px;font-size:16px;color:#253060">Produits demandés (${total} article${total > 1 ? "s" : ""})</h3>
       <table style="width:100%;border-collapse:collapse;font-size:14px">
         <tr style="background:#f5f5f7"><th style="text-align:left;padding:8px 12px">Qté</th><th style="text-align:left;padding:8px 12px">Produit</th><th style="text-align:left;padding:8px 12px">Référence</th></tr>
         ${items.map((i) => `<tr style="border-bottom:1px solid #e7e7ec"><td style="padding:8px 12px;font-weight:600">${i.qty}</td><td style="padding:8px 12px"><a href="${esc(i.url)}" style="color:#1938a5">${esc(i.name)}</a></td><td style="padding:8px 12px;color:#6e6e73">${esc(i.model)}</td></tr>`).join("")}
       </table>`
    : "";
  return `<div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:auto;border:1px solid #e7e7ec;border-radius:16px;overflow:hidden">
    <div style="background:#253060;color:#fff;padding:20px 24px">
      <div style="font-size:12px;letter-spacing:2px;color:#e9c46a;font-weight:700">SODIS ELECTRONICS</div>
      <div style="font-size:20px;font-weight:700;margin-top:4px">${titles[kind]}</div>
      <div style="font-size:13px;opacity:.8;margin-top:4px">Réf. ${ref} · ${new Date().toLocaleString("fr-FR", { timeZone: "Africa/Abidjan" })}</div>
    </div>
    <div style="padding:20px 12px"><table style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table>${itemsHtml}</div>
  </div>`;
}

function toText(kind: FormKind, data: Record<string, unknown>, ref: string) {
  const items = itemsOf(data);
  return [
    `${titles[kind]} — Réf. ${ref}`,
    "",
    ...fields(data).map(([k, v]) => `${k} : ${v}`),
    ...(items.length ? ["", "Produits :", ...items.map((i) => `- ${i.qty} × ${i.name} (${i.model})`)] : []),
  ].join("\n");
}

function confirmationHtml(data: Record<string, unknown>, ref: string) {
  const items = itemsOf(data);
  return `<div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:auto">
    <div style="background:#253060;color:#fff;padding:20px 24px;border-radius:16px 16px 0 0"><b>SODIS Electronics</b> · Distributeur officiel LG</div>
    <div style="padding:24px;border:1px solid #e7e7ec;border-top:0;border-radius:0 0 16px 16px">
      <p>Bonjour ${esc(String(data.name ?? "").split(" ")[0])},</p>
      <p>Nous avons bien reçu votre demande de devis <b>${ref}</b>. Un conseiller SODIS vous recontacte sous 24 h ouvrées avec une offre personnalisée.</p>
      ${items.length ? `<ul>${items.map((i) => `<li>${i.qty} × ${esc(i.name)}</li>`).join("")}</ul>` : ""}
      <p>Une question ? Répondez simplement à cet email ou contactez-nous au ${site.phone}.</p>
      <p style="color:#6e6e73;font-size:13px">L'équipe SODIS Electronics</p>
    </div>
  </div>`;
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
  const clientEmail = typeof data.email === "string" && data.email ? data.email : undefined;
  const to = (kind === "quote" ? process.env.QUOTE_TO_EMAIL ?? process.env.FORMS_TO_EMAIL ?? site.email : process.env.FORMS_TO_EMAIL ?? site.email)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const who = [data.name, data.company].filter(Boolean).join(" — ");
  const nItems = itemsOf(data).reduce((n, i) => n + i.qty, 0);
  const subject = `${titles[kind]} ${ref}${who ? ` · ${who}` : ""}${nItems ? ` · ${nItems} article${nItems > 1 ? "s" : ""}` : ""}`;

  const tasks: Promise<boolean>[] = [];
  if (mailConfigured()) {
    tasks.push(sendMail({ to, subject, html: toHtml(kind, data, ref), text: toText(kind, data, ref), replyTo: clientEmail }));
  }
  if (process.env.FORMS_WEBHOOK_URL) {
    tasks.push(
      fetch(process.env.FORMS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, ref, data, at: new Date().toISOString() }),
      }).then((r) => r.ok, () => false),
    );
  }
  const results = await Promise.all(tasks);
  const delivered = results.some(Boolean);

  // Accusé de réception au client (devis uniquement) — désactivable avec QUOTE_CONFIRMATION=false
  if (delivered && kind === "quote" && clientEmail && mailConfigured() && process.env.QUOTE_CONFIRMATION !== "false") {
    await sendMail({
      to: [clientEmail],
      subject: `SODIS Electronics — votre demande de devis ${ref}`,
      html: confirmationHtml(data, ref),
      text: `Bonjour, nous avons bien reçu votre demande de devis ${ref}. Un conseiller SODIS vous recontacte sous 24 h ouvrées. ${site.phone}`,
      replyTo: to[0],
    });
  }

  if (!delivered) console.warn(`[forms] ${titles[kind]} ${ref} NON ENVOYÉE (${mailConfigured() ? "échec d'envoi, voir erreur ci-dessus" : "email non configuré"})`, JSON.stringify(data));

  return NextResponse.json({ ok: true, ref, delivered });
}
