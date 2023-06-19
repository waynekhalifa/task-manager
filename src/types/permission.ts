export interface PermissionCreateInput {
  name: string;
  base_category?: number;
}
export interface PermissionUpdateInput {
  id: number;
  name: string;
  base_category?: number;
  created_at?: string;
}
