"use client";
import { useState } from "react";
import { AdminSidebar } from "@/widgets/admin-sidebar/admin-sidebar";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import FilterPanel from "@/widgets/filters/ui/admin-filters";

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
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex flex-col flex-1">
        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden p-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-700 hover:text-black"
          >
            <Menu size={24} />
          </button>
        </div>

        <main className="p-6 relative">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-start px-[60px] gap-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />

            {pathname === "/admin-listings" && <FilterPanel />}
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}
