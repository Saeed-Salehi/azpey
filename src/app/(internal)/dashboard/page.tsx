"use client";

import * as React from "react";
import Link from "next/link";
import {
  BadgeDollarSign,
  Boxes,
  ClipboardList,
  Gavel,
  HandHelping,
  Headset,
  History,
  PackageSearch,
  ShieldCheck,
  ShoppingCart,
  Store,
  Truck,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStoredToken } from "@/lib/auth";

type DashboardFeature = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
};

const dashboardFeatures: DashboardFeature[] = [
  { label: "فروشگاه", icon: Store, href: "/store" },
  { label: "تاریخچه خرید", icon: History, href: "/history/purchases" },
  { label: "تاریخچه فروش", icon: ClipboardList, href: "/history/sales" },
  { label: "مدیریت محصولات", icon: Boxes, href: "/products" },
  {
    label: "مدیریت سازمان",
    icon: PackageSearch,
    href: "/organization",
  },
  { label: "داوری", icon: Gavel },
  { label: "سفارشات", icon: ShoppingCart, href: "/orders" },
  { label: "سیستم حمل و نقل", icon: Truck },
  { label: "اعتبارات", icon: BadgeDollarSign },
  { label: "پشتیبانی", icon: Headset },
  { label: "درخواست نمونه", icon: HandHelping },
  { label: "باشگاه مشتریان", icon: Users },
];

export default function DashboardPage() {
  const router = useRouter();
  const [ready, setReady] = React.useState(false);
  const [token, setToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    const t = getStoredToken();
    setToken(t);
    setReady(true);
    if (!t) router.replace("/login");
  }, [router]);

  if (!ready || !token) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-muted-foreground">
        در حال بارگذاری…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-border/80">
        <CardHeader className="text-center">
          <CardTitle>امکانات اصلی پلتفرم</CardTitle>
          <CardDescription>
            دسترسی سریع به بخش‌های کلیدی ازپی برای مدیریت خرید و فروش عمده
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {dashboardFeatures.map((feature) => {
              const Icon = feature.icon;
              const itemContent = (
                <>
                  <span className="flex size-10 items-center justify-center rounded-full bg-primary/12 text-primary transition-colors group-hover:bg-primary/20">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-xs font-medium leading-5 sm:text-sm">
                    {feature.label}
                  </span>
                </>
              );
              return (
                <React.Fragment key={feature.label}>
                  {feature.href ? (
                    <Link
                      href={feature.href}
                      className="group flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card p-3 text-center transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent/50"
                    >
                      {itemContent}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="group flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card p-3 text-center transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent/50"
                    >
                      {itemContent}
                    </button>
                  )}
                </React.Fragment>
              );
            })}
            <div className="hidden min-h-24 rounded-xl border border-dashed border-border/70 p-3 text-center text-xs text-muted-foreground sm:flex sm:items-center sm:justify-center sm:text-sm">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="size-4" />
                قابلیت‌های بیشتر به زودی
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

