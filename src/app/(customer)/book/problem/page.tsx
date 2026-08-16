import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

const COMMON_PROBLEMS = [
  "Bike won't start",
  "Strange noise",
  "Battery dead",
  "Flat tyre",
  "Brake issue",
  "Other"
]

export default async function ProblemDescriptionPage({ searchParams }: { searchParams: Promise<{ mode?: string, service?: string }> }) {
  const { mode, service } = await searchParams
  const modeParam = mode || 'scheduled'
  return (
    <div className="p-4 md:p-8 md:max-w-2xl md:mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
            <span>Step 1 of 4</span>
          </div>
          <CardTitle className="text-xl font-bold">What's the issue?</CardTitle>
          <CardDescription>
            Describe the problem or select from common issues below. Our AI will help classify it.
          </CardDescription>
        </CardHeader>
        <form action="/book/location" method="GET">
          <input type="hidden" name="mode" value={modeParam} />
          {service && <input type="hidden" name="service" value={service} />}
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Textarea 
                name="problem_description"
                placeholder="E.g. My Activa starts but switches off after a few minutes..."
                className="min-h-[120px]"
              />
              
              <div>
                <h3 className="text-sm font-medium mb-3">Common Problems</h3>
                <div className="flex flex-wrap gap-2">
                  {COMMON_PROBLEMS.map((problem) => (
                    <Badge 
                      key={problem} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground py-1.5 px-3"
                    >
                      {problem}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Mock AI Triage Box (hidden initially, shown on interaction in real app) */}
            <div className="bg-blue-50 text-blue-900 p-4 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✨</span>
                <div>
                  <p className="font-semibold text-sm">AI Assistant</p>
                  <p className="text-sm mt-1">Looks like an Engine or Electrical issue. We recommend a general mechanic.</p>
                </div>
              </div>
            </div>

          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Link href="/home" className={buttonVariants({ variant: "ghost" })}>Cancel</Link>
            <Button type="submit">Continue</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
