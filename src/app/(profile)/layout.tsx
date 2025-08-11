"use client";
import { Sidebar } from "@/widgets/user-sidebar/user-sidebar";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import logo from "../../../public/assets/logo.svg";
import { Button } from "@/shared/ui";
import { Heart, Plus, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { MAIN_ROUTES, PROFILE_ROUTES } from "@/lib/routes";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleListYourCarClick = () => {
    navigate.push(MAIN_ROUTES.CREATE_AD);
  };

  return (
    <div className="flex min-h-screen">
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-white transition-transform transform lg:translate-x-0 lg:static lg:block ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 min-h-screen bg-gray-50">
        <header className="flex items-center justify-between p-4 bg-white border-b lg:px-6">
          <div className="flex items-center lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={logo}
                alt="CarVoyance"
                width={120}
                height={40}
                priority
              />
            </Link>
          </div>

          <div className="flex-1 lg:hidden" />

          <div className="flex items-center lg:hidden">
            <button
              className="p-2"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Toggle menu"
            >
              <FiMenu size={24} />
            </button>
          </div>

          <div className="hidden lg:flex flex-1 justify-start">
            <div className="relative w-full max-w-3xl">
              <IoIosSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={20}
              />
              <input
                type="text"
                placeholder="Search (Ex. BMW, car parts, reviews)"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4 ">
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
        </header>

        <main className="p-6 bg-gray-50 min-h-screen">{children}</main>
      </div>
    </div>
  );
}
