import React from "react";
import Image from "next/image";

const Search = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full md:w-[800px] h-32 bg-white rounded-3xl -mt-20 py-2 px-6 border-2">
      <div className="flex justify-center items-center w-full h-[72px]">
        <h1 className="text-3xl text-[#1C1F20] font-bold -mt-5">
          Search for a car
        </h1>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-top w-full h-[72px] space-y-2 md:space-y-0 md:space-x-2 -mt-2">
        <input
          type="text"
          placeholder="Search"
          className="w-full md:w-[500px] bg-[#F8F8F7] rounded-xl px-2 py-2 text-lg border-2 h-[50px] cursor-pointer focus:cursor-default"
        />
        <input
          type="date"
          placeholder="Start date"
          className="bg-[#F8F8F7] text-[#9CA3AF] rounded-xl px-2 py-2 text-lg border-2 h-[50px] w-[200px] cursor-pointer"
        />
        <input
          type="date"
          placeholder="Return date"
          className="bg-[#F8F8F7] text-[#9CA3AF] rounded-xl px-2 py-2 text-lg border-2 h-[50px] w-[200px] cursor-pointer"
        />
        <button className="bg-[#1C1F20] text-white rounded-xl border-2 p-0 h-[50px] w-[80px] flex justify-center items-center hover:bg-[#44484b]">
          <Image src="/search.png" width={20} height={20} alt="search" />
        </button>
      </div>
    </div>
  );
};

export default Search;
