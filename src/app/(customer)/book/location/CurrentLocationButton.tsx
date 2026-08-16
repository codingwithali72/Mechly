'use client'

import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'

export function CurrentLocationButton() {
  return (
    <Button 
      type="button" 
      variant="outline" 
      className="w-full py-6 flex items-center justify-center gap-2 border-primary text-primary hover:bg-primary/5"
      onClick={() => alert('GPS Location tracking will be available in the next release. Please enter your address manually for now.')}
    >
      <MapPin className="h-5 w-5" />
      Use Current Location
    </Button>
  )
}
