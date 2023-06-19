import { Employee } from "./employee";

export interface AuthRegisterInput {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password1: string;
  password2: string;
  employee: Employee;
}
