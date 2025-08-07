"use client";
import Image from "next/image";
import logo from "@/shared/assets/waitList/logo.svg";
import waitListLogo from "../../../public/assets/icons/waitlistLogo.svg";
import waitListPhone from "@/shared/assets/waitList/waitListPhone.svg";
import waitListPhoneMobile from "@/shared/assets/waitList/waitListPhoneMobile.png";
import { Instagram, Phone } from "lucide-react";
import { Button, Input } from "@/shared/ui";
import { FaTiktok } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";

import { useWaitlist } from "./lib/useWaitList";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import ContactSwitcher from "./ContactSwitcher";
import { PhoneInput } from "./PhoneInput";
import WaitlistModal from "./WaitListModal";

export default function WaitlistPage() {
  const {
    email,
    setEmail,
    phone,
    setPhone,
    handleSubmit,
    code,
    setCode,
    isCodeSent,
    isVerified,
    verifyCode,
  } = useWaitlist();
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [isPhoneConsentChecked, setIsPhoneConsentChecked] = useState(false);
  const [isMailForm, setIsMailForm] = useState(false);
  const [isFormShow, setIsFormShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative overflow-hidden">
      <header className="mt-6 h-[88px] w-full bg-cover bg-center px-10 lg:px-[160px] flex justify-between lg:justify-between items-center z-20 relative">
        <Image
          src={logo}
          alt="logo"
          className="max-w-none !w-[80px] lg:w-[100px]"
        />
        <ul className="flex gap-10 justify-center items-center font-inter">
          {["Home", "Download", "About Us", "Contact"].map((item) => (
            <li
              key={item}
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer hover:underline lg:block hidden"
            >
              {item}
            </li>
          ))}
          <div className="flex flex-col justify-between w-6 h-4 ml-6 cursor-pointer">
            <span className="block h-[2px] w-8 bg-[#4E17E5] rounded-full"></span>
            <span className="block h-[2px] w-8 bg-[#4E17E5] rounded-full"></span>
          </div>
        </ul>
      </header>

      {/* <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-[#6F76F2] rounded-full blur-[200px] opacity-20 z-0 pointer-events-none" /> */}

      <div className="relative z-10 max-w-[100vw] overflow-hidden min-h-[80vh] mt-10 lg:mt-0 px-4 lg:px-[160px] flex flex-col xl:flex-row items-center justify-between">
        <div className="flex flex-col justify-center items-center lg:items-start lg:flex-1">
          <h2 className="font-medium text-[80px] lg:text-[140px] leading-[120%] tracking-[0%] font-inter">
            COMING
            <br /> <span className="text-[#4E17E5]">Fall 2025</span>
          </h2>

          {/*  */}
          {isFormShow && (
            <div className="w-full max-w-[600px] mt-4">
              <div className="w-full border-2 border-[#292929] rounded-full flex justify-between transition-all">
                <button
                  onClick={() => setIsMailForm(false)}
                  className={`w-1/2 px-4 py-2 rounded-full text-sm font-medium font-inter transition-all duration-200 ${
                    !isMailForm
                      ? "bg-[#292929] text-white"
                      : "bg-transparent text-[#292929]"
                  }`}
                >
                  Phone
                </button>
                <button
                  onClick={() => setIsMailForm(true)}
                  className={`w-1/2 px-4 py-2 rounded-full text-sm font-medium font-inter transition-all duration-200 ${
                    isMailForm
                      ? "bg-[#292929] text-white"
                      : "bg-transparent text-[#292929]"
                  }`}
                >
                  Email
                </button>
              </div>

              <div className="flex flex-col justify-start mt-7 gap-4 w-full">
                {isMailForm ? (
                  <Input
                    label="Stay Updated Via Email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                    autoComplete="email"
                    inputMode="email"
                  />
                ) : (
                  <>
                    <PhoneInput
                      label="Stay Updated Via Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full"
                      icon={<Phone size={16} />}
                      iconPosition="left"
                    />
                    <label className="text-sm flex items-start gap-2 mt-2">
                      <input
                        type="checkbox"
                        checked={isPhoneConsentChecked}
                        onChange={(e) =>
                          setIsPhoneConsentChecked(e.target.checked)
                        }
                        className="mt-1"
                      />
                      <span className="text-[#2B2B2B80]">
                        By submitting your phone number, you agree to receive
                        SMS updates from CarVoyance. Message & data rates may
                        apply.
                      </span>
                    </label>
                  </>
                )}

                {isCodeSent && !isVerified && (
                  <>
                    <Input
                      label="Enter verification code"
                      type="text"
                      placeholder="123456"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full"
                      inputMode="numeric"
                    />
                    <Button
                      variant="secondary"
                      size="md"
                      className="w-full py-3"
                      onClick={verifyCode}
                    >
                      Verify Code
                    </Button>
                  </>
                )}

                {!isCodeSent && (
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full py-3"
                    onClick={() =>
                      handleSubmit(isMailForm, isPhoneConsentChecked)
                    }
                  >
                    Submit
                  </Button>
                )}
              </div>
            </div>
          )}

          {/*  */}

          <div
            className={`w-full flex flex-col justify-center mt-5 ${
              isFormShow ? "items-start" : "items-center"
            }`}
          >
            {!isFormShow && (
              <Button
                variant="primary"
                size="lg"
                className="py-3 px-14"
                onClick={() => setIsFormShow(true)}
              >
                Join The Waitlist
              </Button>
            )}

            <p className="font-normal text-[18px] leading-[155%] tracking-[0%] font-inter mt-5">
              One platform. Endless possibilities.
              <br className="block lg:hidden" /> Welcome to the future of car
              ownership
            </p>
          </div>
        </div>

        <div className="relative flex justify-end items-center lg:flex-1">
          <Image
            src={waitListPhone}
            alt="waitlist"
            width={600}
            height={1000}
            priority
            className="object-contain hidden lg:block relative z-10"
          />
          <Image
            src={waitListPhoneMobile}
            alt="waitlist"
            width={600}
            height={1000}
            priority
            className="object-contain block lg:hidden relative z-10 mt-8"
          />
          {/* <Image
            src={waitListImage}
            alt="waitlist"
            width={600}
            height={1000}
            priority
            className="object-contain hidden lg:block relative z-10"
          />
          <Image
            src={waitListMobile}
            alt="waitlist"
            width={600}
            height={1000}
            priority
            className="object-contain block lg:hidden relative z-10"
          /> */}
        </div>
      </div>

      <footer className="bg-[#5511EE] relative z-10 px-4 lg:px-[160px] h-[62px] flex items-center justify-between text-white">
        <div className="flex flex-col justify-center items-start gap-2">
          <a
            href="https://app.termly.io/policy-viewer/policy.html?policyUUID=69dca727-6b6b-487b-ab63-a498cf38780d"
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter text-sm text-center block lg:hidden"
          >
            Privacy Policy
          </a>
          <p className="font-inter text-sm text-center">
            © 2025 CarVoyance{""}
            <span className="hidden lg:inline">. All Rights Reserved.</span>
          </p>
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          <a
            href="https://app.termly.io/policy-viewer/policy.html?policyUUID=69dca727-6b6b-487b-ab63-a498cf38780d"
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter text-sm text-center hidden lg:block"
          >
            Privacy Policy
          </a>
        </div>
      </footer>

      {isModalOpen && <WaitlistModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
