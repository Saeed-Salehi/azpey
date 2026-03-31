"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import { citiesByProvince, provinces } from "@/data/iran-locations";
import {
  businessTypeOptions,
  productNeedOptions,
  roleOptions,
  workScaleOptions,
} from "@/data/registration-options";
import { saveRegistrationProfile } from "@/lib/auth";
import {
  emptyRegistrationProfile,
  type RegistrationProfile,
  type UserRole,
} from "@/types/auth";

const STEPS = 6;

type RegistrationWizardProps = {
  onFinish: () => void;
};

export function RegistrationWizard({ onFinish }: RegistrationWizardProps) {
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState<RegistrationProfile>(
    emptyRegistrationProfile,
  );

  const cityList =
    data.provinceId && citiesByProvince[data.provinceId]
      ? citiesByProvince[data.provinceId]
      : [];

  function patch<K extends keyof RegistrationProfile>(
    key: K,
    value: RegistrationProfile[K],
  ) {
    setData((d) => {
      const next = { ...d, [key]: value };
      if (key === "provinceId") {
        next.city = "";
      }
      return next;
    });
  }

  function handleSkipAll() {
    saveRegistrationProfile(emptyRegistrationProfile());
    onFinish();
  }

  function handleComplete() {
    saveRegistrationProfile(data);
    onFinish();
  }

  function canGoNext(): boolean {
    return true;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          تکمیل اختیاری پروفایل — مرحله {step} از {STEPS}
        </p>
        <Button type="button" variant="ghost" size="sm" onClick={handleSkipAll}>
          رد کردن و ورود به پنل
        </Button>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${(step / STEPS) * 100}%` }}
        />
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">نام</Label>
              <Input
                id="firstName"
                value={data.firstName}
                onChange={(e) => patch("firstName", e.target.value)}
                placeholder="مثلاً علی"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">نام خانوادگی</Label>
              <Input
                id="lastName"
                value={data.lastName}
                onChange={(e) => patch("lastName", e.target.value)}
                placeholder="مثلاً رضایی"
              />
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>استان</Label>
              <Select
                value={data.provinceId || undefined}
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
                value={data.city || undefined}
                onValueChange={(v) => patch("city", v)}
                disabled={!data.provinceId}
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
            <Label htmlFor="address">آدرس (پلاک، کوچه، …)</Label>
            <Input
              id="address"
              value={data.addressLine}
              onChange={(e) => patch("addressLine", e.target.value)}
              placeholder="جزئیات آدرس را وارد کنید"
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <Label>نقش شما در ازپی</Label>
          <RadioGroup
            value={data.role || undefined}
            onValueChange={(v) => patch("role", v as UserRole)}
            className="grid gap-3"
          >
            {roleOptions.map((r) => (
              <label
                dir="rtl"
                key={r.id}
                className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-card p-4 shadow-sm transition-colors hover:bg-accent/40 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring"
              >
                <RadioGroupItem value={r.id} id={r.id} className="mt-0.5" />
                <span className="space-y-1">
                  <span className="block font-medium">{r.label}</span>
                  <span className="block text-sm text-muted-foreground">
                    {r.description}
                  </span>
                </span>
              </label>
            ))}
          </RadioGroup>
        </div>
      )}

      {step === 4 && (
        <OptionGrid
          title="صاحب چه نوع کسب‌وکاری هستید؟"
          options={businessTypeOptions}
          value={data.businessTypeId}
          onChange={(id) => patch("businessTypeId", id)}
        />
      )}

      {step === 5 && (
        <OptionGrid
          title="بیشتر به چه نوع کالاهایی نیاز دارید؟"
          options={productNeedOptions}
          value={data.productNeedId}
          onChange={(id) => patch("productNeedId", id)}
        />
      )}

      {step === 6 && (
        <OptionGrid
          title="وسعت کار شما چقدر است؟"
          options={workScaleOptions}
          value={data.workScaleId}
          onChange={(id) => patch("workScaleId", id)}
        />
      )}

      <Separator />

      <div className="flex flex-col gap-2 sm:flex-row-reverse sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row-reverse">
          {step < STEPS ? (
            <Button
              type="button"
              onClick={() => canGoNext() && setStep((s) => s + 1)}
            >
              بعدی
              <ChevronRight className="size-4" />
            </Button>
          ) : (
            <Button type="button" onClick={handleComplete}>
              ذخیره و ورود به پنل
            </Button>
          )}
          {step > 1 ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
            >
              <ChevronLeft className="size-4" />
              قبلی
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function OptionGrid<T extends { id: string; label: string }>({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: readonly T[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="font-medium">{title}</p>
      <RadioGroup
        value={value || undefined}
        onValueChange={onChange}
        className="grid gap-2"
        dir="rtl"
      >
        {options.map((o) => (
          <label
            key={o.id}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card px-3 py-3 text-start shadow-sm transition-colors hover:bg-accent/40 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring"
          >
            <RadioGroupItem value={o.id} id={o.id} />
            <span className="text-sm font-medium">{o.label}</span>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
}
