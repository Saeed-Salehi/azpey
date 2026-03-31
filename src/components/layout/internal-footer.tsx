import Link from "next/link";

import { LogoMark } from "@/components/brand/logo-mark";

export function InternalFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-card/70">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <LogoMark className="size-10" />
            <p className="font-semibold">ازپی</p>
          </div>
          <p className="text-sm text-muted-foreground">
            پلتفرم خرید و فروش عمده برای سازمان‌ها و فعالان حوزه ساخت‌وساز.
          </p>
        </div>

        <div className="space-y-3">
          <p className="font-semibold">لینک‌های داخلی</p>
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">
              وبلاگ
            </Link>
            <Link href="#" className="hover:text-foreground">
              پشتیبانی
            </Link>
            <Link href="#" className="hover:text-foreground">
              درباره ما
            </Link>
            <Link href="#" className="hover:text-foreground">
              تماس با ما
            </Link>
            <Link href="#" className="hover:text-foreground">
              سوالات متداول
            </Link>
            <Link href="/dashboard" className="hover:text-foreground">
              صفحه اصلی
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-semibold">مجوزها</p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-md border border-border bg-muted px-3 py-2 text-xs">
              eNamad
            </span>
            <span className="rounded-md border border-border bg-muted px-3 py-2 text-xs">
              ساماندهی
            </span>
            <span className="rounded-md border border-border bg-muted px-3 py-2 text-xs">
              نشان ملی ثبت
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
