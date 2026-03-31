export type BusinessOrganization = {
  id: string;
  name: string;
  description: string;
  image: string;
  provinceId: string;
  city: string;
  addressLine: string;
  createdAt: string;
};

export type SellerProduct = {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  discountPercent?: number;
  tags: string[];
  image: string;
  createdAt: string;
};

export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "preparing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type Order = {
  id: string;
  status: OrderStatus;
  createdAt: string;
  total: number;
  itemCount: number;
  summary: string;
};

export type HistoryLine = {
  id: string;
  productName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  date: string;
  reference?: string;
};
