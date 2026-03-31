"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { LogoMark } from "@/components/brand/logo-mark";
import { PhoneOtpForm } from "@/components/auth/phone-otp-form";
import { RegistrationWizard } from "@/components/auth/registration-wizard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createMockToken, setAuthToken } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [phase, setPhase] = React.useState<"phone" | "profile">("phone");

  function getNextPath(): string {
    const next = new URLSearchParams(window.location.search).get("next");
    if (!next) return "/dashboard";
    if (!next.startsWith("/")) return "/dashboard";
    if (next.startsWith("//")) return "/dashboard";
    return next;
  }

  function handlePhoneVerified() {
    setAuthToken(createMockToken());
    setPhase("profile");
  }

  function handleProfileDone() {
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
          <CardTitle className="text-2xl">ثبت‌نام سازمانی</CardTitle>
          <CardDescription>
            ابتدا شماره موبایل را تأیید کنید؛ سپس در صورت تمایل پروفایل را تکمیل
            کنید.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {phase === "phone" ? (
          <>
            <PhoneOtpForm
              submitLabel="تأیید و ادامه"
              onVerified={handlePhoneVerified}
            />
            <p className="text-center text-sm text-muted-foreground">
              قبلاً ثبت‌نام کرده‌اید؟{" "}
              <Link
                href="/login"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                ورود
              </Link>
            </p>
          </>
        ) : (
          <RegistrationWizard onFinish={handleProfileDone} />
        )}
      </CardContent>
    </Card>
  );
}
