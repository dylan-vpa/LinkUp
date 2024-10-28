"use client"

//React & Next
import React, { useState } from "react";
import { format, addDays, isSameDay, parseISO } from 'date-fns'

//Components
import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";

//Utils
import { ChevronLeft, ChevronRight, List, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { Event, Task } from "@/lib/utils/interfaces";

//Data
const timeSlots = Array.from({ length: 18 }, (_, i) => i + 6)

const events: Event[] = [
  { id: 1, title: 'Team Meeting', start: '2024-10-24T10:00', end: '2024-10-24T11:00', color: 'bg-blue-100 dark:bg-blue-800' },
  { id: 2, title: 'Client Call', start: '2024-10-24T14:00', end: '2024-10-24T15:00', color: 'bg-green-100 dark:bg-green-800' },
  { id: 3, title: 'Project Review', start: '2024-10-24T16:30', end: '2024-10-24T17:30', color: 'bg-yellow-100 dark:bg-yellow-800' },
]

const tasks: Task[] = [
  { id: 1, title: "Complete project proposal", status: "In Progress", description: "Finish the draft and send for review", progress: 75 },
  { id: 2, title: "Review team performance", status: "Not Started", description: "Prepare feedback for quarterly review", progress: 0 },
  { id: 3, title: "Prepare for client meeting", status: "Done", description: "Gather all necessary documents and presentations", progress: 100 },
  { id: 4, title: "Update website content", status: "In Progress", description: "Refresh the 'About Us' and 'Services' pages", progress: 50 },
]

export default function Dashboard() {

  //States
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2024, 9, 28)) 

  const getEventForDateAndTime = (date: Date, hour: number): Event | undefined => {
    return events.find(event => 
      isSameDay(parseISO(event.start), date) && 
      parseISO(event.start).getHours() === hour
    )
  }

  return (
    <Layout>
      <main className="flex-col space-y-8 mx-auto">
        {/* Header's Card */}
        <header>
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white overflow-hidden">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Welcome back, John!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                You have 3 tasks due today and 2 upcoming events.
              </p>
            </CardContent>
            <div className="absolute bottom-0 right-0 opacity-10">
              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M45.11-4.24c9.58-6.45,25.15,2.7,35.54,18.98,10.39,16.28,15.16,39.71,5.61,55.22-9.55,15.51-33.43,23.09-53.3,18.95-19.87-4.14-35.74-20-38.51-38.24-2.77-18.24,7.55-38.86,20.78-45.31C28.46-0.09,35.53-10.69,45.11-4.24Z"
                />
              </svg>
            </div>
          </Card>
        </header>
        {/* Event's Card */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
          <CardHeader className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Today's Events</h2>
            </CardHeader>
            <CardContent>
              {timeSlots.map(hour => {
                const event = getEventForDateAndTime(currentDate, hour);
                return (
                  <div key={hour} className="relative">
                    {event ? (
                      <Card className={`absolute inset-x-0 ${event.color} shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02]`}>
                        <CardContent className="p-2">
                          <h3 className="font-semibold">{event.title}</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            {format(parseISO(event.start), 'h:mm a')} - 
                            {format(parseISO(event.end), 'h:mm a')}
                          </p>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="h-12 border-b border-gray-300"></div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </section>
        {/* Tasks Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Your Tasks</h2>
            </CardHeader>
            <CardContent>
              {tasks.map(task => (
                <div key={task.id} className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{task.description}</p>
                  </div>
                  <div className="flex items-center">
                    <Progress value={task.progress} max={100} className="w-32" />
                    <span className="ml-2">{task.status}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
    </Layout>
  );
}