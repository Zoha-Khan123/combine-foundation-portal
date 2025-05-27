// app/forgot-password/page.tsx
"use client";


import React, { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/Loader/loader";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter an email");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/email/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Email sent successfully!");
        setEmail("");
      } else {
        toast.error(data.message || "Failed to send email");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
              {/* Loader Overlay */}
            {loading && (
          <div className="fixed inset-0 bg-opacity-10 flex items-center justify-center z-50">
            <Loader />
          </div>
        )}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-center text-lg text-gray-600">Forgot Password</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md"
          />
          <button
            type="submit"
            className="w-full cursor-pointer bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
          >
            Send Reset Link
          </button>
         
           
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;