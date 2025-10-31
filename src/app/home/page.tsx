"use client";
import Card from "@/components/card";
import { Experience } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
      const API_URL = process.env.NEXT_PUBLIC_APP_URL + "/api/experiences";

      const url = searchTerm
        ? `${API_URL}?search=${encodeURIComponent(searchTerm)}`
        : API_URL;

      const response = await fetch(url, { cache: "no-store" });

      if (!response.ok) {
        console.error(
          `API Error: Failed to fetch experiences. Status: ${response.status}`
        );
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
    // Outer div maintains responsive padding for space between screen edge and content
    <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-[124px] h-fit py-12 bg-[#F9F9F9]">
      {/* FIX: Inner wrapper ensures content block is centered on wide screens */}
      <div className="flex flex-wrap gap-x-6 gap-y-8 max-w-7xl mx-auto justify-center">
        {experiences.length === 0 && (
          <p className="w-full h-full text-center flex items-center justify-center text-gray-500">
            No experiences found that match your search.
          </p>
        )}

        {experiences.map((experience) => (
          <Card key={experience.id} {...experience} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;