"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Send, StopCircle, Mic } from "lucide-react";

interface Message {
  text: string;
  sender: 'user' | 'bot'; 
}

export default function AIChatView() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    setMessages([...messages, { text: inputMessage, sender: 'user' }]);
    setInputMessage('');
  };

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-6rem)]">
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4 max-w-3xl mx-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'ml-auto bg-primary text-primary-foreground max-w-[80%]'
                    : 'bg-muted max-w-[80%]'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
        </div>
        <div className="p-4">
          <div className="flex gap-2 max-w-3xl mx-auto">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsRecording(!isRecording)}
            >
              {isRecording ? <StopCircle className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}