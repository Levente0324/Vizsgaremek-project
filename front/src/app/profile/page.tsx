"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import { formatPrice } from "@/utils/currency";

interface User {
  id: number;
  email: string;
}

interface Booking {
  id: number;
  carId: number;
  userId: number;
  startDate: string;
  endDate: string;
  car: {
    id: number;
    manufacturer: string;
    model: string;
    priceForOneDay: number;
  };
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/sign-in");
        return;
      }

      try {
        const userResponse = await fetch("http://localhost:3000/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await userResponse.json();
        setUser(userData);
        setNewEmail(userData.email);

        const bookingsResponse = await fetch("http://localhost:3000/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!bookingsResponse.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const allBookings = await bookingsResponse.json();
        const userBookings = allBookings.filter(
          (booking: Booking) => booking.userId === userData.id
        );
        setBookings(userBookings);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to load profile data");
        localStorage.removeItem("token");
        router.push("/sign-in");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleUpdateEmail = async () => {
    const token = localStorage.getItem("token");
    if (!token || !user) return;

    try {
      const response = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: newEmail }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update email");
      }

      setUser((prev) => (prev ? { ...prev, email: newEmail } : null));
      setIsEditing(false);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update email");
    }
  };

  const handleCancelBooking = async (bookingId: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(
        `http://localhost:3000/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel booking");
      }

      setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
    } catch (error) {
      setError("Failed to cancel booking");
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

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow p-4 md:p-8 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-black text-center mb-5 underline underline-offset-8">
              Profile
            </h1>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            <div className="mb-6">
              <div className="w-full flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div className="w-full md:w-auto">
                  <h2 className="text-3xl font-semibold text-[#1C1F20]">
                    Email:
                  </h2>
                  {isEditing ? (
                    <div className="flex flex-col md:flex-row items-start md:items-center mt-2 gap-2">
                      <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="w-full md:w-[300px] px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <div className="flex gap-2 w-full md:w-auto">
                        <button
                          onClick={handleUpdateEmail}
                          className="w-full md:w-auto bg-[#AA4D2B] text-white px-4 py-2 ml-2 rounded-lg hover:bg-[#943f21]"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setNewEmail(user?.email || "");
                          }}
                          className="w-full md:w-auto text-gray-600 hover:text-[#AA4D2B] ml-3"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center mt-2">
                      <span className="text-gray-600 text-lg w-full mr-5">
                        {user?.email}
                      </span>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="ml-4 bg-[#AA4D2B] hover:bg-[#943f21] text-base text-white px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-3xl font-bold text-[#1C1F20] mb-4">
                Current Bookings:
              </h2>
              {bookings.length === 0 ? (
                <p className="text-gray-600 text-lg">No current bookings</p>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-gray-50 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                    >
                      <div>
                        <h3 className="font-semibold text-xl text-[#1C1F20]">
                          {booking.car?.manufacturer} {booking.car?.model}
                        </h3>
                        <p className="text-gray-600 text-base">
                          {new Date(booking.startDate).toLocaleDateString()} -{" "}
                          {new Date(booking.endDate).toLocaleDateString()}
                        </p>
                        <p className="text-[#AA4D2B]">
                          {booking.car &&
                            formatPrice(booking.car.priceForOneDay)}{" "}
                          / day
                        </p>
                      </div>
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="w-full md:w-auto bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
