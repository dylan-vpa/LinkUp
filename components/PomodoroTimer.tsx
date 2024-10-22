"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type PomodoroSession = {
  date: string;
  duration: number;
};

const mockSessions: PomodoroSession[] = [
  { date: '2023-05-01', duration: 25 },
  { date: '2023-05-02', duration: 30 },
  { date: '2023-05-03', duration: 20 },
  { date: '2023-05-04', duration: 35 },
  { date: '2023-05-05', duration: 25 },
];

export default function PomodoroTimer() {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [sessions, setSessions] = useState<PomodoroSession[]>(mockSessions);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      if (soundEnabled) {
        playSound();
      }
      if (isBreak) {
        setTime(workDuration * 60);
        setIsBreak(false);
      } else {
        setTime(breakDuration * 60);
        setIsBreak(true);
        addSession();
      }
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, isBreak, workDuration, breakDuration, soundEnabled]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTime(workDuration * 60);
    setIsActive(false);
    setIsBreak(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isBreak
    ? ((breakDuration * 60 - time) / (breakDuration * 60)) * 100
    : ((workDuration * 60 - time) / (workDuration * 60)) * 100;

  const addSession = () => {
    const newSession = {
      date: new Date().toISOString().split('T')[0],
      duration: workDuration,
    };
    setSessions([...sessions, newSession]);
  };

  const playSound = () => {
    const audio = new Audio('/notification.mp3');
    audio.play();
  };

  return (
    <Tabs defaultValue="timer">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="timer">Timer</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="timer">
        <div className="space-y-4">
          <div className="text-4xl font-bold text-center">{formatTime(time)}</div>
          <Progress value={progress} className="w-full" />
          <div className="flex justify-center space-x-2">
            <Button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</Button>
            <Button onClick={resetTimer} variant="outline">Reset</Button>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="space-y-4">
          <div>
            <Label>Work Duration (minutes)</Label>
            <Slider
              value={[workDuration]}
              onValueChange={(value) => setWorkDuration(value[0])}
              max={60}
              step={1}
            />
          </div>
          <div>
            <Label>Break Duration (minutes)</Label>
            <Slider
              value={[breakDuration]}
              onValueChange={(value) => setBreakDuration(value[0])}
              max={30}
              step={1}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="sound-notifications"
              checked={soundEnabled}
              onCheckedChange={setSoundEnabled}
            />
            <Label htmlFor="sound-notifications">Sound Notifications</Label>
          </div>
        </div>
      </TabsContent>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Session History</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={sessions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="duration" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Tabs>
  );
}