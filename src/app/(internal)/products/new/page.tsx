"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createId } from "@/lib/id";
import { loadOrganizations } from "@/lib/storage/business-orgs";
import { addSellerProduct } from "@/lib/storage/seller-products";
import type { BusinessOrganization } from "@/types/seller";

export default function NewProductPage() {
  const router = useRouter();
  const [orgs, setOrgs] = React.useState<BusinessOrganization[]>([]);
  const [form, setForm] = React.useState({
    organizationId: "",
    name: "",
    description: "",
    price: "",
    quantity: "",
    unit: "",
    discountPercent: "",
    tags: "",
    image: "",
  });

  React.useEffect(() => {
    const list = loadOrganizations();
    setOrgs(list);
    if (list.length === 1) {
      setForm((f) => ({ ...f, organizationId: list[0].id }));
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.organizationId || !form.name.trim() || !form.unit.trim()) return;
    const price = Number(form.price.replace(/,/g, ""));
    const quantity = Number(form.quantity.replace(/,/g, ""));
    if (!Number.isFinite(price) || price < 0) return;
    if (!Number.isFinite(quantity) || quantity < 0) return;
    const discountRaw = form.discountPercent.trim();
    const discount = discountRaw
      ? Math.min(100, Math.max(0, Number(discountRaw)))
      : undefined;

    addSellerProduct({
      id: createId("prd"),
      organizationId: form.organizationId,
      name: form.name.trim(),
      description: form.description.trim(),
      price,
      quantity,
      unit: form.unit.trim(),
      discountPercent: discount && discount > 0 ? discount : undefined,
      tags: form.tags
        .split(/[,،]/)
        .map((t) => t.trim())
        .filter(Boolean),
      image: form.image.trim() || "/file.svg",
      createdAt: new Date().toISOString(),
    });
    router.push("/products");
    router.refresh();
  }

  if (orgs.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>ابتدا سازمان بسازید</CardTitle>
          <CardDescription>
            بدون ثبت سازمان امکان افزودن محصول وجود ندارد.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/organization">مدیریت سازمان</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>افزودن محصول</CardTitle>
        <CardDescription>
          اطلاعات محصول برای نمایش در فروشگاه و سفارش‌گیری عمده
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label>سازمان عرضه‌کننده</Label>
            <Select
              value={form.organizationId || undefined}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, organizationId: v }))
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="انتخاب سازمان" />
              </SelectTrigger>
              <SelectContent>
                {orgs.map((o) => (
                  <SelectItem key={o.id} value={o.id}>
                    {o.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="p-name">نام محصول</Label>
            <Input
              id="p-name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="p-desc">توضیحات</Label>
            <textarea
              id="p-desc"
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              rows={3}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="p-price">قیمت (تومان)</Label>
            <Input
              id="p-price"
              dir="ltr"
              inputMode="numeric"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="p-qty">موجودی / تعداد</Label>
            <Input
              id="p-qty"
              dir="ltr"
              inputMode="numeric"
              value={form.quantity}
              onChange={(e) =>
                setForm((f) => ({ ...f, quantity: e.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="p-unit">واحد اندازه‌گیری</Label>
            <Input
              id="p-unit"
              value={form.unit}
              onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}
              placeholder="تن، کیسه، متر مربع…"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="p-disc">تخفیف ٪ (اختیاری)</Label>
            <Input
              id="p-disc"
              dir="ltr"
              inputMode="numeric"
              value={form.discountPercent}
              onChange={(e) =>
                setForm((f) => ({ ...f, discountPercent: e.target.value }))
              }
              placeholder="۰ تا ۱۰۰"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="p-tags">برچسب‌ها (با ویرگول جدا کنید)</Label>
            <Input
              id="p-tags"
              value={form.tags}
              onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
              placeholder="سیمان، سازه، عمده"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="p-img">آدرس تصویر (اختیاری)</Label>
            <Input
              id="p-img"
              dir="ltr"
              value={form.image}
              onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
              placeholder="/file.svg یا URL"
            />
          </div>
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <Button type="submit">ثبت محصول</Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/products">انصراف</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
