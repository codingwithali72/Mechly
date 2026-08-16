import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { MapPin, Radar } from 'lucide-react'
import Link from 'next/link'

export default function SearchingPage() {
  return (
    <div className="p-4 md:p-8 md:max-w-2xl md:mx-auto space-y-6">
      <Card className="border-destructive">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold text-destructive flex justify-center items-center gap-2">
            <Radar className="h-6 w-6 animate-spin" />
            Finding Nearby Mechanics...
          </CardTitle>
          <CardDescription>
            Hold tight. We are broadcasting your urgent request to available mechanics within a 5km radius of Kharghar, Navi Mumbai.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-4 text-center">
          
          <div className="relative mx-auto h-48 w-48 rounded-full border-4 border-destructive/20 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-destructive/10 animate-ping rounded-full" />
            <div className="h-16 w-16 bg-destructive rounded-full flex items-center justify-center text-white z-10 shadow-lg">
              <MapPin className="h-8 w-8" />
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground animate-pulse">Waiting for a mechanic to accept...</p>

          <div className="pt-8 flex flex-col gap-3">
             {/* This button serves as a mock transition since we don't have real-time sockets yet */}
            <Link href="/book/summary?mode=urgent" className={buttonVariants({ variant: "default" }) + " w-full font-bold bg-green-600 hover:bg-green-700 text-white"}>
              [Mock] Mechanic Accepted!
            </Link>

            <Link href="/book/location?mode=urgent" className={buttonVariants({ variant: "outline" }) + " w-full text-destructive hover:bg-destructive/10 hover:text-destructive"}>
              Cancel Request
            </Link>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
