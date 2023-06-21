export interface PermissionCreateInput {
  name: string;
  base_category?: number;
}
export interface PermissionUpdateInput {
  user: number;
  add?: number[];
  remove?: number[];
}
