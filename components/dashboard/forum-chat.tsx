"use client"

import { useState, useEffect, useRef } from "react"
import useSWR from "swr"
import { MessageCircle, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getForum, postForum, type ForumMessage } from "@/lib/api"
import { useAuthStore } from "@/lib/auth-store"
import { UserAvatar, UserDisplayName } from "./user-avatar"

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
  const sortedMessages = [...messages].reverse()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
    }, 50)
    return () => clearTimeout(timer)
  }, [sortedMessages.length])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !userId || isSending) return

    setIsSending(true)
    const res = await postForum(userId, "General", message.trim())

    if (res.success) {
      setMessage("")
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

  const formatDateLabel = (timeString: string) => {
    try {
      const date = new Date(timeString)
      const today = new Date()
      const yesterday = new Date()
      yesterday.setDate(today.getDate() - 1)

      const isToday = date.toDateString() === today.toDateString()
      const isYesterday = date.toDateString() === yesterday.toDateString()

      if (isToday) return "Hari ini"
      if (isYesterday) return "Kemarin"

      return date.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    } catch {
      return ""
    }
  }

  const isSameDay = (a: string, b: string) => {
    try {
      return new Date(a).toDateString() === new Date(b).toDateString()
    } catch {
      return false
    }
  }

  return (
    <Card className="h-full bg-card border-border flex flex-col overflow-hidden">
      <CardHeader className="pb-3 flex-shrink-0">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <MessageCircle className="h-5 w-5 text-primary" />
          Community Chat
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0 overflow-hidden">

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto pr-4 min-h-0"
        >
          <div className="space-y-3 pb-2">
            {sortedMessages.length === 0 ? (
              <p className="text-center text-muted-foreground py-8 text-sm">
                No messages yet. Start the conversation!
              </p>
            ) : (
              sortedMessages.map((msg, index) => {
                const isSelf = msg.user_id === userId
                const showDateSeparator =
                  index === 0 || !isSameDay(sortedMessages[index - 1].time, msg.time)

                return (
                  <div key={`${msg.user_id}-${msg.time}-${index}`}>

                    {showDateSeparator && (
                      <div className="flex items-center gap-3 my-4">
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-xs text-muted-foreground px-2 whitespace-nowrap">
                          {formatDateLabel(msg.time)}
                        </span>
                        <div className="flex-1 h-px bg-border" />
                      </div>
                    )}

                    <div className={`flex gap-2 ${isSelf ? 'flex-row-reverse' : ''}`}>
                      <UserAvatar userId={msg.user_id} />
                      <div className={`max-w-[75%] flex flex-col ${isSelf ? 'items-end' : 'items-start'}`}>
                        <div
                          className={`px-3 py-2 rounded-lg text-sm ${
                            isSelf
                              ? 'bg-primary text-primary-foreground rounded-br-none'
                              : 'bg-secondary text-foreground rounded-bl-none'
                          }`}
                        >
                          {!isSelf && (
                            <p className="text-xs font-medium mb-0.5 opacity-70">
                              <UserDisplayName userId={msg.user_id} />
                            </p>
                          )}
                          <p>{msg.chat_body}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 px-1">
                          {formatTime(msg.time)}
                        </p>
                      </div>
                    </div>

                  </div>
                )
              })
            )}
          </div>
        </div>

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