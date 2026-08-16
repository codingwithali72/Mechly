import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MapPin } from 'lucide-react'
import Link from 'next/link'

export default async function LocationSelectionPage({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  const { mode } = await searchParams
  const isUrgent = mode === 'urgent'
  const nextStep = isUrgent ? '/book/searching' : '/book/schedule'
  const modeParam = mode ? `?mode=${mode}` : '?mode=scheduled'
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
        <form>
          <CardContent className="space-y-6">
            
            <Button variant="outline" className="w-full py-6 flex items-center justify-center gap-2 border-primary text-primary hover:bg-primary/5">
              <MapPin className="h-5 w-5" />
              Use Current Location
            </Button>

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
                <Input id="city" defaultValue="Navi Mumbai" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Area / Locality</Label>
                <Input id="area" defaultValue="Kharghar" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Detailed Address</Label>
                <Input id="address" placeholder="Sector 12, Plot 45..." />
              </div>
            </div>

          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Link href={`/book/problem${modeParam}`} className={buttonVariants({ variant: "ghost" })}>Back</Link>
            <Link href={`${nextStep}${modeParam}`} className={buttonVariants({ variant: "default" })}>Continue</Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
