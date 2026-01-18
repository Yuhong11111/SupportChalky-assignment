import { useNavigate } from 'react-router-dom'

type SideRailProps = {
  activeLabel?: 'dashboard' | 'library'
}

export default function SideRail({ activeLabel = 'library' }: SideRailProps) {
  const navigate = useNavigate()

  return (
    <aside className="hidden h-screen w-24 flex-col md:flex">
      <button
        type="button"
        onClick={() => navigate('/dashboard')}
        className={`flex h-1/2 w-16 items-center justify-center border-2 text-center text-sm font-semibold uppercase tracking-[0.2em] shadow-md ${activeLabel === 'dashboard'
          ? 'border-amber-300 bg-gradient-to-b from-amber-200 to-amber-400 text-amber-900'
          : 'border-amber-200 bg-gradient-to-b from-amber-100 to-amber-300 text-amber-800'
          }`}
      >
        <span className="inline-block [writing-mode:vertical-rl] [text-orientation:mixed] rotate-180">
          Dashboard
        </span>
      </button>
      <button
        type="button"
        onClick={() => navigate('/library')}
        className={`flex h-1/2 w-16 items-center justify-center border-2 text-center text-sm font-semibold uppercase tracking-[0.2em] shadow-md ${activeLabel === 'library'
          ? 'border-emerald-300 bg-gradient-to-b from-emerald-300 to-emerald-500 text-emerald-900'
          : 'border-emerald-200 bg-gradient-to-b from-emerald-200 to-emerald-400 text-emerald-800'
          }`}
      >
        <span className="inline-block [writing-mode:vertical-rl] [text-orientation:mixed] rotate-180">
          Library
        </span>
      </button>
    </aside>
  )
}
