"use client";

import * as React from "react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { citiesByProvince, provinces } from "@/data/iran-locations";
import {
  businessTypeOptions,
  productNeedOptions,
  roleOptions,
  workScaleOptions,
} from "@/data/registration-options";
import { clearAuth, loadRegistrationProfile, saveRegistrationProfile } from "@/lib/auth";
import {
  emptyRegistrationProfile,
  type RegistrationProfile,
  type UserRole,
} from "@/types/auth";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = React.useState<RegistrationProfile>(
    emptyRegistrationProfile(),
  );
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    const p = loadRegistrationProfile();
    if (p) setProfile(p);
  }, []);

  const cityList =
    profile.provinceId && citiesByProvince[profile.provinceId]
      ? citiesByProvince[profile.provinceId]
      : [];

  const optionalIsEmpty = !(
    profile.businessTypeId ||
    profile.productNeedId ||
    profile.workScaleId ||
    profile.role
  );

  function patch<K extends keyof RegistrationProfile>(
    key: K,
    value: RegistrationProfile[K],
  ) {
    setProfile((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "provinceId") next.city = "";
      return next;
    });
  }

  function handleSave() {
    saveRegistrationProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  function handleLogout() {
    clearAuth();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>اطلاعات شخصی</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">نام</Label>
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e) => patch("firstName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">نام خانوادگی</Label>
              <Input
                id="lastName"
                value={profile.lastName}
                onChange={(e) => patch("lastName", e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>استان</Label>
              <Select
                value={profile.provinceId || undefined}
                onValueChange={(v) => patch("provinceId", v)}
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
                value={profile.city || undefined}
                onValueChange={(v) => patch("city", v)}
                disabled={!profile.provinceId}
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
          </div>
          <div className="space-y-2">
            <Label htmlFor="addressLine">آدرس</Label>
            <Input
              id="addressLine"
              value={profile.addressLine}
              onChange={(e) => patch("addressLine", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>اطلاعات تکمیلی</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {optionalIsEmpty ? (
            <p className="text-sm text-muted-foreground">
              اطلاعات تکمیلی قبلاً ثبت نشده‌اند؛ در صورت تمایل می‌توانید آن‌ها را
              تکمیل کنید.
            </p>
          ) : null}

          <div className="space-y-2">
            <Label>نقش شما</Label>
            <RadioGroup
              value={profile.role || undefined}
              onValueChange={(v) => patch("role", v as UserRole)}
              className="grid gap-2"
              dir="rtl"
            >
              {roleOptions.map((r) => (
                <label
                  key={r.id}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3"
                >
                  <RadioGroupItem value={r.id} id={`role-${r.id}`} />
                  <span className="text-sm">{r.label}</span>
                </label>
              ))}
            </RadioGroup>
          </div>

          <SingleSelectGroup
            label="نوع کسب‌وکار"
            value={profile.businessTypeId}
            options={businessTypeOptions}
            onChange={(id) => patch("businessTypeId", id)}
          />

          <SingleSelectGroup
            label="نوع کالاهای موردنیاز"
            value={profile.productNeedId}
            options={productNeedOptions}
            onChange={(id) => patch("productNeedId", id)}
          />

          <SingleSelectGroup
            label="وسعت کار"
            value={profile.workScaleId}
            options={workScaleOptions}
            onChange={(id) => patch("workScaleId", id)}
          />
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm text-muted-foreground">
          {saved ? "اطلاعات ذخیره شد." : " "}
        </span>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" onClick={handleLogout}>
            <LogOut className="size-4" />
            خروج
          </Button>
          <Button type="button" onClick={handleSave}>
            ذخیره تغییرات
          </Button>
        </div>
      </div>
    </div>
  );
}

function SingleSelectGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly { id: string; label: string }[];
  onChange: (id: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <RadioGroup
        value={value || undefined}
        onValueChange={onChange}
        className="grid gap-2"
        dir="rtl"
      >
        {options.map((o) => (
          <label
            key={o.id}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3"
          >
            <RadioGroupItem value={o.id} id={`${label}-${o.id}`} />
            <span className="text-sm">{o.label}</span>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
}

