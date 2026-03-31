"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  isValidIranMobile,
  MOCK_OTP_HINT,
  normalizeIranMobile,
  verifyMockOtp,
} from "@/lib/mock-otp";

type PhoneOtpFormProps = {
  submitLabel: string;
  onVerified: (phone: string) => void;
};

export function PhoneOtpForm({ submitLabel, onVerified }: PhoneOtpFormProps) {
  const [phone, setPhone] = React.useState("");
  const [otpSent, setOtpSent] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const digits = normalizeIranMobile(phone);

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!isValidIranMobile(digits)) {
      setError("شماره موبایل معتبر وارد کنید (۱۱ رقم، با ۰۹).");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setOtpSent(true);
    setLoading(false);
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!verifyMockOtp(otp)) {
      setError("کد تأیید باید ۶ رقم باشد.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    onVerified(digits);
  }

  return (
    <div className="space-y-6">
      {!otpSent ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">شماره موبایل</Label>
            <Input
              id="phone"
              dir="ltr"
              inputMode="tel"
              autoComplete="tel"
              placeholder="09123456789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="text-left"
            />
            <p className="text-xs text-muted-foreground">
              در محیط آزمایشی، هر شماره معتبر قابل استفاده است. کد نمونه:{" "}
              <span dir="ltr" className="font-mono">
                {MOCK_OTP_HINT}
              </span>
            </p>
          </div>
          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                در حال ارسال…
              </>
            ) : (
              "ارسال کد تأیید"
            )}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">کد تأیید</Label>
            <Input
              id="otp"
              dir="ltr"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="------"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="text-center font-mono text-lg tracking-[0.4em]"
            />
            <p className="text-xs text-muted-foreground">
              کد به شماره{" "}
              <span dir="ltr" className="font-mono">
                {digits}
              </span>{" "}
              ارسال شد (شبیه‌سازی).
            </p>
          </div>
          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
          <div className="flex flex-col gap-2 sm:flex-row-reverse">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  در حال بررسی…
                </>
              ) : (
                submitLabel
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              disabled={loading}
              onClick={() => {
                setOtpSent(false);
                setOtp("");
                setError(null);
              }}
            >
              تغییر شماره
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
