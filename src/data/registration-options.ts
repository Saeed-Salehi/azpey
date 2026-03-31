import type { UserRole } from "@/types/auth";

export const businessTypeOptions = [
  { id: "contractor", label: "پیمانکار ساختمانی" },
  { id: "trader", label: "بازرگان / عمده‌فروش" },
  { id: "producer", label: "تولیدکننده مصالح" },
  { id: "developer", label: "سرمایه‌گذار / سازنده پروژه" },
  { id: "retail_chain", label: "فروشگاه زنجیره‌ای" },
  { id: "other", label: "سایر" },
] as const;

export const productNeedOptions = [
  { id: "cement_steel", label: "سیمان، فولاد و مصالح سازه‌ای" },
  { id: "finishing", label: "نازک‌کاری و دکوراسیون" },
  { id: "electrical_plumbing", label: "برق، تأسیسات و لوله‌کشی" },
  { id: "tools_machinery", label: "ابزار و ماشین‌آلات" },
  { id: "bulk_mixed", label: "ترکیبی / متنوع" },
] as const;

export const workScaleOptions = [
  { id: "small", label: "کوچک (پروژه‌های محدود)" },
  { id: "medium", label: "متوسط (چند پروژه همزمان)" },
  { id: "large", label: "بزرگ (تأمین مداوم و حجمی)" },
  { id: "enterprise", label: "سازمانی / چند شعبه‌ای" },
] as const;

export const roleOptions: { id: UserRole; label: string; description: string }[] =
  [
    {
      id: "buyer",
      label: "خریدار",
      description: "خرید عمده برای پروژه یا فروشگاه",
    },
    {
      id: "seller",
      label: "فروشنده",
      description: "عرضه محصول به خریداران سازمانی",
    },
  ];
