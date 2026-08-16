import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Navigation, CalendarDays, Car, User, ArrowLeft, LogOut } from 'lucide-react'
import { ensureCustomerProfile } from '@/lib/supabase/server'

export default async function ProfilePage() {
  const { profile } = await ensureCustomerProfile()

  return (
    <div className="bg-slate-50 min-h-screen text-[#1D3557] pb-24 font-sans selection:bg-[#E63946] selection:text-white max-w-md mx-auto md:border-x border-slate-100 shadow-2xl relative">
      <header className="flex items-center px-5 pt-8 pb-4 bg-white border-b border-slate-100 sticky top-0 z-20">
        <Link href="/home" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 transition-colors mr-4">
          <ArrowLeft className="h-5 w-5 text-[#0C182A]" />
        </Link>
        <h1 className="text-xl font-bold tracking-tight text-[#0C182A]">Profile</h1>
      </header>

      <main className="p-5 space-y-4">
        <div className="flex flex-col items-center justify-center py-6">
          <div className="h-24 w-24 rounded-full bg-slate-200 flex items-center justify-center mb-4">
            <User className="h-12 w-12 text-slate-400" />
          </div>
          <h2 className="text-xl font-bold">{profile.full_name}</h2>
          <p className="text-muted-foreground">{profile.email}</p>
        </div>

        <Card className="border-none shadow-sm">
          <CardContent className="p-0">
            <div className="divide-y">
              <div className="p-4 flex items-center justify-between text-red-500 font-medium cursor-pointer hover:bg-slate-50 transition-colors">
                <span className="flex items-center gap-3"><LogOut className="h-5 w-5" /> Sign Out</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-4 pb-safe flex justify-between items-center shadow-[0_-10px_40px_rgb(0,0,0,0.04)] z-50 max-w-md mx-auto md:border-x">
        <Link href="/home" className="flex flex-col items-center text-[#A0AEC0] hover:text-[#1D3557] transition-colors gap-1">
          <Navigation className="h-[22px] w-[22px]" strokeWidth={2} />
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link href="/bookings" className="flex flex-col items-center text-[#A0AEC0] hover:text-[#1D3557] transition-colors gap-1">
          <CalendarDays className="h-[22px] w-[22px]" strokeWidth={2} />
          <span className="text-[10px] font-bold">Bookings</span>
        </Link>
        <Link href="/vehicles/add" className="flex flex-col items-center text-[#A0AEC0] hover:text-[#1D3557] transition-colors gap-1">
          <Car className="h-[22px] w-[22px]" strokeWidth={2} />
          <span className="text-[10px] font-bold">Vehicles</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-[#E63946] gap-1 relative">
          <User className="h-[22px] w-[22px]" strokeWidth={2.5} />
          <span className="text-[10px] font-bold">Profile</span>
        </Link>
      </nav>
    </div>
  )
}
