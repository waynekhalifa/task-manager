export interface ProjectCreateInput {
  admin: number;
  files?: any;
  name: string;
  description: string;
  category: number;
}
export interface ProjectUpdateInput {
  id?: number;
  admin?: number;
  files?: any;
  name?: string;
  description?: string;
  category?: number;
}
