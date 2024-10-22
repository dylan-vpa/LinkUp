"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Achievement = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

const mockAchievements: Achievement[] = [
  { id: 1, title: 'Early Bird', description: 'Complete 5 tasks before 9 AM', icon: '🌅' },
  { id: 2, title: 'Pomodoro Master', description: 'Complete 20 Pomodoro sessions', icon: '🍅' },
  { id: 3, title: 'Streak Keeper', description: 'Maintain a 7-day task completion streak', icon: '🔥' },
];

export default function UserProfile() {
  const [level, setLevel] = useState(5);
  const [xp, setXp] = useState(750);
  const [nextLevelXp, setNextLevelXp] = useState(1000);
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements);

  const progress = (xp / nextLevelXp) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-muted-foreground">Productivity Enthusiast</p>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Level {level}</span>
            <span className="text-sm font-medium">{xp} / {nextLevelXp} XP</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {achievements.map((achievement) => (
              <Badge key={achievement.id} variant="secondary" className="p-2 flex items-center space-x-2">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <p className="font-medium">{achievement.title}</p>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}