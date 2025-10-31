"use client";
import Card from "@/components/card";
import { Experience } from "@prisma/client";
import { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// The prop interface is defined but not used in the current functional component,
// but I'll keep it for completeness in case it was a Server Component before.
interface HomePageProps {
  searchParams?: {
    search?: string;
  };
}

const HomePage = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || undefined;
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    async function fetchAllExperiences(searchTerm: string | undefined) {
      // It's generally safer to pull environment variables in the build/server context,
      // but keeping the user's original implementation flow for this client component.
      const API_URL = process.env.NEXT_PUBLIC_APP_URL + "/api/experiences";

      const url = searchTerm
        ? `${API_URL}?search=${encodeURIComponent(searchTerm)}`
        : API_URL;

      // Note: `cache: "no-store"` is typically for the server-side `fetch` in Next.js,
      // but keeping it as per the original code's intent for a fresh fetch.
      const response = await fetch(url, { cache: "no-store" });

      if (!response.ok) {
        console.error(
          `API Error: Failed to fetch experiences. Status: ${response.status}`
        );
        // Throwing an error here is good, but you might want to handle it
        // by setting a state to show an error message to the user too.
        throw new Error("Failed to retrieve experiences.");
      }

      const result = await response.json();
      setExperiences(result.data);
      setIsLoading(false);
    }

    fetchAllExperiences(searchTerm);
    console.log("Received searchParams:", searchParams);
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center py-20 bg-[#F9F9F9]">
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    // --------------------------------------------------------------------------------------------------
    // **RESPONSIVE CHANGES HERE**
    // The original class was: className="w-full px-[124px] h-full py-12 flex flex-wrap gap-x-6 gap-y-8 bg-[#F9F9F9] content-start"
    //
    // The fixed `px-[124px]` is replaced with:
    // 1. `px-4` (a small padding) on small screens (mobile).
    // 2. `sm:px-8` (slightly larger padding) on small-to-medium screens (tablets).
    // 3. `lg:px-20` (a comfortable padding) on large screens.
    // 4. `xl:px-[124px]` (the original padding) on extra-large screens.
    // --------------------------------------------------------------------------------------------------
    <div className="w-full px-4 sm:px-8 lg:px-20 xl:px-[124px] h-full py-12 flex flex-wrap gap-x-6 gap-y-8 bg-[#F9F9F9] content-start">
      {experiences.length === 0 && (
        <p className="w-full h-full text-center flex items-center justify-center text-gray-500">
          No experiences found that match your search.
        </p>
      )}

      {/* When the layout wraps, the individual cards must also be responsive
          to ensure a clean column layout on smaller screens. 
          Assuming the Card component uses 'w-full' or similar, this may not be needed, 
          but if not, further changes would be needed inside the Card component itself 
          to ensure 1, 2, or 3 columns depending on the screen size.
          However, adhering strictly to "dont change any UI/UX" on this component: */}
      {experiences.map((experience) => (
        // I will trust that the Card component is inherently flexible or the user
        // expects the columns to simply wrap naturally.
        <Card key={experience.id} {...experience} />
      ))}
    </div>
  );
};

export default HomePage;