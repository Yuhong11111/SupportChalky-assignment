import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { searchBooks, type BookResponse } from '../api/mockApi'
import BookShelf from '../components/BookShelf'
import SideRail from '../components/SideRail'

export default function SearchPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const initialQuery = params.get('q') ?? ''
  const [query, setQuery] = useState(initialQuery)
  const [books, setBooks] = useState<BookResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true

    const runSearch = async () => {
      if (!initialQuery.trim()) {
        setBooks([])
        setIsLoading(false)
        return
      }
      setIsLoading(true)
      setError(null)
      try {
        const response = await searchBooks({
          title: initialQuery,
          page: 0,
          row_per_page: 24,
          sort_by: 'title',
          sort_order: 'asc',
        })
        if (isActive) {
          setBooks(response.books)
        }
      } catch (err) {
        if (isActive) {
          setError('Failed to search books.')
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    runSearch()

    return () => {
      isActive = false
    }
  }, [initialQuery])

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  const shelfBooks = books.map((book) => ({
    title: book.title,
    author: book.author,
    coverUrl: book.cover_image_url || undefined,
    badge: book.lexile_level,
  }))

  return (
    <div className="relative mx-auto flex max-w-6xl gap-8 pb-24 pr-6 pt-8">
      <SideRail activeLabel="library" />
      <section className="flex-1">
        <div className="mb-4 flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/library')}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white/80 px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm"
          >
            <span aria-hidden="true">←</span>
            Back
          </button>
        </div>

        <form
          onSubmit={handleSearch}
          className="mb-6 flex max-w-xl items-center gap-3 rounded-xl border-2 border-slate-200 bg-white/80 px-4 py-3 shadow-sm"
        >
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Write the name of the book"
            className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500"
            aria-label="Search"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.65" y1="16.65" x2="21" y2="21" />
            </svg>
          </button>
        </form>

        {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}
        {isLoading ? (
          <p className="mb-4 text-sm text-slate-600">Loading books...</p>
        ) : null}

        <div className="relative">
          <div className="relative h-12 rounded-full bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 shadow-lg" />
          <div className="-mt-6">
            <BookShelf
              label="Search results"
              books={shelfBooks}
              showAction={false}
              maxBooks={null}
              showMeta
            />
          </div>
          <div className="-mt-4 h-10 rounded-full bg-gradient-to-b from-amber-600 to-amber-700 shadow-lg" />
        </div>
      </section>
    </div>
  )
}
