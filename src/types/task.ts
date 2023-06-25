export interface Task {
  files: File[];
  name: string;
  description: string;
  task_priority: string;
  user: number;
  group: [number];
  project: number;
  start_at?: string;
  end_at?: string;
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
  group?: any;
  project?: number;
  start_at?: string;
  end_at?: string;
}
