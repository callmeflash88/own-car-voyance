"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../../public/assets/logo.svg";
import {
  Archive,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  X,
} from "lucide-react";
import clsx from "clsx";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar = ({ isOpen, onClose }: Props) => {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `flex items-center gap-2 h-14 px-3 rounded-lg transition-colors ${
      pathname === href
        ? "bg-[#6745FF0A] text-[#5511EE] font-semibold"
        : "text-gray-700 hover:bg-gray-50"
    }`;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[240px] h-screen border-r p-6 flex-col gap-6 bg-white">
        <Link href="/">
          <Image src={logo} alt="CarVoyance logo" width={150} />
        </Link>
        <nav className="flex flex-col gap-4 text-gray-700 text-sm font-medium">
          <Link href="/profile-search" className={linkClass("/profile-search")}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link href="/profile-search" className={linkClass("/profile-search")}>
            <Users size={18} /> Users
          </Link>
          <Link href="/profile-search" className={linkClass("/profile-search")}>
            <Archive size={18} /> Listings
          </Link>
          <Link href="/profile-search" className={linkClass("/profile-search")}>
            <Settings size={18} /> Settings
          </Link>
        </nav>
        <button className="mt-auto flex items-center gap-2">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={clsx(
          "fixed inset-0 z-50 transition-transform transform md:hidden bg-black/30",
          isOpen ? "translate-x-0" : "-translate-x-full pointer-events-none"
        )}
      >
        <aside className="w-[240px] h-full bg-white p-6 flex flex-col gap-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <Image src={logo} alt="CarVoyance logo" width={150} />
            <button onClick={onClose}>
              <X />
            </button>
          </div>

          <nav className="flex flex-col gap-4 text-gray-700 text-sm font-medium">
            <Link
              href="/profile-search"
              className={linkClass("/profile-search")}
            >
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link
              href="/profile-search"
              className={linkClass("/profile-search")}
            >
              <Users size={18} /> Users
            </Link>
            <Link
              href="/profile-search"
              className={linkClass("/profile-search")}
            >
              <Archive size={18} /> Listings
            </Link>
            <Link
              href="/profile-search"
              className={linkClass("/profile-search")}
            >
              <Settings size={18} /> Settings
            </Link>
          </nav>
          <button className="mt-auto flex items-center gap-2">
            <LogOut size={18} /> Logout
          </button>
        </aside>
      </div>
    </>
  );
};
