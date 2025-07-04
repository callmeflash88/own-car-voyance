import { Sidebar } from "@/widgets/user-sidebar/user-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
