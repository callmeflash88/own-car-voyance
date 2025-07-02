"use client";
import Image from "next/image";
import logo from "../../../public/assets/logo.svg";
import { Heart, Plus, User } from "lucide-react";
import { Button } from "./Button";
import { useAppSelector } from "../lib/hooks";
import { useRouter } from "next/navigation";

export const Header = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useRouter();

  const handleUserClick = () => {
    if (!isAuthenticated) {
      navigate.push("/login");
    } else {
      navigate.push("/profile");
    }
  };

  return (
    <header className="bg-white px-[120px] h-[90px]">
      <div className="w-full h-full flex justify-between items-center">
        <div>
          <Image src={logo} alt="logo" width={200} />
        </div>
        <nav>
          <ul className="flex gap-8 justify-center items-center">
            <li className="cursor-pointer">Buy</li>
            <li className="cursor-pointer">Sell</li>
            <li className="cursor-pointer">Insurance</li>
            <li className="cursor-pointer">Vin Vault</li>
          </ul>
        </nav>
        <div className="flex items-center justify-center gap-5">
          <Button
            size="lg"
            variant="primary"
            iconLeft={<Plus className="w-4 h-4" />}
          >
            List your car
          </Button>
          <div className="w-[2px] h-12 bg-[#2B2B2B33]" />
          <div className="flex gap-3">
            <Heart />
            <User onClick={handleUserClick} />
          </div>
        </div>
      </div>
    </header>
  );
};
