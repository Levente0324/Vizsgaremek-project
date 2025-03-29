import React, { useState } from "react";
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
    <div className="flex flex-col justify-center items-center w-full max-w-[1000px] h-auto bg-white rounded-[40px] -mt-20 py-4 px-7 border shadow-2xl">
      <div className="flex justify-center items-center w-full h-12 mt-1 mb-1">
        <h1 className="text-4xl text-[#1C1F20] font-black -mt-1 md:-mt-5 select-none">
          Find Your Perfect{" "}
          <span className="bg-gradient-to-tr from-[#c29684] to-[#78270a] text-transparent bg-clip-text font-bold">
            Ride
          </span>
        </h1>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-top w-full h-auto space-y-3 md:space-y-0 md:space-x-3 mb-2">
        <div className="relative w-full md:w-[500px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search for cars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F8F8F7] rounded-xl pl-10 pr-3 py-3 text-lg border-2 h-[54px] border-gray-100 focus:border-[#AA4D2B] focus:ring-2 focus:ring-[#AA4D2B]/20 hover:cursor-pointer focus:cursor-default outline-none transition-all duration-300"
          />
        </div>

        <div className="relative w-full md:w-[220px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full bg-[#F8F8F7] text-gray-700 rounded-xl pl-10 pr-3 py-3 text-lg border-2 h-[54px] border-gray-100 focus:border-[#AA4D2B] focus:ring-2 focus:ring-[#AA4D2B]/20 hover:cursor-pointer outline-none transition-all duration-300"
          />
        </div>

        <div className="relative w-full md:w-[220px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full bg-[#F8F8F7] text-gray-700 rounded-xl pl-10 pr-3 py-3 text-lg border-2 h-[54px] border-gray-100 focus:border-[#AA4D2B] focus:ring-2 focus:ring-[#AA4D2B]/20 hover:cursor-pointer outline-none transition-all duration-300"
          />
        </div>

        <button
          onClick={handleSearch}
          className="w-full flex justify-center place-items-center md:w-[140px] h-[54px] bg-[#AA4D2B] text-white rounded-xl hover:bg-[#943f21] shadow-lg hover:ring-2 hover:ring-[#943f21] transition-all duration-300 text-lg"
        >
          <p>Search</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="w-5 h-5 ml-2"
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
