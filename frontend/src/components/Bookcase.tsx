import BookShelf from './BookShelf'

type Book = {
  title: string
  author?: string
  coverUrl?: string
  badge?: string
}

type Shelf = {
  label: string
  books: Book[]
  actionHref?: string
  actionLabel?: string
  showAction?: boolean
  maxBooks?: number | null
  showMeta?: boolean
}

type BookcaseProps = {
  shelves: Shelf[]
  className?: string
}

export default function Bookcase({ shelves, className = '' }: BookcaseProps) {
  return (
    <section
      className={`relative flex h-[clamp(320px,56vh,480px)] flex-col pt-[13.3333vh] ${className}`}
    >
      <div className="relative flex min-h-0 flex-1 flex-col rounded-[36px] bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900 p-0 shadow-inner">
        <div className="min-h-0 flex-1 space-y-0 overflow-y-auto p-0">
          {shelves.map((shelf) => (
            <BookShelf
              key={shelf.label}
              label={shelf.label}
              books={shelf.books}
              actionHref={shelf.actionHref}
              actionLabel={shelf.actionLabel}
              showAction={shelf.showAction}
              maxBooks={shelf.maxBooks}
              showMeta={shelf.showMeta}
            />
          ))}
        </div>
      </div>
      <div className="h-10 rounded-full bg-gradient-to-b from-amber-600 to-amber-700 shadow-lg" />
    </section>
  )
}
