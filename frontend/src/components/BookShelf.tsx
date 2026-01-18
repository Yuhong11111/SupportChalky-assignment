import { Link } from 'react-router-dom'
import BookCard from './BookCard'

type Book = {
  title: string
  author?: string
  coverUrl?: string
  badge?: string
  variant?: 'default' | 'framed'
}

type BookShelfProps = {
  label: string
  books: Book[]
  actionLabel?: string
  showAction?: boolean
  actionHref?: string
  maxBooks?: number | null
  showMeta?: boolean
  showPlaceholders?: boolean
}

export default function BookShelf({
  label,
  books,
  actionLabel = 'See more\nBooks',
  showAction = true,
  actionHref,
  maxBooks = 4,
  showMeta = false,
  showPlaceholders = true,
}: BookShelfProps) {
  const visibleBooks =
    typeof maxBooks === 'number' ? books.slice(0, maxBooks) : books

  const placeholders = showPlaceholders
    ? Math.max(0, 4 - visibleBooks.length)
    : 0

  return (
    <section className="relative mt-0">
      <div className="relative rounded-[26px] bg-amber-800 px-6 pb-0 pt-16 shadow-inner">
        <div className="absolute left-0 right-0 top-0 h-11 rounded-full bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 shadow-lg" />
        <span className="absolute left-1/2 top-2 z-10 -translate-x-1/2 rounded-xl border border-amber-200 bg-amber-100 px-4 py-1 text-[11px] font-semibold tracking-[0.2em] text-amber-900 shadow sm:text-xs md:text-sm">
          {label}
        </span>
        <div className="flex flex-col items-start gap-6 pt-5 sm:flex-row sm:justify-between">
          <div className="grid w-full grid-cols-2 gap-4 sm:flex-1 sm:grid-cols-4 sm:gap-6">
            {visibleBooks.map((book) => (
              <BookCard
                key={book.title}
                {...book}
                showMeta={showMeta}
                variant={book.variant}
              />
            ))}
            {Array.from({ length: placeholders }).map((_, index) => (
              <div
                key={`placeholder-${index}`}
                className="mx-auto w-full max-w-[7rem] rounded-md border border-amber-300/40 bg-amber-700/30 shadow-inner sm:max-w-[8rem]"
              >
                <div className="aspect-[3/4] w-full rounded-md border border-dashed border-amber-200/40" />
              </div>
            ))}
          </div>
          {showAction ? (
            actionHref ? (
              <Link
                to={actionHref}
                className="h-10 w-full rounded-lg bg-blue-800 px-3 text-center text-sm font-semibold text-white shadow-lg shadow-blue-900/20 sm:mt-5 sm:h-16 sm:w-24"
              >
                {actionLabel.split('\n').map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </Link>
            ) : (
              <button
                type="button"
                className="h-10 w-full rounded-lg bg-blue-800 px-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 sm:mt-5 sm:h-16 sm:w-24"
              >
                {actionLabel.split('\n').map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </button>
            )
          ) : null}
        </div>
      </div>
    </section>
  )
}
