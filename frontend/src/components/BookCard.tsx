type BookCardProps = {
  title: string
  author?: string
  coverUrl?: string
  badge?: string
  className?: string
  showMeta?: boolean
  variant?: 'default' | 'framed'
}

export default function BookCard({
  title,
  author,
  coverUrl,
  badge = 'NEW',
  className = '',
  showMeta = false,
  variant = 'default',
}: BookCardProps) {
  const frameClasses =
    variant === 'framed'
      ? 'rounded-md bg-white p-2 shadow-lg shadow-amber-900/20'
      : ''
  const cardClasses =
    variant === 'framed'
      ? 'border border-slate-200 bg-white shadow-sm'
      : 'border border-amber-200/70 bg-amber-50 shadow'

  return (
    <article
      className={`mx-auto w-full max-w-[7rem] sm:max-w-[8rem] ${className}`}
    >
      {variant === 'framed' ? (
        <div className="rounded-md bg-white p-2 shadow-lg shadow-amber-900/20">
          <div className="relative aspect-[3/4] overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
            {coverUrl ? (
              <img
                src={coverUrl}
                alt={title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200 px-3 text-center">
                <span className="line-clamp-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-900 sm:text-xs md:text-sm">
                  {title}
                </span>
              </div>
            )}
            {badge ? (
              <span className="absolute right-2 top-2 rounded bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow">
                {badge}
              </span>
            ) : null}
          </div>
          {showMeta ? (
            <div className="pt-2 text-center">
              <p className="text-xs font-semibold text-slate-900 sm:text-sm">
                {title}
              </p>
              {author ? (
                <p className="text-xs text-slate-500">{author}</p>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : (
        <div className={frameClasses}>
          <div
            className={`relative aspect-[3/4] overflow-hidden rounded-md ${cardClasses}`}
          >
            {coverUrl ? (
              <img
                src={coverUrl}
                alt={title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200 px-3 text-center">
                <span className="line-clamp-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-900 sm:text-xs md:text-sm">
                  {title}
                </span>
              </div>
            )}
            {badge ? (
              <span className="absolute right-2 top-2 rounded bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow">
                {badge}
              </span>
            ) : null}
          </div>
        </div>
      )}
      {showMeta && variant !== 'framed' ? (
        <div className="mt-2 text-center">
          <p className="text-xs font-semibold text-slate-900 sm:text-sm">
            {title}
          </p>
          {author ? (
            <p className="text-xs text-slate-500">{author}</p>
          ) : null}
        </div>
      ) : null}
    </article>
  )
}
