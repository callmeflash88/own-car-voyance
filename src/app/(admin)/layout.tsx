"use client";
import { useState } from "react";
import { AdminSidebar } from "@/widgets/admin-sidebar/admin-sidebar";
import { Menu } from "lucide-react"; // бургер-иконка

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex flex-col flex-1">
        {/* Мобильная кнопка открытия */}
        <button
          className="md:hidden p-4"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu />
        </button>

        <main className="p-6 bg-gray-50 min-h-screen">{children}</main>
      </div>
    </div>
  );
}
