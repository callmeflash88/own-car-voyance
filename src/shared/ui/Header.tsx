"use client";
import Image from "next/image";
import logo from "../../../public/assets/logo.svg";
import { Heart, Plus, User, Menu, X } from "lucide-react";
import { Button } from "./Button";
import { useAppSelector } from "../lib/hooks";
import { useState } from "react";
import Link from "next/link";
import { MAIN_ROUTES, PROFILE_ROUTES } from "@/lib/routes";
import { useRouter } from "next/navigation";

export const Header = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleListYourCarClick = () => {
    navigate.push(MAIN_ROUTES.CREATE_AD);
  };

  return (
    <header className="bg-white px-6 md:px-[80px] lg:px-[120px] h-[70px] md:h-[90px] relative z-50">
      <div className="w-full h-full flex items-center justify-between relative">
        {/* Logo */}
        <div>
          <Image src={logo} alt="logo" className="w-40 lg:w-72" />
        </div>

        {/* Centered nav */}
        {/* <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block"> */}
        <nav className="hidden md:block">
          <ul className="flex gap-8 justify-center items-center">
            <li>
              <Link href={MAIN_ROUTES.PRODUCTS_LIST}>Buy</Link>
            </li>
            <li>
              <Link href={MAIN_ROUTES.CREATE_AD}>Sell</Link>
            </li>
          </ul>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center justify-center gap-5">
          <Button
            size="lg"
            variant="primary"
            iconLeft={<Plus className="w-4 h-4" />}
            onClick={handleListYourCarClick}
          >
            List your car
          </Button>
          <div className="w-[2px] h-12 bg-[#2B2B2B33]" />
          <div className="flex gap-3">
            <Link href={PROFILE_ROUTES.FAVORITES}>
              <Heart />
            </Link>
            <Link href={PROFILE_ROUTES.PROFILE_SEARCH}>
              <User />
            </Link>
          </div>
        </div>

        {/* Mobile Burger */}
        <div className="md:hidden">
          <button
            className="cursor-pointer"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
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
          <Link
            href={MAIN_ROUTES.PRODUCTS_LIST}
            className="text-black text-left"
          >
            Buy
          </Link>
          <Link href={MAIN_ROUTES.CREATE_AD} className="text-black text-left">
            Sell
          </Link>
          <Link
            href={PROFILE_ROUTES.FAVORITES}
            className="text-black text-left"
          >
            Favorites
          </Link>
          <Link
            href={PROFILE_ROUTES.PROFILE_SEARCH}
            className="text-black text-left"
          >
            Profile
          </Link>
        </div>
      )}
    </header>
  );
};
