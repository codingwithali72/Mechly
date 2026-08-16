'use client'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'

export function SubmitButton({ children = "Continue", className = "", variant = "default" }: { children?: React.ReactNode, className?: string, variant?: "link" | "default" | "outline" | "secondary" | "ghost" | "destructive" | null | undefined }) {
  const { pending } = useFormStatus()

  return (
    <Button 
      type="submit" 
      variant={variant}
      className={className}
      disabled={pending}
    >
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </Button>
  )
}
