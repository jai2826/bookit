"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const BookingResult = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const router = useRouter();
  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col py-10 sm:py-20 px-4 text-center">
      <Image src="/success.svg" alt="Success" width={80} height={80} />
      <p className="font-medium text-[24px] sm:text-[32px] leading-8 sm:leading-10 text-[#161616] mt-6 sm:mt-8">
        Booking Confirmed
      </p>
      <p className="mt-4 sm:mt-5 font-normal text-[16px] sm:text-[20px] leading-5 sm:leading-6 text-[#656565]">
        Ref ID: {bookingId}
      </p>
      <button
        onClick={() => router.push("/home")}
        className="mt-10 sm:mt-14 py-2 px-4 gap-2.5 bg-[#E3E3E3] text-[16px] leading-5 text-[#656565] rounded-[4px] cursor-pointer hover:bg-[#D3D3D3] transition-colors"
      >
        Back to Home
      </button>
    </div>
  );
};

export default BookingResult;