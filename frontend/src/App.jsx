import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16">
        <header className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">
              Tailwind + React
            </p>
            <h1 className="mt-3 text-4xl font-semibold md:text-5xl">
              Ship faster with Vite and Tailwind
            </h1>
          </div>
          <div className="flex items-center gap-4 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2">
            <img src={viteLogo} className="h-8 w-8" alt="Vite logo" />
            <img src={reactLogo} className="h-8 w-8" alt="React logo" />
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: 'Instant feedback',
              body: 'Vite keeps refreshes snappy so you can iterate without losing flow.',
            },
            {
              title: 'Design at speed',
              body: 'Compose layouts quickly with Tailwind utility classes.',
            },
            {
              title: 'Production ready',
              body: 'Vite bundles efficiently while Tailwind keeps CSS lean.',
            },
            {
              title: 'Next steps',
              body: 'Edit `src/App.jsx` and start building your UI.',
            },
          ].map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-lg shadow-emerald-500/10"
            >
              <h2 className="text-xl font-semibold text-emerald-200">
                {card.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {card.body}
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}

export default App
