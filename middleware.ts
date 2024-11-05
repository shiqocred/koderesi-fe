import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { baseUrl } from "./lib/utils";

const AUTH_PAGES = ["/auth"];
const ADMIN_PAGES = ["/admin"];

const isAuthPages = (url: string) =>
  AUTH_PAGES.some((page) => url.startsWith(page));

const isAdminPages = (url: string) =>
  ADMIN_PAGES.some((page) => url.startsWith(page));

export async function middleware(request: NextRequest) {
  const { url, nextUrl, cookies } = request;
  const token = cookies.get("accessToken")?.value;

  const isAuthPageRequested = isAuthPages(nextUrl.pathname);
  const isAdminPageRequested = isAdminPages(nextUrl.pathname);

  const res = await fetch(
    new URL(`https://koderesi.presensindo.my.id/api/auth/page`).href,
    {
      method: "GET",
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    }
  );

  const data = await res.json().then((res) => res.data?.role);

  if (data) {
    if (data === "superadmin") {
      if (isAuthPageRequested) {
        return NextResponse.redirect(new URL("/admin", url));
      }
      if (isAdminPageRequested) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/admin", url));
    } else if (data === "admin") {
      if (isAuthPageRequested) {
        return NextResponse.redirect(new URL("/", url));
      }
      if (isAdminPageRequested) {
        return NextResponse.redirect(new URL("/", url));
      }
      return NextResponse.next();
    }
  } else if (data === undefined) {
    if (isAuthPageRequested) {
      return NextResponse.next();
    }
    if (isAdminPageRequested) {
      return NextResponse.redirect(new URL("/auth/login", url));
    }
    return NextResponse.redirect(new URL("/auth/login", url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/admin/:path*",
    "/auth/:path*",
    "/affiliate/:path*",
    "/archives/:path*",
    "/dashboard/:path*",
    "/top-up/:path*",
    "/tracks/:path*",
    "/accounts/:path*",
    "/contacts/:path*",
  ],
};
