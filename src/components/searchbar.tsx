import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
    <div className="flex gap-x-4 ">
      <Input
        className="bg-[#EDEDED] w-[340px] h-[42px] font-normal text-[14px] leading-[18px] rounded-[4px] "
        type="text"
        placeholder="Search experiences"
      />
      <button className="bg-[#FFD643] gap-[10px] py-3 px-5 text-center rounded-[8px] font-medium text-[14px] leading-[18px]  ">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
