import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function CustomerEstimateApprovalPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-4 md:p-8 md:max-w-2xl md:mx-auto space-y-6">
      
      <div className="bg-blue-50 border border-blue-200 text-blue-900 p-4 rounded-lg flex gap-3 items-start">
        <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-blue-600" />
        <p className="text-sm">
          <strong>Ahmed Doe</strong> has inspected your vehicle and provided an estimate for the repair. Please review and approve it to begin the work.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Repair Estimate</CardTitle>
          <CardDescription>Job ID: {params.id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="space-y-3">
            <div className="flex justify-between items-start text-sm">
              <span>Spark Plug Replacement</span>
              <span className="font-medium">₹250.00</span>
            </div>
            <div className="flex justify-between items-start text-sm">
              <span>Labor Charges</span>
              <span className="font-medium">₹300.00</span>
            </div>
            <Separator />
            <div className="flex justify-between items-start text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>₹550.00</span>
            </div>
            <div className="flex justify-between items-start text-sm text-muted-foreground">
              <span>Visit Charge (Paid)</span>
              <span>-₹500.00</span>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total Due</span>
              <span>₹50.00</span>
            </div>
          </div>

        </CardContent>
        <CardFooter className="flex flex-col gap-4 border-t p-6">
          <Link href={`/tracking/${params.id}`} className={buttonVariants({ size: "lg" }) + " w-full text-lg font-semibold bg-green-600 hover:bg-green-700 text-white"}>APPROVE & START WORK</Link>
          <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive">
            Reject Estimate
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
