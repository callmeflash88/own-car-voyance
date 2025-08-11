"use client";
import { useState } from "react";
import { AdminSidebar } from "@/widgets/admin-sidebar/admin-sidebar";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import FilterPanel from "@/widgets/filters/ui/admin-filters";
import Link from "next/link";
import logo from "../../../public/assets/logo.svg";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-white transition-transform transform 
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    lg:translate-x-0 lg:static`}
      >
        <AdminSidebar />
      </div>

      <div className="flex flex-col flex-1">
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
              onClick={() => {
                console.log("Toggle menu");
                setIsSidebarOpen(!isSidebarOpen);
              }}
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
        </header>
        <main className="p-6 relative">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-start px-[60px] gap-4">
            {/* <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            /> */}

            {pathname === "/admin-listings" && <FilterPanel />}
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}
