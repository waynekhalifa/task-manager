export interface Task {
  files: any[];
  name: string;
  description: string;
  task_priority: string;
  user: number;
  project: number;
}
export interface SelectedTask {
  id: number;
  files?: any[];
  name?: string;
  description?: string;
  task_progress?: string;
  task_priority: string;
  created_at?: string;
  user?: number;
  project?: number;
}
