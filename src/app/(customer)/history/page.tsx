import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, Wrench } from 'lucide-react'

export default function CustomerHistoryPage() {
  return (
    <div className="p-4 md:p-8 md:max-w-4xl md:mx-auto space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Service History</h1>

      <div className="grid gap-4">
        {/* Mock Job 1 */}
        <Card>
          <CardHeader className="pb-3 border-b border-dashed">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  Honda Activa 6G
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">16 Aug 2026</p>
              </div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">COMPLETED</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex gap-4 items-center">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <Wrench className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">General Repair</p>
                <p className="text-sm text-muted-foreground">Ahmed Doe • ₹550.00</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" /> Invoice
              </Button>
              <Button variant="secondary" size="sm">
                Rate Mechanic
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Mock Job 2 */}
        <Card className="opacity-75">
          <CardHeader className="pb-3 border-b border-dashed">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  Honda Activa 6G
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">10 Jan 2026</p>
              </div>
              <Badge variant="outline">CANCELLED</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex gap-4 items-center">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <Wrench className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Battery Replacement</p>
                <p className="text-sm text-muted-foreground">Cancelled by customer</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
