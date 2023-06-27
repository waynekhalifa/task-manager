

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
  description: string;
  manager?: number;
  user_permissions?: [number];
}

export interface EmployeeUpdateInput {
  id?: number;
  project: number;
  user: string;
}

export interface Employee {
  id: number;
  onboard_at: string;
  employee_id: number;
  phone: string;
  department: number;
  manager?: number;
  description: string;
  user_permissions: [number];
  designation: string;
  user: User;
}
export interface Manager {
  id: number;
  created_at: string;
  department: number;
  description: string;
  user: number;
  employee: Employee;
}


export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface AssignedEmployee {
  id: number;
  createdAt: string;
  project: number;
  user: User;
}