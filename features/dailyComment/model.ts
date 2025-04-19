export interface DailyComment {
  id: string;
  userId: string;
  content: string;
  //   mood: {
  //     label: string;
  //     emoji: string;
  //     score: number;
  //   };
  mood: string;
  createdAt: string;
  updatedAt: string;
}
