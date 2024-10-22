"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

type Challenge = {
  id: number;
  title: string;
  description: string;
  progress: number;
  reward: number;
};

const mockChallenges: Challenge[] = [
  { id: 1, title: 'Task Master', description: 'Complete 20 tasks this week', progress: 65, reward: 100 },
  { id: 2, title: 'Focus Champion', description: 'Accumulate 5 hours in Pomodoro sessions', progress: 40, reward: 75 },
  { id: 3, title: 'Early Riser', description: 'Start 3 tasks before 9 AM', progress: 33, reward: 50 },
];

export default function GamificationSystem() {
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [dailyStreak, setDailyStreak] = useState(5);

  useEffect(() => {
    // Simulating progress updates
    const interval = setInterval(() => {
      setChallenges(prevChallenges =>
        prevChallenges.map(challenge => ({
          ...challenge,
          progress: Math.min(100, challenge.progress + Math.random() * 5)
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Challenges & Rewards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Daily Streak</h3>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-lg p-2">🔥 {dailyStreak} days</Badge>
            <span className="text-sm text-muted-foreground">Keep it up!</span>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Active Challenges</h3>
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{challenge.title}</span>
                  <Badge variant="outline">{challenge.reward} XP</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{challenge.description}</p>
                <Progress value={challenge.progress} className="w-full" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}