import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80vh] flex-col items-center justify-center pt-24 text-center">
      <p className="eyebrow">Erreur 404</p>
      <h1 className="h-display mt-6 max-w-3xl text-balance">Cette page a pris la route sans nous.</h1>
      <p className="lead mt-6 max-w-md">Elle n&apos;existe pas ou plus. Mais nos produits, eux, sont bien là.</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/" className="inline-flex h-12 items-center rounded-full bg-ink px-6 text-[14px] font-medium text-bg">
          Retour à l&apos;accueil
        </Link>
        <Link href="/produits" className="inline-flex h-12 items-center rounded-full border border-line px-6 text-[14px] font-medium">
          Voir les produits
        </Link>
      </div>
    </section>
  );
}
