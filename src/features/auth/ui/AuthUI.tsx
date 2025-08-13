"use client";

import Image from "next/image";
import { useAuthFlow } from "@/features/auth/model/AuthFlowContext";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { CheckOtpForm } from "./CheckOtpForm";
import { CreatePasswordForm } from "./CreatePasswordForm";
import { VaerificatePhone } from "./VaerificatePhone";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { AudiImage } from "./AudiImage";
import { PhotoRoomCarImage } from "./PhotoRoomCarImage";

import authBg from "@/../public/assets/backgrounds/authBg.jpg";
import logo from "@/../public/assets/whiteLogo.svg";
import { TeslaImage } from "./TeslaImage";

export const AuthUI = () => {
  const { step, setStep } = useAuthFlow();
  const searchParams = useSearchParams();

  useEffect(() => {
    const queryStep = searchParams.get("step");
    if (queryStep) {
      setStep(queryStep as any);
    }
  }, [searchParams]);

  const isAudiImage = step === "login" || step === "create";
  const isPhotoRoomCarImage =
    step === "register" || step === "verification-phone";
  const isTeslaImage = step === "forgot" || step === "otp";

  const formBottomMargin = useMemo(() => {
    if (step === "register" || step === "otp" || step === "forgot")
      return "mb-42";
    return "mb-24";
  }, [step]);

  return (
    <div className="relative overflow-hidden flex-1 flex-col w-full flex items-center  justify-start !z-10 md:justify-center">
      {/* background image */}
      <div
        className="absolute w-full h-full md:hidden bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${authBg.src})` }}
      />

      {/* logo */}
      <div className="z-0 mt-6 md:hidden">
        <Image src={logo} alt="logo" width={200} />
      </div>
      <div
        className={`bg-white rounded-[20px] mt-12 ${formBottomMargin} mx-4 py-6 px-4 z-1 md:mx-0 md:mt-0 md:mb-0`}
      >
        {step === "login" && <LoginForm />}
        {step === "register" && <RegisterForm />}
        {step === "forgot" && <ForgotPasswordForm />}
        {step === "otp" && <CheckOtpForm />}
        {step === "create" && <CreatePasswordForm />}
        {step === "verification-phone" && <VaerificatePhone />}
      </div>
      {/* mobile backgrounds */}
      {isAudiImage && <AudiImage isMobileView />}
      {isPhotoRoomCarImage && <PhotoRoomCarImage isMobileView />}
      {isTeslaImage && <TeslaImage isMobileView />}
    </div>
  );
};
