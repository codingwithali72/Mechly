import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Bell, ArrowRight, Battery, Bike, Wrench, Zap, Droplets, Car, Settings, MoreHorizontal, User, CalendarDays, Navigation } from 'lucide-react'
import Link from 'next/link'

const SERVICES = [
  { id: '1', name: 'Battery', icon: Battery },
  { id: '2', name: 'Puncture', icon: Bike },
  { id: '3', name: 'Brake', icon: Settings },
  { id: '4', name: 'General Repair', icon: Wrench },
  { id: '5', name: 'Oil Change', icon: Droplets },
  { id: '6', name: 'Tyre', icon: Bike },
  { id: '7', name: 'Electrical', icon: Zap },
  { id: '8', name: 'More', icon: MoreHorizontal },
]

export default function CustomerHome() {
  return (
    <div className="bg-white min-h-screen text-[#1D3557] pb-24 font-sans selection:bg-[#E63946] selection:text-white max-w-md mx-auto md:border-x border-slate-100 shadow-2xl relative">
      
      {/* Header */}
      <header className="flex justify-between items-center px-5 pt-8 pb-4">
        <div>
          <h2 className="text-sm font-semibold text-[#5C757D] mb-0.5">Hi, Demo 👋</h2>
          <div className="flex items-center gap-1 cursor-pointer">
            <MapPin className="h-4 w-4 text-[#E63946]" />
            <span className="text-[13px] font-bold">Kharghar, Navi Mumbai</span>
            <span className="text-[10px] ml-1">▼</span>
          </div>
        </div>
        <button className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-50 transition-colors">
           <Bell className="h-6 w-6 text-[#1D3557]" />
        </button>
      </header>

      <main className="px-5 space-y-8">
        
        {/* Hero Section */}
        <section className="mt-4 relative">
          <div className="max-w-[70%]">
            <h1 className="text-3xl font-bold tracking-tight text-[#0C182A] leading-[1.2]">
              Vehicle trouble?
            </h1>
            <h2 className="text-3xl font-bold text-[#E53935] tracking-tight leading-[1.2] mt-1">
              We'll bring the<br />mechanic to you.
            </h2>
          </div>
          
          {/* Mock Illustration Placeholder (absolute right) */}
          <div className="absolute right-0 top-0 bottom-14 w-[35%] flex items-center justify-end pointer-events-none">
             {/* This circle mocks the mechanic illustration bounds */}
            <div className="h-[120px] w-[120px] bg-slate-100 rounded-full flex items-center justify-center -mr-2 mt-4">
              <Wrench className="h-10 w-10 text-slate-300" />
            </div>
          </div>

          <div className="mt-8 relative z-10">
            <Link href="/book/problem?mode=scheduled" className={buttonVariants({ size: "lg" }) + " w-full h-[52px] rounded-full bg-[#E53935] hover:bg-[#d32f2f] text-white font-semibold text-[15px] flex justify-between items-center px-6 shadow-[0_8px_25px_rgba(229,57,53,0.25)]"}>
              Get a Mechanic
              <div className="h-7 w-7 bg-white rounded-full flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-[#E53935]" strokeWidth={3} />
              </div>
            </Link>
          </div>
        </section>

        {/* Quick Services Section */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold tracking-tight">Quick Services</h3>
            <Link href="#" className="text-xs font-semibold text-[#E63946]">View all</Link>
          </div>
          <div className="grid grid-cols-4 gap-y-6 gap-x-3">
            {SERVICES.map((service) => (
              <Link href={`/book/problem?mode=scheduled&service=${service.id}`} key={service.id} className="flex flex-col items-center gap-[6px] group">
                <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[20px] bg-[#F8FAFC] transition-transform group-hover:scale-105 border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.01)]">
                  <service.icon className="h-6 w-6 text-[#0C182A]" strokeWidth={1.5} />
                </div>
                <span className="text-center text-[11px] font-semibold text-[#0C182A]">
                  {service.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* My Vehicles Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold tracking-tight">My Vehicles</h3>
            <Link href="/vehicles/add" className="text-xs font-semibold text-[#E63946]">Add New</Link>
          </div>
          <div className="bg-white rounded-[20px] p-4 flex items-center gap-4 shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-slate-100">
            <div className="h-12 w-12 bg-[#F8FAFC] rounded-full flex items-center justify-center shrink-0 border border-slate-100">
              <Bike className="h-6 w-6 text-[#1D3557]" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-bold text-[14px]">Honda Activa 6G</h4>
              <p className="text-[12px] font-medium text-[#5C757D]">Scooter</p>
            </div>
          </div>
        </section>

        {/* Recent Booking Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold tracking-tight">Recent Booking</h3>
            <Link href="#" className="text-xs font-semibold text-[#E63946]">View all</Link>
          </div>
          <Link href="/tracking/1" className="block bg-white rounded-[20px] p-4 shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-slate-100 active:scale-[0.98] transition-transform">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-[#F8FAFC] rounded-full flex items-center justify-center shrink-0 border border-slate-100">
                  <Car className="h-5 w-5 text-[#1D3557]" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-bold text-[14px]">Battery Replacement</h4>
                  <p className="text-[11px] font-medium text-[#5C757D] mt-0.5">Ahmed • 12 Aug 2026 • ₹750</p>
                </div>
              </div>
              <Badge className="bg-[#E6F4EA] text-[#2A9D8F] hover:bg-[#E6F4EA] border border-[#2A9D8F]/20 px-3 py-1 rounded-full text-[10px] font-bold shadow-none">
                Completed
              </Badge>
            </div>
          </Link>
        </section>
      </main>

      {/* Fixed Bottom Navigation exactly matching mockup */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-4 pb-safe flex justify-between items-center shadow-[0_-10px_40px_rgb(0,0,0,0.04)] z-50 max-w-md mx-auto md:border-x">
        <Link href="/home" className="flex flex-col items-center text-[#E63946] gap-1 relative">
          <Navigation className="h-[22px] w-[22px]" strokeWidth={2.5} />
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link href="#" className="flex flex-col items-center text-[#A0AEC0] hover:text-[#1D3557] transition-colors gap-1">
          <CalendarDays className="h-[22px] w-[22px]" strokeWidth={2} />
          <span className="text-[10px] font-bold">Bookings</span>
        </Link>
        <Link href="#" className="flex flex-col items-center text-[#A0AEC0] hover:text-[#1D3557] transition-colors gap-1">
          <Car className="h-[22px] w-[22px]" strokeWidth={2} />
          <span className="text-[10px] font-bold">Vehicles</span>
        </Link>
        <Link href="#" className="flex flex-col items-center text-[#A0AEC0] hover:text-[#1D3557] transition-colors gap-1">
          <User className="h-[22px] w-[22px]" strokeWidth={2} />
          <span className="text-[10px] font-bold">Profile</span>
        </Link>
      </nav>

    </div>
  )
}
