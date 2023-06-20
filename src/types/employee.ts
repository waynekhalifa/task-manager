export interface EmployeeCreateInput {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password1: string;
  password2: string;
  onboard_at: string;
  employee_id: string | Blob;
  phone: string;
  department: any;
  files?: any;
  description: string;

}

export interface EmployeeUpdateInput {
  id?: number;
  project: number;
  user: string;
}
