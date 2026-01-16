type SideRailProps = {
  activeLabel?: 'dashboard' | 'library'
}

export default function SideRail({ activeLabel = 'library' }: SideRailProps) {
  return (
    <aside className="hidden w-24 flex-col items-center gap-6 md:flex">
      <div
        className={`h-64 w-14 rounded-3xl border-2 text-center text-sm font-semibold uppercase tracking-[0.2em] shadow-md ${
          activeLabel === 'dashboard'
            ? 'border-amber-300 bg-gradient-to-b from-amber-200 to-amber-400 text-amber-900'
            : 'border-amber-200 bg-gradient-to-b from-amber-100 to-amber-300 text-amber-800'
        }`}
      >
        <span className="inline-block rotate-[-90deg] pt-24">Dashboard</span>
      </div>
      <div
        className={`h-52 w-14 rounded-3xl border-2 text-center text-sm font-semibold uppercase tracking-[0.2em] shadow-md ${
          activeLabel === 'library'
            ? 'border-emerald-300 bg-gradient-to-b from-emerald-300 to-emerald-500 text-emerald-900'
            : 'border-emerald-200 bg-gradient-to-b from-emerald-200 to-emerald-400 text-emerald-800'
        }`}
      >
        <span className="inline-block rotate-[-90deg] pt-16">Library</span>
      </div>
      <div className="mt-10 h-14 w-14 rounded-2xl border-2 border-indigo-200 bg-indigo-200 text-center text-xs font-semibold text-indigo-700 shadow">
        <span className="block pt-4">:)</span>
      </div>
    </aside>
  )
}
