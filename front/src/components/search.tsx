import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    router.push(`/cars?${params.toString()}`);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full md:w-[900px] h-auto bg-white rounded-3xl -mt-20 py-2 px-6 border-2 shadow-2xl search-container">
      <div className="flex justify-center items-center w-full h-[72px]">
        <h1 className="text-4xl text-[#1C1F20] font-black -mt-4 select-none">
          Search for a car
        </h1>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-top w-full h-auto space-y-2 md:space-y-0 md:space-x-2 -mt-1 mb-4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-[500px] bg-[#F8F8F7] rounded-xl px-2 py-2 text-lg border-2 h-[50px] cursor-pointer focus:cursor-default search-box"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="bg-[#F8F8F7] text-[#9CA3AF] rounded-xl px-2 py-2 text-lg border-2 h-[50px] w-full md:w-[200px] cursor-pointer"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="bg-[#F8F8F7] text-[#9CA3AF] rounded-xl px-2 py-2 text-lg border-2 h-[50px] w-full md:w-[200px] cursor-pointer"
        />
        <button
          onClick={handleSearch}
          className="bg-[#1C1F20] bg-gradient-to-bl from-[#1C1F20] to-zinc-600 text-white rounded-xl h-[50px] w-full md:w-[80px] flex justify-center items-center hover:bg-[#44484b] hover:ring-1 hover:ring-[#44484b] transition-all search-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="w-5 h-5 my-auto"
          >
            <path
              d="M19 19L13 13M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Search;
