"use client";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const BookingResult = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const router = useRouter();
  return (
    <div className="w-full h-full flex items-center flex-col py-20">
      <Image src="/success.svg" alt="Success" width={80} height={80} />
      <p className="font-medium text-[32px] leading-10 text-[#161616] mt-8">
        Booking Confirmed
      </p>
      <p className="mt-5 font-normal text-[20px] leading-6 text-[#656565]">
        Ref ID: {bookingId}
      </p>
      <button
        onClick={() => router.push("/home")}
        className="mt-14 py-2 px-4 gap-2.5 bg-[#E3E3E3] text-[16px] leading-5 text-[#656565] rounded-[4px]"
      >
        Back to Home
      </button>
    </div>
  );
};

export default BookingResult;
