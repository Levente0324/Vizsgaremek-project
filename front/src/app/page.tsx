"use client";

import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Search from "@/components/search";
import Car from "@/components/car";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

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

export default function Home() {
  const [cars, setCars] = useState<CarType[]>([]);
  const [visibleCars, setVisibleCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!containerRef.current) return;

    const updateVisibleCars = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const cardWidth = 332;
      const cardsPerRow = Math.floor(containerWidth / cardWidth);
      setVisibleCars(cars.slice(0, cardsPerRow));
    };

    const resizeObserver = new ResizeObserver(() => {
      updateVisibleCars();
    });

    resizeObserver.observe(containerRef.current);
    updateVisibleCars();

    return () => {
      resizeObserver.disconnect();
    };
  }, [cars]);

  return (
    <>
      <div className="mb-2">
        <Navbar />
      </div>
      <div className="flex flex-col justify-center items-center">
        <Hero />
        <Search />
      </div>
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-5xl text-black font-bold">Kiemelt ajanlatok</h1>
      </div>
      <div
        ref={containerRef}
        className="flex flex-wrap justify-center items-center mt-5 w-full h-full"
      >
        {loading ? (
          <div>Loading...</div>
        ) : (
          visibleCars.map((car) => <Car key={car.id} car={car} />)
        )}
      </div>
      <div className="flex justify-center items-center mt-4">
        <Link href="/cars">
          <button className="w-36 h-12 text-lg bg-[#AA4D2B] text-white px-4 py-2 rounded-xl hover:bg-[#943f21] transition-colors">
            Show all cars
          </button>
        </Link>
      </div>
    </>
  );
}
