'use client'

import { useState } from 'react'
import { format, startOfWeek, addDays, isSameDay } from 'date-fns'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const timeSlots = Array.from({ length: 18 }, (_, i) => i + 6) // 6 AM to 11 PM

const events = [
  { id: 1, title: 'Team Meeting', start: new Date(2024, 9, 21, 10, 0), end: new Date(2024, 9, 21, 11, 0) },
  { id: 2, title: 'Client Call', start: new Date(2024, 9, 22, 14, 0), end: new Date(2024, 9, 22, 15, 0) },
  { id: 3, title: 'Project Review', start: new Date(2024, 9, 23, 16, 30), end: new Date(2024, 9, 23, 17, 30) },
]

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 9, 21)) // October 21, 2024

  const startDate = startOfWeek(currentDate, { weekStartsOn: 0 })

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i))

  const getEventForDateAndTime = (date, hour) => {
    return events.find(event => 
      isSameDay(event.start, date) && 
      event.start.getHours() === hour
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{format(currentDate, 'MMMM yyyy')}</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={() => setCurrentDate(date => addDays(date, -7))}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setCurrentDate(date => addDays(date, 7))}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-2 overflow-x-auto">
        <div className="sticky left-0 bg-white dark:bg-gray-800 z-10">
          <div className="h-10"></div> {/* Empty cell for alignment */}
          {timeSlots.map(hour => (
            <div key={hour} className="h-20 border-t flex items-center justify-center">
              <span className="text-sm text-gray-500">{hour % 12 || 12}{hour >= 12 ? 'PM' : 'AM'}</span>
            </div>
          ))}
        </div>
        {weekDays.map((day, dayIndex) => (
          <div key={dayIndex} className="flex-1 min-w-[100px]">
            <div className="h-10 flex items-center justify-center font-medium">
              {format(day, 'EEE')}
              <span className="ml-1 text-sm text-gray-500">{format(day, 'd')}</span>
            </div>
            {timeSlots.map(hour => {
              const event = getEventForDateAndTime(day, hour)
              return (
                <div key={`${dayIndex}-${hour}`} className="h-20 border-t relative">
                  {event && (
                    <Card className="absolute inset-x-1 top-1 h-18 bg-blue-100 dark:bg-blue-900 overflow-hidden">
                      <CardContent className="p-2">
                        <p className="text-xs font-medium truncate">{event.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}