"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtVerify } from "jose";

import "./profile.css";
import Image from "next/image";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUser,
  FaCalendarAlt,
  FaIdCard,
  FaGraduationCap,
} from "react-icons/fa";
import ADMIN from "../../images/ADMIN.png";

export type TokenPayload = {
  role: string;
  name: string;
  sub: string; // email stored here
  exp: number;
};


export type UserData = {
  name: string;
  email: string;
  phone_no: string;
  address: string;
  date_of_birth: string;
  gender: string;
  cnic: string;
  qualification: string;
};

export default function Profile() {
 const [userData, setUserData] = useState<UserData | null>(null);

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

          const matchedUser = users.find((user: UserData) => user.email === userEmail);

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
    return <div>Loading...</div>;
  }

  // Format date of birth nicely
  const formattedDOB = new Date(userData.date_of_birth).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="profile-container text-black">
      <div className="profile-wrapper text-black">
        {/* Sidebar */}
        <div className="profile-box text-black">
          <div className="profile-content">
            <Image
              src={ADMIN}
              alt="Avatar"
              className="avatar text-black"
              width={100}
              height={100}
            />
            <h2>{userData.name}</h2>
            <p className="email">{userData.email}</p>

            <div className="info">
              <div className="info-item">
                <FaPhoneAlt />
                <span>{userData.phone_no}</span>
              </div>
              <div className="info-item">
                <FaMapMarkerAlt />
                <span>{userData.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="info-boxes">
            <div className="info-box">
              <div className="label">
                <FaUser />
                <span>Full Name</span>
              </div>
              <p className="value">{userData.name}</p>

              <div className="label">
                <FaCalendarAlt />
                <span>Date Of Birth</span>
              </div>
              <p className="value">{formattedDOB}</p>
            </div>

            <div className="info-box">
              <div className="label">
                <FaUser />
                <span>Gender</span>
              </div>
              <p className="value">{userData.gender}</p>

              <div className="label">
                <FaIdCard />
                <span>CNIC</span>
              </div>
              <p className="value">{userData.cnic}</p>
            </div>
          </div>

          <div className="info-box">
            <div className="label">
              <FaGraduationCap />
              <span>Qualification</span>
            </div>
            <p className="value">{userData.qualification}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
