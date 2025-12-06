export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  daysToExpire: number;
  vendor: string;
  vendorLocation: string;
  category: string;
  image: string;
  stock: number;
}

export interface Notification {
  id: string;
  productName: string;
  productImage: string;
  daysToExpire: number;
  date: string;
  isNew: boolean;
}

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export type Vendor = {
  id: string;
  name: string;
};
