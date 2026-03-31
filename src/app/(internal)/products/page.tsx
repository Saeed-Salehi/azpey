"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { PackagePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loadOrganizations } from "@/lib/storage/business-orgs";
import { loadSellerProducts } from "@/lib/storage/seller-products";
import type { SellerProduct } from "@/types/seller";

export default function ProductListPage() {
  const [products, setProducts] = React.useState<SellerProduct[]>([]);
  const [orgNames, setOrgNames] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    const orgs = loadOrganizations();
    const map: Record<string, string> = {};
    orgs.forEach((o) => {
      map[o.id] = o.name;
    });
    setOrgNames(map);
    setProducts(loadSellerProducts());
  }, []);

  const hasOrgs = Object.keys(orgNames).length > 0;

  return (
    <div className="space-y-4">
      {!hasOrgs ? (
        <Card className="border-amber-200/80 bg-amber-50/50 dark:border-amber-900/50 dark:bg-amber-950/20">
          <CardHeader>
            <CardTitle className="text-base">نیاز به ثبت سازمان</CardTitle>
            <CardDescription>
              برای افزودن محصول، ابتدا باید در صفحه مدیریت سازمان حداقل یک
              سازمان بسازید.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/organization">رفتن به مدیریت سازمان</Link>
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {products.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
            <PackagePlus className="size-12 text-muted-foreground" />
            <div>
              <p className="font-medium">هنوز محصولی ثبت نکرده‌اید</p>
              <p className="mt-1 text-sm text-muted-foreground">
                از منوی بالا «افزودن محصول» را انتخاب کنید.
              </p>
            </div>
            {hasOrgs ? (
              <Button asChild>
                <Link href="/products/new">افزودن اولین محصول</Link>
              </Button>
            ) : null}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Card key={p.id} className="overflow-hidden">
              <div className="relative h-40 bg-muted/40">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-2 text-base">{p.name}</CardTitle>
                <CardDescription>
                  {orgNames[p.organizationId] ?? "سازمان نامشخص"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                <p>
                  <span className="text-muted-foreground">قیمت:</span>{" "}
                  {p.price.toLocaleString("fa-IR")} تومان
                </p>
                <p>
                  <span className="text-muted-foreground">موجودی:</span>{" "}
                  {p.quantity.toLocaleString("fa-IR")} {p.unit}
                </p>
                {p.discountPercent ? (
                  <p className="text-green-700 dark:text-green-400">
                    تخفیف {p.discountPercent}٪
                  </p>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
