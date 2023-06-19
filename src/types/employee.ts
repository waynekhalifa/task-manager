export interface EmployeeCreateInput {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password1: string;
  password2: string;
  employee: {
    onboard_at: string;
    employee_id: number | string;
    phone: string;
    department: number;
    files: any;
  };
}

export interface EmployeeUpdateInput {
  id?: number;
  project: number;
  user: string;
}
