import { Badge } from '@/components/ui/badge'
import { MapPin, Phone, MessageSquare, Star, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function TrackingPage({ params }: { params: { id: string } }) {
  // In a real app, this would dynamically fetch based on params.id
  
  return (
    <div className="bg-white min-h-screen flex flex-col font-sans max-w-md mx-auto md:border-x border-slate-100 shadow-2xl">
      
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-8 pb-4 z-10 bg-white">
        <Link href="/home" className="flex items-center text-[#1D3557] font-semibold text-lg -ml-2 p-2">
          <ChevronLeft className="h-6 w-6 mr-1" />
          Track Mechanic
        </Link>
        <Badge className="bg-[#E63946] text-white hover:bg-[#E63946] border-none px-3 py-1 rounded-full text-[10px] font-bold shadow-[0_2px_10px_rgba(230,57,70,0.3)]">
          On the way
        </Badge>
      </header>

      <main className="flex-1 flex flex-col relative pb-8">
        
        {/* Mock Map Area */}
        <div className="h-[35vh] bg-[#F8FAFC] w-full relative overflow-hidden flex items-center justify-center border-b border-slate-200">
           {/* Decorative route line to simulate map */}
           <svg width="100%" height="100%" className="absolute inset-0 opacity-20" xmlns="http://www.w3.org/2000/svg">
             <path d="M 50,150 Q 100,50 200,100 T 350,150" fill="none" stroke="#2A9D8F" strokeWidth="4" strokeDasharray="10,10" />
           </svg>
           <div className="absolute top-[30%] left-[15%]">
             <div className="h-4 w-4 bg-[#1D3557] rounded-full border-2 border-white shadow-md"></div>
           </div>
           <div className="absolute top-[60%] right-[15%]">
             <div className="h-6 w-6 bg-[#E63946] rounded-full border-2 border-white flex items-center justify-center shadow-lg animate-bounce">
               <div className="h-2 w-2 bg-white rounded-full"></div>
             </div>
           </div>
           <span className="text-slate-400 font-medium flex items-center gap-2 text-sm z-10 bg-white/80 px-4 py-2 rounded-full shadow-sm">
             <MapPin className="h-4 w-4" /> Live Map Simulation
           </span>
        </div>

        {/* Mechanic Card overlapping map slightly */}
        <div className="px-5 -mt-8 relative z-20">
          <div className="bg-white rounded-[20px] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-[50px] w-[50px] rounded-full bg-slate-100 overflow-hidden border border-slate-200 shrink-0" />
              <div>
                <h3 className="text-[15px] font-bold text-[#1D3557]">Ahmed</h3>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-[#5C757D] mt-0.5">
                  <span className="flex items-center text-[#1D3557]"><Star className="h-3 w-3 mr-1 text-amber-400 fill-amber-400" /> 4.8</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-[#1D3557] transition-transform active:scale-95">
                <Phone className="h-4 w-4" fill="currentColor" />
              </button>
              <button className="h-10 w-10 rounded-full bg-[#E6F4EA] flex items-center justify-center text-[#2A9D8F] transition-transform active:scale-95">
                <MessageSquare className="h-4 w-4" fill="currentColor" />
              </button>
            </div>
          </div>
        </div>

        {/* Status Metrics */}
        <div className="px-5 mt-8 mb-8 flex justify-between items-center text-center">
          <div>
            <p className="text-[11px] font-semibold text-[#A0AEC0] mb-1">ETA</p>
            <p className="text-[15px] font-bold text-[#1D3557]">18 min</p>
          </div>
          <div className="w-[1px] h-8 bg-slate-200"></div>
          <div>
            <p className="text-[11px] font-semibold text-[#A0AEC0] mb-1">Distance</p>
            <p className="text-[15px] font-bold text-[#1D3557]">1.2 km</p>
          </div>
          <div className="w-[1px] h-8 bg-slate-200"></div>
          <div>
            <p className="text-[11px] font-semibold text-[#A0AEC0] mb-1">Status</p>
            <p className="text-[15px] font-bold text-[#1D3557]">On the way</p>
          </div>
        </div>

        {/* Booking Details */}
        <div className="px-5 space-y-5">
          <div className="flex items-center justify-between pb-2">
            <div>
              <p className="text-[11px] font-semibold text-[#A0AEC0]">Booking ID</p>
              <p className="text-[12px] font-bold text-[#1D3557]">BOOK-20260816-0001</p>
            </div>
            <button className="text-[12px] font-semibold text-[#5C757D]">
              View Details
            </button>
          </div>
          
          <div className="flex justify-between items-start">
            <span className="text-[#A0AEC0] text-[13px] font-medium w-24">Vehicle</span>
            <span className="text-[#1D3557] text-[13px] font-bold text-right">Honda Activa 6G</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-[#A0AEC0] text-[13px] font-medium w-24">Service</span>
            <span className="text-[#1D3557] text-[13px] font-bold text-right">Battery</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-[#A0AEC0] text-[13px] font-medium w-24">Problem</span>
            <span className="text-[#1D3557] text-[13px] font-bold text-right">Bike won't start</span>
          </div>
        </div>

      </main>

    </div>
  )
}
