"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Sidebar } from "../../components/sidebar";
import Image from "next/image";
import axios from "axios";

// Types for volunteers
interface Volunteer {
  id: number;
  name: string;
  gender: string;
  role: string;
  created_at: string;
}

type ChartData = {
  name: string;
  uv: number;
};

export default function Dashboard() {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [monthlyData, setMonthlyData] = useState<ChartData[]>([]);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [volunteersCount, setVolunteersCount] = useState(0);
  const [volunteersPercentage, setVolunteersPercentage] = useState("0");
  const [loading, setLoading] = useState(true);
  const [totalVolunteers, setTotalVolunteers] = useState(0);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/`
        );
        const allUsers = response.data;

        // Filter only users with role 'volunteer'
        const volunteersOnly = allUsers.filter(
          (user: Volunteer) => user.role?.toLowerCase() === "volunteer"
        );

        setVolunteers(volunteersOnly);

        const monthlyCount: { [key: string]: number } = {};
        let males = 0;
        let females = 0;

        volunteersOnly.forEach((vol: Volunteer) => {
          const date = new Date(vol.created_at);
          const month = date.toLocaleString("default", { month: "short" });

          monthlyCount[month] = (monthlyCount[month] || 0) + 1;

          if (vol.gender?.toLowerCase() === "male") males++;
          if (vol.gender?.toLowerCase() === "female") females++;
        });

        const chartData = Object.keys(monthlyCount).map((month) => ({
          name: month,
          uv: monthlyCount[month],
        }));

        setMonthlyData(chartData);
        setMaleCount(males);
        setFemaleCount(females);
      } catch (error) {
        console.error("Error fetching volunteers:", error);
      }
    };

    fetchVolunteers();
  }, []);

  //  fetch only current month volunteers from backend
 useEffect(() => {
  const fetchCurrentMonthVolunteers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`);
      const allUsers = await res.json();

      if (!Array.isArray(allUsers)) {
        console.error("Invalid response structure");
        return;
      }

      const volunteers = allUsers.filter(
        (user: Volunteer) => user.role?.toLowerCase() === "volunteer"
      );

      const now = new Date();
      const currentMonth = now.getMonth();
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

      const currentMonthVolunteers = volunteers.filter((user) => {
        const created = new Date(user.created_at);
        return created.getMonth() === currentMonth;
      });

      const lastMonthVolunteers = volunteers.filter((user) => {
        const created = new Date(user.created_at);
        return created.getMonth() === lastMonth;
      });

      const currentCount = currentMonthVolunteers.length;
      const lastCount = lastMonthVolunteers.length;

      // Calculate increase percentage compared to last month
      const percentage =
        lastCount === 0
          ? currentCount > 0
            ? "100"
            : "0"
          : (((currentCount - lastCount) / lastCount) * 100).toFixed(2);

      setVolunteersCount(currentCount);
      setVolunteersPercentage(percentage);
      setTotalVolunteers(volunteers.length);
    } catch (error) {
      console.error("Error fetching current month volunteers:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchCurrentMonthVolunteers();
}, []);


  return (
    <div className="flex flex-col min-h-screen">
      <div className="lg:flex">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      <div
        className={`flex-1 bg-gray-100 p-6 text-gray-700 transition-all duration-300 ${
          collapsed ? "lg:ml-[80px]" : "lg:ml-[250px]"
        }`}
      >
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-[32px] font-semibold text-[#1A1A1A] max-sm:text-2xl">
            TRUSTEE DASHBOARD - COMBINE FOUNDATION
          </h1>
          <div className="flex items-center gap-4">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => router.push("/trustee/profile")}
              width={40}
              height={40}
            />
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg border border-gray-100">
            <p className="text-2xl font-bold mb-5 text-gray-700">
              Volunteer Stats
            </p>
            <p className="text-base text-gray-700 mb-2">
              Total Volunteers:{" "}
              <span className="font-bold text-xl">{volunteers.length}</span>
            </p>
            <p className="text-base text-gray-700 mb-2">
              This Month:{" "}
              <span className="font-bold text-orange-500 text-xl">
                {monthlyData.find(
                  (data) =>
                    data.name ===
                    new Date().toLocaleString("default", { month: "short" })
                )?.uv || 0}
              </span>
            </p>

            <p className="text-base text-gray-700">
  <span className="ml-1 text-sm text-gray-500">
    Percentage increase in volunteers this month:
  </span>
  <span className="text-orange-500 font-bold"> {volunteersPercentage}%</span>
</p>

          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">
              Number of Programs
            </h2>
            <div className="space-y-2">
              <ProgramStatus label="Program A" />
              <ProgramStatus label="Program B" status="In Progress" />
              <ProgramStatus label="Program C" status="Upcoming" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">
              Comparison of Boys and Girls
            </h2>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-bold text-orange-500">{maleCount}</p>
                <p>Total male volunteers</p>
              </div>
              <div>
                <p className="font-bold text-orange-500">{femaleCount}</p>
                <p>Total female volunteers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Graphs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Monthly Volunteers
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="uv" fill="#F97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-700">
                Number of Beneficiaries
              </h2>
              <p className="text-3xl font-bold text-orange-500 ">
                {volunteers.length}
              </p>
              <span className=" py-10 text-3xl text-orange-500 font-bold text-center block"> {volunteersPercentage}%</span>
            </div>
            <p className="text-green-600 font-medium"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProgramStatus = ({
  label,
  status,
}: {
  label: string;
  status?: string;
}) => (
  <div className="flex justify-between items-center border px-3 py-2 rounded-md">
    <span className="text-gray-700">{label}</span>
    {status && (
      <span
        className={`text-xs px-2 py-1 rounded-full ${
          status === "In Progress"
            ? "bg-gray-200"
            : "bg-orange-100 text-orange-800"
        }`}
      >
        {status}
      </span>
    )}
  </div>
);