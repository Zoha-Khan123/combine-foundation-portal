"use client";

import { useState, useRef, useEffect } from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartTypeRegistry,
  Plugin,
  ScriptableContext,
} from "chart.js";
import { Sidebar } from "../../components/sidebar";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LineController,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Volunteer {
  id: number;
  name: string;
  email: string; // Keep if your API returns email
  role: string; // <--- Change this from 'status' to 'role'
  // If your API returns 'created_at' and it's useful here, add it:
  // created_at?: string;
}

export default function VolunteerLightingUsage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [collapsed, setCollapsed] = useState(false);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const chartRef = useRef<ChartJS<"line">>(null);

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/users`;


  useEffect(() => {
  const fetchVolunteers = async () => {
    try {
      const response = await axios.get(API_URL);
      const allUsers = response.data;

      // Filter only users with role 'volunteer'
      const onlyVolunteers = allUsers.filter(
        (user: Volunteer) => user.role?.trim().toLowerCase() === "volunteer" // <--- Change this from 'status' to 'role'
      );

      console.log("All users:", allUsers); // Still useful for debugging
      console.log("Only volunteers:", onlyVolunteers); // Add this to verify filter works

      setVolunteers(onlyVolunteers);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
    }
  };
  fetchVolunteers();
}, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      setVolunteers((prev) => prev.filter((v) => v.id !== id));
    } catch (error) {
      console.error("Error deleting volunteer:", error);
    }
  };

  const filteredVolunteers = volunteers
    .filter((volunteer) =>
      volunteer.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "newest"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  const getGradient = (ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(251, 146, 60, 0.4)");
    gradient.addColorStop(1, "rgba(251, 146, 60, 0.1)");
    return gradient;
  };

  const chartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    datasets: [
      {
        type: "line" as const,
        label: "Volunteer Count",
        data: [volunteers.length, 10, 5, 3, 2], // Here, volunteers.length will update Day 1
        borderColor: "#FB923C",
        backgroundColor: (context: ScriptableContext<"line">) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return "rgba(251, 146, 60, 0.2)";
          return getGradient(ctx);
        },
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: "#FB923C",
        pointBorderColor: "#fff",
        pointRadius: 5,
        pointHoverRadius: 8,
        fill: true,
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: "easeInOutQuart",
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(31, 41, 55, 0.9)",
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          label: (context) => `Usage: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#6B7280",
          font: { size: 12 },
        },
      },
      y: {
        display: false,
        beginAtZero: true,
        max: 100,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  const valueLabelPlugin: Plugin<keyof ChartTypeRegistry> = {
    id: "valueLabel",
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillStyle = "#1F2937";

      chart.data.datasets.forEach((dataset) => {
        chart.getDatasetMeta(0).data.forEach((point, index) => {
          const value = dataset.data[index];
          if (typeof value === "number" && value > 0) {
            ctx.fillText(value.toString(), point.x, point.y - 10);
          }
        });
      });
    },
  };

  return (
    <>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6 ring-2 ring-orange-400">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                VOLUNTEER LIGHTING USAGE AT CRAFT ORCHARD
              </h1>
              <div className="flex items-center mt-2">
                <span className="text-3xl font-bold text-gray-800">
                  {volunteers.length}
                </span>
                <span className="ml-2 text-orange-500 font-medium">+12%</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              USAGES:
            </h2>
            <div className="h-64 relative">
              <Chart
                ref={chartRef}
                type="line"
                data={chartData}
                options={chartOptions}
                plugins={[valueLabelPlugin]}
              />
            </div>
            <div className="flex justify-between mt-4 text-sm text-gray-600">
              <span>Date</span>
              <span>Last 7 days</span>
              <span>Difficult date</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex flex-wrap sm:flex-nowrap justify-end sm:items-center mb-4">
              <div className="flex flex-wrap items-center space-x-4 w-full sm:w-auto">
                <div className="text-sm font-medium text-gray-800">
                  SORT BY:
                  <select
                    className="ml-2 border rounded px-2 py-1 text-gray-800 bg-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    value={sortOrder}
                    onChange={(e) =>
                      setSortOrder(e.target.value as "newest" | "oldest")
                    }
                  >
                    <option value="newest">NEWEST ↓</option>
                    <option value="oldest">OLDEST ↑</option>
                  </select>
                </div>
                <div className="relative w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="SEARCH HERE"
                    className="border rounded px-3 py-1 pl-8 text-gray-800 focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Volunteers Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                    NAME
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                    EMAIL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                    DELETE
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVolunteers.map((volunteer) => (
                  <tr
                    key={volunteer.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {volunteer.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {volunteer.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      <button
                        onClick={() => handleDelete(volunteer.id)}
                        className="text-red-500 hover:text-red-700 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
