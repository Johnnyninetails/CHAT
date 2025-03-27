'use client'

import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useChat } from 'ai/react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Textarea } from '../components/ui/textarea'
import { Send, Bot, User, Sparkles } from 'lucide-react'

export default function ChatbotUI() {
  const searchParams = useSearchParams()
  const promptKey = searchParams.get('prompt') || 'default'

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    body: { systemPromptKey: promptKey }
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={\`flex flex-col h-screen \${theme === 'dark' ? 'dark' : ''}\`}>
      <Card className="flex flex-col h-full border-0 rounded-none bg-background">
        <CardHeader className="border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              <Bot className="mr-2 h-5 w-5" />
              Chatbot UI
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center space-y-3">
                <Bot className="mx-auto h-12 w-12 text-primary/60" />
                <p className="text-sm text-muted-foreground">
                  Start a conversation with the AI assistant.
                </p>
              </div>
            </div>
          ) : (
            messages.map(message => (
              <div key={message.id} className={\`flex \${message.role === 'user' ? 'justify-end' : 'justify-start'}\`}>
                <div className={\`flex items-start gap-2 max-w-[80%] \${message.role === 'user' ? 'flex-row-reverse' : ''}\`}>
                  <div className={\`flex h-8 w-8 items-center justify-center rounded-md border \${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}\`}>
                    {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={\`rounded-lg px-3 py-2 text-sm \${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}\`}>
                    {message.content}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </CardContent>
        <CardFooter className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <Input value={input} onChange={handleInputChange} placeholder="Type your message..." className="flex-1" disabled={isLoading} />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
