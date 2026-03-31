import { NextResponse, type NextRequest } from "next/server";

const TOKEN_COOKIE = "azpey_auth_token";

function isPublicPath(pathname: string): boolean {
  // صفحات عمومی
  if (pathname === "/login") return true;
  if (pathname === "/register") return true;

  // فایل‌های Next و استاتیک‌ها
  if (pathname.startsWith("/_next")) return true;
  if (pathname.startsWith("/api")) return true;
  if (pathname === "/favicon.ico") return true;

  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) return NextResponse.next();

  const token = request.cookies.get(TOKEN_COOKIE)?.value;
  if (token) {
    // روت را برای کاربر وارد شده به داشبورد بفرست
    if (pathname === "/") {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  // همه مسیرها به جز فایل‌های دارای پسوند (مثل .png/.css)
  matcher: ["/((?!.*\\..*).*)"],
};

