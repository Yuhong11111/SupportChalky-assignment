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
  showPlaceholders?: boolean
}

type BookcaseProps = {
  shelves: Shelf[]
  className?: string
  showFrame?: boolean
}

export default function Bookcase({
  shelves,
  className = '',
  showFrame = true,
}: BookcaseProps) {
  return (
    <section
      className={`relative flex h-[clamp(320px,56vh,480px)] flex-col pt-[8vh] ${className}`}
    >
      <div
        className={`relative flex min-h-0 flex-1 flex-col p-0 ${
          showFrame ? 'rounded-[36px] bg-amber-800 pb-10' : ''
        }`}
      >
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
              showPlaceholders={shelf.showPlaceholders}
            />
          ))}
        </div>
        {showFrame ? (
          <div className="absolute bottom-0 -left-4 -right-4 h-10 rounded-full bg-gradient-to-b from-amber-600 to-amber-700 shadow-lg" />
        ) : null}
      </div>
    </section>
  )
}
