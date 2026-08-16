'use client'

import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Mic } from 'lucide-react'
import { useState } from 'react'

const COMMON_PROBLEMS = [
  "Bike won't start",
  "Battery dead",
  "Flat tyre",
  "Strange noise",
  "Brake problem",
  "Engine issue",
  "Other"
]

export function ProblemForm() {
  const [text, setText] = useState('')

  return (
    <div className="space-y-8">
      <Textarea 
        name="problem_description"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="My bike won't start. It makes a clicking sound when I try to start."
        className="min-h-[140px] rounded-[20px] bg-slate-50 border-slate-200 resize-none p-5 text-[14px] placeholder:text-[#A0AEC0] shadow-none focus-visible:ring-1 focus-visible:ring-[#E63946] focus-visible:border-[#E63946]"
      />
      
      <div>
        <h3 className="text-sm font-semibold text-[#1D3557] mb-4">Quick options</h3>
        <div className="flex flex-wrap gap-2.5">
          {COMMON_PROBLEMS.map((problem) => {
            const isSelected = text === problem
            return (
              <Badge 
                key={problem} 
                variant="outline"
                className={`cursor-pointer rounded-full py-2 px-4 text-[12px] font-medium transition-colors border shadow-none ${
                  isSelected 
                    ? "bg-[#E63946] text-white border-[#E63946] hover:bg-[#d32f2f]" 
                    : "bg-white text-[#5C757D] border-slate-200 hover:border-[#1D3557] hover:text-[#1D3557]"
                }`}
                onClick={() => setText(problem)}
              >
                {problem}
              </Badge>
            )
          })}
        </div>
      </div>

      <div className="pt-4">
        <Button type="button" variant="outline" className="w-full rounded-full h-[52px] border-slate-200 text-[#1D3557] font-semibold text-[14px] gap-2 shadow-none hover:bg-slate-50">
          <Mic className="h-4 w-4" />
          Describe by voice
        </Button>
      </div>
    </div>
  )
}
