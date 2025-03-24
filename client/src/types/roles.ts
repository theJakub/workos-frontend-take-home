export interface Role {
  id: string;
  name: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  description: string;
}

export type Roles = Record<string, Role>;
