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
  file?: File;
  files?: File[];
  name?: string;
  description?: string;
  category?: number;
  start_at?: string;
  end_at?: string;
}

