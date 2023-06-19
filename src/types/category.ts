export interface Category {
  id: number;
  name: string;
  created_at: string;
  lft: number;
  rght: number;
  tree_id: number;
  level: number;
  base_category: number;
}
export interface CategoryCreateInput {
  name: string;
  base_category?: number;
}
export interface CategoryUpdateInput {
  id: number;
  name: string;
  base_category?: number;
  created_at?: string;
}