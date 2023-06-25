export interface PermissionCreateInput {
  name: string;
  base_category?: number;
}
export interface Permission {
  codename: string;
  id?: number;
  model: string;
  name: string;
}

export interface CustomPermission { 
  header: string;
  children: Permission[];
}