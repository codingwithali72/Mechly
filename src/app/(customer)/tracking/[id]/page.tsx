import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { MapPin, Phone, User, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function TrackingPage({ params }: { params: { id: string } }) {
  // In a real app, this would dynamically fetch based on params.id
  
  return (
    <div className="p-4 md:p-8 md:max-w-2xl md:mx-auto space-y-6">
      
      {/* Status Header */}
      <Card className="border-t-4 border-t-blue-500">
        <CardHeader className="text-center pb-2">
          <Badge className="mx-auto bg-blue-100 text-blue-800 hover:bg-blue-100 mb-2">ON THE WAY</Badge>
          <CardTitle className="text-2xl font-bold">Ahmed is on the way</CardTitle>
          <p className="text-muted-foreground">Estimated Arrival: 18 minutes</p>
        </CardHeader>
        <CardContent>
          {/* Mock Map Area */}
          <div className="h-48 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
            <span className="text-muted-foreground font-medium flex items-center gap-2">
              <MapPin className="h-5 w-5" /> Live Map Simulation
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Mechanic Details */}
      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
             <User className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold flex items-center gap-2">
              Ahmed Doe
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </h3>
            <p className="text-sm text-muted-foreground">4.8 ★ • 127 Jobs Done</p>
          </div>
          <Button size="icon" variant="outline" className="rounded-full h-12 w-12 border-primary text-primary">
            <Phone className="h-5 w-5" />
          </Button>
        </CardContent>
      </Card>

      {/* Booking Details */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Booking Details</CardTitle>
            <span className="text-xs text-muted-foreground font-mono">{params.id || 'BOOK-20260816-0001'}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Vehicle</span>
            <span className="font-medium">Honda Activa 6G</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Service</span>
            <span className="font-medium">General Repair</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Visit Charge</span>
            <span className="font-medium">₹500</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-8">
        <Link href="/home" className={buttonVariants({ variant: "ghost" })}>Back to Home</Link>
      </div>

    </div>
  )
}
