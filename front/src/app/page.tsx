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
import { AnimationWrapper } from "@/utils/animations";
import { ScrollAnimation } from "@/utils/scroll-animation";
import { motion } from "framer-motion";
import Location from "@/components/location";

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
    <div className="max-w-[1920px] mx-auto">
      <AnimationWrapper type="slide-down" delay={1} duration={0.5}>
        <div className="mb-4">
          <Navbar />
        </div>
      </AnimationWrapper>
      <AnimationWrapper type="slide-up" delay={1} duration={0.4}>
        <div className="flex flex-col justify-center items-center">
          <Hero />
          <Search />
        </div>
      </AnimationWrapper>

      <AnimationWrapper type="slide-up" delay={1.1} duration={0.4}>
        <div className="flex flex-col justify-center items-center mt-16 md:mt-20 px-4">
          <h1 className="text-7xl lg:text-8xl font-black text-center select-none text-transparent bg-clip-text bg-gradient-to-tr from-[#d9af9e] to-[#78270a] max-w-[1200px]">
            RENT PREMIUM CARS FOR THE BEST PRICE FOR YOUR TRIP
          </h1>
        </div>
      </AnimationWrapper>

      <AnimationWrapper type="slide-up" delay={1.3} duration={0.4}>
        <div className="flex flex-col justify-center items-center mt-16 md:mt-16">
          <h1 className="text-4xl md:text-5xl text-[#1C1F20] font-black text-center select-none mb-2">
            Why choose us
          </h1>
          <Selling />
        </div>
      </AnimationWrapper>

      <ScrollAnimation type="slide-up" delay={0.2}>
        <div className="flex flex-col justify-center items-center mt-16 md:mt-24 pb-12 bg-gradient-to-b from-[#1C1F20] to-zinc-700 rounded-3xl shadow-2xl ring-1 ring-zinc-700 max-w-[1400px] mx-auto">
          <div className="flex flex-col justify-center items-center mt-10 px-4">
            <h1 className="text-4xl md:text-5xl text-white font-bold text-center select-none mb-2">
              Recommended picks
            </h1>
          </div>
          <div
            ref={containerRef}
            className="flex flex-wrap justify-center items-stretch gap-2 mt-5 w-full px-4 pb-2"
          >
            {loading ? (
              <div className="text-white text-xl p-6">Loading...</div>
            ) : (
              visibleCars.map((car, index) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                >
                  <Car car={car} />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </ScrollAnimation>

      <ScrollAnimation type="slide-up" delay={0.2}>
        <div className="flex justify-center items-center mt-10 mb-16">
          <Link href="/cars">
            <motion.button
              className="w-52 h-14 text-xl bg-[#AA4D2B] text-white px-6 py-3 rounded-xl hover:bg-[#943f21] hover:shadow-lg hover:scale-105 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse all cars
            </motion.button>
          </Link>
        </div>
      </ScrollAnimation>

      <ScrollAnimation type="bounce" delay={0.2}>
        <div className="mb-16 px-4 max-w-[1400px] mx-auto">
          <Reviews />
        </div>
      </ScrollAnimation>

      <ScrollAnimation type="bounce" delay={0.2}>
        <div className="max-w-[1400px] mx-auto">
          <Aboutus />
        </div>
      </ScrollAnimation>

      <ScrollAnimation type="slide-up" delay={0.2}>
        <div className="max-w-[1400px] mx-auto">
          <Location />
        </div>
      </ScrollAnimation>

      <ScrollAnimation type="slide-up" delay={0.2}>
        <div className="max-w-[1400px] mx-auto">
          <Faq />
        </div>
      </ScrollAnimation>

      <Footer />
    </div>
  );
}
