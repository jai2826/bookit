import {prisma} from "@/lib/db";
import { Hono } from "hono";

const app = new Hono();

// ==========================================================
// Route 1: Fetch ALL Experiences
// ==========================================================
app.get("/", async (c) => {
  const search = c.req.query("search");

  const whereClause = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { description: { contains: search, mode: "insensitive" as const } },
          // Add more fields to search here!
        ],
      }
    : {}; // Empty object means fetch all

  try {
    // Select all experiences and include their slots (schedules)
    const experiences = await prisma.experience.findMany({
      select: {
        id: true,
        name: true,
        about: true,
        price: true,
        duration: true,
        imageUrl: true,
        location: true,
        description: true,
        slots: {
          select: {
            id: true,
            dateTime: true,
            capacity: true,
            bookedCount: true,
            isSoldOut: true,
          },
          // Order slots to show upcoming dates first
          orderBy: {
            dateTime: "asc",
          },
        },
      },
      // Order experiences alphabetically
      orderBy: {
        name: "asc",
      },
      where: whereClause,
    });

    return c.json({ count: experiences.length, data: experiences }, 200);
  } catch (error) {
    console.error("Error fetching all experiences:", error);
    return c.json({ error: "Failed to retrieve experiences." }, 500);
  }
});

// ==========================================================
// Route 2: Fetch a Single Experience by ID
// ==========================================================
app.get(":id", async (c) => {
  // Get the 'id' parameter from the URL path
  const experienceId = c.req.param("id");

  // Basic validation to ensure the ID is present
  if (!experienceId) {
    return c.json({ error: "Experience ID is required." }, 400);
  }

  try {
    const experience = await prisma.experience.findUnique({
      where: {
        id: experienceId,
      },

      include: {
        slots: {
          select: {
            id: true,
            dateTime: true,
            capacity: true,
            bookedCount: true,
            isSoldOut: true,
          },
          // Only show slots that haven't passed yet
          where: {
            dateTime: {
              gt: new Date(), // 'gt' stands for 'greater than' the current time
            },
          },
          orderBy: {
            dateTime: "asc",
          },
        },
      },
    });

    if (!experience) {
      // If Prisma returns null, the ID was not found
      return c.json(
        { error: `Experience with ID ${experienceId} not found.` },
        404
      );
    }

    return c.json(experience, 200);
  } catch (error) {
    console.error(`Error fetching experience ${experienceId}:`, error);
    return c.json(
      { error: "[/experiences/:id] :  Failed to retrieve the experience." },
      500
    );
  }
});

// Export the Hono app
export default app;
