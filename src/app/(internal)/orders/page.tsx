"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_ORDER,
} from "@/lib/order-status";
import { loadOrders } from "@/lib/storage/orders";
import { cn } from "@/lib/utils";
import type { Order, OrderStatus } from "@/types/seller";

export default function OrdersPage() {
  const [status, setStatus] = React.useState<OrderStatus | "all">("all");
  const [orders, setOrders] = React.useState<Order[]>([]);

  React.useEffect(() => {
    setOrders(loadOrders());
  }, []);

  const filtered =
    status === "all"
      ? orders
      : orders.filter((o) => o.status === status);

  const counts = React.useMemo(() => {
    const m: Record<string, number> = { all: orders.length };
    ORDER_STATUS_ORDER.forEach((s) => {
      m[s] = orders.filter((o) => o.status === s).length;
    });
    return m;
  }, [orders]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold sm:text-3xl">سفارشات</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          فیلتر سفارش‌ها بر اساس وضعیت
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant={status === "all" ? "default" : "outline"}
          onClick={() => setStatus("all")}
        >
          همه ({counts.all ?? 0})
        </Button>
        {ORDER_STATUS_ORDER.map((s) => (
          <Button
            key={s}
            type="button"
            size="sm"
            variant={status === s ? "default" : "outline"}
            onClick={() => setStatus(s)}
          >
            {ORDER_STATUS_LABELS[s]} ({counts[s] ?? 0})
          </Button>
        ))}
      </div>

      <div className="grid gap-3">
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              سفارشی در این وضعیت وجود ندارد.
            </CardContent>
          </Card>
        ) : (
          filtered.map((order) => (
            <Card key={order.id} className="border-border/80">
              <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-2 space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">
                    سفارش{" "}
                    <span dir="ltr" className="font-mono text-sm">
                      {order.id}
                    </span>
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {new Date(order.createdAt).toLocaleDateString("fa-IR", {
                      dateStyle: "medium",
                    })}
                  </CardDescription>
                </div>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium",
                    order.status === "delivered" && "bg-green-100 text-green-800",
                    order.status === "cancelled" && "bg-red-100 text-red-800",
                    order.status === "pending_payment" &&
                      "bg-amber-100 text-amber-900",
                    !["delivered", "cancelled", "pending_payment"].includes(
                      order.status,
                    ) && "bg-muted text-muted-foreground",
                  )}
                >
                  {ORDER_STATUS_LABELS[order.status]}
                </span>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="text-muted-foreground">{order.summary}</p>
                <div className="flex flex-wrap gap-4">
                  <span>
                    مبلغ:{" "}
                    <strong className="text-foreground">
                      {order.total.toLocaleString("fa-IR")} تومان
                    </strong>
                  </span>
                  <span className="text-muted-foreground">
                    {order.itemCount} قلم کالا
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
