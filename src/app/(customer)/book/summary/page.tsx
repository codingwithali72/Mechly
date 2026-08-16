import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

import { AlertTriangle, CalendarCheck } from 'lucide-react'
import { createClient, ensureCustomerProfile } from '@/lib/supabase/server'
import { createBooking } from '../actions'
import { SubmitButton } from '@/components/SubmitButton'

export default async function BookingSummaryPage({ searchParams }: { searchParams: Promise<{ mode?: string, service?: string, problem_description?: string, city?: string, area?: string, address?: string, time_slot?: string, mechanic_id?: string }> }) {
  const { mode, service, problem_description, city, area, address, time_slot, mechanic_id } = await searchParams
  const isUrgent = mode === 'urgent'
  const modeParam = mode || 'scheduled'

  const { customer } = await ensureCustomerProfile()
  const supabase = await createClient()

  const { data: dbService } = await supabase.from('services').select('name').eq('id', service).single()
  const { data: dbVehicle } = await supabase.from('vehicles').select('id, brand, model').eq('customer_id', customer.id).limit(1).single()
  
  let mechanicName = 'Unassigned (Auto-assign)'
  if (mechanic_id) {
    const { data: mechanic } = await supabase.from('mechanics').select('*, profiles(full_name)').eq('id', mechanic_id).single()
    if (mechanic && (mechanic as any).profiles) {
      mechanicName = `${(mechanic as any).profiles.full_name} (${mechanic.rating_average} ★)`
    }
  }

  const backUrl = isUrgent ? `/book/location?mode=${modeParam}${service ? `&service=${service}` : ''}${problem_description ? `&problem_description=${problem_description}` : ''}` : `/book/mechanics?mode=${modeParam}${service ? `&service=${service}` : ''}${problem_description ? `&problem_description=${problem_description}` : ''}${city ? `&city=${city}` : ''}${area ? `&area=${area}` : ''}${address ? `&address=${address}` : ''}${time_slot ? `&time_slot=${time_slot}` : ''}`

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
              <span className="font-semibold text-right">{dbVehicle ? `${dbVehicle.brand} ${dbVehicle.model}` : 'No vehicle found'}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-start">
              <span className="text-muted-foreground font-medium">Problem</span>
              <span className="font-semibold text-right">{problem_description || dbService?.name || 'Not specified'}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-start">
              <span className="text-muted-foreground font-medium">Location</span>
              <span className="font-semibold text-right">{area || city || 'Unknown'}, {address}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-start">
              <span className="text-muted-foreground font-medium">Time</span>
              <span className="font-semibold text-right">
                {isUrgent ? 'Immediate - Right Now' : time_slot || 'Today'}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between items-start">
              <span className="text-muted-foreground font-medium">Assigned Mechanic</span>
              <span className="font-semibold text-right text-primary">{mechanicName}</span>
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
        <form action={createBooking}>
          <input type="hidden" name="mode" value={modeParam} />
          {service && <input type="hidden" name="service" value={service} />}
          {problem_description && <input type="hidden" name="problem_description" value={problem_description} />}
          {city && <input type="hidden" name="city" value={city} />}
          {area && <input type="hidden" name="area" value={area} />}
          {address && <input type="hidden" name="address" value={address} />}
          {time_slot && <input type="hidden" name="time_slot" value={time_slot} />}
          {mechanic_id && <input type="hidden" name="mechanic_id" value={mechanic_id} />}
          {dbVehicle && <input type="hidden" name="vehicle_id" value={dbVehicle.id} />}
          
          <CardFooter className="flex-col gap-3 border-t p-6">
            <SubmitButton className="w-full text-lg py-6" variant="default">
              Confirm Booking
            </SubmitButton>
            <Link href="/home" className={buttonVariants({ variant: "ghost", className: "w-full text-muted-foreground" })}>Cancel Request</Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
