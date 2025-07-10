"use client";
import Image from "next/image";
import logo from "../../../public/assets/logo.svg";
import { Heart, Plus, User, Menu, X } from "lucide-react";
import { Button } from "./Button";
import { useAppSelector } from "../lib/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Header = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleUserClick = () => {
    navigate.push("/profile-search");
  };

  return (
    <header className="bg-white px-6 md:px-[120px] h-[70px] md:h-[90px] relative z-50">
      <div className="w-full h-full flex justify-between items-center">
        {/* Logo */}
        <div>
          <Image src={logo} alt="logo" width={160} height={40} />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex gap-8 justify-center items-center">
            <li className="cursor-pointer">Buy</li>
            <li className="cursor-pointer">Sell</li>
          </ul>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center justify-center gap-5">
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

        {/* Mobile Burger */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen((prev) => !prev)}>
            {isMenuOpen ? (
              <X className="w-6 h-6 text-black" />
            ) : (
              <Menu className="w-6 h-6 text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-white shadow-md p-6 flex flex-col gap-4 md:hidden z-40">
          <a href="#" className="text-black">
            Buy
          </a>
          <a href="#" className="text-black">
            Sell
          </a>
          {/* <a href="#" className="text-black">
            List your car
          </a>
          <a href="#" className="text-black">
            Favorites
          </a> */}
          <button onClick={handleUserClick} className="text-black text-left">
            Profile
          </button>
        </div>
      )}
    </header>
  );
};
