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
