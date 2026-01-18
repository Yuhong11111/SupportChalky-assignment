import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { searchBooks, type BookResponse } from '../api/mockApi'
import BookShelf from '../components/BookShelf'

const parseGroup = (groupParam?: string) => {
  if (!groupParam) return { label: 'Group', letters: [] as string[] }
  const letters = groupParam
    .split('-')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((letter) => letter.toUpperCase())
  return { label: letters.join(' - '), letters }
}

export default function LibraryGroup() {
  const { group } = useParams()
  const navigate = useNavigate()
  const { label, letters } = useMemo(() => parseGroup(group), [group])
  const [books, setBooks] = useState<BookResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true

    const loadBooks = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await searchBooks({
          title_prefix: letters,
          row_per_page: 200,
          page: 0,
          sort_by: 'title',
          sort_order: 'asc',
        })
        if (isActive) {
          setBooks(response.books)
        }
      } catch (err) {
        if (isActive) {
          setError('Failed to load books for this group.')
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    if (letters.length > 0) {
      loadBooks()
    } else {
      setBooks([])
      setIsLoading(false)
    }

    return () => {
      isActive = false
    }
  }, [letters])

  const shelfBooks = books.map((book) => ({
    title: book.title,
    author: book.author,
    coverUrl: book.cover_image_url || undefined,
    badge: book.lexile_level,
  }))

  return (
    <div className="relative mx-auto flex max-w-6xl flex-col gap-6 pb-24 pr-6 pt-8">
      <button
        type="button"
        onClick={() => navigate('/library')}
        className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white/80 px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm"
      >
        <span aria-hidden="true">←</span>
        Back
      </button>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {isLoading ? (
        <p className="text-sm text-slate-600">Loading books...</p>
      ) : null}

      <div className="relative">
        <div className="relative h-12 rounded-full bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 shadow-lg" />
        <div className="-mt-6">
          <BookShelf
            label={label}
            books={shelfBooks}
            showAction={false}
            maxBooks={null}
            showMeta
          />
        </div>
        <div className="-mt-4 h-10 rounded-full bg-gradient-to-b from-amber-600 to-amber-700 shadow-lg" />
      </div>
    </div>
  )
}
