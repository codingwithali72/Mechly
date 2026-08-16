'use client'

import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

export function SubmitButton({ children = "Continue", className = "", variant = "default" as any }: { children?: React.ReactNode, className?: string, variant?: string }) {
  const [isPending, setIsPending] = useState(false)

  // Auto reset pending state after 5 seconds just in case of network failure
  useEffect(() => {
    if (isPending) {
      const timer = setTimeout(() => setIsPending(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [isPending])

  return (
    <Button 
      type="submit" 
      variant={variant}
      className={className}
      onClick={() => setIsPending(true)}
      disabled={isPending}
    >
      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </Button>
  )
}
