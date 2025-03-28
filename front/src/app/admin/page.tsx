"use client";

import {
  Button,
  Dialog,
  DialogPanel,
  DialogBackdrop,
  DialogTitle,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";

interface Car {
  id: number;
  manufacturer: string;
  model: string;
  type: string;
  isAvailable: boolean;
  priceForOneDay: number;
}

interface User {
  id: number;
  email: string;
  isAdmin: boolean;
}

interface Booking {
  id: number;
  carId: number;
  userId: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
}

export default function AdminPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "cars" | "users" | "bookings" | "create" | "insight"
  >("cars");
  const [createType, setCreateType] = useState<"car" | "user" | null>(null);
  const [newCar, setNewCar] = useState({
    manufacturer: "",
    model: "",
    type: "",
    numberOfSeats: 0,
    numberOfSuitcases: 0,
    fuelType: "",
    clutchType: "",
    priceForOneDay: 0,
    isAvailable: true,
  });
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    isAdmin: false,
  });
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [saleAmount, setSaleAmount] = useState(0);
  const [openCarId, setOpenCarId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/sign-in");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          router.push("/");
          return;
        }

        const userData = await response.json();
        if (!userData.isAdmin) {
          router.push("/");
          return;
        }

        fetchData();
      } catch (error) {
        console.error("Error checking admin status:", error);
        router.push("/");
      }
    };

    checkAdmin();
  }, [router]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const [carsRes, usersRes, bookingsRes] = await Promise.all([
        fetch("http://localhost:3000/cars"),
        fetch("http://localhost:3000/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:3000/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const [carsData, usersData, bookingsData] = await Promise.all([
        carsRes.json(),
        usersRes.json(),
        bookingsRes.json(),
      ]);

      setCars(carsData);
      setUsers(usersData);
      setBookings(bookingsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (type: string, id: number) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:3000/${type}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };

  const handleSale = async (id: number, amount: number) => {
    const token = localStorage.getItem("token");
    const car = cars.find((car) => car.id === id);
    if (!car) {
      console.error("Car not found");
      return;
    }

    const newPrice = car.priceForOneDay * (1 - amount / 100);
    try {
      const response = await fetch(`http://localhost:3000/cars/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          priceForOneDay: newPrice,
        }),
      });

      if (response.ok) {
        setOpenCarId(null);
        setSaleAmount(0);
        await fetchData();
      } else {
        console.error("Failed to update price");
      }
    } catch (error) {
      console.error(`Error updating price:`, error);
    }
  };

  const handleCreateCar = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCar),
      });

      if (response.ok) {
        await fetchData();
        setCreateType(null);
        setActiveTab("cars");
        setNewCar({
          manufacturer: "",
          model: "",
          type: "",
          numberOfSeats: 0,
          numberOfSuitcases: 0,
          fuelType: "",
          clutchType: "",
          priceForOneDay: 0,
          isAvailable: true,
        });
      }
    } catch (error) {
      console.error("Error creating car:", error);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        await fetchData();
        setCreateType(null);
        setActiveTab("users");
        setNewUser({
          email: "",
          password: "",
          isAdmin: false,
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message[0]);
      }
    } catch (error) {
      console.error("Error creating user:", error);
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
      <div className="container mx-auto px-2 py-2">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#1C1F20]">
          Admin Dashboard
        </h1>

        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setActiveTab("cars")}
            className={`px-6 py-2 rounded-lg text-lg font-medium transition-all duration-200 
              ${
                activeTab === "cars"
                  ? "bg-[#AA4D2B] text-white"
                  : "bg-white text-[#AA4D2B] hover:bg-[#AA4D2B]/10"
              }`}
          >
            Cars
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-6 py-2 rounded-lg text-lg font-medium transition-all duration-200 
              ${
                activeTab === "users"
                  ? "bg-[#AA4D2B] text-white"
                  : "bg-white text-[#AA4D2B] hover:bg-[#AA4D2B]/10"
              }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-6 py-2 rounded-lg text-lg font-medium transition-all duration-200 
              ${
                activeTab === "bookings"
                  ? "bg-[#AA4D2B] text-white"
                  : "bg-white text-[#AA4D2B] hover:bg-[#AA4D2B]/10"
              }`}
          >
            Bookings
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`px-6 py-2 rounded-lg text-lg font-medium transition-all duration-200 
              ${
                activeTab === "create"
                  ? "bg-[#AA4D2B] text-white"
                  : "bg-white text-[#AA4D2B] hover:bg-[#AA4D2B]/10"
              }`}
          >
            Create
          </button>
          <button
            onClick={() => setActiveTab("insight")}
            className={`px-6 py-2 rounded-lg text-lg font-medium transition-all duration-200 
              ${
                activeTab === "insight"
                  ? "bg-[#AA4D2B] text-white"
                  : "bg-white text-[#AA4D2B] hover:bg-[#AA4D2B]/10"
              }`}
          >
            Insight
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4">
          {activeTab === "cars" && (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">
                      Manufacturer
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">
                      Model
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">
                      Price/Day
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cars.map((car) => (
                    <tr key={car.id}>
                      <td className="px-6 py-4 text-black">{car.id}</td>
                      <td className="px-6 py-4 text-black">
                        {car.manufacturer}
                      </td>
                      <td className="px-4 py-4 text-black">{car.model}</td>
                      <td className="px-6 py-4 text-black">{car.type}</td>
                      <td className="px-6 py-4 text-black">
                        {car.priceForOneDay}
                      </td>
                      <td className="px-6 py-4 text-black">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            car.isAvailable
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {car.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </td>
                      <td className="py-2 flex flex-row justify-center items-center gap-4">
                        <button
                          onClick={() => handleDelete("cars", car.id)}
                          className="bg-red-50 text-red-800 hover:bg-red-100 w-20 h-10 rounded-xl"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setOpenCarId(car.id)}
                          className="bg-orange-50 text-orange-800 hover:bg-orange-100 w-16 h-10 rounded-xl"
                        >
                          Sale
                        </button>
                        <Dialog
                          open={openCarId === car.id}
                          as="div"
                          className="relative z-10"
                          onClose={() => setOpenCarId(null)}
                        >
                          <DialogBackdrop className="fixed inset-0 bg-black/30" />
                          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4">
                              <DialogPanel
                                transition
                                className="w-full max-w-md rounded-xl p-6 backdrop-blur-2xl bg-white border-2 border-gray-300"
                              >
                                <DialogTitle
                                  as="h1"
                                  className="text-3xl font-medium text-black text-center mb-2"
                                >
                                  SALE (%)
                                </DialogTitle>
                                <p className="mt-2 mb-2 ml-1 text-base text-black">
                                  Please select how much you want to discount
                                  the car price:
                                </p>
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  placeholder="Sale amount (%)"
                                  className="w-full px-2 py-2 border rounded-lg"
                                  onChange={(e) => {
                                    const value = Math.min(
                                      Math.max(
                                        parseInt(e.target.value) || 0,
                                        0
                                      ),
                                      100
                                    );
                                    setSaleAmount(value);
                                  }}
                                />
                                <div className="mt-4">
                                  <Button
                                    className="inline-flex rounded-md bg-green-200 py-2 px-4 text-lg font-semibold text-green-800 hover:bg-green-300 hover:ring-1 ring-green-300 transition-all"
                                    onClick={() =>
                                      handleSale(car.id, saleAmount)
                                    }
                                    disabled={
                                      !saleAmount ||
                                      saleAmount <= 0 ||
                                      saleAmount > 100
                                    }
                                  >
                                    CONFIRM
                                  </Button>
                                </div>
                              </DialogPanel>
                            </div>
                          </div>
                        </Dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "users" && (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 text-black">{user.id}</td>
                      <td className="px-6 py-4 text-black">{user.email}</td>
                      <td className="px-6 py-4 text-black">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            user.isAdmin
                              ? "bg-purple-100 text-purple-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {user.isAdmin ? "Admin" : "User"}
                        </span>
                      </td>
                      <td className="px-6 py-1">
                        <button
                          onClick={() => handleDelete("users", user.id)}
                          className="bg-red-50 text-red-800 hover:bg-red-100 w-20 h-10 rounded-xl"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "bookings" && (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">
                      Car ID
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">
                      User ID
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">
                      End Date
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">
                      Total Price
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 text-black">{booking.id}</td>
                      <td className="px-6 py-4 text-black">{booking.carId}</td>
                      <td className="px-6 py-4 text-black">{booking.userId}</td>
                      <td className="px-6 py-4 text-black">
                        {new Date(booking.startDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-black">
                        {new Date(booking.endDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-black">
                        {booking.totalPrice}
                      </td>
                      <td className="px-6 py-1">
                        <button
                          onClick={() => handleDelete("bookings", booking.id)}
                          className="bg-red-50 text-red-800 hover:bg-red-100 w-20 h-10 rounded-xl"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "create" && (
            <div className="bg-white rounded-xl p-6">
              <div className="mb-6 space-y-4">
                <h2 className="text-2xl font-bold text-center text-[#1C1F20]">
                  Create New Item
                </h2>
                {!createType ? (
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => setCreateType("car")}
                      className="px-6 py-2 rounded-lg bg-[#AA4D2B] text-white hover:bg-[#943f21] transition-all"
                    >
                      Create Car
                    </button>
                    <button
                      onClick={() => setCreateType("user")}
                      className="px-6 py-2 rounded-lg bg-[#AA4D2B] text-white hover:bg-[#943f21] transition-all"
                    >
                      Create User
                    </button>
                  </div>
                ) : createType === "car" ? (
                  <form
                    onSubmit={handleCreateCar}
                    className="max-w-md mx-auto space-y-4"
                  >
                    <input
                      type="text"
                      placeholder="Manufacturer"
                      value={newCar.manufacturer}
                      onChange={(e) =>
                        setNewCar({
                          ...newCar,
                          manufacturer: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Model"
                      value={newCar.model}
                      onChange={(e) =>
                        setNewCar({ ...newCar, model: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Type"
                      value={newCar.type}
                      onChange={(e) =>
                        setNewCar({ ...newCar, type: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    <input
                      type="number"
                      placeholder="Number of Seats"
                      value={newCar.numberOfSeats}
                      onChange={(e) =>
                        setNewCar({
                          ...newCar,
                          numberOfSeats: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    <input
                      type="number"
                      placeholder="Number of Suitcases"
                      value={newCar.numberOfSuitcases}
                      onChange={(e) =>
                        setNewCar({
                          ...newCar,
                          numberOfSuitcases: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Fuel Type"
                      value={newCar.fuelType}
                      onChange={(e) =>
                        setNewCar({ ...newCar, fuelType: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Clutch Type"
                      value={newCar.clutchType}
                      onChange={(e) =>
                        setNewCar({ ...newCar, clutchType: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    <input
                      type="number"
                      placeholder="Price for One Day"
                      value={newCar.priceForOneDay}
                      onChange={(e) =>
                        setNewCar({
                          ...newCar,
                          priceForOneDay: parseFloat(e.target.value),
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setCreateType(null)}
                        className="px-4 py-2 text-[#AA4D2B] hover:bg-gray-100 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#AA4D2B] text-white rounded-lg hover:bg-[#943f21]"
                      >
                        Create Car
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    {error !== "" && (
                      <div className="text-red-700 max-w-md mx-auto pl-3 bg-red-100 text-base rounded-md ring-1 ring-red-200 h-10 font-medium flex place-items-center">
                        {error}!
                      </div>
                    )}

                    <form
                      onSubmit={handleCreateUser}
                      className="max-w-md mx-auto space-y-4"
                    >
                      <input
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={(e) =>
                          setNewUser({ ...newUser, email: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        value={newUser.password}
                        onChange={(e) =>
                          setNewUser({ ...newUser, password: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newUser.isAdmin}
                          onChange={(e) =>
                            setNewUser({
                              ...newUser,
                              isAdmin: e.target.checked,
                            })
                          }
                          className="rounded"
                        />
                        <label>Is Admin</label>
                      </div>
                      <div className="flex justify-end space-x-4">
                        <button
                          type="button"
                          onClick={() => setCreateType(null)}
                          className="px-4 py-2 text-[#AA4D2B] hover:bg-gray-100 rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#AA4D2B] text-white rounded-lg hover:bg-[#943f21]"
                        >
                          Create User
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          )}

          {activeTab === "insight" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl px-0 py-2">
                <h2 className="text-2xl font-bold text-center mb-6 text-[#1C1F20]">
                  Most Popular Cars
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">
                          Rank
                        </th>
                        <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">
                          Car
                        </th>
                        <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-lg font-medium text-gray-500">
                          Number of Bookings
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {Object.entries(
                        bookings.reduce((acc, booking) => {
                          acc[booking.carId] = (acc[booking.carId] || 0) + 1;
                          return acc;
                        }, {} as Record<number, number>)
                      )
                        .map(([carId, count]) => ({
                          carId: parseInt(carId),
                          count,
                        }))
                        .sort((a, b) => b.count - a.count)
                        .slice(0, 5)
                        .map((item, index) => {
                          const car = cars.find((c) => c.id === item.carId);
                          if (!car) return null;

                          return (
                            <tr key={car.id}>
                              <td className="px-6 py-4 text-black">
                                #{index + 1}
                              </td>
                              <td className="px-6 py-4 text-black">
                                {car.manufacturer} {car.model}
                              </td>
                              <td className="px-6 py-4 text-black">
                                {car.type}
                              </td>
                              <td className="px-6 py-4">
                                <span className="px-4 py-1 bg-[#AA4D2B]/10 text-[#AA4D2B] rounded-full">
                                  {item.count} bookings
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
