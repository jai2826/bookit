import z from "zod";
export const checkoutSchema = z.object({
  // --- USER DATA (Standard Form Fields) ---
  fullname: z
    .string()
    .min(1, { message: "Your full name is required for the booking." }),
  email: z.email({ message: "A valid email address is required." }),

  // --- BOOKING DETAILS (Passed from previous page/URL) ---
  // Ensure the Slot ID is present and is a non-empty string
  slotId: z
    .string()
    .min(1, { message: "The selected slot is missing. Please re-select." }),

  // Ensure Quantity is a number greater than zero
  quantity: z
    .number()
    .int()
    .min(1, { message: "Quantity must be at least 1." }),

  // You might also need the Experience ID, depending on your logic
  experienceId: z
    .string()
    .min(1, { message: "Experience ID is missing." })
    .optional(),

  // --- PROMO & TERMS (Optional/Boolean Fields) ---
  promocode: z.string().optional(),

  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions to proceed.",
  }),
});
