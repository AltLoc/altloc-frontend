export interface Habit {
  id: string;
  domainId: string;
  name: string;
  runtime: number;
  dayPart: string;
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
