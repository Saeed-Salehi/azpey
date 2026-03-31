"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { allLocations, allTags, products } from "@/data/products";

type SortType = "relevant" | "price_asc" | "price_desc" | "discount_desc" | "name";

export default function StorePage() {
  const [query, setQuery] = React.useState("");
  const [location, setLocation] = React.useState<string>("all");
  const [tag, setTag] = React.useState<string>("all");
  const [sort, setSort] = React.useState<SortType>("relevant");

  const filteredProducts = React.useMemo(() => {
    const base = products.filter((product) => {
      const q = query.trim();
      const matchedQuery =
        !q ||
        product.name.includes(q) ||
        product.tags.some((t) => t.includes(q)) ||
        product.suppliers.some((s) => s.name.includes(q));

      const matchedLocation =
        location === "all" ||
        product.suppliers.some((s) => `${s.province} - ${s.city}` === location);

      const matchedTag = tag === "all" || product.tags.includes(tag);
      return matchedQuery && matchedLocation && matchedTag;
    });

    const sorted = [...base];
    switch (sort) {
      case "price_asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "discount_desc":
        sorted.sort((a, b) => (b.discountPercent ?? 0) - (a.discountPercent ?? 0));
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name, "fa"));
        break;
      default:
        break;
    }
    return sorted;
  }, [location, query, sort, tag]);

  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-2xl font-bold sm:text-3xl">فروشگاه</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          فهرست محصولات قابل تامین برای خرید عمده
        </p>
      </section>

      <Card className="border-border/80">
        <CardContent className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
          <Input
            placeholder="جستجوی محصول، برچسب یا تامین‌کننده..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger>
              <SelectValue placeholder="فیلتر موقعیت جغرافیایی" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه موقعیت‌ها</SelectItem>
              {allLocations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={tag} onValueChange={setTag}>
            <SelectTrigger>
              <SelectValue placeholder="فیلتر برچسب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه برچسب‌ها</SelectItem>
              {allTags.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={(v) => setSort(v as SortType)}>
            <SelectTrigger>
              <SelectValue placeholder="مرتب‌سازی" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevant">مرتبط‌ترین</SelectItem>
              <SelectItem value="price_asc">قیمت: کم به زیاد</SelectItem>
              <SelectItem value="price_desc">قیمت: زیاد به کم</SelectItem>
              <SelectItem value="discount_desc">بیشترین تخفیف</SelectItem>
              <SelectItem value="name">نام محصول</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden border-border/80">
            <div className="relative h-44 bg-muted/40">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-6"
              />
            </div>
            <CardContent className="space-y-3 p-4">
              <h3 className="line-clamp-2 min-h-12 font-semibold">{product.name}</h3>
              <div className="flex items-center justify-between">
                <p className="text-primary">
                  {product.price.toLocaleString("fa-IR")} تومان
                </p>
                {product.discountPercent ? (
                  <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700">
                    {product.discountPercent}٪ تخفیف
                  </span>
                ) : null}
              </div>
              <Button asChild className="w-full">
                <Link href={`/store/${product.id}`}>مشاهده جزئیات محصول</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}

