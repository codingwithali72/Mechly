import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { MapPin, Clock } from 'lucide-react'

export default function MechanicDashboard() {
  return (
    <div className="space-y-6 p-4 md:p-8 md:max-w-4xl md:mx-auto">
      
      {/* Status Bar */}
      <Card className="border-t-4 border-t-primary">
        <CardContent className="flex items-center justify-between p-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold">You are Offline</h2>
            <p className="text-sm text-muted-foreground">Go online to receive new jobs.</p>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="availability" />
            <Label htmlFor="availability" className="font-semibold text-base">Online</Label>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹0.00</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>

      {/* New Job Requests (Mock) */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold tracking-tight">Active Requests</h3>
        
        <Card className="border-l-4 border-l-yellow-500 overflow-hidden">
          <CardHeader className="bg-muted/50 pb-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                NEW REQUEST
              </Badge>
              <span className="text-xs font-bold text-muted-foreground">Just now</span>
            </div>
            <div className="flex justify-between items-start mt-2">
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">Honda Activa 6G</CardTitle>
                  <Badge variant="destructive" className="animate-pulse">URGENT</Badge>
                </div>
                <CardDescription className="text-base text-foreground font-medium">Bike won't start</CardDescription>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-primary">₹550</p>
                <p className="text-xs text-muted-foreground">Est. Total</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-2 pt-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              Kharghar (1.2 km away)
            </div>
            <div className="flex items-center text-sm text-muted-foreground font-semibold text-destructive">
              <Clock className="mr-2 h-4 w-4" />
              Immediate - ASAP
            </div>
            <div className="mt-2 text-sm font-semibold text-primary">
              Visit Charge: ₹500
            </div>
          </CardContent>
          <CardFooter className="flex gap-3 border-t bg-muted/20 p-4">
            <Button variant="outline" className="w-full">Decline</Button>
            <Button className="w-full">Accept Job</Button>
          </CardFooter>
        </Card>

      </section>
    </div>
  )
}
