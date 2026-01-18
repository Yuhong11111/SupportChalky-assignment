export type BookResponse = {
  id: number
  title: string
  author: string
  description: string
  cover_image_url: string
  lexile_level: string
  created_at: string
  updated_at: string
}

export type BookSearchParams = {
  page?: number
  row_per_page?: number
  title?: string
  title_prefix?: string[]
  author?: string
  sort_by?: 'title' | 'author' | 'created_at' | 'updated_at'
  sort_order?: 'asc' | 'desc'
}

export type BookSearchResponse = {
  books: BookResponse[]
  page: number
  rows_per_page: number
  total_books: number
  sort_by: string
}

export type BookGroupParams = {
  group_by?: 'title_first_letter' | 'author'
  group_size?: number
  page?: number
  groups_per_page?: number
}

export type BookGroupResponse = {
  groups: Record<string, BookResponse[]>
  page: number
  groups_per_page: number
}

const books: BookResponse[] = [
  {
    id: 1,
    title: 'Spend It',
    author: 'Cinda K. Williams',
    description: 'A playful introduction to making smart money choices.',
    cover_image_url: '',
    lexile_level: '530L',
    created_at: '2023-11-02T12:00:00Z',
    updated_at: '2024-01-08T12:00:00Z',
  },
  {
    id: 2,
    title: 'The Little Prince',
    author: 'Antoine de Saint-Exupery',
    description: 'A poetic tale about a traveler from a small planet.',
    cover_image_url: '',
    lexile_level: '710L',
    created_at: '2022-03-18T09:10:00Z',
    updated_at: '2023-05-12T10:00:00Z',
  },
  {
    id: 3,
    title: "Andersen's Fairy Tales",
    author: 'Hans Christian Andersen',
    description: 'Classic fairy tales for curious readers.',
    cover_image_url: '',
    lexile_level: '850L',
    created_at: '2021-08-21T08:00:00Z',
    updated_at: '2022-09-01T11:00:00Z',
  },
  {
    id: 4,
    title: 'Roald Dahl: James and the Giant Peach',
    author: 'Roald Dahl',
    description: 'A fantastical adventure with a giant peach.',
    cover_image_url: '',
    lexile_level: '870L',
    created_at: '2022-10-14T13:20:00Z',
    updated_at: '2023-02-28T16:00:00Z',
  },
  {
    id: 5,
    title: "The Magician's Elephant",
    author: 'Kate DiCamillo',
    description: 'A story of hope and magic in a bustling city.',
    cover_image_url: '',
    lexile_level: '640L',
    created_at: '2020-05-12T10:00:00Z',
    updated_at: '2021-04-09T14:30:00Z',
  },
  {
    id: 6,
    title: 'The Princess in Black',
    author: 'Shannon Hale',
    description: 'A princess who fights monsters and saves the day.',
    cover_image_url: '',
    lexile_level: '560L',
    created_at: '2023-01-03T07:45:00Z',
    updated_at: '2023-07-18T12:15:00Z',
  },
  {
    id: 7,
    title: 'Forest Tales',
    author: 'Mina Cho',
    description: 'Short tales from a vibrant woodland.',
    cover_image_url: '',
    lexile_level: '600L',
    created_at: '2021-01-21T08:00:00Z',
    updated_at: '2022-01-19T08:00:00Z',
  },
  {
    id: 8,
    title: 'Story Time',
    author: 'Liam Winters',
    description: 'A collection of bedtime stories.',
    cover_image_url: '',
    lexile_level: '520L',
    created_at: '2021-06-11T08:30:00Z',
    updated_at: '2022-06-11T08:30:00Z',
  },
  {
    id: 9,
    title: 'Beneath the Stars',
    author: 'Rita James',
    description: 'A gentle adventure under the night sky.',
    cover_image_url: '',
    lexile_level: '680L',
    created_at: '2022-12-01T10:15:00Z',
    updated_at: '2023-08-20T09:00:00Z',
  },
  {
    id: 10,
    title: 'Cloud Atlas for Kids',
    author: 'Marin Wells',
    description: 'A curious guide to clouds and weather.',
    cover_image_url: '',
    lexile_level: '730L',
    created_at: '2020-04-22T11:30:00Z',
    updated_at: '2021-04-22T11:30:00Z',
  },
  {
    id: 11,
    title: 'Galaxy Explorers',
    author: 'Ivy Holt',
    description: 'Young explorers map the galaxy together.',
    cover_image_url: '',
    lexile_level: '760L',
    created_at: '2023-04-16T09:45:00Z',
    updated_at: '2023-09-09T09:45:00Z',
  },
  {
    id: 12,
    title: 'Hidden Gardens',
    author: 'Noah Perez',
    description: 'A guide to secret gardens and tiny habitats.',
    cover_image_url: '',
    lexile_level: '610L',
    created_at: '2019-11-02T10:10:00Z',
    updated_at: '2020-11-02T10:10:00Z',
  },
]

