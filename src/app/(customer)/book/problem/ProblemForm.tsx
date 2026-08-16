'use client'

import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

const COMMON_PROBLEMS = [
  "Bike won't start",
  "Strange noise",
  "Battery dead",
  "Flat tyre",
  "Brake issue",
  "Other"
]

export function ProblemForm() {
  const [text, setText] = useState('')

  return (
    <div className="space-y-4">
      <Textarea 
        name="problem_description"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="E.g. My Activa starts but switches off after a few minutes..."
        className="min-h-[120px]"
      />
      
      <div>
        <h3 className="text-sm font-medium mb-3">Common Problems</h3>
        <div className="flex flex-wrap gap-2">
          {COMMON_PROBLEMS.map((problem) => (
            <Badge 
              key={problem} 
              variant={text === problem ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground py-1.5 px-3"
              onClick={() => setText(problem)}
            >
              {problem}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
