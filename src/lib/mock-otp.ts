/** فقط برای توسعه فرانت؛ هر کد ۶ رقمی معتبر است. */
export const MOCK_OTP_HINT = "123456";

export function isValidIranMobile(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return /^09\d{9}$/.test(digits);
}

export function normalizeIranMobile(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function verifyMockOtp(code: string): boolean {
  const c = code.replace(/\D/g, "");
  return /^\d{6}$/.test(c);
}
