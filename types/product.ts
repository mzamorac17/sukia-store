export interface Product {
  id: number;
  collection: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  logo: string;
  sizes: string[];
  stock: number;
}