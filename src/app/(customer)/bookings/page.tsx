import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Navigation, CalendarDays, Car, User, ArrowLeft } from 'lucide-react'

export default function BookingsPage() {
  return (
    <div className="bg-slate-50 min-h-screen text-[#1D3557] pb-24 font-sans selection:bg-[#E63946] selection:text-white max-w-md mx-auto md:border-x border-slate-100 shadow-2xl relative">
      <header className="flex items-center px-5 pt-8 pb-4 bg-white border-b border-slate-100 sticky top-0 z-20">
        <Link href="/home" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 transition-colors mr-4">
          <ArrowLeft className="h-5 w-5 text-[#0C182A]" />
        </Link>
        <h1 className="text-xl font-bold tracking-tight text-[#0C182A]">My Bookings</h1>
      </header>

      <main className="p-5 space-y-4">
        <Card className="border-none shadow-sm">
          <CardContent className="p-8 text-center text-muted-foreground flex flex-col items-center">
            <CalendarDays className="h-12 w-12 text-slate-300 mb-4" />
            <p className="font-medium text-slate-900">No active bookings</p>
            <p className="text-sm mt-1">When you book a mechanic, it will appear here.</p>
          </CardContent>
        </Card>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-4 pb-safe flex justify-between items-center shadow-[0_-10px_40px_rgb(0,0,0,0.04)] z-50 max-w-md mx-auto md:border-x">
        <Link href="/home" className="flex flex-col items-center text-[#A0AEC0] hover:text-[#1D3557] transition-colors gap-1">
          <Navigation className="h-[22px] w-[22px]" strokeWidth={2} />
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link href="/bookings" className="flex flex-col items-center text-[#E63946] gap-1 relative">
          <CalendarDays className="h-[22px] w-[22px]" strokeWidth={2.5} />
          <span className="text-[10px] font-bold">Bookings</span>
        </Link>
        <Link href="/vehicles/add" className="flex flex-col items-center text-[#A0AEC0] hover:text-[#1D3557] transition-colors gap-1">
          <Car className="h-[22px] w-[22px]" strokeWidth={2} />
          <span className="text-[10px] font-bold">Vehicles</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-[#A0AEC0] hover:text-[#1D3557] transition-colors gap-1">
          <User className="h-[22px] w-[22px]" strokeWidth={2} />
          <span className="text-[10px] font-bold">Profile</span>
        </Link>
      </nav>
    </div>
  )
}
