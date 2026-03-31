"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProductById } from "@/data/products";
import { useCart } from "@/components/providers/cart-provider";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { addItem } = useCart();
  const product = getProductById(params.id);

  if (!product) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>محصول یافت نشد</CardTitle>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline">
            <Link href="/store">بازگشت به فروشگاه</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const locations = Array.from(
    new Set(product.suppliers.map((s) => `${s.province} - ${s.city}`)),
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr,1fr]">
      <Card className="overflow-hidden">
        <div className="relative h-80 bg-muted/40">
          <Image src={product.image} alt={product.name} fill className="object-contain p-8" />
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="leading-8">{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="rounded-lg bg-muted/40 p-3">
            <p>
              قیمت:{" "}
              <span className="font-semibold text-primary">
                {product.price.toLocaleString("fa-IR")} تومان
              </span>
            </p>
            <p className="mt-1 text-muted-foreground">واحد: {product.unit}</p>
            {product.discountPercent ? (
              <p className="mt-1 text-green-700">
                تخفیف فعال: {product.discountPercent}٪
              </p>
            ) : null}
          </div>

          <div>
            <p className="mb-2 font-medium">برچسب‌ها</p>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-accent px-2 py-1 text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 font-medium">سازمان‌های تامین‌کننده</p>
            <ul className="space-y-1 text-muted-foreground">
              {product.suppliers.map((s) => (
                <li key={s.id}>
                  {s.name} — {s.province} / {s.city}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-2 font-medium">موقعیت جغرافیایی محصول</p>
            <div className="flex flex-wrap gap-2">
              {locations.map((loc) => (
                <span key={loc} className="rounded-md border border-border px-2 py-1 text-xs">
                  {loc}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              onClick={() => {
                addItem(product.id, 1);
                router.push("/cart");
              }}
            >
              افزودن به سبد خرید
            </Button>
            <Button variant="outline" asChild>
              <Link href="/store">بازگشت به فروشگاه</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

