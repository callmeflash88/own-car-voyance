// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { LoginForm } from "@/features/auth/ui/LoginForm";
// import { RegisterForm } from "@/features/auth/ui/RegisterForm";
import authBg from "../../../public/assets/backgrounds/authBg.jpg";
import logo from "../../../public/assets/whiteLogo.svg";
import car from "../../../public/assets/images/audi.png";
import Image from "next/image";
import { RegisterForm } from "@/features/auth/ui/RegisterForm";
import { Checkbox } from "@radix-ui/react-checkbox";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  console.log("isLogin", isLogin);

  return (
    <div className="flex min-w-[100vw] min-h-[100vh] p-0 m-0">
      <div className="flex-1 w-full  flex items-center justify-center">
        {/* <LoginForm onSwitch={() => setIsLogin(false)} /> */}
        <RegisterForm onSwitch={() => setIsLogin(true)} />
      </div>

      <div
        className="relative flex-1 min-h-[100vh] bg-cover bg-center"
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
              Browse verified listings, check vehicle history by <br /> VIN, and
              connect with trusted sellers — all in
              <br /> one seamless platform
            </p>
          </div>
          <div className="flex-1 overflow-hidden">
            <Image
              src={car}
              alt="car"
              className="w-full h-full overflow-hidden"
            />
          </div>
        </div>
      </div>
    </div>

    //OLD
    // <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
    //   <div className="container max-w-md">
    //     {isLogin ? (
    //       <LoginForm onSwitch={() => setIsLogin(false)} />
    //     ) : (
    //       <RegisterForm onSwitch={() => setIsLogin(true)} />
    //     )}
    //   </div>
    // </div>
  );
}
