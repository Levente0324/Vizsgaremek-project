"use client";

import Navbar from "@/components/navbar";
import Car from "@/components/car";
import { useEffect, useState } from "react";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:3000/cars");
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

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
        <div className="flex flex-wrap justify-center items-center gap-4 w-full max-w-[1600px] px-4">
          {loading ? (
            <div className="flex justify-center items-center min-h-[50vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#AA4D2B]"></div>
            </div>
          ) : cars.length === 0 ? (
            <div className="text-gray-600 text-lg">No cars available</div>
          ) : (
            cars.map((car) => <Car key={car.id} car={car} />)
          )}
        </div>
      </div>
    </>
  );
}
