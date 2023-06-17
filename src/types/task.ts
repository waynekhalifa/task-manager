export interface TaskCreateInput {
  project: number;
  files?: any;
  name: string;
  description: string;
  user: number;
}

export interface TaskUpdateInput {
  id?: number;
  project: number;
  files?: any;
  name?: string;
  description?: string;
  user?: number;
}
