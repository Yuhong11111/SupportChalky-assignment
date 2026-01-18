import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard.tsx'
import Library from './pages/library.tsx'
import LibraryGroup from './pages/library-group.tsx'
import DashBoard from './pages/DashBoard.tsx'

function Layout() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-300 via-sky-400 to-emerald-200 text-slate-900">
      <div className="pointer-events-none absolute left-12 top-10 h-24 w-56 rounded-full bg-white/60 blur-[1px]" />
      <div className="pointer-events-none absolute right-24 top-20 h-16 w-40 rounded-full bg-white/50 blur-[1px]" />
      <div className="pointer-events-none absolute left-1/3 top-28 h-20 w-52 rounded-full bg-white/40 blur-[1px]" />
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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
