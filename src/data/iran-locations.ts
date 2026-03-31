export type Province = { id: string; name: string };

/** دادهٔ نمونه؛ بعداً با API جایگزین می‌شود. */
export const provinces: Province[] = [
  { id: "tehran", name: "تهران" },
  { id: "isfahan", name: "اصفهان" },
  { id: "fars", name: "فارس" },
  { id: "khorasan-razavi", name: "خراسان رضوی" },
  { id: "azerbaijan-east", name: "آذربایجان شرقی" },
  { id: "khuzestan", name: "خوزستان" },
  { id: "mazandaran", name: "مازندران" },
  { id: "kerman", name: "کرمان" },
];

export const citiesByProvince: Record<string, string[]> = {
  tehran: ["تهران", "ری", "شمیرانات", "اسلامشهر"],
  isfahan: ["اصفهان", "کاشان", "نجف‌آباد", "خمینی‌شهر"],
  fars: ["شیراز", "مرودشت", "کازرون", "لار"],
  "khorasan-razavi": ["مشهد", "نیشابور", "سبزوار", "قوچان"],
  "azerbaijan-east": ["تبریز", "مراغه", "مرند", "میانه"],
  khuzestan: ["اهواز", "آبادان", "دزفول", "اندیمشک"],
  mazandaran: ["ساری", "آمل", "بابل", "قائم‌شهر"],
  kerman: ["کرمان", "رفسنجان", "سیرجان", "جیرفت"],
};
