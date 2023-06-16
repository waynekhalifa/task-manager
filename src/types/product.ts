import { ProductItem } from "./productItem";
import { Translation } from "./translation";

export interface Product {
  category: number;
  created_at: string;
  description: Translation[];
  id: number;
  items: ProductItem[];
  name: Translation[];
  rate: number;
  stock: number;
}
