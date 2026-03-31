"use client";

import * as React from "react";
import Link from "next/link";
import { Bell, LogOut, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";

import { LogoMark } from "@/components/brand/logo-mark";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { clearAuth } from "@/lib/auth";
import { useCart } from "@/components/providers/cart-provider";

const MOCK_NOTIFICATIONS = [
  { id: "1", title: "درخواست قیمت جدید", time: "۲ دقیقه پیش" },
  { id: "2", title: "پاسخ فروشنده ثبت شد", time: "۲ ساعت پیش" },
  { id: "3", title: "به‌روزرسانی قوانین سفارش", time: "دیروز" },
];

export function InternalHeader() {
  const router = useRouter();
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [notifOpen, setNotifOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);
  const { items, totalCount } = useCart();

  const cartPreview = items
    .flatMap((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return [];
      return [{ ...item, product }];
    })
    .slice(0, 4);

  function handleLogout() {
    clearAuth();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="border-b border-border bg-card/85 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="flex items-center gap-3">
          <LogoMark className="size-10" />
          <div>
            <p className="text-sm font-semibold sm:text-base">ازپی</p>
            <p className="text-xs text-muted-foreground">پلتفرم عمده‌فروشی B2B</p>
          </div>
        </Link>

        <div className="relative flex items-center gap-2">
          <div className="relative">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => {
                setCartOpen((v) => !v);
                setNotifOpen(false);
                setProfileOpen(false);
              }}
              aria-label="سبد خرید"
              className="relative"
            >
              <ShoppingCart className="size-4" />
              {totalCount > 0 ? (
                <span className="absolute -end-1 -top-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">
                  {totalCount}
                </span>
              ) : null}
            </Button>
            {cartOpen ? (
              <div className="absolute end-0 top-12 z-40 w-80 rounded-lg border border-border bg-popover p-3 shadow-lg">
                <p className="mb-2 text-sm font-semibold">خلاصه سبد خرید</p>
                {cartPreview.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    هنوز محصولی به سبد اضافه نشده است.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {cartPreview.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center justify-between rounded-md bg-muted/60 p-2 text-sm"
                      >
                        <span className="line-clamp-1">{item.product.name}</span>
                        <span className="text-xs text-muted-foreground">
                          x{item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <Button
                  type="button"
                  className="mt-3 w-full"
                  asChild
                  onClick={() => setCartOpen(false)}
                >
                  <Link href="/cart">مشاهده سبد خرید و تکمیل سفارش</Link>
                </Button>
              </div>
            ) : null}
          </div>

          <div className="relative">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => {
                setNotifOpen((v) => !v);
                setProfileOpen(false);
                setCartOpen(false);
              }}
              aria-label="اعلان‌ها"
            >
              <Bell className="size-4" />
            </Button>
            {notifOpen ? (
              <div className="absolute end-0 top-12 z-40 w-80 rounded-lg border border-border bg-popover p-3 shadow-lg">
                <p className="mb-2 text-sm font-semibold">اعلان‌ها</p>
                <div className="space-y-2">
                  {MOCK_NOTIFICATIONS.map((n) => (
                    <div key={n.id} className="rounded-md bg-muted/60 p-2 text-sm">
                      <p className="font-medium">{n.title}</p>
                      <p className="text-xs text-muted-foreground">{n.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="relative">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => {
                setProfileOpen((v) => !v);
                setNotifOpen(false);
                setCartOpen(false);
              }}
              aria-label="پروفایل"
            >
              <User className="size-4" />
            </Button>
            {profileOpen ? (
              <div className="absolute end-0 top-12 z-40 w-48 rounded-lg border border-border bg-popover p-2 shadow-lg">
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/profile" onClick={() => setProfileOpen(false)}>
                    <User className="size-4" />
                    اطلاعات شخصی
                  </Link>
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="size-4" />
                  خروج
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}

