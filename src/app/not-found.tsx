import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="text-8xl font-bold text-primary-600 mb-4">404</div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">
          Page introuvable
        </h1>
        <p className="text-lg text-neutral-600 mb-10 leading-relaxed">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/villes"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-neutral-100 text-neutral-900 font-semibold rounded-xl hover:bg-neutral-200 transition-colors"
          >
            Explorer les villes
          </Link>
        </div>
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <p className="text-sm text-neutral-500 mb-4">Vous cherchez peut-être :</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/villes" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
              Classement des villes
            </Link>
            <span className="text-neutral-300">|</span>
            <Link href="/quartiers" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
              Quartiers
            </Link>
            <span className="text-neutral-300">|</span>
            <Link href="/outils" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
              Outils
            </Link>
            <span className="text-neutral-300">|</span>
            <Link href="/methodologie" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
              Méthodologie
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
