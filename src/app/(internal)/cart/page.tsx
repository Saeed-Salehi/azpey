"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { products } from "@/data/products";
import { useCart } from "@/components/providers/cart-provider";

export default function CartPage() {
  const { items, updateItem, removeItem, clear } = useCart();

  const cartLines = items.flatMap((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return [];
    const discountedPrice = product.discountPercent
      ? Math.round(product.price * (1 - product.discountPercent / 100))
      : product.price;
    return [{ item, product, discountedPrice, lineTotal: discountedPrice * item.quantity }];
  });

  const total = cartLines.reduce((sum, line) => sum + line.lineTotal, 0);

  return (
    <div className="space-y-6">
      <section className="space-y-1">
        <h1 className="text-2xl font-bold sm:text-3xl">سبد خرید</h1>
        <p className="text-sm text-muted-foreground">
          نمایش کامل سفارش و آماده‌سازی برای تکمیل خرید
        </p>
      </section>

      {cartLines.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <p className="text-muted-foreground">سبد خرید شما خالی است.</p>
            <Button asChild>
              <Link href="/store">رفتن به فروشگاه</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.4fr,0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>محصولات انتخاب‌شده</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartLines.map((line) => (
                <div
                  key={line.product.id}
                  className="grid gap-3 rounded-lg border border-border p-3 sm:grid-cols-[88px,1fr,132px]"
                >
                  <div className="relative h-20 rounded-md bg-muted/50">
                    <Image
                      src={line.product.image}
                      alt={line.product.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">{line.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {line.discountedPrice.toLocaleString("fa-IR")} تومان /{" "}
                      {line.product.unit}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="number"
                      min={1}
                      value={line.item.quantity}
                      onChange={(e) =>
                        updateItem(
                          line.product.id,
                          Math.max(1, Number(e.target.value) || 1),
                        )
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-8 w-full text-destructive hover:text-destructive"
                      onClick={() => removeItem(line.product.id)}
                    >
                      حذف
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="h-fit">
            <CardHeader>
              <CardTitle>خلاصه سفارش</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span>تعداد آیتم‌ها</span>
                <span>{items.reduce((s, i) => s + i.quantity, 0)}</span>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <span>مبلغ کل</span>
                <span>{total.toLocaleString("fa-IR")} تومان</span>
              </div>
              <Button className="w-full">تکمیل خرید</Button>
              <Button variant="outline" className="w-full" onClick={clear}>
                پاک کردن سبد
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

