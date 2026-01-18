import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard.tsx'
import Library from './pages/library.tsx'
import LibraryGroup from './pages/library-group.tsx'
import SearchPage from './pages/search.tsx'

function Layout() {
  return (
    <main className="relative h-dvh overflow-hidden bg-gradient-to-b from-sky-300 via-sky-400 to-emerald-200 text-slate-900">
      <div className="pointer-events-none absolute left-[6vw] top-[6vh] h-[8vh] w-[26vw] rounded-full bg-white/60 blur-[1px]" />
      <div className="pointer-events-none absolute right-[8vw] top-[10vh] h-[6vh] w-[18vw] rounded-full bg-white/50 blur-[1px]" />
      <div className="pointer-events-none absolute left-[30vw] top-[14vh] h-[7vh] w-[22vw] rounded-full bg-white/40 blur-[1px]" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-emerald-300 to-emerald-500" />
      <Outlet />
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/library" replace />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/library" element={<Library />} />
          <Route path="/library/:group" element={<LibraryGroup />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
