'use client'
import { Experience } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Card = (experience: Experience) => {
  // console.log(experience);
  const router = useRouter();

  return (
    <div className="w-[280px] h-[312px] rounded-[12px] overflow-hidden ">
      <div className="relative w-[280px] h-[170px] ">
        <Image
          src={experience.imageUrl || "/placeholder-image.png"}
          alt={experience.name}
          fill
          className="object-center"
        />
      </div>
      <div className="py-3 px-4 bg-[#F0F0F0] flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-3">
          <div className="w-full flex justify-between h-6 items-center font-medium  ">
            <h2 className="text-[16px]  leading-5 truncate">
              {experience.name}
            </h2>
            <span className="py-1 px-2 rounded-[4px] truncate text-nowrap min-w-[60px] bg-[#D6D6D6] text-[11px] leading-4 ">
              {experience.location}
            </span>
          </div>
          <p className="text-[12px] leading-4 font-normal line-clamp-2  text-[#6C6C6C]">
            {experience.description}
          </p>
        </div>
        <div className="flex justify-between">
          <div className="space-x-1.5">
            <span className="text-[12px] leading-4 font-normal  ">From</span>
            <span className="text-[20px] leading-6   font-medium">
              ₹{experience.price.toString()}
            </span>
          </div>
          <button
            onClick={() => router.push(`/experience/${experience.id}`)}
            className="bg-[#FFD643] gap-[10px] py-1.5 px-2 text-center rounded-[4px] font-medium text-[14px] leading-[18px]  "
          >
            View Details
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default Card;
