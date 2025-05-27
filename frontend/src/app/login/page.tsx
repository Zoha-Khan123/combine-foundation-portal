"use client";

import React, { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { jwtVerify } from "jose";

export type TokenPayload = {
  role: string;
  exp: number;
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [,setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.success("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        // ✅ Correct endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.status === "success") {
        Cookies.set("token", data.data);
        toast.success("Login successful!");
        const secret = new TextEncoder().encode(
          process.env.NEXT_PUBLIC_SECRET_KEY!
        );
        const { payload } = await jwtVerify(data.data, secret);

        window.location.href = `/${payload.role}/dashboard`;
      } else {
        const message = data.message || "Invalid credentials";
        setError(message);
        toast.error(message);
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      toast.error(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <>
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/logo.png"
            alt="Combine Foundation Logo"
            height={160}
            width={160}
            className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40"
          />
          <h1 className="text-3xl font-bold">Welcome to Combine Foundation</h1>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">
            Secure Login
          </h1>

          <form className="space-y-4" method="post" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@domain.com"
                title="Please enter a valid email address"
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder:text-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                title="Password must be at least 8 characters"
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder:text-gray-400"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-gray-700">Remember me</span>
              </label>
              <a
                href="/forgot-password"
                className="text-orange-500 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
            >
              Log In
            </button>
          </form>
        </div>
      </>
    </div>
  );
};

export default Login;
