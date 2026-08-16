import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { CheckCircle2, Wrench, IndianRupee } from 'lucide-react'
import Link from 'next/link'

export default function JobCompletionPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-4 md:p-8 md:max-w-2xl md:mx-auto space-y-6">
      
      <Card className="border-t-4 border-t-green-500 text-center py-8">
        <CardHeader>
          <div className="mx-auto bg-green-100 h-20 w-20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Job Completed!</CardTitle>
          <CardDescription className="text-base mt-2">
            You have successfully completed the repair.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Job ID: {params.id}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6 text-center space-y-2">
            <Wrench className="h-8 w-8 text-muted-foreground mx-auto" />
            <h3 className="font-semibold text-lg">General Repair</h3>
            <p className="text-xs text-muted-foreground">Service Type</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center space-y-2">
            <IndianRupee className="h-8 w-8 text-primary mx-auto" />
            <h3 className="font-semibold text-lg">₹550.00</h3>
            <p className="text-xs text-muted-foreground">Amount Collected</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center pt-4">
        <Link href="/dashboard" className={buttonVariants({ size: "lg" }) + " w-full md:w-auto"}>Back to Dashboard</Link>
      </div>

    </div>
  )
}
