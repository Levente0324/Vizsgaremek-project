import React from "react";
import Image from "next/image";

const Search = () => {
  return (
    <div className="flex flex-col justify-center items-center w-[800px] h-36 bg-white rounded-3xl -mt-20 py-2 px-6 border-2">
      <div className="flex justify-center items-center w-full h-[72px]">
        <h1 className="text-3xl text-black font-bold -mt-5">
          Search for a car
        </h1>
      </div>
      <div className="flex justify-center items-top w-full h-[72px] space-x-2 -mt-2">
        <input
          type="text"
          placeholder="Search"
          className="bg-[#F8F8F7] rounded-xl px-2 py-2 text-lg border-2 h-[50px] w-[500px]"
        />
        <input
          type="date"
          className="bg-[#F8F8F7] rounded-xl px-2 py-2 text-lg border-2 h-[50px] w-[200px]"
        />
        <input
          type="date"
          className="bg-[#F8F8F7] rounded-xl px-2 py-2 text-lg border-2 h-[50px] w-[200px]"
        />
        <button className="bg-[#F8F8F7] text-black rounded-xl border-2 p-0 h-[50px] w-[80px] flex justify-center items-center">
          <Image src="/search.png" width={20} height={20} alt="search" />
        </button>
      </div>
    </div>
  );
};

export default Search;
