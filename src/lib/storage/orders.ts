import type { Order } from "@/types/seller";

const KEY = "azpey_orders";

const SEED: Order[] = [
  {
    id: "ord-1001",
    status: "pending_payment",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    total: 125000000,
    itemCount: 3,
    summary: "سیمان، میلگرد، لوله",
  },
  {
    id: "ord-1002",
    status: "paid",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    total: 48200000,
    itemCount: 2,
    summary: "کاشی، رنگ",
  },
  {
    id: "ord-1003",
    status: "shipped",
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    total: 91000000,
    itemCount: 4,
    summary: "سنگ نما، ملات",
  },
  {
    id: "ord-1004",
    status: "delivered",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    total: 22000000,
    itemCount: 1,
    summary: "ابزار برقی",
  },
];

function ensureSeed(): Order[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(KEY);
  if (raw) {
    try {
      return JSON.parse(raw) as Order[];
    } catch {
      return [];
    }
  }
  window.localStorage.setItem(KEY, JSON.stringify(SEED));
  return SEED;
}

export function loadOrders(): Order[] {
  if (typeof window === "undefined") return [];
  return ensureSeed();
}

export function saveOrders(orders: Order[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(orders));
}
