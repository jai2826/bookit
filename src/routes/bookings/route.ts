import prisma from "@/lib/db";
import { Hono } from "hono";
import { string, z } from "zod";

// Zod schema matching the required input from the checkout form.
// We only accept fields needed for the booking logic.
const BookingInputSchema = z.object({
  slotId: z.string(),
  quantity: z.number().int().min(1),
  // Fields for the minimal Booking record
  userName: z.string().min(1),
  userEmail: z.string().email(),
  userPhone: z.string().optional(),

  // Fields for calculating price and discount
  promoCode: z.string().optional(),
  // Assuming the frontend calculates and sends the final *expected* price
  // (though the backend MUST re-calculate for security)
  calculatedFinalPrice: z.number(),
});

const app = new Hono();

// ==========================================================
// Route: Create a New Booking
// Endpoint: POST /bookings
// ==========================================================
app.post("/", async (c) => {
  const body = await c.req.json();
  const inputValidation = BookingInputSchema.safeParse(body);

  if (!inputValidation.success) {
    return c.json(
      {
        error: "Invalid booking data provided.",
        details: inputValidation.error.flatten(),
      },
      400
    );
  }

  const data = inputValidation.data;
  let promoCodeRecord = null;
  let promoCodeId: string | null = null;

  try {
    // --- Step 1: Execute Transaction ---
    const newBooking = await prisma.$transaction(async (tx) => {
      // 1.1 Lock/Fetch the Slot and related Experience
      // We must check capacity and get the original price from the DB (not client)
      const slot = await tx.slot.findUnique({
        where: { id: data.slotId },
        include: {
          bookings: true, // Used for manual capacity check if 'bookedCount' is not real-time
          experience: true, // To get the price
        },
      });

      if (!slot) {
        throw new Error("Booking failed: Selected slot not found.");
      }
      if (slot.isSoldOut) {
        throw new Error("Booking failed: Slot is already sold out.");
      }

      // 1.2 Check Capacity
      const currentBooked = slot.bookedCount;
      if (currentBooked + data.quantity > slot.capacity) {
        throw new Error(
          `Booking failed: Only ${
            slot.capacity - currentBooked
          } spots remaining.`
        );
      }

      // 1.3 Validate Promo Code (if provided)
      let discountAmount = 0;
      console.log(data.promoCode)
      if (data.promoCode) {
        promoCodeRecord = await tx.promoCode.findUnique({
          where: { code: data.promoCode },
        });

        // **(Add your full promo validation logic here: active, validUntil, etc.)**
        if (
          !promoCodeRecord ||
          !promoCodeRecord.isActive ||
          (promoCodeRecord.validUntil &&
            promoCodeRecord.validUntil < new Date())
        ) {
          throw new Error("Invalid or expired promo code.");
        }

        // Calculate Discount
        const basePrice = slot.experience.price.toNumber();
        const subtotal = basePrice * data.quantity;

        // Note: Using toNumber() here for simplicity, but for real-money,
        // you MUST use a decimal math library (e.g., Decimal.js) for calculation.
        const discountValue = promoCodeRecord.discountValue.toNumber();
        
          if (promoCodeRecord.discountType === "PERCENTAGE") {
            discountAmount = subtotal * (discountValue / 100);
          } else if (promoCodeRecord.discountType === "FLAT_AMOUNT") {
            discountAmount = discountValue;
          }
        

        promoCodeId = promoCodeRecord.id;
      }

      // 1.4 Recalculate Final Price (Security Check)
      const originalPrice = slot.experience.price.toNumber() * data.quantity;
      const finalPrice = Math.max(0, originalPrice - discountAmount);

      // 1.5 Create the Booking Record
      const booking = await tx.booking.create({
        data: {
          slotId: data.slotId,
          quantity: data.quantity,
          userName: data.userName,
          userEmail: data.userEmail,
          userPhone: data.userPhone,

          promoCodeId: promoCodeId,
          originalPrice: originalPrice, // Prisma converts back to Decimal
          finalPrice: finalPrice, // Prisma converts back to Decimal

          status: "PENDING", // Awaiting external payment confirmation
        },
      });

      // 1.6 Update Slot Capacity (Crucial!)
      // Increment the bookedCount field on the slot
      await tx.slot.update({
        where: { id: data.slotId },
        data: {
          bookedCount: {
            increment: data.quantity,
          },
        },
      });

      return booking; // Transaction success, return the new booking record
    });

    // --- Step 2: Simulate Payment & Final Confirmation ---
    // In a real app, this is where you'd call Stripe/PayPal/etc.
    // For now, we'll assume it succeeds and immediately update status.
    await prisma.booking.update({
      where: { id: newBooking.id },
      data: { status: "CONFIRMED" },
    });

    // --- Step 3: Send Success Response ---
    return c.json(
      {
        success: true,
        message: "Booking confirmed!",
        bookingId: newBooking.id,
        finalPrice: newBooking.finalPrice.toString(), // Send price back as string
      },
      201
    );
  } catch (error: any) {
    // Catch errors from the transaction or external failures
    console.error("Booking failed:", error.message);
    return c.json(
      {
        success: false,
        error: error.message || "An unknown error occurred during booking.",
      },
      500
    );
  }
});

export default app;
