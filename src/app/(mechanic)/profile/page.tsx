import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, MapPin, Wrench } from 'lucide-react'

export default function MechanicProfile() {
  return (
    <div className="space-y-6 p-4 md:p-8 md:max-w-2xl md:mx-auto">
      
      {/* Profile Header */}
      <Card>
        <CardContent className="flex flex-col items-center pt-6 pb-6 text-center">
          <div className="h-24 w-24 rounded-full bg-muted border-4 border-white shadow-sm flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-muted-foreground">AD</span>
          </div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            Ahmed Doe
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          </h2>
          <Badge variant="secondary" className="mt-2">Verified Mechanic</Badge>
          
          <div className="flex gap-6 mt-6">
            <div className="flex flex-col">
              <span className="text-xl font-bold">4.8 ★</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Rating</span>
            </div>
            <div className="flex flex-col border-l pl-6">
              <span className="text-xl font-bold">127</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Jobs Done</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details */}
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              Service Area
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">Kharghar, Navi Mumbai</p>
            <p className="text-sm text-muted-foreground">Up to 5 km radius</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Wrench className="h-5 w-5 text-muted-foreground" />
              Skills & Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Two-wheeler</Badge>
              <Badge variant="outline">Battery</Badge>
              <Badge variant="outline">Electrical</Badge>
              <Badge variant="outline">Brake</Badge>
              <Badge variant="outline">General Repair</Badge>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              4 years of experience
            </p>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
