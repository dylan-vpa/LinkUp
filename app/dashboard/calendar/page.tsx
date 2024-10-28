"use client";

//React & Next
import { useState } from "react";
import { format, startOfWeek, addDays, isSameDay, parseISO } from "date-fns";

//Components
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";

//Utils
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Event } from "@/lib/utils/interfaces";

//Data
const timeSlots = Array.from({ length: 18 }, (_, i) => i + 6);

const events: Event[] = [
  {
    id: 1,
    title: "Team Meeting",
    start: "2024-10-24T10:00",
    end: "2024-10-24T11:00",
    color: "bg-blue-100 dark:bg-blue-800",
  },
  {
    id: 2,
    title: "Client Call",
    start: "2024-10-24T14:00",
    end: "2024-10-24T15:00",
    color: "bg-green-100 dark:bg-green-800",
  },
  {
    id: 3,
    title: "Project Review",
    start: "2024-10-24T16:30",
    end: "2024-10-24T17:30",
    color: "bg-yellow-100 dark:bg-yellow-800",
  },
];
export default function CalendarView() {
  //States
  const [currentDate, setCurrentDate] = useState(new Date(2024, 9, 21));
  const startDate = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const getEventForDateAndTime = (
    date: Date,
    hour: number
  ): Event | undefined => {
    return events.find(
      (event) =>
        isSameDay(parseISO(event.start), date) &&
        parseISO(event.start).getHours() === hour
    );
  };

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentDate((date) => addDays(date, -7))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentDate((date) => addDays(date, 7))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-2 overflow-x-auto">
        <div className="sticky left-0 bg-white dark:bg-gray-800 z-10">
          <div className="h-10"></div>
          {timeSlots.map((hour) => (
            <div
              key={hour}
              className="h-20 border-t flex items-center justify-center"
            >
              <span className="text-sm text-gray-500">
                {hour % 12 || 12}
                {hour >= 12 ? "PM" : "AM"}
              </span>
            </div>
          ))}
        </div>
        {weekDays.map((day, dayIndex) => (
          <div key={dayIndex} className="flex-1 min-w-[100px]">
            <div className="h-10 flex items-center justify-center font-medium">
              {format(day, "EEE")}
              <span className="ml-1 text-sm text-gray-500">
                {format(day, "d")}
              </span>
            </div>
            {timeSlots.map((hour) => {
              const event = getEventForDateAndTime(day, hour);
              return (
                <div
                  key={`${dayIndex}-${hour}`}
                  className="h-20 border-t relative"
                >
                  {event && (
                    <Card className="absolute inset-x-1 top-1 h-18 bg-blue-100 dark:bg-blue-900 overflow-hidden">
                      <CardContent className="p-2">
                        <p className="text-xs font-medium truncate">
                          {event.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {format(event.start, "h:mm a")} -{" "}
                          {format(event.end, "h:mm a")}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </Layout>
  );
}
