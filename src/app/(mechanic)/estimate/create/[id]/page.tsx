import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { PlusCircle, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function CreateEstimatePage({ params }: { params: { id: string } }) {
  return (
    <div className="p-4 md:p-8 md:max-w-2xl md:mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Create Estimate</CardTitle>
          <CardDescription>
            Add parts and labor to generate a final quote for the customer.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="font-semibold text-lg">Line Items</h3>
            </div>
            
            {/* Mock Item 1 */}
            <div className="flex gap-4 items-end">
              <div className="flex-1 space-y-2">
                <Label>Description</Label>
                <Input defaultValue="Spark Plug Replacement" />
              </div>
              <div className="w-24 space-y-2">
                <Label>Price (₹)</Label>
                <Input type="number" defaultValue="250" />
              </div>
              <Button variant="ghost" size="icon" className="text-destructive mb-0.5">
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Mock Item 2 */}
            <div className="flex gap-4 items-end">
              <div className="flex-1 space-y-2">
                <Label>Description</Label>
                <Input defaultValue="Labor Charges" />
              </div>
              <div className="w-24 space-y-2">
                <Label>Price (₹)</Label>
                <Input type="number" defaultValue="300" />
              </div>
              <Button variant="ghost" size="icon" className="text-destructive mb-0.5">
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>

            <Button variant="outline" className="w-full border-dashed gap-2 text-muted-foreground">
              <PlusCircle className="h-4 w-4" /> Add Item
            </Button>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹550.00</span>
            </div>
            <div className="flex justify-between items-center text-sm mb-3">
              <span className="text-muted-foreground">Visit Charge (deducted)</span>
              <span>-₹500.00</span>
            </div>
            <Separator className="mb-3" />
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total Final Cost</span>
              <span>₹550.00</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              The initial visit charge is adjusted against the final bill.
            </p>
          </div>

        </CardContent>
        <CardFooter className="flex gap-4 border-t p-6">
          <Link href="/dashboard" className={buttonVariants({ variant: "ghost" }) + " w-full"}>Cancel</Link>
          <Button className="w-full">Send to Customer</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
