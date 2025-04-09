export interface User {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  avatarKey: string | null;
  role: string;
  score: number;
  level: number;
  currency: number;
  createdAt: number;
  hasMatrix: boolean;
  isAdmin: boolean;
  authMethods: Array<"password" | "google">;
}
