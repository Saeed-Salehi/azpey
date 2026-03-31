import type { Product } from "@/types/commerce";

export const products: Product[] = [
  {
    id: "p1",
    name: "سیمان تیپ ۲ خاکستری",
    price: 235000,
    unit: "کیسه ۵۰ کیلوگرم",
    tags: ["سازه", "سیمان"],
    suppliers: [
      { id: "s1", name: "سازمان تامین تهران", province: "تهران", city: "تهران" },
      { id: "s2", name: "بتن گستر پارس", province: "فارس", city: "شیراز" },
    ],
    discountPercent: 8,
    image: "/file.svg",
  },
  {
    id: "p2",
    name: "میلگرد آجدار A3 سایز ۱۶",
    price: 31200000,
    unit: "تن",
    tags: ["فولاد", "سازه"],
    suppliers: [
      { id: "s3", name: "فولاد مشرق", province: "خراسان رضوی", city: "مشهد" },
    ],
    image: "/globe.svg",
  },
  {
    id: "p3",
    name: "کاشی پرسلان ۶۰×۶۰",
    price: 485000,
    unit: "متر مربع",
    tags: ["نازک کاری", "کاشی"],
    suppliers: [
      { id: "s4", name: "سرامیک آذین", province: "اصفهان", city: "اصفهان" },
      { id: "s5", name: "خانه کاشی تبریز", province: "آذربایجان شرقی", city: "تبریز" },
    ],
    discountPercent: 12,
    image: "/window.svg",
  },
  {
    id: "p4",
    name: "لوله پلی‌اتیلن ۶ بار",
    price: 189000,
    unit: "متر",
    tags: ["تاسیسات", "لوله"],
    suppliers: [
      { id: "s6", name: "تاسیسات نوین", province: "خوزستان", city: "اهواز" },
    ],
    image: "/next.svg",
  },
  {
    id: "p5",
    name: "سنگ نما تراورتن عباس‌آباد",
    price: 690000,
    unit: "متر مربع",
    tags: ["نما", "سنگ"],
    suppliers: [
      { id: "s7", name: "سنگ سازه", province: "تهران", city: "ری" },
      { id: "s8", name: "سنگستان", province: "کرمان", city: "کرمان" },
    ],
    discountPercent: 5,
    image: "/vercel.svg",
  },
  {
    id: "p6",
    name: "رنگ اکریلیک نیمه براق",
    price: 420000,
    unit: "سطل ۱۲ کیلو",
    tags: ["رنگ", "نازک کاری"],
    suppliers: [
      { id: "s9", name: "رنگ و رزین شرق", province: "مازندران", city: "ساری" },
    ],
    image: "/file.svg",
  },
];

export const allTags = Array.from(new Set(products.flatMap((p) => p.tags)));

export const allLocations = Array.from(
  new Set(
    products.flatMap((product) =>
      product.suppliers.map((s) => `${s.province} - ${s.city}`),
    ),
  ),
);

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

