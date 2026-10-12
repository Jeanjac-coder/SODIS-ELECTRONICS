import { cn } from "@/lib/utils";

/**
 * Badges des moyens de paiement — dessinés en SVG pour un rendu net et
 * harmonisé à toutes les tailles. Pour utiliser les logos officiels fournis
 * par chaque opérateur (kits presse), remplacez le contenu de chaque badge
 * par <Image src="/payments/<id>.svg" …/> en conservant le gabarit 120×72.
 */
type Method = { id: string; label: string; render: () => React.ReactNode };

const Frame = ({ children, bg = "#fff" }: { children: React.ReactNode; bg?: string }) => (
  <svg viewBox="0 0 120 72" className="h-full w-full" role="img" aria-hidden>
    <rect width="120" height="72" rx="12" fill={bg} />
    {children}
  </svg>
);

export const paymentMethods: Method[] = [
  {
    id: "orange-money",
    label: "Orange Money",
    render: () => (
      <Frame bg="#000">
        <rect x="14" y="20" width="32" height="32" fill="#FF7900" />
        <rect x="18" y="44" width="24" height="4" fill="#fff" />
        <text x="52" y="34" fill="#fff" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="12">orange</text>
        <text x="52" y="49" fill="#FF7900" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="12">money</text>
      </Frame>
    ),
  },
  {
    id: "mtn-momo",
    label: "MTN Mobile Money",
    render: () => (
      <Frame bg="#FFCB05">
        <ellipse cx="38" cy="36" rx="22" ry="14" fill="none" stroke="#000" strokeWidth="3" />
        <text x="38" y="41" textAnchor="middle" fill="#000" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="13">MTN</text>
        <text x="66" y="33" fill="#000" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="10">Mobile</text>
        <text x="66" y="46" fill="#000" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="10">Money</text>
      </Frame>
    ),
  },
  {
    id: "wave",
    label: "Wave",
    render: () => (
      <Frame bg="#1DC8FF">
        <path d="M22 40c6-10 12-10 18 0s12 10 18 0" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        <text x="66" y="44" fill="#fff" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="17">wave</text>
      </Frame>
    ),
  },
  {
    id: "moov-money",
    label: "Moov Money",
    render: () => (
      <Frame bg="#0066B3">
        <circle cx="28" cy="36" r="13" fill="#F28C00" />
        <text x="28" y="41" textAnchor="middle" fill="#fff" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="12">m</text>
        <text x="48" y="34" fill="#fff" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="13">moov</text>
        <text x="48" y="48" fill="#F28C00" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="11">money</text>
      </Frame>
    ),
  },
  {
    id: "visa",
    label: "Visa",
    render: () => (
      <Frame>
        <text x="60" y="46" textAnchor="middle" fill="#1A1F71" fontFamily="Arial Black, Arial, sans-serif" fontStyle="italic" fontWeight="900" fontSize="26">VISA</text>
      </Frame>
    ),
  },
  {
    id: "mastercard",
    label: "Mastercard",
    render: () => (
      <Frame>
        <circle cx="50" cy="36" r="17" fill="#EB001B" />
        <circle cx="70" cy="36" r="17" fill="#F79E1B" />
        <path d="M60 22.2a17 17 0 0 1 0 27.6 17 17 0 0 1 0-27.6z" fill="#FF5F00" />
      </Frame>
    ),
  },
  {
    id: "carte-bancaire",
    label: "Paiement par carte bancaire",
    render: () => (
      <Frame bg="#1938A5">
        <rect x="24" y="22" width="44" height="28" rx="5" fill="none" stroke="#fff" strokeWidth="2.5" />
        <rect x="24" y="29" width="44" height="5" fill="#fff" />
        <text x="74" y="34" fill="#fff" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="10">Carte</text>
        <text x="74" y="47" fill="#fff" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="10">bancaire</text>
      </Frame>
    ),
  },
  {
    id: "virement",
    label: "Virement bancaire",
    render: () => (
      <Frame bg="#f5f5f7">
        <path d="M22 30h30l-7-7M52 42H22l7 7" fill="none" stroke="#0b0b0d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="60" y="34" fill="#0b0b0d" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="10">Virement</text>
        <text x="60" y="47" fill="#0b0b0d" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="10">bancaire</text>
      </Frame>
    ),
  },
  {
    id: "livraison",
    label: "Paiement à la livraison",
    render: () => (
      <Frame bg="#253060">
        <path d="M18 28h24v16H18zM42 33h8l5 5v6H42z" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="26" cy="46" r="3" fill="#fff" />
        <circle cx="48" cy="46" r="3" fill="#fff" />
        <text x="62" y="34" fill="#fff" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="10">Paiement à</text>
        <text x="62" y="47" fill="#fff" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="10">la livraison</text>
      </Frame>
    ),
  },
];

export function PaymentLogos({ className, size = "md" }: { className?: string; size?: "sm" | "md" }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2.5", className)} aria-label="Moyens de paiement acceptés">
      {paymentMethods.map((m) => (
        <li
          key={m.id}
          title={m.label}
          className={cn(
            "overflow-hidden rounded-xl border border-line shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md",
            size === "sm" ? "h-8 w-[54px]" : "h-12 w-20",
          )}
        >
          {m.render()}
          <span className="sr-only">{m.label}</span>
        </li>
      ))}
    </ul>
  );
}
