"use client";

import Navbar from "@/components/navbar";
import Car from "@/components/car";
import Filters from "@/components/filters";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AnimationWrapper } from "@/utils/animations";

interface CarType {
  id: number;
  manufacturer: string;
  model: string;
  type: string;
  numberOfSeats: number;
  numberOfSuitcases: number;
  fuelType: string;
  clutchType: string;
  priceForOneDay: number;
  isAvailable: boolean;
}

export default function CarsPage() {
  const [cars, setCars] = useState<CarType[]>([]);
  const [filteredCars, setFilteredCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    manufacturer: "",
    type: "",
    fuelType: "",
    seats: "",
    transmission: "",
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:3000/cars");
        const data = await response.json();
        setCars(data);
        setFilteredCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const getUniqueValues = (key: keyof CarType) => {
    return Array.from(new Set(cars.map((car) => String(car[key]))));
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  useEffect(() => {
    const search = searchParams.get("search")?.toLowerCase();
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    let filtered = [...cars];

    if (search) {
      filtered = filtered.filter(
        (car) =>
          car.manufacturer.toLowerCase().includes(search) ||
          car.model.toLowerCase().includes(search) ||
          car.type.toLowerCase().includes(search)
      );
    }

    if (startDate && endDate) {
      filtered = filtered.filter((car) => car.isAvailable);
    }

    if (selectedFilters.manufacturer) {
      filtered = filtered.filter(
        (car) => car.manufacturer === selectedFilters.manufacturer
      );
    }
    if (selectedFilters.type) {
      filtered = filtered.filter((car) => car.type === selectedFilters.type);
    }
    if (selectedFilters.fuelType) {
      filtered = filtered.filter(
        (car) => car.fuelType === selectedFilters.fuelType
      );
    }
    if (selectedFilters.seats) {
      filtered = filtered.filter(
        (car) => car.numberOfSeats === Number(selectedFilters.seats)
      );
    }
    if (selectedFilters.transmission) {
      filtered = filtered.filter(
        (car) => car.clutchType === selectedFilters.transmission
      );
    }

    setFilteredCars(filtered);
  }, [cars, searchParams, selectedFilters]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="sticky top-0 z-30 bg-transparent">
        <AnimationWrapper type="slide-down" delay={0.3} duration={0.3}>
          <div className="mb-2 px-4 md:px-0">
            <Navbar />
          </div>
        </AnimationWrapper>
        <AnimationWrapper type="slide-up" delay={0.3} duration={0.3}>
          <div className="flex flex-col justify-center items-center px-4 md:px-0">
            <div className="flex flex-col justify-center items-center mt-2 mb-4">
              <h1 className="text-3xl md:text-6xl text-[#1C1F20] font-bold text-center">
                All Cars
              </h1>
            </div>
            <div className="w-full max-w-[1100px]">
              <Filters
                manufacturers={getUniqueValues("manufacturer")}
                types={getUniqueValues("type")}
                fuelTypes={getUniqueValues("fuelType")}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>
        </AnimationWrapper>
      </div>

      <div className="relative w-full flex-grow overflow-hidden mt-4 mb-2">
        <div className="absolute top-0 left-0 w-full h-6 z-10 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)",
            }}
          ></div>
        </div>

        <div
          ref={containerRef}
          className="max-w-[1400px] w-full mx-auto px-4 md:px-0 overflow-y-auto h-full scrollbar-hide smooth-scroll hardware-accelerated"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, white 5%, white 95%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, white 5%, white 95%, transparent 100%)",
            scrollBehavior: "smooth",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className="flex flex-wrap justify-center items-stretch gap-6 pt-4 pb-12">
            {loading ? (
              <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#AA4D2B]"></div>
              </div>
            ) : filteredCars.length === 0 ? (
              <div className="text-gray-800 text-lg py-12">No cars found</div>
            ) : (
              <AnimatePresence>
                {filteredCars.map((car, index) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: Math.min(index * 0.04 + 0.3, 2.6),
                      duration: 0.4,
                    }}
                  >
                    <Car car={car} />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-6 z-10 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              maskImage:
                "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage:
                "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
