"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AIChat from "@/components/AIChat";
import UserProfile from "@/components/UserProfile";
import { Clock } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MoonIcon, SunIcon, User, BellIcon, SearchIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HomeIcon, SettingsIcon } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";

const data = [
  { name: "Mon", tasks: 4 },
  { name: "Tue", tasks: 3 },
  { name: "Wed", tasks: 5 },
  { name: "Thu", tasks: 2 },
  { name: "Fri", tasks: 6 },
  { name: "Sat", tasks: 1 },
  { name: "Sun", tasks: 3 },
];



export default function Dashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showNotificationsModal, setShowNotificationsModal] = useState(false)
  const [coins, setCoins] = useState(100)


  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background max-w-4xl mx-auto">
        <header className="border-b">
          <div className="container mx-auto py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Image src="/favicon.png" alt="logo" height={32} width={32}/>
              Link Up
              </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input className="pl-8" placeholder="Search..." />
              </div>
              <Button variant="ghost" size="icon">
                <BellIcon className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </header>
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardHeader>
              <CardTitle className="text-2xl">Welcome back, John!</CardTitle>
            </CardHeader>
            <CardContent>
              <p>You have 3 tasks due today and 2 upcoming events.</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Today's Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    {
                      time: "10:00 AM",
                      event: "Team Meeting",
                      color: "bg-blue-500",
                    },
                    {
                      time: "2:00 PM",
                      event: "Client Call",
                      color: "bg-green-500",
                    },
                    {
                      time: "4:30 PM",
                      event: "Project Review",
                      color: "bg-yellow-500",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${item.color}`}
                      ></div>
                      <span className="font-medium text-sm text-muted-foreground">
                        {item.time}
                      </span>
                      <span className="text-sm">{item.event}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Today's Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    {
                      task: "Complete project proposal",
                      status: "In Progress",
                    },
                    { task: "Review team performance", status: "Not Started" },
                    { task: "Prepare for client meeting", status: "Done" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={item.status === "Done"}
                        />
                        <span className="text-sm">{item.task}</span>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          item.status === "Done"
                            ? "bg-green-100 text-green-800"
                            : item.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 flex justify-center">
          <nav className="bg-gray-100 m-4 flex w-min rounded-md border border-slate-400 p-1">
            <NavItem icon={<HomeIcon />} label="Home" />
            <NavItem icon={<SearchIcon />} label="Search" />
            <NavItem icon={<User />} label="Profile" />
            <NavItem icon={<SettingsIcon />} label="Settings" />
          </nav>
        </div>
      </div>
    </TooltipProvider>
  );
}

function NavItem({ icon, label }: { icon: JSX.Element; label: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="text-black p-4 hover:bg-slate-200"
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>{label}</span>
      </TooltipContent>
    </Tooltip>
  );
}
