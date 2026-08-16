import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { User, Star, MapPin, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { SubmitButton } from '@/components/SubmitButton'

const MECHANICS = [
  { id: 'm1', name: 'Ahmed Doe', rating: 4.8, jobs: 127, distance: '2.5 km away' },
  { id: 'm2', name: 'Vikram S.', rating: 4.9, jobs: 342, distance: '3.1 km away' },
  { id: 'm3', name: 'Rahul K.', rating: 4.5, jobs: 56, distance: '1.2 km away' },
]

export default async function MechanicsSelectionPage({ searchParams }: { searchParams: Promise<{ mode?: string, service?: string, problem_description?: string, city?: string, area?: string, address?: string, time_slot?: string }> }) {
  const { mode, service, problem_description, city, area, address, time_slot } = await searchParams
  const modeParam = mode || 'scheduled'
  
  const backUrl = `/book/schedule?mode=${modeParam}${service ? `&service=${service}` : ''}${problem_description ? `&problem_description=${problem_description}` : ''}${city ? `&city=${city}` : ''}${area ? `&area=${area}` : ''}${address ? `&address=${address}` : ''}`

  const supabase = await createClient()
  const { data: dbMechanics } = await supabase.from('mechanics').select(`*, profiles(full_name, avatar_url)`).limit(5)

  return (
    <div className="p-4 md:p-8 md:max-w-2xl md:mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
            <span>Step 4 of 5</span>
          </div>
          <CardTitle className="text-xl font-bold">Select a Mechanic</CardTitle>
          <CardDescription>
            These mechanics are available for your selected time slot.
          </CardDescription>
        </CardHeader>
        <form action="/book/summary" method="GET">
          <input type="hidden" name="mode" value={modeParam} />
          {service && <input type="hidden" name="service" value={service} />}
          {problem_description && <input type="hidden" name="problem_description" value={problem_description} />}
          {city && <input type="hidden" name="city" value={city} />}
          {area && <input type="hidden" name="area" value={area} />}
          {address && <input type="hidden" name="address" value={address} />}
          {time_slot && <input type="hidden" name="time_slot" value={time_slot} />}
          <CardContent className="space-y-6">
            {!dbMechanics || dbMechanics.length === 0 ? (
              <div className="bg-amber-50 text-amber-800 p-4 rounded-lg flex items-start gap-3 border border-amber-200">
                <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
                <p className="text-sm">There are no verified mechanics available in your area right now. You can continue booking and we will automatically assign the next available mechanic to your job.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {dbMechanics.map((mechanic, index) => (
                  <label key={mechanic.id} className="cursor-pointer block">
                    <input type="radio" name="mechanic_id" value={mechanic.id} className="peer sr-only" defaultChecked={index === 0} />
                    <div className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary peer-checked:bg-primary/5">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                          <User className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{(mechanic as any).profiles?.full_name || 'Mechanic'}</p>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center"><Star className="h-3 w-3 mr-1 text-yellow-500 fill-yellow-500" /> {mechanic.rating_average} ({mechanic.completed_jobs_count} jobs)</span>
                            <span className="flex items-center"><MapPin className="h-3 w-3 mr-1" /> {mechanic.service_radius_km} km away</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Link href={backUrl} className={buttonVariants({ variant: "ghost" })}>Back</Link>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
