import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ShieldCheck, IndianRupee } from 'lucide-react'
import Link from 'next/link'

export default function PaymentCheckoutPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-4 md:p-8 md:max-w-2xl md:mx-auto space-y-6">
      
      <Card>
        <CardHeader className="bg-muted/50 border-b">
          <CardTitle className="text-xl font-bold flex justify-between items-center">
            <span>Payment Summary</span>
            <span className="text-2xl">₹550.00</span>
          </CardTitle>
          <CardDescription>Job ID: {params.id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Select Payment Method</h3>
            <RadioGroup defaultValue="upi" className="space-y-3">
              <div className="flex items-center space-x-3 border p-4 rounded-lg cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex-1 cursor-pointer font-medium text-base">UPI (GPay, PhonePe, Paytm)</Label>
              </div>
              <div className="flex items-center space-x-3 border p-4 rounded-lg cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex-1 cursor-pointer font-medium text-base">Credit / Debit Card</Label>
              </div>
              <div className="flex items-center space-x-3 border p-4 rounded-lg cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="flex-1 cursor-pointer font-medium text-base">Cash on Delivery</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div className="flex items-center gap-3 text-sm text-muted-foreground bg-green-50 text-green-800 p-3 rounded-md">
            <ShieldCheck className="h-5 w-5 text-green-600 shrink-0" />
            <p>Payments are 100% secure and processed by Razorpay.</p>
          </div>

        </CardContent>
        <CardFooter className="flex flex-col gap-4 border-t p-6">
          {/* Mock payment success route */}
          <Link href="/history" className={buttonVariants({ size: "lg" }) + " w-full text-lg font-semibold"}>PAY ₹550.00 NOW</Link>
          <Link href="/history" className={buttonVariants({ variant: "ghost" }) + " w-full"}>Cancel</Link>
        </CardFooter>
      </Card>
    </div>
  )
}
