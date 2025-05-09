import type { Domain } from "@/features/domain/model";

export interface IdentityMatrix {
  id: string;
  userId: string;
  bannerKey: string;
  name: string;
  description: string;
  domains: Domain[];
  createdAt: string;
  updatedAt: string;
}
