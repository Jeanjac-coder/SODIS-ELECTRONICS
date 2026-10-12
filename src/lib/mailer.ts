import nodemailer, { type Transporter } from "nodemailer";

/**
 * Envoi d'emails côté serveur.
 *
 * Deux transports possibles (le premier configuré est utilisé) :
 *  1. SMTP — idéal avec la boîte serviceclient@sodis-electronics.com elle-même
 *     (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE) ;
 *  2. Resend — RESEND_API_KEY (domaine d'envoi vérifié chez Resend).
 */
export type Mail = { to: string[]; subject: string; html: string; text: string; replyTo?: string };

export const mailConfigured = () => Boolean(process.env.SMTP_HOST || process.env.RESEND_API_KEY);

const defaultFrom = () => process.env.FORMS_FROM_EMAIL ?? (process.env.SMTP_USER ? `SODIS Electronics <${process.env.SMTP_USER}>` : undefined);

let transporter: Transporter | null = null;
function smtp() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT ?? 465);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
    });
  }
  return transporter;
}

export async function sendMail(mail: Mail): Promise<boolean> {
  const from = defaultFrom();
  try {
    if (process.env.SMTP_HOST) {
      await smtp().sendMail({ from, to: mail.to, subject: mail.subject, html: mail.html, text: mail.text, replyTo: mail.replyTo });
      return true;
    }
    if (process.env.RESEND_API_KEY) {
      if (!from) throw new Error("FORMS_FROM_EMAIL manquant pour Resend");
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, to: mail.to, subject: mail.subject, html: mail.html, text: mail.text, reply_to: mail.replyTo }),
      });
      if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`);
      return true;
    }
  } catch (e) {
    console.error("[mailer] échec d'envoi :", e);
  }
  return false;
}
