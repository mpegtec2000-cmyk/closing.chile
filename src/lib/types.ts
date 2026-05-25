export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; // in CLP
  compare_price?: number;
  images: string[];
  category_id: string;
  category?: Category;
  tags: string[];
  stock: number;
  is_new: boolean;
  is_sale: boolean;
  sizes_available?: string[];
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

export interface WishlistItem {
  product_id: string;
  product: Product;
}

export interface NewsletterSubscriber {
  email: string;
  created_at: string;
}
