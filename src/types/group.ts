export interface CreateGroup {
   name: string;
  permissions: number[];
  description: string;
  users: number[];
}
export interface Group {
  id: number;
  name: string;
  permissions: number[];
  description: string;
  users: number[];
}