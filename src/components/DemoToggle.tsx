'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

export function DemoToggle() {
  const [isDemo, setIsDemo] = useState(true)

  if (!isDemo) return null

  return (
    <div className="fixed bottom-20 right-4 z-50 md:bottom-4">
      <Badge 
        className="cursor-pointer shadow-lg hover:shadow-xl transition-shadow bg-yellow-500 hover:bg-yellow-600 text-black border-2 border-yellow-700"
        onClick={() => {
          // In a real implementation, this would clear localStorage demo tokens
          alert("Demo mode is active. This uses mock data and bypasses SMS OTPs.")
        }}
      >
        DEMO MODE ACTIVE
      </Badge>
    </div>
  )
}
