import SideRail from '../components/SideRail'

export default function Dashboard() {
  return (
    <div className="relative mx-auto flex max-w-6xl gap-8 pb-24 pr-6 pt-12">
      <SideRail activeLabel="dashboard" />
      <section className="flex-1">
        <div className="rounded-3xl border-2 border-white/70 bg-white/70 p-10 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-700">
            Dashboard
          </p>
          <h1 className="mt-4 text-4xl font-semibold md:text-5xl">
            Welcome back
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">
            This is the dashboard page. Add widgets, stats, or recent activity
            here.
          </p>
        </div>
      </section>
    </div>
  )
}
