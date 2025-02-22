"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { use } from "react";

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

export default function CarDetailPage({ params }: { params: { id: string } }) {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`http://localhost:3000/cars/${params.id}`);
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
  }, [params.id]);

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

  const handleBook = async () => {
    const token = localStorage.getItem("token");
    if (!token || !userId) {
      router.push("/sign-in");
      return;
    }

    if (!startDate || !endDate) {
      setError("Please select both start and end dates");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          carId: parseInt(params.id),
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          userId: userId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to book car");
      }

      router.push("/profile");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to book car");
    }
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
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            {car.manufacturer} {car.model}
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-700">
                Car Details
              </h2>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span className="font-medium">Type:</span>
                  <span>{car.type}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Seats:</span>
                  <span>{car.numberOfSeats}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Suitcases:</span>
                  <span>{car.numberOfSuitcases}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Fuel Type:</span>
                  <span>{car.fuelType}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Transmission:</span>
                  <span>{car.clutchType}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Price per day:</span>
                  <span className="text-[#AA4D2B] font-bold">
                    {car.priceForOneDay.toLocaleString()} Ft
                  </span>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-700">Book Now</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Start Date</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    minDate={new Date()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholderText="Select start date"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">End Date</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    minDate={startDate || new Date()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholderText="Select end date"
                  />
                </div>
                <button
                  onClick={handleBook}
                  disabled={!car.isAvailable}
                  className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                    car.isAvailable
                      ? "bg-[#AA4D2B] hover:bg-[#943f21]"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {car.isAvailable ? "Book Now" : "Not Available"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
