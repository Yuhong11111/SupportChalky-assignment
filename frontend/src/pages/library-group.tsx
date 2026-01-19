import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { searchBooks, type BookResponse } from '../api/mockApi'
import Bookcase from '../components/Bookcase'

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
    variant: 'framed' as const,
  }))

  return (
    <div className="relative mx-auto flex h-full max-w-6xl flex-col gap-6 pb-6 pr-4 pt-4 pl-14 sm:pl-16 md:pl-20 md:pb-10 md:pr-6 md:pt-8">
      <button
        type="button"
        onClick={() => navigate('/library')}
        className="inline-flex w-fit items-center gap-2 rounded-lg border border-blue-900 bg-blue-800 px-3 py-1.5 text-sm font-semibold text-white shadow-sm"
      >
        <span aria-hidden="true">←</span>
        Back
      </button>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {isLoading ? (
        <p className="text-sm text-slate-600">Loading books...</p>
      ) : null}

      <Bookcase
        className="flex-1 min-h-0"
        showMascot
        shelves={[
          {
            label,
            books: shelfBooks,
            showAction: false,
            maxBooks: null,
            showMeta: true,
            showPlaceholders: false,
          },
        ]}
      />
    </div>
  )
}
