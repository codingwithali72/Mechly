import Link from 'next/link'
import { LayoutDashboard, Users, Wrench, IndianRupee, Settings } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-slate-900 text-slate-300">
        <div className="h-14 flex items-center px-6 border-b border-slate-800">
          <span className="text-xl font-bold tracking-tight text-white">MECHLY <span className="text-xs font-medium text-blue-400 uppercase ml-1">Admin</span></span>
        </div>
        <nav className="flex-1 py-6 flex flex-col gap-1 px-3">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md bg-blue-600 text-white">
            <LayoutDashboard className="h-5 w-5" /> Dashboard
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white">
            <Users className="h-5 w-5" /> Users
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white">
            <Wrench className="h-5 w-5" /> Bookings
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white">
            <IndianRupee className="h-5 w-5" /> Transactions
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white">
            <Settings className="h-5 w-5" /> Settings
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 flex items-center justify-between px-6 bg-white border-b">
          <div className="font-semibold text-lg md:hidden">MECHLY Admin</div>
          <div className="ml-auto flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
              AD
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

    </div>
  )
}
