import { MapPin, Search, CheckCircle2, Circle } from 'lucide-react'
import Link from 'next/link'

export default function SearchingPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col font-sans max-w-md mx-auto md:border-x border-slate-100 shadow-2xl relative">
      
      {/* Header Spacer */}
      <header className="h-16 flex items-center px-5" />

      <main className="flex-1 px-8 pt-8 flex flex-col items-center">
        
        {/* Map/Search Visual Placeholder */}
        <div className="relative w-48 h-48 mb-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#F1FAEE] rounded-full scale-110 opacity-50 animate-pulse" />
          <div className="bg-[#E6F4EA] w-32 h-32 rounded-full flex items-center justify-center relative shadow-[0_10px_40px_rgb(42,157,143,0.15)]">
             <MapPin className="h-12 w-12 text-[#2A9D8F] absolute -mt-4 -ml-2" />
             <Search className="h-16 w-16 text-[#1D3557] absolute mt-4 ml-4 bg-white rounded-full p-2 shadow-sm" />
          </div>
        </div>
        
        <h2 className="text-[24px] font-bold text-[#1D3557] text-center mb-10 leading-tight">
          Searching for<br />available mechanics
        </h2>
        
        <div className="w-full space-y-6">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="h-6 w-6 text-[#2A9D8F] shrink-0" fill="currentColor" stroke="white" />
            <span className="text-[15px] font-semibold text-[#1D3557]">Finding nearby mechanics</span>
          </div>
          
          <div className="flex items-center gap-4">
            <CheckCircle2 className="h-6 w-6 text-[#2A9D8F] shrink-0" fill="currentColor" stroke="white" />
            <span className="text-[15px] font-semibold text-[#1D3557]">Checking availability</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Circle className="h-6 w-6 text-[#E2E8F0] shrink-0" strokeWidth={3} />
            <span className="text-[15px] font-medium text-[#A0AEC0]">Matching best fit</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Circle className="h-6 w-6 text-[#E2E8F0] shrink-0" strokeWidth={3} />
            <span className="text-[15px] font-medium text-[#A0AEC0]">Almost there...</span>
          </div>
        </div>

        {/* Mock Navigation controls */}
        <div className="mt-auto pb-12 w-full pt-10 flex flex-col gap-3">
          <Link href="/book/mechanics" className="w-full h-[52px] rounded-full bg-slate-50 hover:bg-slate-100 text-[#1D3557] font-semibold text-[15px] flex items-center justify-center border border-slate-200">
            [Mock] Continue to Selection
          </Link>
        </div>

      </main>
    </div>
  )
}
