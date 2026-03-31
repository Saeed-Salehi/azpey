import type { OrderStatus } from "@/types/seller";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending_payment: "در انتظار پرداخت",
  paid: "پرداخت‌شده",
  preparing: "در حال آماده‌سازی",
  shipped: "ارسال‌شده",
  delivered: "تحویل‌شده",
  cancelled: "لغو شده",
};

export const ORDER_STATUS_ORDER: OrderStatus[] = [
  "pending_payment",
  "paid",
  "preparing",
  "shipped",
  "delivered",
  "cancelled",
];
