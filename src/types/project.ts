export interface ProjectCreateInput {
  admin: number;
  files?: any;
  name: string;
  description: string;
  category: number;
  budget: number;
  startDate: string;
  endDate: string;
  assignPerson: number;
  notifationSent: number;
  priority: number;
}
export interface ProjectUpdateInput {
  id?: number;
  admin?: number;
  name: string;
  description: string;
  category: number;
  budget: number;
  startDate: string;
  endDate: string;
  assignPerson: number;
  notifationSent: number;
  priority: number;
}
