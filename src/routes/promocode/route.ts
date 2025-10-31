import prisma from "@/lib/db";
import { Hono } from "hono";

// Assuming this is part of your main Hono app or a dedicated promoCode app
const app = new Hono(); 

// ==========================================================
// Route: Check Promo Code Validity
// Endpoint: GET /promocodes/:code/validate
// ==========================================================
app.get("/:code/validate", async (c) => {
  // 1. Get the promo code from the URL path
  const code = c.req.param("code").toUpperCase(); // Normalize to uppercase for case-insensitive check
  
  if (!code) {
    return c.json({ isValid: false, message: "A promo code is required." }, 400);
  }

  try {
    // 2. Check for the promo code's existence and activity status
    const promoCode = await prisma.promoCode.findUnique({
      where: {
        code: code,
      },
    });

    // --- Check 1: Existence ---
    if (!promoCode) {
      return c.json({ isValid: false, message: "Invalid promo code." }, 404);
    }
    
    // --- Check 2: Activity Status ---
    if (!promoCode.isActive) {
      return c.json({ isValid: false, message: "This promo code is currently inactive." }, 403);
    }

    // --- Check 3: Expiration Date ---
    // Note: 'validUntil' is nullable (DateTime?), so we check if it exists first.
    if (promoCode.validUntil && promoCode.validUntil < new Date()) {
      return c.json({ isValid: false, message: "This promo code has expired." }, 403);
    }

    // 💰 Conversion Check: Safely convert the Decimal discountValue to a string
    const validPromoCode = {
        ...promoCode,
        discountValue: promoCode.discountValue.toString(),
    };

    // 4. Success!
    // Return the promo code details along with the validation status
    return c.json({ 
        isValid: true, 
        message: "Promo code applied successfully!", 
        data: validPromoCode 
    }, 200);

  } catch (error) {
    console.error(`Error validating promo code ${code}:`, error);
    return c.json(
      { isValid: false, message: "A server error occurred during validation." },
      500
    );
  }
});

export default app;