import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Wallet, TrendingUp, IndianRupee } from 'lucide-react'

export default function MechanicEarningsPage() {
  return (
    <div className="p-4 md:p-8 md:max-w-4xl md:mx-auto space-y-6">
      
      <h1 className="text-2xl font-bold tracking-tight">Earnings & Ledger</h1>

      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm font-medium text-primary-foreground/80">Net Earnings (This Week)</p>
                <p className="text-3xl font-bold">₹4,250</p>
              </div>
              <Wallet className="h-8 w-8 opacity-75" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Platform Commission (10%)</p>
                <p className="text-2xl font-bold text-destructive">-₹425</p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Pending Payout</p>
                <p className="text-2xl font-bold text-green-600">₹3,825</p>
              </div>
              <IndianRupee className="h-8 w-8 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ledger Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Job ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Commission</TableHead>
                  <TableHead className="text-right">Net</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Mock Row 1 */}
                <TableRow>
                  <TableCell>Today, 6:30 PM</TableCell>
                  <TableCell className="font-mono text-xs">BOOK-20260816-0001</TableCell>
                  <TableCell><Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">CREDIT</Badge></TableCell>
                  <TableCell className="text-right">₹550.00</TableCell>
                  <TableCell className="text-right text-destructive">-₹55.00</TableCell>
                  <TableCell className="text-right font-bold">₹495.00</TableCell>
                </TableRow>
                {/* Mock Row 2 */}
                <TableRow>
                  <TableCell>Yesterday</TableCell>
                  <TableCell className="font-mono text-xs">BOOK-20260815-0042</TableCell>
                  <TableCell><Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">CREDIT</Badge></TableCell>
                  <TableCell className="text-right">₹1,200.00</TableCell>
                  <TableCell className="text-right text-destructive">-₹120.00</TableCell>
                  <TableCell className="text-right font-bold">₹1,080.00</TableCell>
                </TableRow>
                {/* Mock Row 3 */}
                <TableRow>
                  <TableCell>14 Aug 2026</TableCell>
                  <TableCell className="font-mono text-xs">PAYOUT-WEEK-32</TableCell>
                  <TableCell><Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">PAYOUT</Badge></TableCell>
                  <TableCell className="text-right">-</TableCell>
                  <TableCell className="text-right">-</TableCell>
                  <TableCell className="text-right font-bold text-blue-600">-₹5,200.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
