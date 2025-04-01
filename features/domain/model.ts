import type { Habit } from "@/features/habit/model";

export interface Domain {
  id: string;
  identityMatrixId: string;
  name: string;
  habits: Habit[];
  createdAt: string;
  updatedAt: string;
}
