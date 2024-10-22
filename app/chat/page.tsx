"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mic, Send } from 'lucide-react'

interface AIChatViewProps {
  onTabChange: (tab: string) => void
}

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

export default function AIChatView({ onTabChange }: AIChatViewProps) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, text: "Hello! How can I assist you today?", sender: 'ai' },
  ])
  const [currentMessage, setCurrentMessage] = useState<string>('')
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const chatEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  const sendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage: ChatMessage = { id: Date.now(), text: currentMessage, sender: 'user' }
      setChatMessages([...chatMessages, newMessage])
      setCurrentMessage('')
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: ChatMessage = { id: Date.now(), text: "I'm processing your request. Please wait.", sender: 'ai' }
        setChatMessages(prev => [...prev, aiResponse])
      }, 1000)
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      // Simulate voice input
      setTimeout(() => {
        setChatMessages([...chatMessages, { id: Date.now(), text: "This is a simulated voice input.", sender: 'user' }])
        setIsRecording(false)
      }, 3000)
    }
  }

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col">
      <ScrollArea className="flex-grow mb-4 p-4">
        {chatMessages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`rounded-lg p-3 max-w-[80%] ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </ScrollArea>
      <div className="flex space-x-2 p-4">
        <Input
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button onClick={toggleRecording} variant="outline" size="icon" className={isRecording ? 'bg-red-500 text-white' : ''}>
          <Mic className="h-4 w-4" />
        </Button>
        <Button onClick={sendMessage}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}