import type { HistoryLine } from "@/types/seller";

const PURCHASE_KEY = "azpey_history_purchases";
const SALES_KEY = "azpey_history_sales";

const SEED_PURCHASES: HistoryLine[] = [
  {
    id: "hp-1",
    productName: "سیمان تیپ ۲ خاکستری",
    quantity: 120,
    unit: "کیسه",
    unitPrice: 235000,
    total: 120 * 235000,
    date: new Date(Date.now() - 86400000 * 4).toISOString(),
    reference: "ord-1001",
  },
  {
    id: "hp-2",
    productName: "میلگرد آجدار ۱۶",
    quantity: 2,
    unit: "تن",
    unitPrice: 31200000,
    total: 62400000,
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    reference: "ord-1002",
  },
];

const SEED_SALES: HistoryLine[] = [
  {
    id: "hs-1",
    productName: "کاشی پرسلان ۶۰×۶۰",
    quantity: 800,
    unit: "متر مربع",
    unitPrice: 485000,
    total: 800 * 485000,
    date: new Date(Date.now() - 86400000 * 3).toISOString(),
    reference: "فاکتور S-204",
  },
  {
    id: "hs-2",
    productName: "رنگ اکریلیک نیمه براق",
    quantity: 40,
    unit: "سطل",
    unitPrice: 420000,
    total: 40 * 420000,
    date: new Date(Date.now() - 86400000).toISOString(),
  },
];

function ensureSeed(
  key: string,
  seed: HistoryLine[],
): HistoryLine[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(key);
  if (raw) {
    try {
      return JSON.parse(raw) as HistoryLine[];
    } catch {
      return [];
    }
  }
  window.localStorage.setItem(key, JSON.stringify(seed));
  return seed;
}

export function loadPurchaseHistory(): HistoryLine[] {
  if (typeof window === "undefined") return [];
  return ensureSeed(PURCHASE_KEY, SEED_PURCHASES);
}

export function loadSalesHistory(): HistoryLine[] {
  if (typeof window === "undefined") return [];
  return ensureSeed(SALES_KEY, SEED_SALES);
}
