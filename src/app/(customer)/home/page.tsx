import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Bell, ArrowRight, Battery, Bike, Wrench, Zap, Droplets, Car, Settings, MoreHorizontal, User, CalendarDays, Navigation, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { createClient, ensureCustomerProfile } from '@/lib/supabase/server'
import { deleteVehicle } from '@/app/(customer)/vehicles/actions'

const ICON_MAP: Record<string, React.ElementType> = {
  'battery': Battery,
  'circle-dot': Bike,
  'disc': Settings,
  'wrench': Wrench,
  'droplets': Droplets,
  'circle': Bike,
  'zap': Zap,
  'cog': Settings,
  'settings': Settings,
  'siren': Bell,
  'car': Car,
  'bike': Bike,
  'ellipsis': MoreHorizontal
}

export default async function CustomerHome() {
  try {
    const { profile, customer } = await ensureCustomerProfile()
    const supabase = await createClient()

    const { data: vehicles, error: vError } = await supabase
      .from('vehicles')
      .select('*')
      .eq('customer_id', customer.id)
      .order('created_at', { ascending: false })

    if (vError) throw new Error('Vehicles error: ' + vError.message)

    const { data: dbServices, error: sError } = await supabase
      .from('services')
      .select('*')
      .limit(8)
      
    if (sError) throw new Error('Services error: ' + sError.message)

    const { data: recentBookings } = await supabase
      .from('bookings')
      .select('*, services(name, icon), mechanics(profiles(full_name))')
      .eq('customer_id', customer.id)
      .order('created_at', { ascending: false })
      .limit(1)

    const firstName = profile?.full_name?.split(' ')[0] || 'User'

  return (
    <div className="bg-white min-h-screen text-[#1D3557] pb-24 font-sans selection:bg-[#E63946] selection:text-white max-w-md mx-auto md:border-x border-slate-100 shadow-2xl relative">
      
      {/* Header */}
      <header className="flex justify-between items-center px-5 pt-8 pb-4">
        <div>
          <h2 className="text-sm font-semibold text-[#5C757D] mb-0.5">Hi, {firstName} 👋</h2>
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
            {dbServices?.map((service) => {
              const IconComponent = service.icon ? ICON_MAP[service.icon] || Wrench : Wrench
              return (
                <Link href={`/book/problem?mode=scheduled&service=${service.id}`} key={service.id} className="flex flex-col items-center gap-[6px] group">
                  <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[20px] bg-[#F8FAFC] transition-transform group-hover:scale-105 border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.01)]">
                    <IconComponent className="h-6 w-6 text-[#0C182A]" strokeWidth={1.5} />
                  </div>
                  <span className="text-center text-[11px] font-semibold text-[#0C182A] leading-tight">
                    {service.name}
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        {/* My Vehicles Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold tracking-tight">My Vehicles</h3>
            <Link href="/vehicles/add" className="text-xs font-semibold text-[#E63946]">Add New</Link>
          </div>
          
          <div className="space-y-3">
            {!vehicles || vehicles.length === 0 ? (
              <div className="bg-slate-50 rounded-[20px] p-6 text-center border border-dashed border-slate-200">
                <Car className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-500 mb-3">You haven't added any vehicles yet.</p>
                <Link href="/vehicles/add" className={buttonVariants({ variant: "outline", size: "sm" }) + " rounded-full"}>
                  <Plus className="h-4 w-4 mr-1" /> Add your first vehicle
                </Link>
              </div>
            ) : (
              vehicles.map((vehicle) => (
                <div key={vehicle.id} className="bg-white rounded-[20px] p-4 flex items-center gap-4 shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-slate-100">
                  <div className="h-12 w-12 bg-[#F8FAFC] rounded-full flex items-center justify-center shrink-0 border border-slate-100">
                    {vehicle.vehicle_type === 'MOTORCYCLE' || vehicle.vehicle_type === 'SCOOTER' ? (
                      <Bike className="h-6 w-6 text-[#1D3557]" strokeWidth={1.5} />
                    ) : (
                      <Car className="h-6 w-6 text-[#1D3557]" strokeWidth={1.5} />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px]">{vehicle.brand} {vehicle.model}</h4>
                    <p className="text-[12px] font-medium text-[#5C757D] capitalize">{vehicle.vehicle_type.toLowerCase()} {vehicle.registration_number ? `• ${vehicle.registration_number}` : ''}</p>
                  </div>
                  <div className="ml-auto">
                    <form action={deleteVehicle}>
                      <input type="hidden" name="vehicle_id" value={vehicle.id} />
                      <button type="submit" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors active:scale-95" title="Delete Vehicle">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Recent Booking Section */}
        {recentBookings && recentBookings.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold tracking-tight">Recent Booking</h3>
              <Link href="/bookings" className="text-xs font-semibold text-[#E63946]">View all</Link>
            </div>
            {recentBookings.map((booking: any) => {
              const ServiceIcon = booking.services?.icon ? ICON_MAP[booking.services.icon] || Wrench : Wrench
              const mechanicName = booking.mechanics?.profiles?.full_name || 'Assigned Mechanic'
              const date = new Date(booking.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
              return (
                <Link key={booking.id} href={`/tracking/${booking.id}`} className="block bg-white rounded-[20px] p-4 shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-slate-100 active:scale-[0.98] transition-transform">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-[#F8FAFC] rounded-full flex items-center justify-center shrink-0 border border-slate-100">
                        <ServiceIcon className="h-5 w-5 text-[#1D3557]" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[14px]">{booking.services?.name || 'Service Request'}</h4>
                        <p className="text-[11px] font-medium text-[#5C757D] mt-0.5">{booking.status === 'SEARCHING' || booking.status === 'REQUESTED' ? 'Finding a mechanic...' : `${mechanicName} • ${date}`}</p>
                      </div>
                    </div>
                    <Badge className="bg-[#E6F4EA] text-[#2A9D8F] hover:bg-[#E6F4EA] border border-[#2A9D8F]/20 px-3 py-1 rounded-full text-[10px] font-bold shadow-none">
                      {booking.status}
                    </Badge>
                  </div>
                </Link>
              )
            })}
          </section>
        )}
      </main>

      {/* Fixed Bottom Navigation exactly matching mockup */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-4 pb-safe flex justify-between items-center shadow-[0_-10px_40px_rgb(0,0,0,0.04)] z-50 max-w-md mx-auto md:border-x">
        <Link href="/home" className="flex flex-col items-center text-[#E63946] gap-1 relative">
          <Navigation className="h-[22px] w-[22px]" strokeWidth={2.5} />
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
        <Link href="/profile" className="flex flex-col items-center text-[#A0AEC0] hover:text-[#1D3557] transition-colors gap-1">
          <User className="h-[22px] w-[22px]" strokeWidth={2} />
          <span className="text-[10px] font-bold">Profile</span>
        </Link>
      </nav>

    </div>
  )
  } catch (error: any) {
    return (
      <div className="p-8 text-red-500 font-mono break-all">
        <h1 className="text-2xl font-bold mb-4">Debug Error</h1>
        <p>{error?.message || 'Unknown error'}</p>
        <pre className="mt-4 text-xs">{error?.stack}</pre>
      </div>
    )
  }
}
