export interface Habit {
  id: string;
  domainId: string;
  name: string;
  domainName: string;
  runtime: number;
  dayPart: string;
  targetNumberOfCompletions: number;
  numberOfCompletions: number;
  spentTime: number;
  completedDates: string[];
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HabbitCompleted {
  id: string;
  userId: string;
  habitId: string;
  domainId: string;
  completedAt: string;
}
