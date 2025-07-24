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
  const needsVerification =
    request.cookies.get("register_verification")?.value === "false";

  const { pathname, searchParams } = request.nextUrl;

  // Защищённые страницы
  const protectedRoutes = [
    "/profile-search",
    "/profile",
    "/settings",
    "/dashboard",
    "/orders",
    "/chat",
  ];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // ⛔️ Пользователь неавторизован — на login
  if (isProtected && (!accessToken || isExpired)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔁 Нужна верификация — направляем на login?step=verification-phone
  if (isProtected && accessToken && !isExpired && needsVerification === true) {
    const verifyUrl = new URL("/login", request.url);
    verifyUrl.searchParams.set("step", "verification-phone");
    return NextResponse.redirect(verifyUrl);
  }

  // ✅ Уже на verification step — проверим, имеет ли право
  if (
    pathname === "/login" &&
    searchParams.get("step") === "verification-phone"
  ) {
    if (!accessToken || isExpired || !needsVerification) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // 🔒 Авторизован, но на login или sign-up — редиректим на profile
  const isAuthPage = ["/login", "/sign-up"].some((route) =>
    pathname.startsWith(route)
  );
  if (isAuthPage && accessToken && !isExpired && !needsVerification) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile",
    "/profile/:path*",
    "/profile-search",
    "/settings",
    "/dashboard",
    "/dashboard/:path*",
    "/orders",
    "/orders/:path*",
    "/login",
    "/chat",
    "/sign-up",
    "/verification",
  ],
};
