import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

import { AlertTriangle, CalendarCheck } from 'lucide-react'

export default async function BookingSummaryPage({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  const { mode } = await searchParams
  const isUrgent = mode === 'urgent'
  return (
    <div className="p-4 md:p-8 md:max-w-2xl md:mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
            {isUrgent ? (
              <Badge variant="destructive" className="flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> URGENT DISPATCH</Badge>
            ) : (
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 flex items-center gap-1"><CalendarCheck className="h-3 w-3" /> SCHEDULED</Badge>
            )}
            <span className="ml-auto">Final Step</span>
          </div>
          <CardTitle className="text-xl font-bold">Booking Summary</CardTitle>
          <CardDescription>
            Review your details before confirming.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <span className="text-muted-foreground font-medium">Vehicle</span>
              <span className="font-semibold text-right">Honda Activa 6G</span>
            </div>
            <Separator />
            <div className="flex justify-between items-start">
              <span className="text-muted-foreground font-medium">Problem</span>
              <span className="font-semibold text-right">Bike won't start</span>
            </div>
            <Separator />
            <div className="flex justify-between items-start">
              <span className="text-muted-foreground font-medium">Location</span>
              <span className="font-semibold text-right">Kharghar, Navi Mumbai</span>
            </div>
            <Separator />
            <div className="flex justify-between items-start">
              <span className="text-muted-foreground font-medium">Time</span>
              <span className="font-semibold text-right">
                {isUrgent ? 'Immediate - Right Now' : 'Today, 04:00 PM - 06:00 PM'}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between items-start">
              <span className="text-muted-foreground font-medium">Assigned Mechanic</span>
              <span className="font-semibold text-right text-primary">Ahmed Doe (4.8 ★)</span>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg space-y-2 mt-6">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Estimated Visit Charge</span>
              <span>₹500</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Final repair cost may change after inspection. Additional work requires your approval.
            </p>
          </div>

        </CardContent>
        <CardFooter className="flex flex-col gap-4 border-t p-6">
          <Link href="/tracking/BOOK-20260816-0001" className={buttonVariants({ variant: "default", size: "lg" }) + " w-full text-lg font-semibold"}>CONFIRM BOOKING</Link>
          <Link href={isUrgent ? "/home" : "/book/mechanics?mode=scheduled"} className={buttonVariants({ variant: "ghost" }) + " w-full"}>
            {isUrgent ? "Cancel Request" : "Back to Mechanics"}
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
