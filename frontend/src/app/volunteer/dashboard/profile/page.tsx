"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtVerify } from "jose";

import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUser,
  FaCalendarAlt,
  FaIdCard,
  FaGraduationCap,
} from "react-icons/fa";
import Sidebar from "../../../components/SideBar-vol";
import { User } from "@/app/admin/volunteers/page";

export default function Profile() {
  const [isCollapsed, setIsCollapsed] = useState(true);
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
          const userEmail = payload.sub;

          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
          if (!response.ok) {
            throw new Error("Failed to fetch users");
          }
          const users = await response.json();

          const matchedUser = users.find((user: User) => user.email === userEmail);

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
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Format date of birth nicely
  const formattedDOB = new Date(userData.date_of_birth).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center p-3 bg-white shadow-sm md:hidden">
        <button
          className="p-2 rounded-md bg-orange-600 text-white"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Open menu' : 'Close menu'}
        >
          {isCollapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
        <h1 className="text-lg font-bold text-orange-600">PROFILE</h1>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </div>

      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isCollapsed ? 'md:ml-0' : 'md:ml-64'} mt-14 md:mt-0`}>
        <div className="p-3 sm:p-4 md:p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            {/* Profile Card - Left Side */}
            <div className="w-full lg:w-1/3 bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gray-200 mb-3 sm:mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gray-300"></div> {/* Avatar placeholder */}
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center">{userData.name}</h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 text-center">{userData.email}</p>

                <div className="w-full space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-800">
                    <FaPhoneAlt className="text-gray-600 text-sm" />
                    <span>{userData.phone_no}</span>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-gray-800">
                    <FaMapMarkerAlt className="text-gray-600 mt-0.5 text-sm" />
                    <span className="flex-1">{userData.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Boxes - Right Side */}
            <div className="w-full lg:w-2/3 space-y-4 sm:space-y-6">
              {/* Top Row Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Personal Info Box */}
                <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-gray-700 mb-1">
                        <FaUser className="text-gray-600 text-sm" />
                        <span className="text-xs sm:text-sm font-medium">Full Name</span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-800 ml-5 sm:ml-6">{userData.name}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-gray-700 mb-1">
                        <FaCalendarAlt className="text-gray-600 text-sm" />
                        <span className="text-xs sm:text-sm font-medium">Date Of Birth</span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-800 ml-5 sm:ml-6">{formattedDOB}</p>
                    </div>
                  </div>
                </div>

                {/* Additional Info Box */}
                <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-gray-700 mb-1">
                        <FaUser className="text-gray-600 text-sm" />
                        <span className="text-xs sm:text-sm font-medium">Gender</span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-800 ml-5 sm:ml-6">{userData.gender}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-gray-700 mb-1">
                        <FaIdCard className="text-gray-600 text-sm" />
                        <span className="text-xs sm:text-sm font-medium">CNIC</span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-800 ml-5 sm:ml-6">{userData.cnic}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Qualification Box */}
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <div className="flex items-center gap-2 text-gray-700 mb-1 sm:mb-2">
                  <FaGraduationCap className="text-gray-600 text-sm" />
                  <span className="text-xs sm:text-sm font-medium">Qualification</span>
                </div>
                <p className="text-sm sm:text-base text-gray-800 ml-5 sm:ml-6">{userData.qualification}</p>

              </div>

              {/* Active Course Box */}
              <div className="bg-orange-50 rounded-lg shadow p-4 sm:p-6 border border-orange-100">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Active Course</p>
                <p className="text-sm sm:text-base text-gray-800">
                  Course Name: <strong className="font-semibold">Lorem</strong> | 
                  Roll Number: <strong className="font-semibold">99088</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}