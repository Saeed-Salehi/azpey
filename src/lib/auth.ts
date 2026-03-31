import type { RegistrationProfile } from "@/types/auth";

const TOKEN_KEY = "azpey_auth_token";
const PROFILE_KEY = "azpey_registration_profile";
const TOKEN_COOKIE = "azpey_auth_token";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
  document.cookie = `${TOKEN_COOKIE}=${encodeURIComponent(token)}; Path=/; SameSite=Lax`;
}

export function saveRegistrationProfile(profile: RegistrationProfile): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function loadRegistrationProfile(): RegistrationProfile | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(PROFILE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as RegistrationProfile;
  } catch {
    return null;
  }
}

export function clearAuth(): void {
  if (typeof window !== "undefined") {
    document.cookie = `${TOKEN_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
  }
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(PROFILE_KEY);
}

export function createMockToken(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `mock_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}
