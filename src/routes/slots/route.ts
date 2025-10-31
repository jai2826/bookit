import prisma from "@/lib/db";
import { Hono } from "hono";

// Create a Hono instance for the Slot APIs
const app = new Hono(); 

// ==========================================================
// Route 1: Fetch ALL Slots
// Endpoint: GET /slots (or similar, depending on your routing)
// ==========================================================
app.get("/", async (c) => {
  try {
    // 💡 Find all Slot records
    const slots = await prisma.slot.findMany({
      select: {
        id: true,
        dateTime: true,
        capacity: true,
        bookedCount: true,
        isSoldOut: true,
        // Optional: Include a few details about the related Experience
        experience: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
      // Order slots to show upcoming dates first
      orderBy: {
        dateTime: "asc",
      },
      // Optional: Filter out slots that have already passed
      where: {
         dateTime: {
           gt: new Date(), // 'greater than' the current time
         },
      }
    });

    return c.json({ count: slots.length, data: slots }, 200);
  } catch (error) {
    console.error("Error fetching all slots:", error);
    return c.json({ error: "Failed to retrieve all slots." }, 500);
  }
});

// ==========================================================
// Route 2: Fetch a SINGLE Slot by ID
// Endpoint: GET /slots/:id
// ==========================================================
app.get("/:id", async (c) => {
  // Get the 'id' parameter from the URL path
  const slotId = c.req.param("id");
  

  // Basic validation to ensure the ID is present
  if (!slotId) {
    return c.json({ error: "Slot ID is required." }, 400);
  }

  try {
    // 💡 Find the unique Slot record
    const slot = await prisma.slot.findUnique({
      where: {
        id: slotId,
      },
      include: {
        
        // Must include the related experience details
        experience: {
            select: {
                id: true,
                name: true,
                price: true,
                duration: true,
                description: true,
                imageUrl: true,
            }
        },
        // Optionally include the bookings if needed for internal logic
        // bookings: true, 
      },
    });

    if (!slot) {
      // If Prisma returns null, the ID was not found
      return c.json(
        { error: `Slot with ID ${slotId} not found.` },
        404
      );
    }

    // 💰 Conversion Check: Convert the price decimal to string before sending
    // This assumes the price is on the Experience model.
    const slotWithSafePrice = {
        ...slot,
        // Check if price exists and convert it to string for JSON safety
        experience: {
            ...slot.experience,
            price: slot.experience.price.toString(), 
        }
    };

    return c.json(slotWithSafePrice, 200);
  } catch (error) {
    console.error(`Error fetching slot ${slotId}:`, error);
    return c.json(
      { error: "Failed to retrieve the slot." },
      500
    );
  }
});

// Export the Hono app
export default app;