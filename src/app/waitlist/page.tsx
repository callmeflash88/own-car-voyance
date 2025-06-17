"use client";
import Image from "next/image";
import bgWaitlist from "../../../public/assets/backgrounds/bgWaitlistHeader.jpg";
import waitListLogo from "../../../public/assets/icons/waitlistLogo.svg";
import waitListImage from "../../../public/assets/images/waitList3.svg";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import { Button, Input } from "@/shared/ui";
import { useState } from "react";
import { NotificationService } from "@/shared/lib/NotificationService";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    debugger;
    if (!email || !email.includes("@")) {
      NotificationService.error("Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbyw9-YNzVY4ubsB-GBXKMIjLM_Eng7uW15XBZ5LDB-eC4a29FuZ5PhHEWHmutSS87aA4A/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ email }),
        }
      );

      const text = await res.text();
      NotificationService.dismiss();

      if (text === "Success") {
        NotificationService.success("You’ve been added to the waitlist! 🎉");
        setEmail("");
      } else {
        NotificationService.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log(error);
      NotificationService.dismiss();
      NotificationService.error("Network error. Please try again later.");
    }
  };

  return (
    <>
      <header
        className="h-[88px] w-full bg-cover bg-center px-[160px] flex justify-center lg:justify-between items-center"
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

      <div className="min-h-[80vh] mt-10 lg:mt-0 px-4 lg:px-[160px] flex flex-col xl:flex-row items-center justify-between">
        <div className="flex flex-col justify-center items-center lg:items-start lg:flex-1">
          <h4 className="font-inter font-semibold text-2xl uppercase text-[#4E17E5]">
            Coming soon
          </h4>
          <h1 className="font-inter font-semibold text-[36px] lg:text-5xl mt-3 text-center lg:text-left">
            Be the first to know
            <br /> when CarVoyance is ready!
          </h1>
          <p className="mt-3 font-inter text-base text-center lg:text-left text-[#2B2B2B]">
            Sign up to join our waitlist and get notified as soon as we go live!
          </p>

          <div className="flex flex-col lg:flex-row justify-start mt-7 gap-2">
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="!w-[400px]"
            />
            <Button
              variant="primary"
              size="md"
              className="px-10 w-full lg:w-[200px]"
              onClick={handleSubmit}
            >
              Notify Me
            </Button>
          </div>
        </div>

        <div className="flex justify-end items-center">
          <Image
            src={waitListImage}
            alt="waitlist"
            width={600}
            height={1000}
            priority
            className="object-contain"
          />
        </div>
      </div>

      <footer className="px-4 lg:px-[160px] h-[88px] flex items-center justify-between">
        <p className="font-inter text-sm text-center">
          © 2025 CarVoyance.{" "}
          <span className="hidden lg:inline">All Rights Reserved.</span>
        </p>
        <p className="font-inter text-sm text-center">Privacy Policy</p>
      </footer>
    </>
  );
}
