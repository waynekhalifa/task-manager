export interface EmployeeCreateInput {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password1: string;
  password2: string;
  employee: {
    onboard_at: string;
    employee_id: number;
    phone: string;
    department: number;
  };
}

export interface EmployeeUpdateInput {
  id?: number;
  project: number;
  user: string;
}
