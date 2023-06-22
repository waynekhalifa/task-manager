export interface Project {
  id?: number;
  admin: number;
  file: File;
  files?: File[];
  name: string;
  description?: string;
  category: number;
  start_at: string;
  end_at: string;
}
export interface SelectedProject {
  id: number;
  admin?: number;
  group?: number;
  file?: any;
  files?: File[];
  name?: string;
  description?: string;
  category?: number;
  start_at?: string;
  end_at?: string;
  attachment_count?: number;
  members_count?: number;
  comments_count?: number;
  tasks_count?: number;
  members?: any[];
  project_status?: string;
  projectfile_set?: any[];
}


export interface Attachment {
  id?: number;
  files: File[];
  project?: number;
  task?: number;
}
