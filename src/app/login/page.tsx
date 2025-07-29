// src/app/login/page.tsx
"use client";

import authBg from "../../../public/assets/backgrounds/authBg.jpg";
import logo from "../../../public/assets/whiteLogo.svg";
import car from "../../../public/assets/images/audi.png";
import Image from "next/image";

import { AuthFlowProvider } from "@/features/auth/model/AuthFlowContext";
import { AuthUI } from "@/features/auth/ui/AuthUI";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <AuthFlowProvider>
      <div className="flex min-w-[100vw] min-h-[100vh] p-0 m-0">
        <Suspense>
          <AuthUI />
        </Suspense>
        <div
          className="relative flex-1 min-h-[100vh] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${authBg.src})` }}
        >
          <div className="absolute top-6 left-6">
            <Image src={logo} alt="logo" width={200} />
          </div>

          <div className="flex flex-col  pt-40 h-full">
            <div className="flex flex-col items-center">
              <h2 className="font-inter font-semibold text-4xl leading-tight tracking-normal text-white">
                Explore Smarter Car Deals
              </h2>
              <p className="mt-4  font-inter font-normal text-[16px] leading-tight tracking-normal text-center text-white">
                Browse verified listings, check vehicle history by <br /> VIN,
                and connect with trusted sellers — all in
                <br /> one seamless platform
              </p>
            </div>
            <div className="absolute bottom-0 right-[-5%] w-[110%] z-0 pointer-events-none">
              <Image src={car} alt="car" className="w-full h-auto" priority />
            </div>
          </div>
        </div>
      </div>
    </AuthFlowProvider>
  );
}
