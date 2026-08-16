import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { User, Star, MapPin } from 'lucide-react'
import Link from 'next/link'

const MECHANICS = [
  { id: 'm1', name: 'Ahmed Doe', rating: 4.8, jobs: 127, distance: '2.5 km away' },
  { id: 'm2', name: 'Vikram S.', rating: 4.9, jobs: 342, distance: '3.1 km away' },
  { id: 'm3', name: 'Rahul K.', rating: 4.5, jobs: 56, distance: '1.2 km away' },
]

export default function MechanicsSelectionPage() {
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
        <form>
          <CardContent className="space-y-6">
            <RadioGroup defaultValue="m1" className="space-y-4">
              {MECHANICS.map((mechanic) => (
                <div key={mechanic.id}>
                  <RadioGroupItem value={mechanic.id} id={mechanic.id} className="peer sr-only" />
                  <Label
                    htmlFor={mechanic.id}
                    className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <User className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{mechanic.name}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center"><Star className="h-3 w-3 mr-1 text-yellow-500 fill-yellow-500" /> {mechanic.rating} ({mechanic.jobs} jobs)</span>
                          <span className="flex items-center"><MapPin className="h-3 w-3 mr-1" /> {mechanic.distance}</span>
                        </div>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Link href="/book/schedule?mode=scheduled" className={buttonVariants({ variant: "ghost" })}>Back</Link>
            <Link href="/book/summary?mode=scheduled" className={buttonVariants({ variant: "default" })}>Continue</Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
