"use client";

import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Search from "@/components/search";
import Car from "@/components/car";
import Reviews from "@/components/reviews";
import Faq from "@/components/faq";
import Selling from "@/components/selling-points";
import Footer from "@/components/footer";
import Aboutus from "@/components/aboutus";
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
      const cardsPerRow = Math.floor(containerWidth / cardWidth) || 1;
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
      <div className="mb-2 px-4 md:px-0">
        <Navbar />
      </div>
      <div className="flex flex-col justify-center items-center px-4 md:px-0">
        <Hero />
        <Search />
      </div>
      <div className="flex flex-col justify-center items-center mt-12 md:mt-16 px-4 md:px-24">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-center select-none text-transparent bg-clip-text bg-gradient-to-tr from-[#d9af9e] to-[#78270a]">
          RENT PREMIUM CARS FOR THE BEST PRICE FOR YOUR TRIP
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center mt-12 md:mt-16 px-4 md:px-0">
        <h1 className="text-3xl md:text-5xl text-[#1C1F20] font-black text-center select-none">
          Why choose us
        </h1>
        <Selling />
      </div>
      <div className="flex flex-col justify-center items-center mt-12 md:mt-16 pb-8 md:px-0 bg-gradient-to-b from-[#1C1F20] to-zinc-700 rounded-3xl md:rounded-[50px] shadow-2xl ring-1 ring-zinc-700">
        <div className="flex flex-col justify-center items-center mt-10 px-4 md:px-0">
          <h1 className="text-3xl md:text-5xl text-white font-bold text-center select-none">
            Recommended picks
          </h1>
        </div>
        <div
          ref={containerRef}
          className="flex flex-wrap justify-center items-center mt-5 w-full h-full px-4 md:px-0"
        >
          {loading ? (
            <div className="text-white text-xl p-6">Loading...</div>
          ) : (
            visibleCars.map((car) => <Car key={car.id} car={car} />)
          )}
        </div>
      </div>
      <div className="flex justify-center items-center mt-6 mb-10 md:mb-14">
        <Link href="/cars">
          <button className="w-44 h-14 text-xl bg-[#AA4D2B] text-white px-4 py-2 rounded-xl hover:bg-[#943f21] hover:ring-2 hover:ring-[#943f21] transition-all">
            Show all cars
          </button>
        </Link>
      </div>
      <div className="mb-6 px-4 md:px-16">
        <Reviews />
      </div>
      <div>
        <Aboutus />
      </div>
      <div>
        <Faq />
      </div>
      <Footer />
    </>
  );
}
