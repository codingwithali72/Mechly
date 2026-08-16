import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

const SLOTS = [
  "10:00 AM - 12:00 PM",
  "12:00 PM - 02:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM",
  "06:00 PM - 08:00 PM"
]

const parseSlotStartHour = (slot: string) => {
  const [time, modifier] = slot.split(' - ')[0].split(' ')
  let [hours] = time.split(':')
  let hour = parseInt(hours, 10)
  if (modifier === 'PM' && hour < 12) hour += 12
  if (modifier === 'AM' && hour === 12) hour = 0
  return hour
}

export default async function ScheduleSelectionPage({ searchParams }: { searchParams: Promise<{ mode?: string, service?: string, problem_description?: string, city?: string, area?: string, address?: string }> }) {
  const { mode, service, problem_description, city, area, address } = await searchParams
  const modeParam = mode || 'scheduled'
  
  const currentHour = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000).getUTCHours()
  const todaySlots = SLOTS.filter(slot => parseSlotStartHour(slot) > currentHour)

  const backUrl = `/book/location?mode=${modeParam}${service ? `&service=${service}` : ''}${problem_description ? `&problem_description=${problem_description}` : ''}`
  
  return (
    <div className="p-4 md:p-8 md:max-w-2xl md:mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
            <span>Step 3 of 4</span>
          </div>
          <CardTitle className="text-xl font-bold">When should we arrive?</CardTitle>
          <CardDescription>
            Select a preferred time slot for the mechanic visit.
          </CardDescription>
        </CardHeader>
        <form action="/book/mechanics" method="GET">
          <input type="hidden" name="mode" value={modeParam} />
          {service && <input type="hidden" name="service" value={service} />}
          {problem_description && <input type="hidden" name="problem_description" value={problem_description} />}
          {city && <input type="hidden" name="city" value={city} />}
          {area && <input type="hidden" name="area" value={area} />}
          {address && <input type="hidden" name="address" value={address} />}
          <CardContent className="space-y-6">
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Today</h3>
              {todaySlots.length === 0 ? (
                <div className="bg-slate-50 text-slate-500 p-4 rounded-lg text-sm text-center border border-dashed border-slate-200">
                  No more slots available today. Please select a time for tomorrow.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {todaySlots.map((slot, i) => (
                    <label key={`today-${slot}`} className="cursor-pointer">
                      <input type="radio" name="time_slot" value={`Today, ${slot}`} className="peer sr-only" defaultChecked={i === 0} />
                      <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary peer-checked:bg-primary/5">
                        <span className="font-medium text-sm">{slot}</span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold text-lg">Tomorrow</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SLOTS.map((slot, i) => (
                  <label key={`tomorrow-${slot}`} className="cursor-pointer">
                    <input type="radio" name="time_slot" value={`Tomorrow, ${slot}`} className="peer sr-only" defaultChecked={todaySlots.length === 0 && i === 0} />
                    <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary peer-checked:bg-primary/5">
                      <span className="font-medium text-sm">{slot}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Link href={backUrl} className={buttonVariants({ variant: "ghost" })}>Back</Link>
            <Button type="submit">Continue</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
