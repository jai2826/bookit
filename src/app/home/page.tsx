import Card from "@/components/card";
import { Experience } from "@prisma/client";

async function fetchAllExperiences(): Promise<Experience[]> {
  // ⚠️ IMPORTANT: In a Server Component, use the absolute URL for external APIs.
  const API_URL = process.env.NEXT_PUBLIC_APP_URL + "/api/experiences";

  
  const response = await fetch(API_URL, { cache: "no-store" });

  if (!response.ok) {
    // If the API fails, log the error and display a fallback UI message.
    console.error(
      `API Error: Failed to fetch all experiences. Status: ${response.status}`
    );
    // Throwing here triggers the nearest error.js boundary.
  }

  const result = await response.json();
  // The Hono API returns { count: N, data: [...] }
  return result.data;
}

const HomePage = async () => {
  const experiences = await fetchAllExperiences();

  return (
    <div className=" w-full px-[124px] py-12 flex flex-wrap gap-x-6 gap-y-8 bg-[#F9F9F9] content-start">
      {experiences.map((experience) => (
        <Card key={experience.id} {...experience} />
      ))}
    </div>
  );
};

export default HomePage;
