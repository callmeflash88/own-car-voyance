import { NextRequest, NextResponse } from "next/server";

const isTokenExpired = (token?: string): boolean => {
  if (!token) return true;
  try {
    const tokenPayloadStr = token.split(".")[1];
    const tokenPayload = JSON.parse(atob(tokenPayloadStr));
    return Math.floor(Date.now() / 1000) > tokenPayload?.exp;
  } catch (error) {
    return true;
  }
};

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token_carvoyance")?.value;
  const isExpired = isTokenExpired(accessToken);

  const { pathname } = request.nextUrl;
  const protectedRoutes = ["/profile", "/dashboard", "/orders"];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // 🔴 Если роут защищенный и токена нет или он протух — редирект на /login
  if (isProtected && (!accessToken || isExpired)) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const authPages = ["/login", "/sign-up"];
  const isAuthPage = authPages.some((route) => pathname.startsWith(route));

  // 🔴 Если пытаемся попасть на /login или /sign-up с валидным токеном — редирект на /profile
  if (isAuthPage && accessToken && !isExpired) {
    const profileUrl = new URL("/profile", request.url);
    return NextResponse.redirect(profileUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/dashboard/:path*",
    "/orders/:path*",
    "/login",
    "/sign-up",
  ],
};
