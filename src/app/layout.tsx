import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";

import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ازپی — خرید و فروش عمده ساخت‌وساز",
    template: "%s | ازپی",
  },
  description:
    "پلتفرم B2B برای تأمین و فروش مصالح و خدمات ساخت‌وساز به صورت عمده.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} h-full`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
