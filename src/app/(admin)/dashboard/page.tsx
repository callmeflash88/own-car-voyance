"use client";
import userIcon from "@/shared/assets/icons/admin-dashboard/usersIcon.svg";
import listingsIcon from "@/shared/assets/icons/admin-dashboard/listingsIcon.svg";
import revenueIcon from "@/shared/assets/icons/admin-dashboard/revenueIcon.svg";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Area,
} from "recharts";
import {
  useGetDashboardQuery,
  useGetMostPopularMakesQuery,
  useGetTopSalesQuery,
  useGetUserRegistrationThisWeekQuery,
} from "@/shared/api/dashBoardApi";
import { Table, TableBody, TableHeader } from "@/shared/ui/Table";
import { Row } from "@/shared/types/table";
import { ArrowRight, ChevronRight } from "lucide-react";

export const TOP_SALES_COLUMNS = [
  { key: "logo", label: "" },
  { key: "full_name", label: "" },
  { key: "email", label: "" },
  { key: "count", label: "" },
  { key: "location", label: "" },
  { key: "action_buttons", label: "" },
];

export const getTableItems = (topSales: any) => {
  return topSales?.map((item: any) => ({
    logo: item.logo,
    full_name: item.full_name,
    email: item.email,
    count: item._count?.cars ?? 0,
    location: item.location,
    action_buttons: {
      type: "component",
      component: () => (
        <div className="rounded-full bg-[#4E17E5] h-10 w-10  flex justify-center items-center">
          <ChevronRight className="w-4 h-4" color="#fff" />
        </div>
      ),
    },
  }));
};

export default function DashboardPage() {
  const { data: dashboard } = useGetDashboardQuery();
  const { data: mostPopularMakes } = useGetMostPopularMakesQuery();
  const { data: userRegistrationThisWeek } =
    useGetUserRegistrationThisWeekQuery();
  const { data: topSales } = useGetTopSalesQuery();

  const transformedData =
    mostPopularMakes?.map((item) => ({
      name: item.make,
      sales: item.count,
    })) ?? [];

  const transformedUserRegistrationData =
    userRegistrationThisWeek?.map((item) => ({
      name: item.day,
      registrations: item.count,
    })) ?? [];

  const maxValue = Math.max(...transformedData.map((d) => d.sales || 0));

  const items = getTableItems(topSales) as unknown as Row[];

  return (
    <div className="flex flex-col px-2 lg:px-10 gap-4 max-w-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Total Users */}
        <div className="flex justify-between items-start p-5 rounded-xl shadow-sm bg-white dark:bg-zinc-900 w-full">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Users
            </p>
            <p className="text-2xl font-bold text-black dark:text-white">
              {dashboard?.totalUsers ?? 0}
            </p>
            <p className="text-sm text-green-500 flex flex-col items-start mt-7">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              {dashboard?.usersPercentThisMonth ?? 0}%
              <span className="text-gray-500 ml-1">Up from last month</span>
            </p>
          </div>
          <div className="bg-indigo-100 p-3 rounded-full">
            <Image src={userIcon} alt="userIcon" width={24} height={24} />
          </div>
        </div>

        {/* Active Listings */}
        <div className="flex justify-between items-start p-5 rounded-xl shadow-sm bg-white dark:bg-zinc-900 w-full">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Active Listings
            </p>
            <p className="text-2xl font-bold text-black dark:text-white">
              {dashboard?.totakActiveListing ?? 0}
            </p>
            <p className="text-sm text-green-500 flex flex-col items-start mt-7">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              {dashboard?.listingPercentThisMonth ?? 0}%
              <span className="text-gray-500 ml-1">Up from last month</span>
            </p>
          </div>
          <div className="bg-indigo-100 p-3 rounded-full">
            <Image
              src={listingsIcon}
              alt="listingsIcon"
              width={24}
              height={24}
            />
          </div>
        </div>

        {/* Revenue */}
        <div className="flex justify-between items-start p-5 rounded-xl shadow-sm bg-white dark:bg-zinc-900 w-full">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
            <p className="text-2xl font-bold text-black dark:text-white">
              ${dashboard?.totalRevenue ?? 0}
            </p>
            <p className="text-sm text-green-500 flex flex-col items-start mt-7">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              {dashboard?.revenuePercentThisMonth ?? 0}%
              <span className="text-gray-500 ml-1">Up from last month</span>
            </p>
          </div>
          <div className="bg-indigo-100 p-3 rounded-full">
            <Image src={revenueIcon} alt="revenueIcon" width={24} height={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col justify-between items-start p-5 rounded-xl shadow-sm bg-white dark:bg-zinc-900 w-full ">
          <h2 className="text-2xl font-bold mb-4">
            User Registrations This Week
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={transformedUserRegistrationData}>
              <defs>
                <linearGradient id="gradientLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="1.85%" stopColor="#4E17E5" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} stroke="#e0e0e0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="registrations"
                stroke="none"
                fill="url(#gradientLine)"
              />

              <Line
                type="monotone"
                dataKey="registrations"
                stroke="#4E17E5"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col justify-between items-start p-5 rounded-xl shadow-sm bg-white dark:bg-zinc-900 w-full">
          <h2 className="text-2xl font-bold mb-4">Most Popular Makes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transformedData} barCategoryGap={30}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" radius={[10, 10, 0, 0]} barSize={25}>
                {transformedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.sales === maxValue ? "#4E17E5" : "#6F76F233"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-col justify-between items-start p-5 rounded-xl shadow-sm bg-white dark:bg-zinc-900 w-full">
        <h2 className="text-2xl font-bold mb-4">Top Sales Representative</h2>
        <div className="px-5 w-full">
          <Table>
            <TableHeader columns={TOP_SALES_COLUMNS} />
            <TableBody items={items} columns={TOP_SALES_COLUMNS} />
          </Table>
        </div>
      </div>
    </div>
  );
}
