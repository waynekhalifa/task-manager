export interface EmployeeCreateInput {
  project: number;
  user: string;
}
export interface EmployeeUpdateInput {
  id?: number;
  project: number;
  user: string;
}

export interface Employee {
  onboard_at: string;
  employee_id: number;
  phone: string;
  department: number;
}
