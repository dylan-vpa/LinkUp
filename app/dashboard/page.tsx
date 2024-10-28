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
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-semibold">Daily Calendar</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={() => setCurrentDate(date => addDays(date, -1))}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="font-medium">{format(currentDate, 'MMMM d, yyyy')}</span>
                    <Button variant="outline" size="icon" onClick={() => setCurrentDate(date => addDays(date, 1))}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-[auto,1fr] gap-4">
                    {timeSlots.map(hour => (
                      <React.Fragment key={hour}>
                        <div className="text-sm text-gray-500 pr-2 py-2">
                          {hour % 12 || 12}{hour >= 12 ? 'PM' : 'AM'}
                        </div>
                        <div className="border-t py-2 relative">
                          {getEventForDateAndTime(currentDate, hour) && (
                            <Card className={`absolute inset-x-0 ${getEventForDateAndTime(currentDate, hour).color} shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02]`}>
                              <CardContent className="p-2">
                                <h3 className="font-semibold">{getEventForDateAndTime(currentDate, hour).title}</h3>
                                <p className="text-xs text-gray-600 dark:text-gray-300">
                                  {format(parseISO(getEventForDateAndTime(currentDate, hour).start), 'h:mm a')} - 
                                  {format(parseISO(getEventForDateAndTime(currentDate, hour).end), 'h:mm a')}
                                </p>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </CardContent>
              </Card>
              {/* Task's Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-semibold">Today's Tasks</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="grid-view" className="sr-only">Toggle grid view</Label>
                    <span className="hidden md:inline-block">
                      {<List className="h-4 w-4" />}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`space-y-4`}>
                    {tasks.map((item, index) => (
                      <Card key={index} className="transition-all duration-200 hover:shadow-md">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-lg">{item.title}</h3>
                            <span
                              className={`text-xs px-2 py-1 rounded-full transition-colors ${
                                item.status === "Done"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                  : item.status === "In Progress"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.description}</p>
                          <div className="flex items-center">
                            <Progress value={item.progress} className="flex-grow mr-2" />
                            <span className="text-sm font-medium">{item.progress}%</span>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center space-x-2">
                              {item.status === "Done" && <CheckCircle2 className="text-green-500 h-4 w-4" />}
                              {item.status === "In Progress" && <Clock className="text-yellow-500 h-4 w-4" />}
                              {item.status === "Not Started" && <AlertCircle className="text-gray-500 h-4 w-4" />}
                              <span className="text-sm text-gray-500">{item.status}</span>
                            </div>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
        </section>
      </main>
    </Layout>
  );
}