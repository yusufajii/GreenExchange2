"use client"

import { useState, useEffect, useRef } from "react"
import useSWR from "swr"
import { MessageCircle, Send, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getForum, postForum, type ForumMessage } from "@/lib/api"
import { useAuthStore } from "@/lib/auth-store"

interface ForumChatProps {
  initialMessages?: ForumMessage[]
}

export function ForumChat({ initialMessages = [] }: ForumChatProps) {
  const { userId } = useAuthStore()
  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const { data: forumData, mutate } = useSWR(
    'forum',
    () => getForum(),
    { 
      refreshInterval: 5000,
      fallbackData: { success: true, data: initialMessages }
    }
  )

  const messages = forumData?.data || initialMessages

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !userId || isSending) return

    setIsSending(true)
    const res = await postForum(userId, "General", message.trim())
    
    if (res.success) {
      setMessage("")
      // Optimistically add the message and refresh
      mutate()
    }
    setIsSending(false)
  }

  const formatTime = (timeString: string) => {
    try {
      const date = new Date(timeString)
      return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    } catch {
      return ""
    }
  }

  return (
    <Card className="h-full bg-card border-border flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <MessageCircle className="h-5 w-5 text-primary" />
          Community Chat
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
          <div className="space-y-3 pb-2">
            {messages.length === 0 ? (
              <p className="text-center text-muted-foreground py-8 text-sm">No messages yet. Start the conversation!</p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={`${msg.user_id}-${msg.time}-${index}`}
                  className={`flex gap-2 ${msg.user_id === userId ? 'flex-row-reverse' : ''}`}
                >
                  <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <div className={`max-w-[75%] ${msg.user_id === userId ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`px-3 py-2 rounded-lg text-sm ${
                        msg.user_id === userId
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-secondary text-foreground rounded-bl-none'
                      }`}
                    >
                      {msg.user_id !== userId && (
                        <p className="text-xs font-medium mb-0.5 opacity-70">{msg.user_id}</p>
                      )}
                      <p>{msg.chat_body}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 px-1">{formatTime(msg.time)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
        
        <form onSubmit={handleSend} className="flex gap-2 mt-3 pt-3 border-t border-border flex-shrink-0">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-input border-border"
            disabled={isSending || !userId}
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={isSending || !message.trim() || !userId}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
