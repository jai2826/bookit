'use client'; 

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path (e.g., /experiences)
  const searchParams = useSearchParams(); // Get the current query params

  // Initialize state from current URL params if 'search' exists
  const initialQuery = searchParams.get('search') || "";
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handler for button click or form submission
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault(); 
    
    const term = searchTerm.trim();
    
    // 1. Create a new URLSearchParams instance based on the current params
    // This preserves any other existing query params (like pagination, filtering, etc.)
    const params = new URLSearchParams(searchParams.toString());

    if (term) {
      // 2. Set or update the 'search' parameter with the new search term
      params.set('search', term);
    } else {
      // 3. If the search term is empty, remove the 'search' parameter completely
      params.delete('search');
    }

    // 4. Construct the new URL and update the route without reloading
    // Example: /experiences?page=2&search=newterm
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-x-4">
      <Input
        className="bg-[#EDEDED] w-[340px] h-[42px] font-normal text-[14px] leading-[18px] rounded-[4px]"
        type="text"
        placeholder="Search experiences"
        value={searchTerm}
        onChange={handleInputChange}
      />
      
      <button 
        type="submit"
        className="bg-[#FFD643] gap-[10px] py-3 px-5 text-center rounded-[8px] font-medium text-[14px] leading-[18px]"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;