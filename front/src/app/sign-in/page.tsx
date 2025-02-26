"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError("Invalid credentials");
        return;
      }

      const { token } = await response.json();
      localStorage.setItem("token", token);
      router.push("/");
    } catch (err) {
      setError("An error occurred during sign in");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-6 w-[800px]">
        <div className="flex justify-start px-4 py-2">
          <a
            href="/"
            className="flex items-center text-xl text-[#AA4D2B] hover:text-[#943f21]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Home
          </a>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center w-[800px] h-auto bg-white rounded-3xl py-8 px-6 border-2 mt-20">
          <h2 className="text-5xl text-[#1C1F20] font-bold mb-8">Sign In</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full max-w-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
            <div>
              <label
                htmlFor="email"
                className="block text-[#1C1F20] text-lg font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black hover:cursor-pointer focus:cursor-default"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[#1C1F20] text-lg font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black hover:cursor-pointer focus:cursor-default"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#AA4D2B] text-white text-lg py-3 px-4 rounded-md hover:bg-[#943f21] focus:outline-none focus:ring-2 focus:ring-[#AA4D2B] focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#1C1F20] text-lg">
              Don't have an account?{" "}
              <a
                href="/sign-up"
                className="text-[#AA4D2B] hover:text-[#943f21]"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
