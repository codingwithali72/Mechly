import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Star, User } from 'lucide-react'
import Link from 'next/link'

export default function RatingPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-4 md:p-8 md:max-w-2xl md:mx-auto space-y-6">
      
      <Card className="text-center py-6">
        <CardHeader>
          <div className="mx-auto h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <User className="h-10 w-10 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Rate your experience</CardTitle>
          <CardDescription className="text-base mt-2">
            How was the service provided by <strong>Ahmed Doe</strong>?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} className="text-muted-foreground hover:text-yellow-400 focus:outline-none transition-colors">
                <Star className="h-12 w-12" fill={star <= 4 ? "currentColor" : "none"} color={star <= 4 ? "#facc15" : "currentColor"} />
              </button>
            ))}
          </div>
          
          <p className="text-lg font-medium text-yellow-600">Great!</p>

          <div className="pt-4 text-left">
            <Textarea 
              placeholder="Leave a comment (optional)..." 
              className="min-h-[100px]"
            />
          </div>

        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Link href="/history" className={buttonVariants({ size: "lg" }) + " w-full text-lg"}>Submit Rating</Link>
          <Link href="/history" className={buttonVariants({ variant: "ghost" })}>Skip for now</Link>
        </CardFooter>
      </Card>
      
    </div>
  )
}
