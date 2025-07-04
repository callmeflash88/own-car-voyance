// src/widgets/Sidebar/Sidebar.tsx
"use client";
import {
  LogOut,
  Settings,
  Heart,
  Car,
  Mail,
  Search,
  UserCircle2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/assets/logo.svg";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();

  console.log("PATHNAME", pathname);

  const linkClass = (href: string) =>
    `flex items-center gap-2 h-14 px-3 rounded-lg transition-colors ${
      pathname === href
        ? "bg-[#6745FF0A] text-[#5511EE] font-semibold"
        : "text-gray-700 hover:bg-gray-50"
    }`;
  return (
    <aside className="w-[240px] h-screen border-r p-6 flex flex-col gap-6 bg-white">
      <Link href="/">
        <Image src={logo} alt="CarVoyance logo" width={150} />
      </Link>

      <nav className="flex flex-col gap-4 text-gray-700 text-sm font-medium">
        <Link href="/search" className={linkClass("/profile-search")}>
          <Search size={18} /> Search Auto
        </Link>
        <Link href="/vehicles" className={linkClass("/profile-vehciles")}>
          <Car size={18} /> My Vehicles
        </Link>
        <Link href="/messages" className={linkClass("/profile-messages")}>
          <Mail size={18} /> Messages
          {/* example badge */}
          <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
            3
          </span>
        </Link>
        <Link href="/favorites" className={linkClass("/search")}>
          <Heart size={18} /> Favorites
        </Link>
        <Link href="/profile" className={linkClass("/profile")}>
          <UserCircle2 size={18} /> User Profile
        </Link>
        <Link href="/settings" className={linkClass("/search")}>
          <Settings size={18} /> Settings
        </Link>
      </nav>

      <button className="mt-auto flex items-center gap-2 text-red-500 hover:text-red-700">
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
};
