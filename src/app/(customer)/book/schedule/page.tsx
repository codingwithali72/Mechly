import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

const SLOTS = [
  "10:00 AM - 12:00 PM",
  "12:00 PM - 02:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM",
  "06:00 PM - 08:00 PM"
]

export default function ScheduleSelectionPage() {
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
        <form>
          <CardContent className="space-y-6">
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Today</h3>
              <RadioGroup defaultValue="04:00 PM - 06:00 PM" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SLOTS.map((slot) => (
                  <div key={`today-${slot}`}>
                    <RadioGroupItem value={slot} id={`today-${slot}`} className="peer sr-only" />
                    <Label
                      htmlFor={`today-${slot}`}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      {slot}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold text-lg">Tomorrow</h3>
              <RadioGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SLOTS.map((slot) => (
                  <div key={`tomorrow-${slot}`}>
                    <RadioGroupItem value={`tomorrow-${slot}`} id={`tomorrow-${slot}`} className="peer sr-only" />
                    <Label
                      htmlFor={`tomorrow-${slot}`}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      {slot}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Link href="/book/location?mode=scheduled" className={buttonVariants({ variant: "ghost" })}>Back</Link>
            <Link href="/book/mechanics?mode=scheduled" className={buttonVariants({ variant: "default" })}>Continue</Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
