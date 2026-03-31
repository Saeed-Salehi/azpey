import type { SellerProduct } from "@/types/seller";

const KEY = "azpey_seller_products";

export function loadSellerProducts(): SellerProduct[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SellerProduct[];
  } catch {
    return [];
  }
}

export function saveSellerProducts(products: SellerProduct[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(products));
}

export function addSellerProduct(product: SellerProduct): void {
  const list = loadSellerProducts();
  saveSellerProducts([product, ...list]);
}
