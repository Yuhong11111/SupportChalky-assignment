import BookShelf from '../components/BookShelf'
import SideRail from '../components/SideRail'

export default function Library() {
    return (
    <div className="relative mx-auto flex max-w-6xl gap-8 pb-24 pr-6 pt-12">
            <SideRail activeLabel="library" />

            <section className="flex-1">
                <div className="mb-10 flex max-w-xl items-center gap-3 rounded-xl border-2 border-slate-200 bg-white/80 px-4 py-3 shadow-sm">
                    <input
                        type="text"
                        placeholder="Write the name of the book"
                        className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                    />
                    <button
                        type="button"
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
                </div>

                <div className="space-y-10">
                    <BookShelf
                        label="A - B"
                        books={[
                            { title: 'Spend It', badge: '2024' },
                            { title: 'The Little Prince', badge: '2003' },
                            { title: 'Story Time' },
                            { title: 'Forest Tales' },
                        ]}
                    />
                    <BookShelf
                        label="C - D - E"
                        books={[
                            { title: "Andersen's Fairy Tales", badge: '1954' },
                            { title: 'Roald Dahl', badge: '2001' },
                            { title: "The Magician's Elephant", badge: '2002' },
                            { title: 'Princess in Black', badge: '2004' },
                        ]}
                    />
                </div>
            </section>
        </div>
    )
}
