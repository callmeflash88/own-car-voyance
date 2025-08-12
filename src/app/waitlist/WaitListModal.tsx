// components/WaitlistModal.tsx
"use client";

import { X } from "lucide-react";
import { Button } from "@/shared/ui";
import { useEffect } from "react";

export default function WaitlistModal({
  onClose,
  setIsFormShow,
}: {
  onClose: () => void;
  setIsFormShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-white rounded-xl p-8 w-[90vw] lg:max-w-[800px] max-h-[350px] lg:w-full text-center shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={30} color="#000" />
        </button>
        <div className="my-14">
          <h2 className=" font-normal text-[40px] lg:text-[60px] leading-[100%] tracking-[0%] uppercase">
            COMING SOON
          </h2>
          <p className="font-inter font-semibold text-[16px] leading-[1.4] tracking-[0] text-center text-[#00000099] mt-7">
            We’re working hard to launch soon.{" "}
            <br className="block lg:hidden" />
            <br className="hidden lg:block" /> Join the waitlist to be the first
            to know <br className="block lg:hidden" /> when we go live
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                onClose();
                setIsFormShow(true);
              }}
            >
              Join The Waitlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
