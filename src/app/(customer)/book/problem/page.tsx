import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ProblemForm } from './ProblemForm'

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
            <ProblemForm />
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Link href="/home" className={buttonVariants({ variant: "outline" })}>Back</Link>
            <Button type="submit" className="px-8">Continue</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
