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
import { useSelector } from "react-redux";
import { RootState } from "@/shared/store/store";

export const Sidebar = () => {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `flex items-center gap-2 h-14 px-3 rounded-lg transition-colors ${
      pathname === href
        ? "bg-[#6745FF0A] text-[#5511EE] font-semibold"
        : "text-gray-700 hover:bg-gray-50"
    }`;

  const chats = useSelector((state: RootState) => state.chat.chats);

  const totalUnread = chats.reduce((sum, chat) => sum + chat.unreadCount, 0);

  return (
    <aside className="w-[240px] h-screen border-r p-6 flex flex-col gap-6 bg-white">
      <Link href="/">
        <Image src={logo} alt="CarVoyance logo" width={150} />
      </Link>

      <nav className="flex flex-col gap-4 text-gray-700 text-sm font-medium">
        <Link href="/profile-search" className={linkClass("/profile-search")}>
          <Search size={18} /> Search Auto
        </Link>
        <Link href="/my-vehicles" className={linkClass("/my-vehicles")}>
          <Car size={18} /> My Vehicles
        </Link>
        <Link href="/chat" className={linkClass("/chat")}>
          <Mail size={18} /> Messages
          {/* example badge */}
          {totalUnread > 0 && (
            <span className="absolute top-2 right-3 text-xs bg-red-500 text-white rounded-full px-2 py-0.5">
              {totalUnread}
            </span>
          )}
        </Link>
        <Link href="/favorites" className={linkClass("/favorites")}>
          <Heart size={18} /> Favorites
        </Link>
        <Link href="/profile" className={linkClass("/profile")}>
          <UserCircle2 size={18} /> User Profile
        </Link>
        <Link href="/settings" className={linkClass("/settings")}>
          <Settings size={18} /> Settings
        </Link>
      </nav>

      <button className="mt-auto flex items-center gap-2 text-red-500 hover:text-red-700">
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
};
