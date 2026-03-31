"use client";

import Image from "next/image";
import * as React from "react";
import { Building2, Plus } from "lucide-react";

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
import { citiesByProvince, provinces } from "@/data/iran-locations";
import { createId } from "@/lib/id";
import {
  addOrganization,
  loadOrganizations,
} from "@/lib/storage/business-orgs";
import type { BusinessOrganization } from "@/types/seller";

export default function OrganizationManagePage() {
  const [orgs, setOrgs] = React.useState<BusinessOrganization[]>([]);
  const [showForm, setShowForm] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    description: "",
    image: "",
    provinceId: "",
    city: "",
    addressLine: "",
  });

  function refresh() {
    setOrgs(loadOrganizations());
  }

  React.useEffect(() => {
    refresh();
  }, []);

  const cityList =
    form.provinceId && citiesByProvince[form.provinceId]
      ? citiesByProvince[form.provinceId]
      : [];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.provinceId || !form.city) return;
    const org: BusinessOrganization = {
      id: createId("org"),
      name: form.name.trim(),
      description: form.description.trim(),
      image: form.image.trim() || "/window.svg",
      provinceId: form.provinceId,
      city: form.city,
      addressLine: form.addressLine.trim(),
      createdAt: new Date().toISOString(),
    };
    addOrganization(org);
    setForm({
      name: "",
      description: "",
      image: "",
      provinceId: "",
      city: "",
      addressLine: "",
    });
    setShowForm(false);
    refresh();
  }

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-2xl font-bold sm:text-3xl">مدیریت سازمان</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          سازمان فروشنده یا تامین‌کننده شما در ازپی ثبت می‌شود؛ پس از ایجاد
          سازمان می‌توانید محصول اضافه کنید.
        </p>
      </section>

      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Building2 className="size-6" />
              </span>
              <div>
                <CardTitle>افزودن سازمان</CardTitle>
                <CardDescription className="mt-1 max-w-xl">
                  برای عرضه محصول در پلتفرم، ابتدا باید حداقل یک سازمان با
                  مشخصات حقوقی و موقعیت جغرافیایی ثبت کنید. این اطلاعات به
                  خریداران برای اعتماد و تطبیق منطقه‌ای نمایش داده می‌شود.
                </CardDescription>
              </div>
            </div>
            <Button
              type="button"
              size="lg"
              className="shrink-0 gap-2"
              onClick={() => setShowForm((v) => !v)}
            >
              <Plus className="size-4" />
              {showForm ? "بستن فرم" : "افزودن سازمان"}
            </Button>
          </div>
        </CardHeader>
        {showForm ? (
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="org-name">نام سازمان</Label>
                <Input
                  id="org-name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="مثلاً مصالح سازه نوین"
                  required
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="org-desc">توضیحات</Label>
                <textarea
                  id="org-desc"
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder="معرفی کوتاه فعالیت و تخصص سازمان"
                  rows={3}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-img">آدرس تصویر (اختیاری)</Label>
                <Input
                  id="org-img"
                  dir="ltr"
                  value={form.image}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, image: e.target.value }))
                  }
                  placeholder="/window.svg یا URL"
                />
              </div>
              <div className="space-y-2">
                <Label>استان</Label>
                <Select
                  value={form.provinceId || undefined}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, provinceId: v, city: "" }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب استان" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>شهر</Label>
                <Select
                  value={form.city || undefined}
                  onValueChange={(v) => setForm((f) => ({ ...f, city: v }))}
                  disabled={!form.provinceId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب شهر" />
                  </SelectTrigger>
                  <SelectContent>
                    {cityList.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="org-addr">آدرس</Label>
                <Input
                  id="org-addr"
                  value={form.addressLine}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, addressLine: e.target.value }))
                  }
                  placeholder="خیابان، پلاک، کد پستی…"
                />
              </div>
              <div className="flex gap-2 sm:col-span-2">
                <Button type="submit">ثبت سازمان</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  انصراف
                </Button>
              </div>
            </form>
          </CardContent>
        ) : null}
      </Card>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">سازمان‌های شما</h2>
        {orgs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              هنوز سازمانی ثبت نشده است. با دکمه «افزودن سازمان» شروع کنید.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {orgs.map((org) => {
              const pName =
                provinces.find((p) => p.id === org.provinceId)?.name ?? "";
              return (
                <Card key={org.id} className="overflow-hidden">
                  <div className="relative h-36 bg-muted/50">
                    <Image
                      src={org.image}
                      alt={org.name}
                      fill
                      className="object-contain p-6"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-base">{org.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {org.description || "بدون توضیحات"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <p>
                      {pName} — {org.city}
                    </p>
                    {org.addressLine ? <p className="mt-1">{org.addressLine}</p> : null}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
