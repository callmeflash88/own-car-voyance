"use client";

import Image from "next/image";
import { useAuthFlow } from "../model/AuthFlowContext";

import car from "@/../public/assets/images/audi.png";
import { AudiImage } from "./AudiImage";
import { PhotoRoomCarImage } from "./PhotoRoomCarImage";
import { TeslaImage } from "./TeslaImage";
import { SecondPhotoRoomCarImage } from "./SecondPhotoRoomCarImage";

export const AuthSideContent = () => {
  const { step } = useAuthFlow();

  const isRegisterOrVerifyStep =
    step === "register" || step === "verification-phone";

  const isAudiImage = step === "login";
  const isPhotoRoomCarImage = isRegisterOrVerifyStep;
  const isSecondPhotoRoomCarImage = step === "create";
  const isTeslaImage = step === "forgot" || step === "otp";

  const title = isRegisterOrVerifyStep
    ? "Welcome Back!"
    : "Explore Smarter Car Deals";
  const textContent = isRegisterOrVerifyStep ? (
    "Let’s get you back on the road — smarter."
  ) : (
    <>
      Browse verified listings, check vehicle history by <br /> VIN, and connect
      with trusted sellers — all in
      <br /> one seamless platform
    </>
  );

  return (
    <div className="flex flex-col pt-40 h-full">
      <div className="flex flex-col items-center">
        <h2 className="font-inter font-semibold text-4xl leading-tight tracking-normal text-center text-white ">
          {title}
        </h2>
        <p className="mt-4  font-inter font-normal text-[16px] leading-tight tracking-normal text-center text-white">
          {textContent}
        </p>
      </div>
      {isAudiImage && <AudiImage />}
      {isPhotoRoomCarImage && <PhotoRoomCarImage />}
      {isSecondPhotoRoomCarImage && <SecondPhotoRoomCarImage />}
      {isTeslaImage && <TeslaImage />}
    </div>
  );
};
