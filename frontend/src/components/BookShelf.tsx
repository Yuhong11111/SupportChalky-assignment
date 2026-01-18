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
}

export default function BookShelf({
  label,
  books,
  actionLabel = 'See more\nBooks',
  showAction = true,
}: BookShelfProps) {
  return (
    <section className="relative">
      <div className="relative rounded-[28px] bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900 px-6 pb-8 pt-10 shadow-inner">
        <span className="absolute left-1/2 top-2 -translate-x-1/2 rounded-xl border border-amber-200 bg-amber-100 px-4 py-1 text-sm font-semibold tracking-[0.2em] text-amber-900 shadow">
          {label}
        </span>
        <div className="flex items-start justify-between gap-6">
          <div className="grid flex-1 grid-cols-2 gap-6 sm:grid-cols-4">
            {books.slice(0, 4).map((book) => (
              <BookCard key={book.title} {...book} />
            ))}
          </div>
          {showAction ? (
            <button
              type="button"
              className="mt-6 h-20 w-28 rounded-lg bg-indigo-600 px-3 text-sm font-semibold text-white shadow-lg shadow-indigo-900/20"
            >
              {actionLabel.split('\n').map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </button>
          ) : null}
        </div>
      </div>
    </section>
  )
}
