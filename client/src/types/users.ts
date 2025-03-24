export interface User {
  createdAt: string;
  first: string;
  id: string;
  last: string;
  photo: string;
  roleId: string;
  updatedAt: string;
}

export type Users = User[];
