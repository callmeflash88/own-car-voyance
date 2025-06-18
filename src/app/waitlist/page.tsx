"use client";
import Image from "next/image";
import bgWaitlist from "../../../public/assets/backgrounds/bgWaitlistHeader.jpg";
import waitListLogo from "../../../public/assets/icons/waitlistLogo.svg";
import waitListImage from "../../../public/assets/images/waitList3.svg";
import waitListMobile from "../../../public/assets/images/waitListMobile.svg";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import { Button, Input } from "@/shared/ui";
import { useState } from "react";

function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;

  const regex = new RegExp(
    "^(?![\\.])(?!.*\\.\\.)" +
      "([A-Za-z0-9!#$%&'*+/=?^_`{|}~-]{1,64}" +
      "(?:\\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*)" +
      "@" +
      "([A-Za-z0-9]" +
      "(?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?" +
      "(?:\\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+)$"
  );

  const match = regex.exec(email);
  if (!match) return false;

  const local = match[1];
  return local.length <= 64;
}

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async () => {
    const trimmed = email.trim();
    if (!isValidEmail(trimmed)) {
      setError("Please enter a valid email.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbyw9-YNzVY4ubsB-GBXKMIjLM_Eng7uW15XBZ5LDB-eC4a29FuZ5PhHEWHmutSS87aA4A/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ email: trimmed }),
        }
      );

      const text = await res.text();
      setIsLoading(false);

      if (text === "Success") {
        setSuccess("Вы успешно подписались на ожидание! 🎉");
        setEmail("");
      } else {
        setError("Что-то пошло не так. Попробуйте ещё раз.");
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setError("Ошибка сети. Повторите попытку позже.");
    }
  };

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
          className="max-w-none !w-[400px] lg:w-[100px]"
        />
        <div className="hidden gap-4 md:flex">
          <div className="p-2 rounded-full bg-white">
            <Facebook fill="black" size={16} />
          </div>
          <div className="p-2 rounded-full bg-white">
            <Linkedin fill="black" size={16} />
          </div>
          <div className="p-2 rounded-full bg-white">
            <Twitter fill="black" size={16} />
          </div>
        </div>
      </header>

      <div className="absolute lg:hidden bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 w-[700px] h-[700px] bg-[#6F76F2] rounded-full opacity-20 blur-[100px] z-0 pointer-events-none" />

      <div className="relative z-10 max-w-[100vw] overflow-hidden min-h-[80vh] mt-10 lg:mt-0 px-4 lg:px-[160px] flex flex-col xl:flex-row items-center justify-between">
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-[#6F76F2] rounded-full blur-[100px] opacity-20 z-0 pointer-events-none" />

        <div className="flex flex-col justify-center items-center lg:items-start lg:flex-1">
          <h4 className="font-inter font-semibold text-2xl uppercase text-[#4E17E5]">
            Coming soon
          </h4>
          <h1 className="font-inter font-semibold text-[36px] lg:text-5xl mt-3 text-center lg:text-left">
            Be the first to know
            <br /> when CarVoyance is ready!
          </h1>
          <p className="mt-3 font-inter text-base text-center lg:text-left text-[#2B2B2B]">
            Sign up to join our waitlist and get{" "}
            <br className="block lg:hidden" /> notified as soon as we go live!
          </p>

          <div className="flex flex-col lg:flex-row justify-start mt-7 gap-2">
            <div className="flex flex-col w-full lg:w-[400px]">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="!w-[80vw] h-[5vh] lg:!w-[400px]"
                autoComplete="email"
                inputMode="email"
                disabled={isLoading}
              />
              {error && (
                <p className="text-red-500 text-sm mt-1 text-left">{error}</p>
              )}
              {success && (
                <p className="text-green-500 text-sm mt-1 text-left">
                  {success}
                </p>
              )}
            </div>
            <Button
              variant="primary"
              size="md"
              className="px-10 w-full py-5 lg:w-[200px]"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Отправка…" : "Notify Me"}
            </Button>
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
        <p className="font-inter text-sm text-center">
          © 2025 CarVoyance.{" "}
          <span className="hidden lg:inline">All Rights Reserved.</span>
        </p>
        <p className="font-inter text-sm text-center">Privacy Policy</p>
      </footer>
    </div>
  );
}
