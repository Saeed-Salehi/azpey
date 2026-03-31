export type SupplierOrganization = {
  id: string;
  name: string;
  province: string;
  city: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  unit: string;
  tags: string[];
  suppliers: SupplierOrganization[];
  discountPercent?: number;
  image: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

