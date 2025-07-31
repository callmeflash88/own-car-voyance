import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ReduxProvider } from "@/shared/lib/redux-provider";
import { Toaster } from "react-hot-toast";
import WaitlistPage from "./waitlist/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CarVoyance",
  description: "Find, buy and manage your car.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const showWaitlist = process.env.SHOW_WAITLIST === "true";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {showWaitlist ? (
          <WaitlistPage />
        ) : (
          <ReduxProvider>{children}</ReduxProvider>
        )}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
