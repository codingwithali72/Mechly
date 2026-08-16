import { ChevronLeft, CheckCircle2, AlertTriangle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function CustomerEstimateApprovalPage({ params }: { params: { id: string } }) {
  return (
    <div className="bg-white min-h-screen flex flex-col font-sans max-w-md mx-auto md:border-x border-slate-100 shadow-2xl">
      
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-8 pb-4">
        <Link href={`/tracking/${params.id}`} className="p-2 -ml-2">
          <ChevronLeft className="h-6 w-6 text-[#1D3557]" />
        </Link>
        <h1 className="text-lg font-semibold text-[#1D3557]">Final Invoice</h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </header>

      <main className="flex-1 px-5 pt-4 pb-24 flex flex-col">
        
        {/* Mechanic Notification */}
        <div className="bg-[#E6F4EA] rounded-[16px] p-4 flex items-center justify-center gap-2 mb-8 shadow-[0_4px_15px_rgb(42,157,143,0.1)]">
          <CheckCircle2 className="h-5 w-5 text-[#2A9D8F]" strokeWidth={2.5} />
          <p className="text-[13px] font-bold text-[#1D3557]">Ahmed has finished the job.</p>
        </div>

        {/* Invoice Items */}
        <div className="space-y-6">
          
          {/* Visit Charge */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] font-bold text-[#1D3557]">Visit Charge</p>
              <p className="text-[11px] font-semibold text-[#A0AEC0] mt-0.5">Includes inspection</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[14px] font-bold text-[#1D3557]">₹150</span>
              <Badge className="bg-[#E6F4EA] text-[#2A9D8F] hover:bg-[#E6F4EA] border-none px-2.5 py-0.5 rounded-md text-[10px] font-bold shadow-none">
                Paid
              </Badge>
            </div>
          </div>

          <div className="h-[1px] w-full bg-slate-100" />

          {/* Additional Work */}
          <div>
            <div className="flex items-center gap-1 mb-4">
              <AlertTriangle className="h-4 w-4 text-[#E63946]" />
              <p className="text-[12px] font-bold text-[#E63946]">Requires Approval</p>
            </div>
            
            <div className="space-y-5">
              {/* Item 1 */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-bold text-[#1D3557]">Spark Plug Replacement</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[14px] font-bold text-[#1D3557]">₹250</span>
                  <button className="bg-[#2A9D8F] hover:bg-[#21867a] text-white px-3 py-1.5 rounded-full text-[11px] font-bold shadow-[0_2px_8px_rgba(42,157,143,0.3)] transition-colors">
                    Approve ₹250
                  </button>
                </div>
              </div>
              
              {/* Item 2 */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-bold text-[#1D3557]">Brake wire tightening</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[14px] font-bold text-[#1D3557]">₹100</span>
                  <Badge className="bg-white text-[#2A9D8F] hover:bg-white border border-[#2A9D8F] px-3 py-1 rounded-full text-[11px] font-bold shadow-none flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Approved
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[1px] w-full bg-slate-100 mt-6" />

          {/* Total */}
          <div className="flex justify-between items-center mt-6">
            <span className="text-[16px] font-bold text-[#1D3557]">Total Pending</span>
            <span className="text-[20px] font-bold text-[#E63946]">₹350</span>
          </div>

        </div>

      </main>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-slate-100 md:max-w-md md:mx-auto z-50">
        <Link href={`/tracking/${params.id}`} className="w-full h-[52px] rounded-full bg-[#E63946] hover:bg-[#d32f2f] text-white font-semibold text-[15px] shadow-[0_8px_25px_rgba(230,57,70,0.3)] flex items-center justify-center transition-colors">
          Review & Approve
        </Link>
      </div>

    </div>
  )
}
