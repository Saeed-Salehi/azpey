"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { LogoMark } from "@/components/brand/logo-mark";
import { PhoneOtpForm } from "@/components/auth/phone-otp-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createMockToken, setAuthToken } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  function getNextPath(): string {
    const next = new URLSearchParams(window.location.search).get("next");
    if (!next) return "/dashboard";
    // فقط مسیرهای داخلی را قبول می‌کنیم
    if (!next.startsWith("/")) return "/dashboard";
    if (next.startsWith("//")) return "/dashboard";
    return next;
  }

  function handleVerified() {
    setAuthToken(createMockToken());
    router.push(getNextPath());
    router.refresh();
  }

  return (
    <Card className="border-border/80 bg-card/95 shadow-xl backdrop-blur-sm">
      <CardHeader className="space-y-4 text-center">
        <div className="flex justify-center">
          <LogoMark />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-2xl">ورود به ازپی</CardTitle>
          <CardDescription>
            پلتفرم خرید و فروش عمده برای کسب‌وکارهای ساخت‌وساز
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <PhoneOtpForm submitLabel="ورود" onVerified={handleVerified} />
        <p className="text-center text-sm text-muted-foreground">
          حساب ندارید؟{" "}
          <Link
            href="/register"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            ثبت‌نام سازمانی
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
