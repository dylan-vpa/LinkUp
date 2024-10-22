'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mic, Send } from 'lucide-react'

interface AIChatViewProps {
  onTabChange: (tab: string) => void
}

interface ChatMessage {
  text: string;
  sender: 'user' | 'ai';
}

export default function AIChatView({ onTabChange }: AIChatViewProps) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [currentMessage, setCurrentMessage] = useState<string>('')
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const chatEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  const sendMessage = () => {
    if (currentMessage.trim()) {
      setChatMessages([...chatMessages, { text: currentMessage, sender: 'user' }])
      setCurrentMessage('')
      setTimeout(() => {
        setChatMessages(prev => [...prev, { text: "I'm an AI assistant. How can I help you?", sender: 'ai' }])
      }, 1000)
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      setTimeout(() => {
        setChatMessages([...chatMessages, { text: "This is a simulated voice input.", sender: 'user' }])
        setIsRecording(false)
      }, 3000)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow overflow-hidden p-4 pt-20 pb-20 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto h-full flex flex-col-reverse">
          <div className="flex items-center mt-4">
            <Input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow mr-2"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button onClick={toggleRecording} variant="outline" size="icon" className={isRecording ? 'bg-red-500 text-white' : ''}>
              <Mic className="h-4 w-4" />
            </Button>
            <Button onClick={sendMessage} className="ml-2">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="flex-grow pr-4">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`rounded-lg p-3 max-w-[80%] ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-800'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </ScrollArea>
        </div>
      </main>
    </div>
  )
}