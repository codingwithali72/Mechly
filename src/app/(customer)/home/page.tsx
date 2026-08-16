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
      .limit(7)
      
    if (sError) throw new Error('Services error: ' + sError.message)

    const { data: recentBookings } = await supabase
      .from('bookings')
      .select('*, services(name, icon), mechanics(profiles(full_name))')
      .eq('customer_id', customer.id)
      .order('created_at', { ascending: false })
      .limit(1)

    const { data: recentLocation } = await supabase
      .from('service_locations')
      .select('city, area')
      .eq('customer_id', customer.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    const locationText = recentLocation 
      ? [recentLocation.area, recentLocation.city].filter(Boolean).join(', ')
      : 'Set your location'

    const firstName = profile?.full_name?.split(' ')[0] || 'User'

  return (
    <div className="bg-white min-h-screen text-[#1D3557] pb-24 font-sans selection:bg-[#E63946] selection:text-white max-w-md mx-auto md:border-x border-slate-100 shadow-2xl relative">
      
      {/* Header */}
      <header className="flex justify-between items-center px-5 pt-8 pb-4">
        <div className="flex items-center gap-2 cursor-pointer">
          <MapPin className="h-4 w-4 text-[#E63946]" />
          <span className="text-[13px] font-bold">{locationText}</span>
          <span className="text-[10px]">▼</span>
        </div>
        <button className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-50 transition-colors relative">
           <Bell className="h-5 w-5 text-[#1D3557]" />
        </button>
      </header>

      <main className="px-5 space-y-8">
        
        {/* Hero Section */}
        <section className="mt-2 relative">
          <h2 className="text-sm font-semibold text-[#5C757D] mb-1">Hi, {firstName} 👋</h2>
          <div className="max-w-[70%]">
            <h1 className="text-[32px] font-bold tracking-tight text-[#1D3557] leading-[1.15]">
              Vehicle trouble?
            </h1>
            <h2 className="text-[32px] font-bold text-[#E63946] tracking-tight leading-[1.15] mt-1">
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
            <Link href="/book/problem?mode=scheduled" className={buttonVariants({ size: "lg" }) + " w-[80%] h-[52px] rounded-full bg-[#E63946] hover:bg-[#d32f2f] text-white font-semibold text-[15px] flex justify-between items-center px-6 shadow-[0_8px_25px_rgba(230,57,70,0.3)]"}>
              Get a Mechanic
              <div className="h-7 w-7 bg-white rounded-full flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-[#E63946]" strokeWidth={3} />
              </div>
            </Link>
          </div>
        </section>

        {/* Quick Services Section */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold tracking-tight">Quick Services</h3>
            <Link href="/book/problem?mode=scheduled" className="text-xs font-semibold text-[#E63946]">View all</Link>
          </div>
          <div className="grid grid-cols-4 gap-y-6 gap-x-3">
            {dbServices?.map((service) => {
              const IconComponent = service.icon ? ICON_MAP[service.icon] || Wrench : Wrench
              return (
                <Link href={`/book/problem?mode=scheduled&service=${service.id}`} key={service.id} className="flex flex-col items-center gap-[6px] group">
                  <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[18px] bg-white transition-transform group-hover:scale-105 shadow-[0_4px_15px_rgb(0,0,0,0.04)]">
                    <IconComponent className="h-6 w-6 text-[#1D3557]" strokeWidth={1.5} />
                  </div>
                  <span className="text-center text-[11px] font-medium text-[#1D3557] leading-tight px-1">
                    {service.name}
                  </span>
                </Link>
              )
            })}
            <Link href="/book/problem?mode=scheduled" className="flex flex-col items-center gap-[6px] group">
              <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[18px] bg-white transition-transform group-hover:scale-105 shadow-[0_4px_15px_rgb(0,0,0,0.04)]">
                <MoreHorizontal className="h-6 w-6 text-[#1D3557]" strokeWidth={1.5} />
              </div>
              <span className="text-center text-[11px] font-medium text-[#1D3557] leading-tight px-1">
                More
              </span>
            </Link>
          </div>
        </section>

        {/* My Vehicles Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold tracking-tight">My Vehicles</h3>
            <Link href="/vehicles/add" className="text-xs font-semibold text-[#E63946]">Add New</Link>
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
            {!vehicles || vehicles.length === 0 ? (
              <div className="bg-slate-50 rounded-[16px] p-4 text-center border border-dashed border-slate-200 w-full">
                <Car className="h-6 w-6 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500 mb-2">You haven't added any vehicles yet.</p>
                <Link href="/vehicles/add" className={buttonVariants({ variant: "outline", size: "sm" }) + " rounded-full text-xs h-8"}>
                  Add vehicle
                </Link>
              </div>
            ) : (
              vehicles.map((vehicle) => (
                <div key={vehicle.id} className="bg-white rounded-[16px] p-3 flex items-center gap-3 shadow-[0_4px_15px_rgb(0,0,0,0.04)] border border-slate-100 min-w-[200px] shrink-0">
                  <div className="h-10 w-10 bg-[#F8FAFC] rounded-full flex items-center justify-center shrink-0 border border-slate-100">
                    {vehicle.vehicle_type === 'MOTORCYCLE' || vehicle.vehicle_type === 'SCOOTER' ? (
                      <Bike className="h-5 w-5 text-[#1D3557]" strokeWidth={1.5} />
                    ) : (
                      <Car className="h-5 w-5 text-[#1D3557]" strokeWidth={1.5} />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-[13px] whitespace-nowrap">{vehicle.brand} {vehicle.model}</h4>
                    <p className="text-[11px] font-medium text-[#5C757D] capitalize">{vehicle.vehicle_type.toLowerCase()}</p>
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
              const price = booking.final_amount || booking.estimated_total
              
              let statusClasses = "bg-[#F1FAEE] text-[#2A9D8F]" // Completed
              let statusText = booking.status
              if (booking.status === 'SEARCHING' || booking.status === 'REQUESTED') {
                statusClasses = "bg-orange-50 text-orange-600"
                statusText = "Pending"
              } else if (booking.status === 'ACCEPTED' || booking.status === 'IN_PROGRESS') {
                statusClasses = "bg-blue-50 text-blue-600"
                statusText = "On the way"
              }

              return (
                <Link key={booking.id} href={`/tracking/${booking.id}`} className="block bg-white rounded-[18px] p-4 shadow-[0_4px_15px_rgb(0,0,0,0.04)] border border-slate-100 active:scale-[0.98] transition-transform">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="h-[44px] w-[44px] bg-[#F8FAFC] rounded-2xl flex items-center justify-center shrink-0 border border-slate-100">
                        <ServiceIcon className="h-5 w-5 text-[#1D3557]" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[13px]">{booking.services?.name || 'Service Request'}</h4>
                        <p className="text-[11px] font-medium text-[#5C757D] mt-0.5">{mechanicName}</p>
                        <p className="text-[10px] font-medium text-[#5C757D] mt-0.5">{date} • ₹{price}</p>
                      </div>
                    </div>
                    <Badge className={`${statusClasses} border-none px-3 py-1 rounded-full text-[10px] font-bold shadow-none`}>
                      {statusText}
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
