"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { checkoutSchema } from "@/app/experience/schema";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Experience, Slot } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

interface ValidPromoCode {
  id: string;
  code: string;
  discountType: "PERCENTAGE" | "FINAL_AMOUNT";
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

  useEffect(() => {
    async function fetchSlot(id: string) {
      try {
        const API_URL = process.env.NEXT_PUBLIC_APP_URL + `/api/slots/${id}`;
        const response = await fetch(API_URL);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch experience");
        }

        const data = await response.json();
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
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch experience");
        }

        const data = await response.json();
        setExperience(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }

    const rawSlotId = searchParams.get("slotId");
    const rawQuantity = searchParams.get("slotQuantity");

    const safeQuantity = rawQuantity ? parseInt(rawQuantity) : 1;
    const safeSlotId = rawSlotId || "";
    const safeExperienceId = experienceId?.toString() || "";

    setSlotData({
      slotId: safeSlotId,
      quantity: safeQuantity,
    });

    form.reset({
      fullname: form.getValues("fullname"),
      email: form.getValues("email"),
      promocode: form.getValues("promocode"),
      acceptTerms: form.getValues("acceptTerms"),

      slotId: safeSlotId,
      quantity: safeQuantity,
      experienceId: safeExperienceId,
    });

    if (rawSlotId) {
      fetchSlot(rawSlotId);
    }
    fetchExperience(safeExperienceId);
  }, [searchParams, experienceId]);

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

    const endpoint = `/api/promocode/${promoCode}/validate`;

    try {
      const response = await fetch(endpoint);
      const result = await response.json();

      if (result.isValid === true) {
        toast.success("Promo code applied successfully!");
        return {
          isValid: true,
          message: result.message,
          data: result.data,
        };
      } else {
        toast.error(result.message || "Invalid promo code.");
        return {
          isValid: false,
          message: result.message || "Could not validate promo code.",
          data: null,
        };
      }
    } catch (error) {
      console.error("Network or API error during promo code check:", error);
      toast.error("Unable to validate promo code due to a network error.");
      return {
        isValid: false,
        message: "Unable to connect to the server for validation.",
        data: null,
      };
    }
  }

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

  const formSubmit = async (values: z.output<typeof checkoutSchema>) => {
    if (!slotData.slotId || !experience || !slot) {
      console.error("Missing essential booking data (Slot or Experience).");
      toast.error("Missing essential booking data. Please try again.");
      return;
    }

    const basePrice = Number(experience.price.toString());
    const subtotal = basePrice * slotData.quantity;
    const taxes = 59;

    let discountAmount = 0;

    if (checkedPromoData?.isValid && checkedPromoData?.data) {
      const promo = checkedPromoData.data;
      const discountValue = Number(promo.discountValue);

      if (promo.discountType === "PERCENTAGE") {
        discountAmount = subtotal * (discountValue / 100);
      } else if (promo.discountType === "FINAL_AMOUNT") {
        discountAmount = discountValue;
      }
    }

    const totalBeforeTaxes = subtotal - discountAmount;
    const finalPrice = totalBeforeTaxes + taxes;

    const payload: BookingPayload = {
      slotId: slotData.slotId,
      quantity: slotData.quantity,
      userName: values.fullname,
      userEmail: values.email,
      userPhone: undefined,
      promoCode: values.promocode?.toUpperCase() || undefined,
      calculatedFinalPrice: finalPrice,
    };

    console.log("Submitting Payload:", payload);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Booking Success:", result);
        router.push(
          `/experience/${experienceId}/booking?bookingId=${result.bookingId}`
        );
      } else {
        console.error("Booking API Error:", result.error);
        toast.error(`Booking Failed: ${result.error || "Please try again."}`);
      }
    } catch (error) {
      console.error("Network error during submission:", error);
      toast.error("An unexpected network error occurred.");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center py-20 bg-[#F9F9F9]">
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );
  }
  return (
    <div className="h-fit min-h-screen w-full px-4 sm:px-8 lg:px-16 xl:px-[124px] py-6 flex flex-col bg-[#F9F9F9] ">
      <button
        onClick={() => router.back()}
        className="flex gap-2 h-5 items-center mb-6 cursor-pointer"
      >
        <ArrowLeft size={20} />
        <span className="font-medium text-[14px] leading-[18px]">
          Checkout
        </span>
      </button>
      <div className="flex flex-col lg:flex-row gap-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(formSubmit)} className="w-full">
            <div className="flex flex-col lg:flex-row gap-10 w-full h-full">
              <div className="w-full h-fit rounded-[12px] py-5 px-6 gap-4 bg-[#EFEFEF] ">
                <div className="w-full flex flex-col sm:flex-row gap-6">
                  <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem className="w-full sm:w-1/2">
                        <FormLabel className="font-normal text-[14px] leading-[18px] text-[#5B5B5B]">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value}
                            placeholder="Your name"
                            className="rounded-[6px] w-full h-[42px] py-3 px-4 gap-2.5 bg-[#DDDDDD]"
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
                      <FormItem className="w-full sm:w-1/2">
                        <FormLabel className="font-normal text-[14px] leading-[18px] text-[#5B5B5B]">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value}
                            placeholder="Your email"
                            className="rounded-[6px] w-full h-[42px] py-3 px-4 gap-2.5 bg-[#DDDDDD]"
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
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            {...field}
                            onChange={(e) => handlePromoChange(e)}
                            value={field.value}
                            placeholder="Promo code"
                            className="rounded-[6px] h-[42px] w-full py-3 px-4 gap-2.5 bg-[#DDDDDD]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <button
                    type="button"
                    disabled={applyDisabled}
                    onClick={handlePromocodeSubmit}
                    className={cn(
                      "rounded-[8px] cursor-pointer h-[42px] min-w-[100px] flex-shrink-0 flex items-center justify-center py-3 px-4 bg-[#161616] text-[14px] leading-[18px] font-medium text-[#F9F9F9] transition-colors",
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
                            className="size-[12px] border-[#5B5B5B] rounded-none"
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

              <div className="w-full lg:w-[387px] flex flex-col p-6 rounded-[12px] gap-6 bg-[#EFEFEF]">
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
                      "w-full py-3 px-5 rounded-[8px] text-[16px] leading-5 font-medium text-[#161616] bg-[#FFD643] cursor-pointer",
                      isFormSubmitDisabled &&
                        "text-[#7F7F7F] bg-[#D7D7D7] cursor-not-allowed pointer-events-none"
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