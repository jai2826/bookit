"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { checkoutSchema } from "@/app/experience/schema";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Experience, Slot } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { ta } from "date-fns/locale";

interface ValidPromoCode {
  id: string;
  code: string;
  discountType: "PERCENTAGE" | "FINAL_AMOUNT";
  // Note: We use string here because it's safely serialized from the Decimal type
  discountValue: string;
  validUntil: string | null;
}

interface BookingPayload {
  slotId: string;
  quantity: number;
  userName: string;
  userEmail: string;
  userPhone?: string;
  promoCode?: string;
  calculatedFinalPrice: number;
}

// In a real application, you'd fetch this data from your backend API.
// Here, we're simulating it with a local lookup.
const CheckoutPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [slot, setSlot] = useState<null | Slot>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPromoLoading, setIsPromoLoading] = useState(false);
  const [applyDisabled, setApplyDisabled] = useState(true);
  const [isFormSubmitDisabled, setIsFormSubmitDisabled] = useState(false);
  const [checkedPromoData, setCheckedPromoData] = useState<{
    isValid: boolean;
    message: string;
    data: ValidPromoCode | null;
  } | null>(null);
  const [slotData, setSlotData] = useState({
    slotId: null as string | null,
    quantity: 1,
  });
  const [experience, setExperience] = useState<null | Experience>(null);
  const params = useParams();
  const experienceId = params.experienceId;

  // --- State to hold the extracted, safe values ---

  useEffect(() => {
    // You can now immediately fetch the slot details here!
    async function fetchSlot(id: string) {
      try {
        const API_URL = process.env.NEXT_PUBLIC_APP_URL + `/api/slots/${id}`;
        const response = await fetch(API_URL);

        if (!response.ok) {
          // Handle HTTP errors (404, 500, etc.)
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch experience");
        }

        const data = await response.json();
        // console.log(data);
        setSlot(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }
    async function fetchExperience(id: string) {
      try {
        const API_URL =
          process.env.NEXT_PUBLIC_APP_URL + `/api/experiences/${id}`;
        const response = await fetch(API_URL);

        if (!response.ok) {
          // Handle HTTP errors (404, 500, etc.)
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch experience");
        }

        const data = await response.json();
        // console.log(data);
        setExperience(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }

    const rawSlotId = searchParams.get("slotId");
    const rawQuantity = searchParams.get("slotQuantity"); // 💡 You were using "slotQuantity", check your previous page!

    // 1. Calculate the safe, parsed values
    const safeQuantity = rawQuantity ? parseInt(rawQuantity) : 1;
    const safeSlotId = rawSlotId || "";
    const safeExperienceId = experienceId?.toString() || "";

    // 2. Set the local state (for rendering details)
    setSlotData({
      slotId: safeSlotId,
      quantity: safeQuantity,
    });

    // 🔥 FIX: Use form.reset() to update React Hook Form's internal state
    form.reset({
      fullname: form.getValues("fullname"), // Keep existing values
      email: form.getValues("email"),
      promocode: form.getValues("promocode"),
      acceptTerms: form.getValues("acceptTerms"),

      // Inject the newly retrieved, safe values
      slotId: safeSlotId,
      quantity: safeQuantity,
      experienceId: safeExperienceId,
    });

    // 3. Fetch data (runs after form has the ID)
    if (rawSlotId) {
      fetchSlot(rawSlotId);
    }
    fetchExperience(safeExperienceId);
  }, [searchParams]);

  async function checkPromoCode(promoCode: string): Promise<{
    isValid: boolean;
    message: string;
    data: ValidPromoCode | null;
  }> {
    setIsPromoLoading(true);
    setApplyDisabled(true);
    if (!promoCode) {
      return {
        isValid: false,
        message: "Please enter a promo code.",
        data: null,
      };
    }

    // 1. Construct the API URL
    const endpoint = `/api/promocode/${promoCode}/validate`; // Adjust path as needed

    try {
      // 2. Fetch the data from your Next.js API route
      const response = await fetch(endpoint);
      const result = await response.json();

      // The API should return the validation status explicitly
      if (result.isValid === true) {
        // Success case
        toast.success("Promo code applied successfully!");
        return {
          isValid: true,
          message: result.message,
          data: result.data, // This contains the ValidPromoCode object
        };
      } else {
        // Failure cases handled by the API (404, 403, 500 errors will land here)
        toast.error(result.message || "Invalid promo code.");
        return {
          isValid: false,
          message: result.message || "Could not validate promo code.",
          data: null,
        };
      }
    } catch (error) {
      // Catch network errors or JSON parsing issues
      console.error("Network or API error during promo code check:", error);
      toast.error("Unable to validate promo code due to a network error.");
      return {
        isValid: false,
        message: "Unable to connect to the server for validation.",
        data: null,
      };
    }
  }
  const form = useForm<z.output<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullname: "",
      email: "",
      promocode: "",
      acceptTerms: false,
      slotId: slotData.slotId || "",
      quantity: slotData.quantity || 1,
      experienceId: experienceId?.toString() || "",
    },
  });

  const handlePromocodeSubmit = async () => {
    setApplyDisabled(true);
    setIsPromoLoading(true);
    const checked = await checkPromoCode(form.getValues("promocode") || "");
    setCheckedPromoData(checked);
    setIsPromoLoading(false);
    setApplyDisabled(false);
  };
  const handlePromoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue("promocode", e.target.value);
    if (e.target.value.length > 0) setApplyDisabled(false);
    else {
      setApplyDisabled(true);
      setCheckedPromoData(null);
    }
  };
  // Inside your CheckoutPage component...

  // Define the shape of the data the API expects (from your Zod schema)

  // ... other functions and state (form, slotData, checkedPromoData, etc.)

  const formSubmit = async (values: z.output<typeof checkoutSchema>) => {
    // console.log(slotData);
    // 🛑 IMPORTANT: Final validation check before submitting
    if (!slotData.slotId || !experience || !slot) {
      // This should not happen if your loading state is correct, but safe to check.
      console.error("Missing essential booking data (Slot or Experience).");
      toast.error("Missing essential booking data. Please try again.");
      return;
    }

    // 1. Calculate the final price based on the current state and checked promo
    const basePrice = Number(experience.price.toString());
    const subtotal = basePrice * slotData.quantity;
    const taxes = 59; // Assuming fixed taxes

    let discountAmount = 0;

    // Apply discount if a valid promo code was successfully checked
    if (checkedPromoData?.isValid && checkedPromoData?.data) {
      const promo = checkedPromoData.data;
      const discountValue = Number(promo.discountValue); // Note: still safer to calculate on backend!

      if (promo.discountType === "PERCENTAGE") {
        // Calculate percentage discount
        discountAmount = subtotal * (discountValue / 100);
      } else if (promo.discountType === "FINAL_AMOUNT") {
        // Apply fixed discount
        discountAmount = discountValue;
      }
    }

    // Calculate the expected final price to send to the backend
    const totalBeforeTaxes = subtotal - discountAmount;
    const finalPrice = totalBeforeTaxes + taxes;

    // 2. Construct the final payload
    const payload: BookingPayload = {
      slotId: slotData.slotId,
      quantity: slotData.quantity,
      userName: values.fullname, // Mapped from form field
      userEmail: values.email, // Mapped from form field
      userPhone: undefined, // Add this if you include a phone field in your form
      promoCode: values.promocode?.toUpperCase() || undefined,
      calculatedFinalPrice: finalPrice, // Backend MUST re-verify this!
    };

    console.log("Submitting Payload:", payload);

    try {
      // 3. Call the API
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // 4. Handle the API Response
      const result = await response.json();

      if (response.ok) {
        // Booking succeeded (Status 201)
        console.log("Booking Success:", result);
        //  Redirect to confirmation page with booking ID
        router.push(
          `/experience/${experienceId}/booking?bookingId=${result.bookingId}`
        );
      } else {
        // Booking failed (e.g., 400 validation, 500 server error)

        console.error("Booking API Error:", result.error);
        toast.error(`Booking Failed: ${result.error || "Please try again."}`);
        // alert(`Booking Failed: ${result.error || "Please try again."}`);
      }
    } catch (error) {
      console.error("Network error during submission:", error);
      toast.error("An unexpected network error occurred.");
      // alert("An unexpected network error occurred.");
    }
  };

  if (isLoading) {
    return <div>Loading experience...</div>;
  }
  return (
    <div className="h-fit min-h-screen w-full px-[124px] py-6 flex flex-col   bg-[#F9F9F9] ">
      <button
        onClick={() => router.back()}
        className="flex gap-2 h-5 items-center mb-6 cursor-pointer"
      >
        <ArrowLeft size={20} />
        <span className="font-medium text-[14px] leading-[18px]  ">
          Checkout
        </span>
      </button>
      <div className="flex gap-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(formSubmit)}>
            <div className="flex  gap-10 w-full h-full">
              <div className="w-[739px] h-fit rounded-[12px] py-5 px-6 gap-4 bg-[#EFEFEF] ">
                <div className="w-full flex gap-6">
                  <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-normal text-[14px] leading-[18px] text-[#5B5B5B]">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value}
                            placeholder="Your name"
                            className="rounded-[6px] w-[333px] h-[42px] py-3 px-4 gap-2.5 bg-[#DDDDDD]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-normal text-[14px] leading-[18px] text-[#5B5B5B]">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value}
                            placeholder="Your email"
                            className="rounded-[6px] w-[333px] h-[42px] py-3 px-4 gap-2.5 bg-[#DDDDDD]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full flex items-end gap-4 mt-4">
                  <FormField
                    control={form.control}
                    name="promocode"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            onChange={(e) => handlePromoChange(e)}
                            value={field.value}
                            placeholder="Promo code"
                            className="rounded-[6px] h-[42px] w-[604px] py-3 px-4 gap-2.5 bg-[#DDDDDD]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <button
                    type="submit"
                    disabled={applyDisabled}
                    onClick={handlePromocodeSubmit}
                    className={cn(
                      "rounded-[8px] cursor-pointer h-[42px] w-full flex items-center justify-center py-3 px-4 bg-[#161616] text-[14px] leading-[18px] font-medium text-[#F9F9F9]",

                      applyDisabled &&
                        "bg-[#161616]/20 cursor-not-allowed pointer-events-none",
                      isPromoLoading &&
                        "bg-[#161616]/20 cursor-not-allowed pointer-events-none"
                    )}
                  >
                    {isPromoLoading ? <Spinner /> : "Apply"}
                  </button>
                </div>

                <div className="w-full mt-4 ">
                  <FormField
                    control={form.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem className="flex gap-2 items-center">
                        <FormControl>
                          <Checkbox
                            className="size-[12px]  border-[#5B5B5B] rounded-none"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-[12px] leading-4 text-[#5B5B5B]">
                          I agree to the terms and safety policy
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="w-[387px] flex flex-col p-6 rounded-[12px] gap-6 bg-[#EFEFEF]">
                <div className="flex flex-col gap-4">
                  <span className="w-full flex justify-between">
                    <h1 className="text-[#656565] text-[16px] leading-5 font-normal">
                      Experience
                    </h1>
                    <p className="truncate w-[200px]">{experience?.name}</p>
                  </span>
                  <span className="w-full flex justify-between">
                    <h1 className="text-[#656565] text-[16px] leading-5 font-normal">
                      Date
                    </h1>
                    <p>
                      {slot?.dateTime
                        ? new Date(slot.dateTime).toLocaleDateString()
                        : ""}
                    </p>
                  </span>
                  <span className="w-full flex justify-between">
                    <h1 className="text-[#656565] text-[16px] leading-5 font-normal">
                      Time
                    </h1>
                    <p>
                      {slot?.dateTime
                        ? new Date(slot.dateTime).toLocaleTimeString()
                        : ""}
                    </p>
                  </span>
                  <span className="w-full flex justify-between">
                    <h1 className="text-[#656565] text-[16px] leading-5 font-normal">
                      Qty
                    </h1>
                    <p>{slotData.quantity}</p>
                  </span>
                  <span className="w-full flex justify-between">
                    <h1 className="text-[#656565] text-[16px] leading-5 font-normal">
                      Subtotal
                    </h1>
                    <p>
                      ₹
                      {(Number(experience?.price.toString()) || 0) *
                        slotData.quantity}
                    </p>
                  </span>
                  <span className="w-full flex justify-between">
                    <h1 className="text-[#656565] text-[16px] leading-5 font-normal">
                      Taxes
                    </h1>
                    <p>₹59</p>
                  </span>
                  <span className="h-[1px] bg-[#D9D9D9] w-full" />

                  <span className="w-full flex justify-between">
                    <h1 className="text-[#000000] text-[18px] leading-6 font-medium">
                      Total
                    </h1>
                    <p>
                      ₹
                      {(Number(experience?.price.toString()) || 0) *
                        slotData.quantity +
                        59}
                    </p>
                  </span>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isFormSubmitDisabled}
                    className={cn(
                      "w-full  py-3 px-5 rounded-[8px] text-[16px] leading-5 font-medium text-[#161616] bg-[#FFD643]  ",
                      isFormSubmitDisabled &&
                        "text-[#7F7F7F] bg-[#D7D7D7]  cursor-not-allowed pointer-events-none"
                    )}
                  >
                    Pay and Confirm
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CheckoutPage;
