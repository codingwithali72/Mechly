'use client'

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Bot } from 'lucide-react'

export default function AISupportChatPage() {
  return (
    <div className="p-4 md:p-8 md:max-w-2xl md:mx-auto space-y-6 h-[calc(100vh-140px)] flex flex-col">
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="border-b bg-muted/30 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            Mechly AI Support
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
          
          <div className="flex justify-start">
            <div className="bg-muted text-foreground p-3 rounded-2xl rounded-tl-none max-w-[80%]">
              Hello! I'm Mechly's AI assistant. How can I help you today?
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-primary text-primary-foreground p-3 rounded-2xl rounded-tr-none max-w-[80%]">
              I had a question about my recent booking BK-0003. The mechanic hasn't arrived.
            </div>
          </div>

          <div className="flex justify-start">
            <div className="bg-muted text-foreground p-3 rounded-2xl rounded-tl-none max-w-[80%]">
              I apologize for the delay. Looking at booking BK-0003, the mechanic Vikram S. is currently 5 minutes away and is stuck in traffic. Would you like me to connect you to him directly?
            </div>
          </div>

        </CardContent>
        <CardFooter className="border-t p-3 bg-card">
          <form className="flex w-full gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input placeholder="Type your message..." className="flex-1 rounded-full bg-muted/50" />
            <Button size="icon" type="submit" className="rounded-full shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