const randomLatency = () => 150 + Math.floor(Math.random() * 201)

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

const normalize = (value: string) => value.trim().toLowerCase()

const sortBooks = (
  list: BookResponse[],
  sortBy: BookSearchParams['sort_by'],
  sortOrder: BookSearchParams['sort_order'],
) => {
  const order = sortOrder === 'desc' ? -1 : 1
  return [...list].sort((a, b) => {
    const key = sortBy ?? 'title'
    const left = a[key]
    const right = b[key]
    if (left < right) return -1 * order
    if (left > right) return 1 * order
    return 0
  })
}

export async function searchBooks(
  params: BookSearchParams = {},
): Promise<BookSearchResponse> {
  await delay(randomLatency())

  const page = params.page ?? 0
  const rowsPerPage = params.row_per_page ?? 40
  const sortBy = params.sort_by ?? 'title'
  const sortOrder = params.sort_order ?? 'asc'

  const titleQuery = params.title ? normalize(params.title) : ''
  const authorQuery = params.author ? normalize(params.author) : ''
  const prefixes = params.title_prefix?.map((prefix) => normalize(prefix)) ?? []

  let filtered = books
  if (titleQuery) {
    filtered = filtered.filter((book) =>
      normalize(book.title).includes(titleQuery),
    )
  }
  if (authorQuery) {
    filtered = filtered.filter((book) =>
      normalize(book.author).includes(authorQuery),
    )
  }
  if (prefixes.length > 0) {
    filtered = filtered.filter((book) =>
      prefixes.some((prefix) => normalize(book.title).startsWith(prefix)),
    )
  }

  const sorted = sortBooks(filtered, sortBy, sortOrder)
  const start = page * rowsPerPage
  const paged = sorted.slice(start, start + rowsPerPage)

  return {
    books: paged,
    page,
    rows_per_page: rowsPerPage,
    total_books: sorted.length,
    sort_by: sortBy,
  }
}

export async function groupBooks(
  params: BookGroupParams = {},
): Promise<BookGroupResponse> {
  await delay(randomLatency())

  const groupBy = params.group_by ?? 'title_first_letter'
  const groupSize = params.group_size ?? 4
  const page = params.page ?? 0
  const groupsPerPage = params.groups_per_page ?? 2

  const grouped = new Map<string, BookResponse[]>()

  books.forEach((book) => {
    const key =
      groupBy === 'author'
        ? book.author.trim().slice(0, 1).toUpperCase()
        : book.title.trim().slice(0, 1).toUpperCase()
    const list = grouped.get(key) ?? []
    if (list.length < groupSize) {
      list.push(book)
      grouped.set(key, list)
    }
  })

  const sortedKeys = [...grouped.keys()].sort()
  const start = page * groupsPerPage
  const pageKeys = sortedKeys.slice(start, start + groupsPerPage)

  const pageGroups: Record<string, BookResponse[]> = {}
  pageKeys.forEach((key) => {
    pageGroups[key] = grouped.get(key) ?? []
  })

  return {
    groups: pageGroups,
    page,
    groups_per_page: groupsPerPage,
  }
}
