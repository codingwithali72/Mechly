import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MapPin } from 'lucide-react'
import Link from 'next/link'
import { CurrentLocationButton } from './CurrentLocationButton'

export default async function LocationSelectionPage({ searchParams }: { searchParams: Promise<{ mode?: string, service?: string, problem_description?: string }> }) {
  const { mode, service, problem_description } = await searchParams
  const isUrgent = mode === 'urgent'
  const nextStep = isUrgent ? '/book/searching' : '/book/schedule'
  const modeParam = mode || 'scheduled'
  return (
    <div className="p-4 md:p-8 md:max-w-2xl md:mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
            <span>Step 2 of 4</span>
          </div>
          <CardTitle className="text-xl font-bold">Where are you?</CardTitle>
          <CardDescription>
            Enter your location so we can find a mechanic nearby.
          </CardDescription>
        </CardHeader>
        <form action={nextStep} method="GET">
          <input type="hidden" name="mode" value={modeParam} />
          {service && <input type="hidden" name="service" value={service} />}
          {problem_description && <input type="hidden" name="problem_description" value={problem_description} />}
          <CardContent className="space-y-6">
            
            <CurrentLocationButton />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or enter manually</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" defaultValue="Navi Mumbai" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Area / Locality</Label>
                <Input id="area" name="area" defaultValue="Kharghar" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Detailed Address</Label>
                <Input id="address" name="address" placeholder="Sector 12, Plot 45..." />
              </div>
            </div>

          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Link href={`/book/problem?mode=${modeParam}${service ? `&service=${service}` : ''}`} className={buttonVariants({ variant: "ghost" })}>Back</Link>
            <Button type="submit">Continue</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
