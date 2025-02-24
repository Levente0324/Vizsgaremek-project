import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currency, setCurrency] = useState("HUF");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const savedCurrency = localStorage.getItem("currency") || "HUF";
    setCurrency(savedCurrency);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    localStorage.setItem("currency", newCurrency);

    router.refresh();
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setShowDropdown(false);
        router.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="bg-[#F1EFEA] py-4 px-4 md:px-24 flex flex-col md:flex-row justify-between items-center rounded-3xl gap-4 md:gap-0">
      <Link href="/">
        <div className="text-black text-4xl font-bold font-custom tracking-wide">
          Car Rental
        </div>
      </Link>
      <div className="flex flex-col md:flex-row items-center w-full md:w-auto gap-4 md:gap-8">
        <select
          value={currency}
          onChange={(e) => handleCurrencyChange(e.target.value)}
          className="w-full md:w-auto bg-[#F1EFEA] text-[#1C1F20] text-lg px-1 py-0 rounded-lg hover:text-[#AA4D2B] outline-none transition-colors cursor-pointer"
        >
          <option value="HUF">HUF</option>
          <option value="EUR">EUR</option>
        </select>

        {isLoggedIn ? (
          <div className="relative w-full md:w-auto" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full md:w-auto bg-[#F1EFEA] text-black text-lg px-4 py-1 rounded border-2 border-black flex items-center justify-center md:justify-start space-x-2 hover:bg-[#e8e6e1] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
            {showDropdown && (
              <div className="absolute left-0 md:right-0 md:left-auto top-full mt-2 w-full md:w-48 bg-white rounded-xl shadow-lg py-1 z-10">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-base text-[#1C1F20] hover:bg-[#F1EFEA] hover:text-[#AA4D2B] text-center md:text-left"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-center md:text-left px-4 py-2 text-base text-[#1C1F20] hover:bg-[#F1EFEA] hover:text-[#AA4D2B]"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col md:flex-row w-full md:w-auto gap-2 md:gap-2">
            <Link href="/sign-in" className="w-full md:w-auto">
              <button className="w-full bg-[#F1EFEA] text-[#1C1F20] text-lg px-4 py-1 rounded border-2 border-black hover:bg-[#e8e6e1] hover:text-[#AA4D2B] transition-colors">
                Login
              </button>
            </Link>
            <Link href="/sign-up" className="w-full md:w-auto">
              <button className="w-full bg-[#F1EFEA] text-[#1C1F20] text-lg px-4 py-1 rounded border-2 border-black hover:bg-[#e8e6e1] hover:text-[#AA4D2B] transition-colors">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
