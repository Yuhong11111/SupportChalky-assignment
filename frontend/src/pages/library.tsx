import { useEffect, useState } from 'react'
import { groupBooks, searchBooks, type BookResponse } from '../api/mockApi'
import Bookcase from '../components/Bookcase'
import SideRail from '../components/SideRail'

export default function Library() {
  const [groups, setGroups] = useState<Record<string, BookResponse[]>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<BookResponse[] | null>(null)

  useEffect(() => {
    let isActive = true

    const loadGroups = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await groupBooks({
          group_by: 'title_first_letter',
          group_size: 4,
          groups_per_page: 26,
          page: 0,
        })
        if (isActive) {
          setGroups(response.groups)
        }
      } catch (err) {
        if (isActive) {
          setError('Failed to load shelves.')
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadGroups()

    return () => {
      isActive = false
    }
  }, [])

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!query.trim()) {
      setSearchResults(null)
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      const response = await searchBooks({
        title: query,
        page: 0,
        row_per_page: 12,
        sort_by: 'title',
        sort_order: 'asc',
      })
      setSearchResults(response.books)
    } catch (err) {
      setError('Failed to search books.')
    } finally {
      setIsLoading(false)
    }
  }

  const buildShelves = (grouped: Record<string, BookResponse[]>) => {
    const ranges = [
      ['A', 'B'],
      ['C', 'D', 'E'],
      ['F', 'G', 'H'],
      ['I', 'J', 'K'],
      ['L', 'M', 'N'],
      ['O', 'P', 'Q'],
      ['R', 'S', 'T'],
      ['U', 'V', 'W'],
      ['X', 'Y', 'Z'],
    ]

    const pickBooks = (letters: string[]) =>
      letters.flatMap((letter) => grouped[letter] ?? [])

    return ranges.map((letters) => ({
      label: letters.join(' - '),
      slug: letters.join('-'),
      books: pickBooks(letters),
    }))
  }

  const shelves = buildShelves(groups)

  const toShelfBooks = (books: BookResponse[]) =>
    books.map((book) => ({
      title: book.title,
      author: book.author,
      coverUrl: book.cover_image_url || undefined,
      badge: book.lexile_level,
    }))

  return (
    <div className="relative mx-auto flex max-w-6xl gap-8 pb-24 pr-6 pt-12">
      <SideRail activeLabel="library" />
      <section className="flex-1">
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
          <p className="text-sm text-slate-600">Loading books...</p>
        ) : null}

        {searchResults ? (
          <div className="space-y-10">
            <Bookcase
              shelves={[
                {
                  label: 'Search',
                  books: toShelfBooks(searchResults),
                },
              ]}
            />
          </div>
        ) : (
          <Bookcase
            shelves={shelves.map((shelf) => ({
              label: shelf.label,
              books: toShelfBooks(shelf.books),
              actionHref: `/library/${encodeURIComponent(shelf.slug)}`,
            }))}
          />
        )}
      </section>
    </div>
  )
}
