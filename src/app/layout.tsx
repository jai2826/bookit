import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";

import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";

const interSans = Inter({
  variable: "--font-inter-sans", // Changed variable name for clarity
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookIt",
  description: "Experiences & Slots",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable}  antialiased mx-auto max-w-[1440px]  bg-muted flex flex-col min-h-screen`}
      >
        {" "}
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center py-20 bg-[#F9F9F9]">
              <p className="text-lg text-gray-500">Loading...</p>
            </div>
          }
        >
          <Toaster theme="light" richColors />
          <Navbar />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
