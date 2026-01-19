import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { searchBooks, type BookResponse } from '../api/mockApi'
import Bookcase from '../components/Bookcase'
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
    <div className="relative mx-auto flex h-full max-w-6xl flex-col gap-6 pb-6 pr-4 pt-4 pl-14 sm:pl-16 md:flex-row md:gap-8 md:pb-10 md:pr-6 md:pt-8 md:pl-20">
      <SideRail activeLabel="library" />
      <section className="flex min-h-0 flex-1 flex-col">
        <div className="mb-4 flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/library')}
            className="inline-flex items-center gap-2 rounded-lg border border-blue-900 bg-blue-800 px-3 py-1.5 text-sm font-semibold text-white shadow-sm"
          >
            <span aria-hidden="true">←</span>
            Back
          </button>
        </div>

        <form
          onSubmit={handleSearch}
          className="mb-6 flex w-full max-w-xl items-center gap-2 rounded-xl border-2 border-slate-200 bg-white/80 py-2 pl-3 pr-0 shadow-sm"
        >
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Write the name of the book"
            className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none sm:text-base"
          />
          <button
            type="submit"
            className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 sm:h-7 sm:w-7 md:h-8 md:w-8"
            aria-label="Search"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4"
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

        <Bookcase
          className="flex-1 min-h-0"
          shelves={[
            {
              label: 'Search results',
              books: shelfBooks,
              showAction: false,
              maxBooks: null,
              showMeta: false,
              showPlaceholders: false,
            },
          ]}
        />
      </section>
    </div>
  )
}
