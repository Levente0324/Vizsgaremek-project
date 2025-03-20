"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { use } from "react";
import { formatPrice } from "@/utils/currency";

interface Car {
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

export default function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();
  const resolvedParams = use(params);
  
  const carId = resolvedParams.id;

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`http://localhost:3000/cars/${carId}`);
        if (!response.ok) {
          throw new Error("Car not found");
        }
        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to load car data");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [carId]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:3000/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUserId(userData.id);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleBook = () => {
    const token = localStorage.getItem("token");
    if (!token || !userId) {
      router.push("/sign-in");
      return;
    }

    if (!startDate || !endDate) {
      setError("Please select both start and end dates");
      return;
    }
    router.push(`/cars/${carId}/booking?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#AA4D2B]"></div>
        </div>
      </>
    );
  }

  if (!car) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-red-600">Car not found</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold text-[#1C1F20] mb-6">
            {car.manufacturer} {car.model}
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-xl md:text-3xl font-semibold text-[#1C1F20]">
                Car Details
              </h2>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span className="font-medium text-xl text-[#1C1F20]">Type:</span>
                  <span className="text-lg text-[#1C1F20]">{car.type}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium text-xl text-[#1C1F20]">Seats:</span>
                  <span className="text-lg text-[#1C1F20]">{car.numberOfSeats}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium text-xl text-[#1C1F20]">Suitcases:</span>
                  <span className="text-lg text-[#1C1F20]">{car.numberOfSuitcases}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium text-xl text-[#1C1F20]">Fuel Type:</span>
                  <span className="text-lg text-[#1C1F20]">{car.fuelType}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium text-xl text-[#1C1F20]">Transmission:</span>
                  <span className="text-lg text-[#1C1F20]">{car.clutchType}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium text-2xl text-[#1C1F20]">Price per day:</span>
                  <span className="text-[#AA4D2B] font-bold text-2xl">
                    {formatPrice(car.priceForOneDay)}
                  </span>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Image src={`/${carId}.png`} width={500} height={300} className="" alt="Car" />
            </div>

            <div className="col-span-1 md:col-span-2 w-full border-t-[1px] border-black">
              <div className="space-y-6 max-w-2xl mx-auto mt-4">
                <h2 className="text-xl md:text-3xl font-semibold text-[#1C1F20] text-center">
                  Book Now
                </h2>
                <div className="space-y-4 w-full">
                  <div className="w-full"> 
                      <label className="block text-[#1C1F20] text-xl tetx-center mb-2 ">
                        Start Date
                      </label>
                    <div className="flex justify-center">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        minDate={new Date()}
                        className="w-full md:w-[400px] px-6 py-3 border border-gray-300 rounded-xl hover:cursor-pointer focus:cursor-default text-lg"
                        placeholderText="Select start date"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="block text-[#1C1F20] text-xl mb-2 text-center">
                      End Date
                    </label>
                    <div className="flex justify-center">
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        minDate={startDate || new Date()}
                        className="w-full md:w-[400px] px-6 py-3 border border-gray-300 rounded-xl hover:cursor-pointer focus:cursor-default text-lg"
                        placeholderText="Select end date"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={handleBook}
                      disabled={!car.isAvailable}
                      className={`w-full md:w-[400px] py-3 px-4 rounded-xl text-white font-medium text-lg ${
                        car.isAvailable
                          ? "bg-[#AA4D2B] hover:bg-[#943f21] hover:ring-1 hover:ring-[#943f21] transition-all"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {car.isAvailable ? "Continue to Book" : "Not Available"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
