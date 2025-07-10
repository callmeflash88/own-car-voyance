"use client";
import Image from "next/image";
import bgWaitlist from "../../../public/assets/backgrounds/bgWaitlistHeader.jpg";
import waitListLogo from "../../../public/assets/icons/waitlistLogo.svg";
import waitListImage from "../../../public/assets/images/waitList3.svg";
import waitListMobile from "../../../public/assets/images/waitListMobile.svg";
import { Instagram, Phone } from "lucide-react";
import { Button, Input } from "@/shared/ui";
import { FaTiktok } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";

import { useWaitlist } from "./lib/useWaitList";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import ContactSwitcher from "./ContactSwitcher";
import { PhoneInput } from "./PhoneInput";

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

  return (
    <div className="relative overflow-hidden">
      <header
        className="h-[88px] w-full bg-cover bg-center px-[160px] flex justify-center lg:justify-between items-center z-20 relative"
        style={{
          backgroundImage: `url(${bgWaitlist.src})`,
        }}
      >
        <Image
          src={waitListLogo}
          alt="logo"
          className="max-w-none !w-[240px] lg:w-[100px]"
        />
        <div className="hidden gap-4 lg:flex">
          <a
            href="https://www.instagram.com/carvoyance"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white inline-flex items-center justify-center"
          >
            <Instagram size={16} />
          </a>
          <a
            href="https://www.tiktok.com/@carvoyance"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white inline-flex items-center justify-center"
          >
            <FaTiktok />
          </a>
          <a
            href="https://www.threads.com/@carvoyance"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white inline-flex items-center justify-center"
          >
            <FaThreads />
          </a>
        </div>
      </header>

      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-[#6F76F2] rounded-full blur-[200px] opacity-20 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-[100vw] overflow-hidden min-h-[80vh] mt-10 lg:mt-0 px-4 lg:px-[160px] flex flex-col xl:flex-row items-center justify-between">
        {/* <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-[#6F76F2] rounded-full blur-[200px] opacity-20 z-0 pointer-events-none" /> */}

        <div className="flex flex-col justify-center items-center lg:items-start lg:flex-1">
          <h4 className="font-inter font-semibold text-2xl uppercase text-[#4E17E5]">
            Coming soon
          </h4>
          <h1 className="font-inter font-semibold text-[36px] lg:text-5xl mt-3 text-center lg:text-left leading-normal lg:leading-[64px]">
            Be the first to know
            <br /> when CarVoyance
            <br /> is ready!
          </h1>

          <p className="mt-3 font-inter text-base text-center lg:text-left text-[#2B2B2B]">
            Sign up to join our waitlist and get{" "}
            <br className="block lg:hidden" /> notified as soon as we go live!
          </p>

          {/*  */}
          <div className="w-full max-w-[500px] border-2 border-[#292929] rounded-full mt-4 flex justify-between transition-all">
            <button
              onClick={() => setIsMailForm(false)}
              className={`w-full px-4 py-2 rounded-full text-sm font-medium font-inter transition-all duration-200 ${
                !isMailForm
                  ? "bg-[#292929] text-white"
                  : "bg-transparent text-[#292929]"
              }`}
            >
              Phone
            </button>
            <button
              onClick={() => setIsMailForm(true)}
              className={`w-full px-4 py-1 rounded-full text-sm font-medium font-inter transition-all duration-200 ${
                isMailForm
                  ? "bg-[#292929] text-white"
                  : "bg-transparent text-[#292929]"
              }`}
            >
              Email
            </button>
          </div>

          <div className="flex flex-col justify-start mt-7 gap-2">
            {isMailForm ? (
              <Input
                label="Stay Updated Via mail"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="!w-[80vw]  lg:!w-[470px]"
                autoComplete="email"
                inputMode="email"
              />
            ) : (
              <>
                <PhoneInput
                  label="Stay Updated Via Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className=""
                  icon={<Phone size={16} />}
                  iconPosition="left"
                />
                <label className="text-sm flex items-start gap-2 mt-2 w-[500px]">
                  <input
                    type="checkbox"
                    checked={isPhoneConsentChecked}
                    onChange={(e) => setIsPhoneConsentChecked(e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-[#2B2B2B80]">
                    By submitting your phone number, you agree to receive SMS
                    updates from CarVoyance. Message & data rates may apply.
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
                  className="!w-[80vw] h-[5vh] lg:!w-[400px]"
                  inputMode="numeric"
                />
                <Button
                  variant="secondary"
                  size="md"
                  className="px-10 w-full py-3"
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
                className="px-10 w-full py-3"
                onClick={() => handleSubmit(isMailForm, isPhoneConsentChecked)}
              >
                Submit
              </Button>
            )}
          </div>
        </div>
        <div className="relative flex justify-end items-center lg:flex-1">
          <Image
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
          />
        </div>
      </div>

      <footer className="relative z-10 px-4 lg:px-[160px] h-[88px] flex items-center justify-between">
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
          <div className="flex gap-4 lg:hidden">
            <a
              href="https://www.instagram.com/carvoyance"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white inline-flex items-center justify-center"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://www.tiktok.com/@carvoyance"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white inline-flex items-center justify-center"
            >
              <FaTiktok />
            </a>
            <a
              href="https://www.threads.com/@carvoyance"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white inline-flex items-center justify-center"
            >
              <FaThreads />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
