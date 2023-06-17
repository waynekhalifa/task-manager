export interface EmployeeCreateInput {
  project: number;
  user: string;
}
export interface EmployeeUpdateInput {
  id?: number;
  project: number;
  user: string;
}
