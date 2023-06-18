export interface Project {
  id?: number;
  admin: number;
  files: File[];
  name: string;
  description?: string;
  category: number;
  start_at: string;
  end_at: string;
}



