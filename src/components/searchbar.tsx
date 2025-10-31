'use client'; 

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get('search') || "";
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault(); 
    
    const term = searchTerm.trim();
    
    const params = new URLSearchParams(searchParams.toString());

    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    // RESPONSIVE: Full width on mobile, maintains original desktop width on medium/large screens.
    <form onSubmit={handleSearch} className="flex gap-x-4 w-full md:w-[450px] lg:w-fit">
      <Input
        // RESPONSIVE: w-full on mobile to fill space, original fixed w-[340px] restored on desktop (lg:w-[340px]).
        className="bg-[#EDEDED] w-full lg:w-[340px] h-[42px] font-normal text-[14px] leading-[18px] rounded-[4px] flex-shrink"
        type="text"
        placeholder="Search experiences"
        value={searchTerm}
        onChange={handleInputChange}
      />
      
      <button 
        type="submit"
        className="bg-[#FFD643] gap-[10px] py-3 px-5 text-center rounded-[8px] font-medium text-[14px] leading-[18px] cursor-pointer flex-shrink-0"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;