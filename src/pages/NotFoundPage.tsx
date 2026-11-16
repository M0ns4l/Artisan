import { ArrowLeft, FolderOpen } from 'lucide-react'
import { ButtonLink } from '../components/ui/Button.tsx'
import { useDocumentMeta } from '../hooks/useDocumentMeta.ts'

function NotFoundMeta() {
  useDocumentMeta({
    title: 'Page not found',
    description: 'The page you were looking for could not be found.',
    path: '/404',
    noIndex: true,
  })
  return null
}

/** `embedded` is used by the project route, which manages its own metadata. */
export function NotFoundPage({ embedded = false }: { embedded?: boolean }) {
  return (
    <section aria-labelledby="not-found-title" className="container-page flex min-h-[65vh] items-center py-20">
      {!embedded && <NotFoundMeta />}
      <div className="max-w-xl">
        <p className="font-mono text-sm text-accent">
          <span aria-hidden="true">GET </span>404 · Not Found
        </p>
        <h1 id="not-found-title" className="mt-4 text-4xl leading-tight font-semibold sm:text-5xl">
          This route doesn’t resolve to anything.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-fg-muted">
          The page may have moved, or the link may be mistyped. Everything else is still where you left it.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to="/">
            <ArrowLeft size={17} aria-hidden="true" />
            Return home
          </ButtonLink>
          <ButtonLink to="/projects" variant="secondary">
            <FolderOpen size={17} aria-hidden="true" />
            Browse projects
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
