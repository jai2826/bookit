"use client";
import SearchBar from "@/components/searchbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="sticky top-0 z-10 w-full bg-[#F9F9F9] flex justify-between items-center py-4 px-4 sm:px-8 lg:px-16 xl:px-[124px] custom_drop_shadow">
      <div className="w-[80px] h-[44px] sm:w-[100px] sm:h-[55px] text-center flex-shrink-0 hover:cursor-pointer">
        <Image
          onClick={() => router.push("/")}
          src="/newLogo.png"
          alt="Logo"
          width={100}
          height={55}
        />
      </div>
      <Suspense
        fallback={
          <div className="flex-grow flex items-center justify-center bg-[#F9F9F9] h-[55px]">
            <p className="text-lg text-gray-500">Loading...</p>
          </div>
        }
      >
        <SearchBar />
      </Suspense>
    </nav>
  );
}
