"use client"

import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, Moon, Sun, Calendar, Clock, Bell } from "lucide-react";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [breakPreference, setBreakPreference] = useState("hourly");
  
  return (
    <Layout>
      <main className="flex-col space-y-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-2 w-[400px] mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/api/placeholder/150/150" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline">Change Photo</Button>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john@example.com" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue="Project Manager" />
                  </div>
                </div>

                <Button className="w-full">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Theme</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Switch between light and dark mode
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sun className="h-4 w-4" />
                      <Switch
                        checked={darkMode}
                        onCheckedChange={setDarkMode}
                      />
                      <Moon className="h-4 w-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Break Time Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Break Reminder</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Get notifications for scheduled breaks
                        </p>
                      </div>
                      <Switch
                        checked={notifications}
                        onCheckedChange={setNotifications}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Break Frequency</Label>
                      <Select defaultValue={breakPreference} onValueChange={setBreakPreference}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select break frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Every Hour</SelectItem>
                          <SelectItem value="custom">Custom Schedule</SelectItem>
                          <SelectItem value="pomodoro">Pomodoro (25/5)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {breakPreference === "custom" && (
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label>Break Duration (minutes)</Label>
                          <Input type="number" defaultValue="15" min="5" max="60" />
                        </div>
                        <div className="grid gap-2">
                          <Label>Work Duration (minutes)</Label>
                          <Input type="number" defaultValue="45" min="25" max="120" />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Time Off Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <Label className="text-base">Weekly Day Off</Label>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Select your preferred day off
                        </p>
                      </div>
                      <Select defaultValue="sunday">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sunday">Sunday</SelectItem>
                          <SelectItem value="saturday">Saturday</SelectItem>
                          <SelectItem value="monday">Monday</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <Label className="text-base">Work Hours</Label>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Set your daily working hours
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Select defaultValue="9">
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Start" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => i + 6).map((hour) => (
                              <SelectItem key={hour} value={hour.toString()}>
                                {hour}:00
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span>to</span>
                        <Select defaultValue="17">
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="End" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => i + 12).map((hour) => (
                              <SelectItem key={hour} value={hour.toString()}>
                                {hour}:00
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <Bell className="w-4 h-4" />
                        <Label className="text-base">Task Reminders</Label>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receive notifications for upcoming tasks
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-4">
                <Button variant="outline">Cancel</Button>
                <Button>Save All Settings</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </Layout>
  );
};

export default SettingsPage;