import { Link } from 'react-router-dom'
import BookCard from './BookCard'

type Book = {
  title: string
  author?: string
  coverUrl?: string
  badge?: string
}

type BookShelfProps = {
  label: string
  books: Book[]
  actionLabel?: string
  showAction?: boolean
  actionHref?: string
  maxBooks?: number | null
  showMeta?: boolean
}

export default function BookShelf({
  label,
  books,
  actionLabel = 'See more\nBooks',
  showAction = true,
  actionHref,
  maxBooks = 4,
  showMeta = false,
}: BookShelfProps) {
  const visibleBooks =
    typeof maxBooks === 'number' ? books.slice(0, maxBooks) : books

  return (
    <section className="relative mt-0">
      <div className="relative rounded-[26px] bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900 px-6 pb-12 pt-16 shadow-inner">
        <div className="absolute left-0 right-0 top-0 h-11 rounded-full bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 shadow-lg" />
        <span className="absolute left-1/2 top-2 z-10 -translate-x-1/2 rounded-xl border border-amber-200 bg-amber-100 px-4 py-1 text-[11px] font-semibold tracking-[0.2em] text-amber-900 shadow sm:text-xs md:text-sm">
          {label}
        </span>
        <div className="flex flex-col items-start gap-6 pt-5 sm:flex-row sm:justify-between">
          <div className="grid w-full grid-cols-2 gap-4 sm:flex-1 sm:grid-cols-4 sm:gap-6">
            {visibleBooks.map((book) => (
              <BookCard key={book.title} {...book} showMeta={showMeta} />
            ))}
          </div>
          {showAction ? (
            actionHref ? (
              <Link
                to={actionHref}
                className="h-12 w-full rounded-lg bg-indigo-600 px-3 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-900/20 sm:mt-6 sm:h-20 sm:w-28"
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
                className="h-12 w-full rounded-lg bg-indigo-600 px-3 text-sm font-semibold text-white shadow-lg shadow-indigo-900/20 sm:mt-6 sm:h-20 sm:w-28"
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
