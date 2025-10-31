"use client";
import Card from "@/components/card";
import { Experience } from "@prisma/client";
import { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// 3. Update the HomePage component to accept searchParams
interface HomePageProps {
  // Next.js automatically injects this object into Server Components
  // that are a 'page' component.
  searchParams?: {
    search?: string; // Expects a parameter named 'search' (for query)
  };
}

const HomePage = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || undefined;
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    // 1. Update fetchAllExperiences to accept an optional searchTerm
    async function fetchAllExperiences(searchTerm: string | undefined) {
      const API_URL = process.env.NEXT_PUBLIC_APP_URL + "/api/experiences";

      // 2. Construct the URL to include the search term if it exists
      const url = searchTerm
        ? `${API_URL}?search=${encodeURIComponent(searchTerm)}`
        : API_URL;

      const response = await fetch(url, { cache: "no-store" });

      if (!response.ok) {
        console.error(
          `API Error: Failed to fetch experiences. Status: ${response.status}`
        );
        throw new Error("Failed to retrieve experiences."); // Better error message
      }

      const result = await response.json();
      setExperiences(result.data);
      setIsLoading(false);
    }
    // 4. Extract the search term safely

    // 5. Pass the search term to your fetching function
    fetchAllExperiences(searchTerm);
    // Debugging: Log searchParams to verify correct reception
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
    <div className=" w-full px-[124px] h-full py-12 flex flex-wrap gap-x-6 gap-y-8 bg-[#F9F9F9] content-start">
      {experiences.length === 0 && (
        <p className="w-full h-full text-center flex items-center justify-center text-gray-500">
          No experiences found that match your search.
        </p>
      )}

      {experiences.map((experience) => (
        <Card key={experience.id} {...experience} />
      ))}
    </div>
  );
};

export default HomePage;
