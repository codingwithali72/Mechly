import { CheckCircle2, Star } from 'lucide-react'
import { createClient, ensureCustomerProfile } from '@/lib/supabase/server'
import { createBooking } from '../actions'
import { SubmitButton } from '@/components/SubmitButton'

export default async function BookingSummaryPage({ searchParams }: { searchParams: Promise<{ mode?: string, service?: string, problem_description?: string, city?: string, area?: string, address?: string, time_slot?: string, mechanic_id?: string }> }) {
  const { mode, service, problem_description, city, area, address, time_slot, mechanic_id } = await searchParams
  const modeParam = mode || 'scheduled'

  const { customer } = await ensureCustomerProfile()
  const supabase = await createClient()

  const { data: dbService } = await supabase.from('services').select('name').eq('id', service).single()
  const { data: dbVehicle } = await supabase.from('vehicles').select('id, brand, model').eq('customer_id', customer.id).limit(1).single()
  
  let mechanicName = 'Ahmed'
  let mechanicRating = '4.8'
  let mechanicEta = '18 min'

  if (mechanic_id) {
    const { data: mechanic } = await supabase.from('mechanics').select('*, profiles(full_name)').eq('id', mechanic_id).single()
    if (mechanic && (mechanic as any).profiles) {
      mechanicName = (mechanic as any).profiles.full_name
      mechanicRating = String(mechanic.rating_average || '4.8')
    }
  }

  // Generate a mock display ID to match mockup before it's actually created
  const displayId = 'BOOK-' + new Date().toISOString().replace(/\D/g, '').slice(0, 8) + '-0001'

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans max-w-md mx-auto md:border-x border-slate-100 shadow-2xl">
      <main className="flex-1 px-5 pt-12 flex flex-col items-center">
        
        {/* Success Icon */}
        <div className="h-20 w-20 bg-[#E6F4EA] rounded-full flex items-center justify-center mb-6 shadow-[0_10px_30px_rgba(42,157,143,0.2)]">
          <CheckCircle2 className="h-10 w-10 text-[#2A9D8F]" strokeWidth={2.5} />
        </div>
        
        <h1 className="text-[24px] font-bold text-[#1D3557] mb-2 text-center">Booking Confirmed!</h1>
        <p className="text-[14px] text-[#5C757D] font-medium text-center mb-8">
          Your mechanic is on the way.
        </p>
        
        {/* Mechanic Card */}
        <div className="w-full bg-white rounded-[20px] p-4 shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-slate-100 flex items-center gap-4 mb-6">
          <div className="h-12 w-12 rounded-full bg-slate-100 overflow-hidden border border-slate-200 shrink-0" />
          <div>
            <h4 className="font-bold text-[15px] text-[#1D3557]">{mechanicName}</h4>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-[#5C757D] mt-0.5">
              <span className="flex items-center text-[#1D3557]"><Star className="h-3 w-3 mr-1 text-amber-400 fill-amber-400" /> {mechanicRating}</span>
            </div>
            <p className="text-[11px] font-semibold text-[#5C757D] mt-1">ETA: {mechanicEta}</p>
          </div>
        </div>

        {/* Booking Details */}
        <div className="w-full space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-[#A0AEC0] text-[13px] font-medium w-24">Booking ID</span>
            <span className="text-[#1D3557] text-[13px] font-bold text-right">{displayId}</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-[#A0AEC0] text-[13px] font-medium w-24">Service</span>
            <span className="text-[#1D3557] text-[13px] font-bold text-right">{dbService?.name || 'General Repair'}</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-[#A0AEC0] text-[13px] font-medium w-24">Vehicle</span>
            <span className="text-[#1D3557] text-[13px] font-bold text-right">{dbVehicle ? `${dbVehicle.brand} ${dbVehicle.model}` : 'Honda Activa 6G'}</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-[#A0AEC0] text-[13px] font-medium w-24">Location</span>
            <span className="text-[#1D3557] text-[13px] font-bold text-right">{area || city || 'Kharghar, Navi Mumbai'}</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-[#A0AEC0] text-[13px] font-medium w-24">Time</span>
            <span className="text-[#1D3557] text-[13px] font-bold text-right">Today, {time_slot || '4:00 PM - 6:00 PM'}</span>
          </div>
        </div>

        {/* Hidden Form to Create Booking */}
        <form action={createBooking} className="mt-auto w-full pt-10 pb-8 pb-safe flex flex-col gap-3">
          <input type="hidden" name="mode" value={modeParam} />
          {service && <input type="hidden" name="service" value={service} />}
          {dbVehicle?.id && <input type="hidden" name="vehicle_id" value={dbVehicle.id} />}
          {problem_description && <input type="hidden" name="problem_description" value={problem_description} />}
          {city && <input type="hidden" name="city" value={city} />}
          {area && <input type="hidden" name="area" value={area} />}
          {address && <input type="hidden" name="address" value={address} />}
          {time_slot && <input type="hidden" name="time_slot" value={time_slot} />}
          {mechanic_id && <input type="hidden" name="mechanic_id" value={mechanic_id} />}
          
          <SubmitButton className="w-full h-[52px] rounded-full bg-[#E63946] hover:bg-[#d32f2f] text-white font-semibold text-[15px] shadow-[0_8px_25px_rgba(230,57,70,0.3)]">
            Track Mechanic
          </SubmitButton>
        </form>

      </main>
    </div>
  )
}
