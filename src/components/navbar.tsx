import SearchBar from "@/components/searchbar";
import Image from "next/image";
import { Suspense } from "react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 w-full max-w-[1440px] bg-[#F9F9F9] flex justify-between items-center py-4 px-[124px] custom_drop_shadow ">
      <div className=" w-[100px] h-[55px] text-center">
        <Image src="/newLogo.png" alt="Logo" width={100} height={55} />
      </div>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center py-20 bg-[#F9F9F9]">
            <p className="text-lg text-gray-500">Loading...</p>
          </div>
        }
      >
        <SearchBar />
      </Suspense>
    </nav>
  );
}
