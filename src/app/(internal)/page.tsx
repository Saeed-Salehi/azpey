import { Building2, Package } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
          خرید و فروش عمده، شفاف و سازمانی
        </h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          سازمان‌ها و تامین‌کنندگان را در یک پلتفرم متمرکز کنار هم قرار می‌دهیم،
          با تمرکز فعلی بر مصالح و خدمات ساخت‌وساز.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-3 space-y-0">
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Building2 className="size-5" />
            </span>
            <div>
              <CardTitle className="text-base">سازمان</CardTitle>
              <CardDescription>
                خریداران و فروشندگان حقوقی با پروفایل سازمانی
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            مدیریت نقش خریدار/فروشنده، آدرس و مقیاس فعالیت در مراحل بعدی تکمیل
            می‌شود.
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-3 space-y-0">
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Package className="size-5" />
            </span>
            <div>
              <CardTitle className="text-base">محصول</CardTitle>
              <CardDescription>
                کاتالوگ مصالح و تجهیزات با قیمت‌های عمده
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            فهرست محصولات و سازمان‌ها در نسخه بعدی به این صفحه اضافه می‌شود.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

