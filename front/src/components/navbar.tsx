import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { COLORS, TRANSITIONS, ROUNDED, SHADOWS } from "@/utils/styles";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currency, setCurrency] = useState("HUF");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const checkAdminStatus = async () => {
      if (token) {
        try {
          const response = await fetch("http://localhost:3000/auth/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const userData = await response.json();
            setIsAdmin(userData.isAdmin);
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
        }
      }
    };

    checkAdminStatus();

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
    <nav className="pt-6 pb-2 px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 max-w-[1400px] mx-auto">
      <Link href="/">
        <div
          className={`text-black text-4xl font-extrabold tracking-wide hover:text-[${COLORS.primary.DEFAULT}] cursor-pointer ${TRANSITIONS.DEFAULT} select-none`}
        >
          Car Rental
        </div>
      </Link>

      <div className="flex flex-col md:flex-row items-center w-full md:w-auto gap-4 md:gap-8">
        {isLoggedIn && isAdmin && (
          <Link href="/admin" className="w-full sm:w-auto">
            <button className="px-2 bg-transparent text-black text-xl font-medium rounded-lg hover:text-[#943f21] cursor-pointer hover:underline underline-offset-4 transition-all duration-200">
              Admin Page
            </button>
          </Link>
        )}

        <select
          value={currency}
          onChange={(e) => handleCurrencyChange(e.target.value)}
          className={`w-full md:w-auto bg-transparent text-black font-medium text-lg md:mr-8 px-2 py-1 ${ROUNDED.lg} hover:text-[#943f21] outline-none border-none cursor-pointer hover:underline underline-offset-4 ${TRANSITIONS.DEFAULT}`}
        >
          <option value="HUF">HUF</option>
          <option value="EUR">EUR</option>
        </select>

        {isLoggedIn ? (
          <div className="relative w-full md:w-auto" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full md:w-full text-black text-lg flex items-center justify-start md:justify-start ml-2 md:ml-8 mr-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-8 h-8 md:w-[30px] md:h-[30px] text-black hover:text-[${COLORS.primary.DEFAULT}] ${TRANSITIONS.DEFAULT}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
            {showDropdown && (
              <div
                className={`absolute left-0 md:right-4 md:left-auto top-full mt-1 w-full md:w-48 bg-white ${ROUNDED.md} ${SHADOWS.lg} py-1 z-10`}
              >
                <Link
                  href="/profile"
                  className={`block px-4 py-2 text-base text-[${COLORS.text.dark}] hover:bg-[${COLORS.background.light}] hover:text-[#AA4D2B] text-center md:text-left ${TRANSITIONS.DEFAULT}`}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className={`block w-full text-center md:text-left px-4 py-2 text-base text-[${COLORS.text.dark}] hover:bg-[#F1EFEA] hover:text-[#AA4D2B] ${TRANSITIONS.DEFAULT}`}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col justify-between sm:flex-row w-full md:w-auto gap-2 sm:gap-3 md:gap-4 items-center">
            <Link href="/sign-in" className="w-full sm:w-auto">
              <button
                className={`w-full bg-transparent text-black hover:text-[${COLORS.primary.dark}] text-xl font-medium py-2 ${TRANSITIONS.DEFAULT} relative overflow-hidden group`}
              >
                <span className="relative z-10">Login</span>
                <span
                  className={`absolute bottom-2 left-0 w-0 h-0.5 bg-[${COLORS.primary.DEFAULT}] group-hover:w-full ${TRANSITIONS.DEFAULT}`}
                ></span>
              </button>
            </Link>

            <div className="flex place-items-center justify-center">
              <h1 className="text-black text-xl font-bold w-auto hidden sm:block">
                /
              </h1>
              <div className="w-12 h-0.5 bg-gray-300 sm:hidden"></div>
            </div>

            <Link href="/sign-up" className="w-full sm:w-auto">
              <button
                className={`w-full bg-transparent text-black hover:text-[${COLORS.primary.dark}] text-xl font-medium py-2 ${TRANSITIONS.DEFAULT} relative overflow-hidden group`}
              >
                <span className="relative z-10">Register</span>
                <span
                  className={`absolute bottom-2 left-0 w-0 h-0.5 bg-[${COLORS.primary.DEFAULT}] group-hover:w-full ${TRANSITIONS.DEFAULT}`}
                ></span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
