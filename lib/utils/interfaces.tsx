//Dashboard Cards
export interface Event {
  id: number;
  title: string;
  start: string; // ISO date string
  end: string; // ISO date string
  color: string;
}

export interface Task {
  id: number;
  title: string;
  status: "Done" | "In Progress" | "Not Started";
  description: string;
  progress: number; // percentage
}

export interface PomodoroTimerProps {
  onComplete: () => void;
  coins: number;
}
