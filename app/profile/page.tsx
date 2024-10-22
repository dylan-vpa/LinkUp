'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

interface ProfileViewProps {
  coins: number
  onTabChange: (tab: string) => void
}

export default function ProfileView({ coins, onTabChange }: ProfileViewProps) {
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john.doe@example.com')

  const userStats = {
    tasksCompleted: 42,
    eventsAttended: 12,
    pomodoroSessions: 56,
    productivityScore: 85,
    level: 7,
    xp: 3500,
    xpToNextLevel: 5000,
    skills: {
      focus: 4,
      productivity: 3,
      timeManagement: 4,
      planning: 5,
      consistency: 3,
      adaptability: 4
    }
  }

  const badges = [
    { id: 1, name: 'Early Bird', icon: '🌅' },
    { id: 2, name: 'Task Master', icon: '✅' },
    { id: 3, name: 'Pomodoro Pro', icon: '🍅' },
    { id: 4, name: 'Team Player', icon: '🤝' },
  ]

  const SkillChart = ({ skills } : {skills : typeof userStats.skills }) => {
    const maxValue = 5;
    const angleStep = (Math.PI * 2) / Object.keys(skills).length;

    const points = Object.entries(skills).map(([key, value], index) => {
      const angle = angleStep * index - Math.PI / 2;
      const radius = (value / maxValue) * 100;
      return `${Math.cos(angle) * radius},${Math.sin(angle) * radius}`;
    }).join(' ');

    return (
      <div className="relative w-full h-64">
        <svg viewBox="-100 -100 200 200" className="w-full h-full">
          {[1, 2, 3, 4, 5].map((level) => (
            <polygon
              key={level}
              points={Object.keys(skills).map((_, index) => {
                const angle = angleStep * index - Math.PI / 2;
                const radius = (level / maxValue) * 100;
                return `${Math.cos(angle) * radius},${Math.sin(angle) * radius}`;
              }).join(' ')}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          <polygon points={points} fill="rgba(59, 130, 246, 0.5)" stroke="#3b82f6" strokeWidth="2" />
          {Object.keys(skills).map((skill, index) => {
            const angle = angleStep * index - Math.PI / 2;
            return (
              <g key={skill}>
                <line
                  x1="0"
                  y1="0"
                  x2={Math.cos(angle) * 100}
                  y2={Math.sin(angle) * 100}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
                <text
                  x={Math.cos(angle) * 120}
                  y={Math.sin(angle) * 120}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="12"
                  fill="#4b5563"
                >
                  {skill}
                </text>
              </g>
            );
          })}
        </svg>
        {Object.entries(skills).map(([skill, value], index) => {
          const angle = angleStep * index - Math.PI / 2;
          const radius = ((value / maxValue) * 100) - 15;
          return (
            <div
              key={skill}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow px-2 py-1 text-xs font-semibold"
              style={{
                left: `${50 + Math.cos(angle) * radius}%`,
                top: `${50 + Math.sin(angle) * radius}%`,
              }}
            >
              {value}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow overflow-auto p-4 pt-20 pb-20 bg-gray-100 dark:bg-gray-900">
        <div className="space-y-6 pb-16">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account details and public profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="Profile picture" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">{name}</h3>
                  <p className="text-sm text-gray-500">{email}</p>
                  <Button variant="outline" size="sm" className="mt-2">Change Picture</Button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <Button className="w-full sm:w-auto">Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Level</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center space-x-4">
              <div className="relative">
                <svg className="w-24 h-24">
                  <circle
                    className="text-gray-300"
                    strokeWidth="5"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-primary"
                    strokeWidth="5"
                    strokeDasharray={2 * Math.PI * 45}
                    strokeDashoffset={2 * Math.PI * 45 * (1 - userStats.xp / userStats.xpToNextLevel)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
                  {userStats.level}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-sm font-medium">
                  <span>XP</span>
                  <span>{userStats.xp} / {userStats.xpToNextLevel}</span>
                </div>
                <Progress value={(userStats.xp / userStats.xpToNextLevel) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skill Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <SkillChart skills={userStats.skills} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Statistics</CardTitle>
              <CardDescription>Your activity and achievements on TaskMaster Pro.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Tasks Completed</h4>
                  <p className="text-2xl font-bold">{userStats.tasksCompleted}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Events Attended</h4>
                  <p className="text-2xl font-bold">{userStats.eventsAttended}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Pomodoro Sessions</h4>
                  <p className="text-2xl font-bold">{userStats.pomodoroSessions}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Productivity Score</h4>
                  <p className="text-2xl font-bold">{userStats.productivityScore}/100</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Overall Progress</h4>
                <Progress value={userStats.productivityScore} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>Achievements you've unlocked</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {badges.map((badge) => (
                  <div key={badge.id} className="flex flex-col items-center space-y-2 p-4 bg-gray-100 rounded-lg">
                    <span className="text-4xl">{badge.icon}</span>
                    <span className="text-sm font-medium text-center">{badge.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}