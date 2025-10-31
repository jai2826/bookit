"use client";
import { Item, ItemGroup } from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatDisplayDate, formatDisplayTime } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Experience, Slot } from "@prisma/client";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ExperiencePage = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = new URLSearchParams();
  const experienceId = Array.isArray(params.experienceId)
    ? params.experienceId[0]
    : params.experienceId || "";
  const [experience, setExperience] = useState<
    | (Experience & {
        slots: Slot[];
      })
    | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const allDates = experience?.slots.map((slot) => {
    const newDateObject = new Date(slot.dateTime);
    return newDateObject.toISOString().split("T")[0];
  });

  const uniqueDates = Array.from(new Set(allDates));
  const dateSlots = uniqueDates.map((date) => {
    const slotsForDate = experience?.slots.filter((slot) => {
      const newDateObject = new Date(slot.dateTime);
      return newDateObject.toISOString().split("T")[0] === date;
    });
    return {
      date,
      timeSlots: slotsForDate,
    };
  });

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [timeSlots, setTimeSlots] = useState<Slot[]>([]);
  const [slotQuantity, setSlotQuantity] = useState<number>(1);
  const [checkoutUrl, setCheckoutUrl] = useState<string>("");
  const [isCheckOutDisabled, setIsCheckOutDisabled] = useState<boolean>(true);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    let tempTimeSlots = dateSlots.find((slot) => slot.date === date);
    setTimeSlots(tempTimeSlots?.timeSlots || []);
    setSelectedTime("");
    setIsCheckOutDisabled(true);
  };
  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    setIsCheckOutDisabled(false);
  };
  useEffect(() => {
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
    fetchExperience(experienceId);
  }, [experienceId]);
  useEffect(() => {
    searchParams.set(
      "slotId",
      timeSlots.find((slot) => {
        const newDateObject = new Date(slot.dateTime);
        return newDateObject.toISOString() === selectedTime;
      })?.id || ""
    );
    searchParams.set("slotQuantity", slotQuantity.toString());
    setCheckoutUrl(
      `/experience/${experienceId}/checkout?${searchParams.toString()}`
    );
  }, [slotQuantity, selectedTime, timeSlots, experienceId, searchParams]);
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center py-20 bg-[#F9F9F9]">
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center py-20 bg-[#F9F9F9]">
        <p className="text-lg text-red-600">Error: {error}</p>
        <button
          onClick={() => router.push("/home")}
          className="mt-4 text-blue-500 hover:underline cursor-pointer"
        >
          Go back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="h-fit min-h-screen w-full px-4 sm:px-8 lg:px-16 xl:px-[124px] py-6 flex flex-col bg-[#F9F9F9]">
      <button
        onClick={() => router.push("/home")}
        className="flex gap-2 h-5 items-center mb-6 cursor-pointer"
      >
        <ArrowLeft size={20} />
        <span className="font-medium text-[14px] leading-[18px]">
          Details
        </span>
      </button>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="h-full flex flex-col gap-8 w-full lg:w-[765px]">
          <div className="relative h-[381px] rounded-[12px] overflow-hidden w-full">
            <Image
              src={experience?.imageUrl || "/placeholder-image.png"}
              alt={experience?.name || "Experience Image"}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-y-4">
              <h1 className="text-[24px] leading-8 font-medium">
                {experience?.name}
              </h1>
              <p className="text-[16px] leading-6 font-normal text-[#6C6C6C]">
                {experience?.description}
              </p>
            </div>
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-3">
                <h2 className="text-[18px] leading-[22px] font-medium">
                  Choose date
                </h2>
                <div>
                  <RadioGroup
                    value={selectedDate}
                    onValueChange={handleDateChange}
                    className="flex gap-4 overflow-x-auto"
                  >
                    {dateSlots.map((slot) => {
                      const date = slot.date;
                      const displayDate = formatDisplayDate(date);
                      const isSelected = selectedDate === date;

                      return (
                        <div
                          key={slot.date}
                          className="min-w-[69px]"
                          onClick={() => handleDateChange(date)}
                        >
                          <RadioGroupItem
                            value={date}
                            id={slot.date}
                            className="absolute h-0 w-0 opacity-0"
                          />
                          <Label
                            htmlFor={slot.date}
                            className={cn(
                              "w-full flex items-center justify-center text-[14px] leading-[18px] font-normal rounded-[4px] py-2 px-3 gap-2.5 border-[0.6px] border-solid border-[#BDBDBD] cursor-pointer transition-all",
                              isSelected
                                ? "bg-[#FFD643] text-primary shadow-md border-[#FFD643]"
                                : "bg-background text-[#838383]"
                            )}
                          >
                            {displayDate}
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="text-[18px] leading-[22px] font-medium">
                  Choose time
                </h2>
                <div>
                  <RadioGroup
                    value={selectedTime}
                    onValueChange={handleTimeChange}
                    className="flex gap-4 overflow-x-auto"
                  >
                    {timeSlots.map((slot) => {
                      const newDateObject = new Date(slot.dateTime);
                      const time = newDateObject.toISOString();
                      const displayTime = formatDisplayTime(time);
                      const slotsLeft = slot.capacity - slot.bookedCount;
                      const isSelected = selectedTime === time && slotsLeft > 0;
                      return (
                        <div key={slot.id} className="w-fit">
                          <RadioGroupItem
                            value={time}
                            id={slot.id}
                            className="absolute h-0 w-0 opacity-0"
                            disabled={slotsLeft === 0}
                          />
                          <Label
                            htmlFor={slot.id}
                            onClick={() =>
                              slotsLeft > 0 && handleTimeChange(time)
                            }
                            aria-disabled={slotsLeft === 0}
                            className={cn(
                              "w-full flex items-center justify-center text-[14px] leading-[18px] font-normal rounded-[4px] py-2 px-3 gap-1.5 border-[0.6px] border-solid border-[#BDBDBD] cursor-pointer transition-all",
                              isSelected
                                ? "bg-[#FFD643] text-primary border-[#FFD643]"
                                : "bg-background text-[#838383]",
                              slotsLeft === 0 &&
                                "opacity-50 bg-[#CCCCCC] !cursor-not-allowed !pointer-events-none"
                            )}
                          >
                            <span className="text-center text-nowrap">
                              {displayTime}
                            </span>
                            <span className="text-center text-nowrap text-red-500 text-[10px] leading-3">
                              {slotsLeft === 0
                                ? "Sold Out"
                                : `${slotsLeft} left`}
                            </span>
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </div>
                <div>
                  <span className="text-[12px] leading-4 font-normal text-[#838383]">
                    All times are in IST (GMT +5:30)
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="font-medium text-[18px] leading-[22px]">
                  About
                </h1>
                <span className="rounded-[4px] py-2 px-3 gap-2.5 bg-[#EEEEEE]">
                  <p className="text-[12px] leading-4 font-normal text-[#838383]">
                    {experience?.about}
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[387px] flex flex-col h-fit p-6 rounded-[12px] gap-6 bg-[#EFEFEF]">
          <div className="flex flex-col gap-4">
            <span className="w-full flex justify-between">
              <h1 className="text-[#656565] text-[16px] leading-5 font-normal">
                Starts at
              </h1>
              <p>₹{experience?.price.toString()}</p>
            </span>
            <span className="w-full flex justify-between">
              <h1 className="text-[#656565] text-[16px] leading-5 font-normal">
                Quantity
              </h1>
              <span className="flex items-center gap-[9px]">
                {/* CURSOR POINTER ADDED HERE */}
                <button
                  onClick={() =>
                    setSlotQuantity((prev) => {
                      if (prev <= 1) return 1;
                      return prev - 1;
                    })
                  }
                  className="w-4 h-4 flex justify-center border-[0.4px] items-center cursor-pointer"
                >
                  <Minus size={10} />
                </button>
                <p className="text-[12px] leading-[14px] font-normal">
                  {slotQuantity}
                </p>
                {/* CURSOR POINTER ADDED HERE */}
                <button
                  onClick={() => setSlotQuantity((prev) => prev + 1)}
                  className="w-4 h-4 flex justify-center border-[0.4px] items-center cursor-pointer"
                >
                  <Plus size={10} />
                </button>
              </span>
            </span>
            <span className="w-full flex justify-between">
              <h1 className="text-[#656565] text-[16px] leading-5 font-normal">
                Subtotal
              </h1>
              <p>
                ₹{slotQuantity * (Number(experience?.price.toString()) || 0)}
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
                {slotQuantity * (Number(experience?.price.toString()) || 0) +
                  59}
              </p>
            </span>
          </div>
          <div>
            {/* The primary button already has dynamic styling but should have a default cursor pointer */}
            <button
              onClick={() => {
                router.push(checkoutUrl);
              }}
              disabled={isCheckOutDisabled}
              className={cn(
                "w-full py-3 px-5 rounded-[8px] text-[16px] leading-5 font-medium text-[#7F7F7F] cursor-pointer",
                isCheckOutDisabled
                  ? "bg-[#D7D7D7] cursor-not-allowed"
                  : "bg-[#FFD643] text-primary hover:shadow-md transition-shadow duration-200"
              )}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencePage;