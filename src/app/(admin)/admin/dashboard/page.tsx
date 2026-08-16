import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Users, Wrench, AlertTriangle, TrendingUp } from 'lucide-react'

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome to the Mechly admin panel.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Mechanics</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">+3 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">12 pending assignment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹42,500</div>
            <p className="text-xs text-muted-foreground">+8% from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Mechanic</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-xs">BK-0001</TableCell>
                  <TableCell>John Smith</TableCell>
                  <TableCell><Badge variant="destructive" className="text-[10px] px-1 py-0 h-4">URGENT</Badge></TableCell>
                  <TableCell>Ahmed Doe</TableCell>
                  <TableCell><Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-200">IN_PROGRESS</Badge></TableCell>
                  <TableCell className="text-right">-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-xs">BK-0002</TableCell>
                  <TableCell>Priya R.</TableCell>
                  <TableCell><Badge variant="destructive" className="text-[10px] px-1 py-0 h-4">URGENT</Badge></TableCell>
                  <TableCell>Pending</TableCell>
                  <TableCell><Badge variant="outline" className="text-yellow-600 bg-yellow-50 border-yellow-200">SEARCHING</Badge></TableCell>
                  <TableCell className="text-right">-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-xs">BK-0003</TableCell>
                  <TableCell>Rahul K.</TableCell>
                  <TableCell><Badge variant="outline" className="text-[10px] px-1 py-0 h-4 bg-blue-50 text-blue-700 border-blue-200">SCHEDULED</Badge></TableCell>
                  <TableCell>Vikram S.</TableCell>
                  <TableCell><Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">COMPLETED</Badge></TableCell>
                  <TableCell className="text-right">₹850</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4 border-l-4 border-yellow-500 pl-4 py-1">
              <div>
                <p className="text-sm font-medium">High Demand Alert</p>
                <p className="text-xs text-muted-foreground">Kharghar area experiencing high request volume. 5 jobs unassigned.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 border-l-4 border-red-500 pl-4 py-1">
              <div>
                <p className="text-sm font-medium">Dispute Opened</p>
                <p className="text-xs text-muted-foreground">Job BK-0042 has a customer dispute. Review required.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
