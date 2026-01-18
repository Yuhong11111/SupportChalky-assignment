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
}

type BookcaseProps = {
  shelves: Shelf[]
}

export default function Bookcase({ shelves }: BookcaseProps) {
  return (
    <section className="relative">
      <div className="relative rounded-[34px] border-4 border-amber-800/80 bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900 px-6 pb-6 pt-10 shadow-inner">
        <div className="absolute left-0 right-0 top-0 h-12 -translate-y-1/2 rounded-full bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 shadow-lg" />
        <div className="absolute bottom-0 left-0 right-0 h-10 translate-y-1/2 rounded-full bg-gradient-to-b from-amber-600 to-amber-700 shadow-lg" />

        <div className="h-[520px] space-y-10 overflow-y-auto pr-3">
          {shelves.map((shelf) => (
            <BookShelf
              key={shelf.label}
              label={shelf.label}
              books={shelf.books}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
