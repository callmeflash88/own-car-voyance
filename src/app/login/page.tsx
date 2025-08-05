// src/app/login/page.tsx
"use client";

import authBg from "@/../public/assets/backgrounds/authBg.jpg";
import logo from "@/../public/assets/whiteLogo.svg";
import Image from "next/image";

import { AuthFlowProvider } from "@/features/auth/model/AuthFlowContext";
import { AuthUI } from "@/features/auth/ui/AuthUI";
import { Suspense } from "react";
import { AuthSideContent } from "@/features/auth/ui/AuthSideContent";

export default function LoginPage() {
  return (
    <AuthFlowProvider>
      <div className="flex min-w-[100vw] min-h-[100vh] p-0 m-0">
        <Suspense>
          <AuthUI />
        </Suspense>
        <div
          className="hidden md:block relative flex-1 min-h-[100vh] bg-cover bg-center bg-no-repeat overflow-hidden"
          style={{ backgroundImage: `url(${authBg.src})` }}
        >
          <div className="absolute top-6 left-6">
            <Image src={logo} alt="logo" width={200} />
          </div>

          <AuthSideContent />
        </div>
      </div>
    </AuthFlowProvider>
  );
}
