// src/app/AppLayout.tsx
"use client";

import { usePathname } from "next/navigation";
import { Footer, Header } from "@/shared/ui";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/register"; // добавь сюда другие auth-страницы

  return (
    <>
      {!isAuthPage && <Header />}
      {children}
      {!isAuthPage && <Footer />}
    </>
  );
}
