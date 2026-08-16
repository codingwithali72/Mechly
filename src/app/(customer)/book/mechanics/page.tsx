import { User, Star, BadgeCheck, ChevronRight, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { SubmitButton } from '@/components/SubmitButton'

export default async function MechanicsSelectionPage({ searchParams }: { searchParams: Promise<{ mode?: string, service?: string, problem_description?: string, city?: string, area?: string, address?: string, time_slot?: string }> }) {
  const { mode, service, problem_description, city, area, address, time_slot } = await searchParams
  const modeParam = mode || 'scheduled'
  
  const backUrl = `/book/schedule?mode=${modeParam}${service ? `&service=${service}` : ''}${problem_description ? `&problem_description=${problem_description}` : ''}${city ? `&city=${city}` : ''}${area ? `&area=${area}` : ''}${address ? `&address=${address}` : ''}`

  const supabase = await createClient()
  const { data: dbMechanics } = await supabase.from('mechanics').select(`*, profiles(full_name, avatar_url)`).limit(5)

  // Fetch standard visit charge for display
  let visitCharge = 150
  if (service) {
    const { data: dbService } = await supabase.from('services').select('base_price').eq('id', service).single()
    if (dbService?.base_price) {
      visitCharge = dbService.base_price
    }
  }

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans max-w-md mx-auto md:border-x border-slate-100 shadow-2xl">
      
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-8 pb-4">
        <Link href={backUrl} className="p-2 -ml-2">
          <ChevronLeft className="h-6 w-6 text-[#1D3557]" />
        </Link>
        <h1 className="text-lg font-semibold text-[#1D3557]">Choose Your Mechanic</h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </header>

      <main className="flex-1 px-5 pt-4 pb-8 pb-safe">
        
        {/* Filters */}
        <div className="flex items-center gap-3 mb-6">
          <div className="px-4 py-1.5 rounded-full border border-slate-200 text-[#5C757D] text-[12px] font-semibold">
            Fastest
          </div>
          <div className="px-4 py-1.5 rounded-full bg-[#E63946] text-white text-[12px] font-semibold shadow-[0_4px_10px_rgba(230,57,70,0.3)]">
            Top Rated
          </div>
          <div className="px-4 py-1.5 rounded-full border border-slate-200 text-[#5C757D] text-[12px] font-semibold">
            Closest
          </div>
        </div>

        <form action="/book/summary" method="GET" className="space-y-4">
          <input type="hidden" name="mode" value={modeParam} />
          {service && <input type="hidden" name="service" value={service} />}
          {problem_description && <input type="hidden" name="problem_description" value={problem_description} />}
          {city && <input type="hidden" name="city" value={city} />}
          {area && <input type="hidden" name="area" value={area} />}
          {address && <input type="hidden" name="address" value={address} />}
          {time_slot && <input type="hidden" name="time_slot" value={time_slot} />}
          
          {!dbMechanics || dbMechanics.length === 0 ? (
            <div className="bg-amber-50 text-amber-800 p-4 rounded-[20px] flex items-start gap-3 border border-amber-200">
              <p className="text-sm">No mechanics available right now. Let us automatically assign one.</p>
            </div>
          ) : (
            dbMechanics.map((mechanic) => {
              const mechanicName = (mechanic as any).profiles?.full_name || 'Mechanic'
              // Mock data based on mockup
              const distance = mechanic.service_radius_km ? `${(mechanic.service_radius_km * 0.8).toFixed(1)} km away` : '1.2 km away'
              const eta = '18 min'

              return (
                <div key={mechanic.id} className="bg-white rounded-[20px] p-4 shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-slate-100 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="h-[50px] w-[50px] rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 overflow-hidden">
                        <User className="h-6 w-6 text-slate-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <h4 className="font-bold text-[15px] text-[#1D3557]">{mechanicName}</h4>
                          <BadgeCheck className="h-4 w-4 text-[#2A9D8F]" />
                        </div>
                        <div className="flex items-center gap-2 text-[11px] font-semibold text-[#5C757D] mt-0.5">
                          <span className="flex items-center text-[#1D3557]"><Star className="h-3 w-3 mr-1 text-amber-400 fill-amber-400" /> {mechanic.rating_average || '4.8'}</span>
                          <span>•</span>
                          <span>{mechanic.completed_jobs_count || 127} jobs</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-[11px] font-semibold text-[#5C757D]">{distance}</span>
                      <span className="text-[11px] font-semibold text-[#5C757D] mt-1">ETA: {eta}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[13px] font-bold text-[#1D3557]">₹{visitCharge} Visit Charge</span>
                    <button type="submit" name="mechanic_id" value={mechanic.id} className="bg-[#E63946] hover:bg-[#d32f2f] text-white text-[12px] font-bold px-6 py-2 rounded-full shadow-[0_4px_10px_rgba(230,57,70,0.2)] transition-colors">
                      Select
                    </button>
                  </div>
                </div>
              )
            })
          )}

          {/* Let Mechly Choose Card */}
          <button type="submit" name="mechanic_id" value="" className="w-full mt-4 bg-white rounded-[20px] p-4 shadow-[0_4px_15px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center justify-between text-left hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-[#F8FAFC] rounded-2xl flex items-center justify-center border border-slate-100 shrink-0">
                <Star className="h-6 w-6 text-[#1D3557]" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-bold text-[14px] text-[#1D3557]">Let Mechly Choose</h4>
                <p className="text-[11px] font-medium text-[#5C757D] mt-0.5">We'll assign the best available mechanic</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-[#A0AEC0]" />
          </button>

        </form>

      </main>
    </div>
  )
}
