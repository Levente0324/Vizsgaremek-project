"use client";

import Navbar from "@/components/navbar";
import Car from "@/components/car";
import Filters from "@/components/filters";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

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
    <>
      <div className="mb-2 px-4 md:px-0">
        <Navbar />
      </div>
      <div className="flex flex-col justify-center items-center px-4 md:px-0">
        <div className="flex flex-col justify-center items-center mt-8 mb-4">
          <h1 className="text-3xl md:text-6xl text-[#1C1F20] font-bold text-center">
            All Cars
          </h1>
        </div>
        <Filters
          manufacturers={getUniqueValues("manufacturer")}
          types={getUniqueValues("type")}
          fuelTypes={getUniqueValues("fuelType")}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
        <div className="bg-transparent max-w-[1400px] w-full mx-auto py-2">
          <div className="flex flex-wrap justify-center items-stretch gap-6">
            {loading ? (
              <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#AA4D2B]"></div>
              </div>
            ) : filteredCars.length === 0 ? (
              <div className="text-white text-lg py-12">No cars found</div>
            ) : (
              filteredCars.map((car) => <Car key={car.id} car={car} />)
            )}
          </div>
        </div>
      </div>
    </>
  );
}
