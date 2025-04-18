export interface DailyComment {
  id: string;
  userId: string;
  content: string;
  mood: {
    label: string;
    emoji: string;
  };
  createdAt: string;
  updatedAt: string;
}
