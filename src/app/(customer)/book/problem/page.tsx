import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ProblemForm } from './ProblemForm'
import { SubmitButton } from '@/components/SubmitButton'
import { ChevronLeft } from 'lucide-react'

export default async function ProblemDescriptionPage({ searchParams }: { searchParams: Promise<{ mode?: string, service?: string }> }) {
  const { mode, service } = await searchParams
  const modeParam = mode || 'scheduled'
  return (
    <div className="bg-white min-h-screen flex flex-col font-sans max-w-md mx-auto md:border-x border-slate-100 shadow-2xl">
      
      {/* Header */}
      <header className="flex items-center px-5 pt-8 pb-4">
        <Link href="/home" className="mr-3">
          <ChevronLeft className="h-6 w-6 text-[#1D3557]" />
        </Link>
        <h1 className="text-lg font-semibold text-[#1D3557]">Describe Problem</h1>
      </header>

      <main className="flex-1 px-5 pt-4 flex flex-col">
        <h2 className="text-[24px] font-bold text-[#1D3557] mb-6">Tell us what's wrong</h2>
        
        <form action="/book/location" method="GET" className="flex-1 flex flex-col">
          <input type="hidden" name="mode" value={modeParam} />
          {service && <input type="hidden" name="service" value={service} />}
          
          <div className="flex-1">
            <ProblemForm />
          </div>
          
          <div className="pt-6 pb-8 pb-safe">
            <SubmitButton className="w-full h-[52px] rounded-full bg-[#E63946] hover:bg-[#d32f2f] text-white font-semibold text-[15px] shadow-[0_8px_25px_rgba(230,57,70,0.3)]">
              Continue
            </SubmitButton>
          </div>
        </form>
      </main>
    </div>
  )
}
