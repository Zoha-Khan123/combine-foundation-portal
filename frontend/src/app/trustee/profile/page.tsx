"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtVerify } from "jose";
import { Sidebar } from "../../components/sidebar";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUser,
  FaGraduationCap,
} from "react-icons/fa";
import { User } from "@/app/admin/volunteers/page";

export default function DashboardProfile() {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("token");

        if (token) {
          const secret = new TextEncoder().encode(
            process.env.NEXT_PUBLIC_SECRET_KEY!
          );

          const { payload } = await jwtVerify(token, secret);
          const userEmail = payload.email || payload.sub;

          

          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
          if (!response.ok) throw new Error("Failed to fetch users");

          const users = await response.json();
          const matchedUser = users.find(
            (user: User) => user.email === userEmail
          );

          if (matchedUser) {
            setUserData(matchedUser);
          } else {
            console.warn("User not found in API data");
          }
        } else {
          console.warn("No token found in cookies");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const formattedDOB = new Date(userData.date_of_birth).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="flex min-h-screen">
     <Sidebar
      collapsed={false}
      setCollapsed={() => {}}
    />
      <main className="flex-1 p-4 md:p-6 lg:p-8 bg-gray-50">
        <h1 className="text-xl md:text-2xl font-bold mb-6 text-orange-600">
          Dashboard Profile
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Section: Profile Info */}
          <div className="w-full lg:w-1/3 bg-white rounded-lg shadow p-6">
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden mb-4">
                <div className="w-full h-full bg-gray-300" />{" "}
                {/* Avatar Placeholder */}
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                {userData.name}
              </h2>
              <p className="text-sm text-gray-600">{userData.email}</p>
              <div className="mt-4 space-y-3 w-full">
                <div className="flex items-center gap-2 text-sm text-gray-800">
                  <FaPhoneAlt className="text-gray-600" />
                  <span>{userData.phone_no}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-800">
                  <FaMapMarkerAlt className="text-gray-600 mt-0.5" />
                  <span>{userData.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Details */}
          <div className="w-full lg:w-2/3 space-y-4">
            {/* Personal Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <FaUser /> Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600">Full Name</p>
                  <p className="text-sm font-medium text-gray-800">
                    {userData.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Date of Birth</p>
                  <p className="text-sm font-medium text-gray-800">
                    {formattedDOB}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Gender</p>
                  <p className="text-sm font-medium text-gray-800">
                    {userData.gender}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">CNIC</p>
                  <p className="text-sm font-medium text-gray-800">
                    {userData.cnic}
                  </p>
                </div>
              </div>
            </div>

            {/* Qualification */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FaGraduationCap /> Qualification
              </h3>
              <p className="text-sm font-medium text-gray-800">
                {userData.qualification}
              </p>
            </div>

            {/* Active Course Example (Static) */}
            <div className="bg-orange-50 rounded-lg shadow p-6 border border-orange-100">
              <p className="text-xs text-gray-600 mb-1">Active Course</p>
              <p className="text-sm text-gray-800">
                Course Name: <strong>Lorem Ipsum</strong> | ID: {userData.id}
                
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
