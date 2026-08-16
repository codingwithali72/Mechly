import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button, buttonVariants } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'

export default function AddVehiclePage() {
  return (
    <div className="p-4 md:p-8 md:max-w-2xl md:mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Add a Vehicle</CardTitle>
          <CardDescription>
            Tell us what you drive. We only need the basics to get you started.
          </CardDescription>
        </CardHeader>
        <form>
          <CardContent className="space-y-6">
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Required Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="vehicle_type">Vehicle Type <span className="text-red-500">*</span></Label>
                <Select name="vehicle_type" required>
                  <SelectTrigger id="vehicle_type">
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MOTORCYCLE">Motorcycle</SelectItem>
                    <SelectItem value="SCOOTER">Scooter</SelectItem>
                    <SelectItem value="CAR">Car</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand <span className="text-red-500">*</span></Label>
                  <Input id="brand" name="brand" placeholder="e.g. Honda" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model <span className="text-red-500">*</span></Label>
                  <Input id="model" name="model" placeholder="e.g. Activa 6G" required />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Optional Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input id="year" name="year" type="number" placeholder="2021" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fuel_type">Fuel Type</Label>
                  <Select name="fuel_type">
                    <SelectTrigger id="fuel_type">
                      <SelectValue placeholder="Select fuel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PETROL">Petrol</SelectItem>
                      <SelectItem value="DIESEL">Diesel</SelectItem>
                      <SelectItem value="EV">Electric (EV)</SelectItem>
                      <SelectItem value="CNG">CNG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="registration_number">Registration Number</Label>
                <Input id="registration_number" name="registration_number" placeholder="MH-01-AB-1234" />
              </div>
            </div>

          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Link href="/home" className={buttonVariants({ variant: "ghost" })}>Cancel</Link>
            <Button type="submit">Save Vehicle</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
