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
import { useGetDashboardQuery } from "@/shared/api/dashBoardApi";

export default function DashboardPage() {
  const { data: dashboard } = useGetDashboardQuery();

  const data = [
    { name: "Mon", registrations: 500 },
    { name: "Tue", registrations: 750 },
    { name: "Wed", registrations: 850 },
    { name: "Thu", registrations: 900 },
    { name: "Fri", registrations: 950 },
    { name: "Sat", registrations: 850 },
    { name: "Sun", registrations: 700 },
  ];

  const data2 = [
    { name: "BMW", sales: 450 },
    { name: "Mercedes", sales: 550 },
    { name: "Toyota", sales: 400 },
    { name: "Audi", sales: 350 },
    { name: "Honda", sales: 300 },
    { name: "Ford", sales: 250 },
  ];

  console.log("dashboard", dashboard);

  const maxValue = Math.max(...data2.map((item) => item.sales));

  return (
    <div className="flex flex-col px-10 gap-4">
      <div className="grid grid-cols-3 gap-4">
        {/* Card */}
        <div className="flex justify-between items-start p-5 rounded-xl shadow-sm bg-white dark:bg-zinc-900 w-full">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total User
            </p>
            <p className="text-2xl font-bold text-black dark:text-white">
              1,245
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
              8.5%
              <span className="text-gray-500 ml-1">Up from last month</span>
            </p>
          </div>
          <div className="bg-indigo-100 p-3 rounded-full">
            <Image src={userIcon} alt="userIcon" width={24} height={24} />
          </div>
        </div>
        {/* Card */}
        <div className="flex justify-between items-start p-5 rounded-xl shadow-sm bg-white dark:bg-zinc-900 w-full ">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Active Listings
            </p>
            <p className="text-2xl font-bold text-black dark:text-white">872</p>
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
              8.5%
              <span className="text-gray-500 ml-1">Up from last month</span>
            </p>
          </div>
          <div className="bg-indigo-100 p-3 rounded-full">
            <Image src={listingsIcon} alt="userIcon" width={24} height={24} />
          </div>
        </div>
        {/* Card */}
        <div className="flex justify-between items-start p-5 rounded-xl shadow-sm bg-white dark:bg-zinc-900 w-full ">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
            <p className="text-2xl font-bold text-black dark:text-white">
              13,480
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
              8.5%
              <span className="text-gray-500 ml-1">Up from last month</span>
            </p>
          </div>
          <div className="bg-indigo-100 p-3 rounded-full">
            <Image src={revenueIcon} alt="userIcon" width={24} height={24} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col justify-between items-start p-5 rounded-xl shadow-sm bg-white dark:bg-zinc-900 w-full ">
          <h2 className="text-2xl font-bold mb-4">
            User Registrations This Week
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
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
        <div className="flex flex-col justify-between items-start p-5 rounded-xl shadow-sm bg-white dark:bg-zinc-900 w-full ">
          <h2 className="text-2xl font-bold mb-4">Most Popular Makes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data2} barCategoryGap={30}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" radius={[10, 10, 0, 0]} barSize={25}>
                {data2.map((entry, index) => (
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
    </div>
  );
}
