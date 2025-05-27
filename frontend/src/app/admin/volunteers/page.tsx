"use client";

import { useRef, useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  LineController,
  ChartOptions,
  Plugin,
  ChartDataset,
  ScriptableContext,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import toast from "react-hot-toast";
import Loader from "@/app/components/Loader/loader"; // Assuming this path is correct
import axios from "axios"; // Import axios
import Cookies from "js-cookie"; // Import js-cookie

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Updated Volunteer interface to match expected API response
interface Volunteer {
  id: number;
  name: string;
  email: string;
  role: string; // Used for filtering volunteers
  gender?: string; // Used for male/female counts in chart
  created_at: string; // This is crucial for historical data
}


export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone_no: string;
  address: string;
  cnic: string;
  date_of_birth: string; // ISO date string, can convert to Date if needed
  gender: string;
  qualification: string;
  role: string;
  course: string;
  skills: string;
  created_at: string; // ISO date string
}


// Helper function to format date to YYYY-MM-DD for comparison (UTC-normalized)
const formatDateToYYYYMMDD = (date: Date): string => {
  // Use UTC methods to ensure consistent date comparison across timezones
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function VolunteerPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [emails, setEmails] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]); // State for fetched volunteers
  const [, setMaleChartData] = useState<number[]>([]);
  const [, setFemaleChartData] = useState<number[]>([]);
  const [, setChartLabels] = useState<string[]>([]);
  const [volunteersGraph, setVolunteersGraph] = useState<{ labels: string[]; maleData: number[]; femaleData: number[]  , totalVolunteer : number , growthPercentage : number }>({ labels: [], maleData: [], femaleData: [] , totalVolunteer : 0 , growthPercentage : 0 });

  const chartRef = useRef<ChartJS<"line">>(null);
  const API_URL = "https://portal-backend-deploy.up.railway.app/users/"; // Your API endpoint

  // Function to get the Authorization header
  const getAuthHeaders = async () => {
    const token = Cookies.get("token");
    if (!token) {
      toast.error("Authentication token not found. Please log in.");
      return null;
    }
    // You might want to verify the token here if you haven't already
    // For simplicity, we'll just return it, assuming it's valid if present.
    // If your backend expects a specific scheme (e.g., "Bearer "), include it.
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  // --- Fetch Volunteers and calculate chart data on component mount ---
  useEffect(() => {
    const fetchVolunteersAndChartData = async () => {
      setLoading(true); // Start loader
      try {
        const headers = await getAuthHeaders();
        if (!headers) {
          setLoading(false);
          return; // Stop if no token is found
        }

        const response = await axios.get(API_URL, { headers }); // Pass headers to axios.get
        const allUsers: Volunteer[] = response.data; // Explicitly type allUsers

        // Filter only users with the role 'volunteer'
        const onlyVolunteers: Volunteer[] = allUsers.filter(
          (user) => user.role?.trim().toLowerCase() === "volunteer"
        );

        setVolunteers(onlyVolunteers);

        // --- Calculate historical data for the chart (last 6 days) ---
        const today = new Date();
        // Normalize 'today' to UTC midnight for consistent comparison
        today.setUTCHours(0, 0, 0, 0);

        const dailyCounts: {
          [date: string]: { male: number; female: number };
        } = {};
        const generatedLabels: string[] = [];
        const generatedMaleCounts: number[] = [];
        const generatedFemaleCounts: number[] = [];

        // Generate dates for the last 6 days (including today)
        for (let i = 5; i >= 0; i--) {
          const date = new Date(today);
          date.setUTCDate(today.getUTCDate() - i);
          const formattedDate = formatDateToYYYYMMDD(date);
          dailyCounts[formattedDate] = { male: 0, female: 0 };
          generatedLabels.push(i === 0 ? "Current Day" : `Day -${i}`);
        }

        // Count volunteers for each day
        onlyVolunteers.forEach((vol) => {
          if (vol.created_at) {
            const volDate = new Date(vol.created_at);
            // Normalize volunteer date to UTC midnight
            volDate.setUTCHours(0, 0, 0, 0);
            const formattedVolDate = formatDateToYYYYMMDD(volDate);

            // Check if this date is within our 6-day window
            const daysDiff = Math.floor(
              (today.getTime() - volDate.getTime()) / (1000 * 60 * 60 * 24)
            );
            if (daysDiff >= 0 && daysDiff <= 5) {
              if (dailyCounts[formattedVolDate]) {
                // Ensure the date key exists
                if (vol.gender?.toLowerCase() === "male") {
                  dailyCounts[formattedVolDate].male++;
                } else if (vol.gender?.toLowerCase() === "female") {
                  dailyCounts[formattedVolDate].female++;
                }
              }
            }
          }
        });

        // Sort dates chronologically and populate chart data
        const sortedDates = Object.keys(dailyCounts).sort();
        sortedDates.forEach((date) => {
          generatedMaleCounts.push(dailyCounts[date].male);
          generatedFemaleCounts.push(dailyCounts[date].female);
        });

        setChartLabels(generatedLabels);
        setMaleChartData(generatedMaleCounts);
        setFemaleChartData(generatedFemaleCounts);
      } catch (error) {
        console.error("Error fetching volunteers:", error);
        toast.error("Failed to fetch volunteer data.");
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteersAndChartData();
  }, []); // Empty dependency array means this runs once on component mount

  
    // --- Handle Delete Volunteer ---
    const handleDelete = async (id: number) => {
      // Optional: Add a confirmation dialog before deleting
      if (!window.confirm("Are you sure you want to delete this volunteer?")) {
        return;
      }
  
      setLoading(true); // Start loader
      try {
        const headers = await getAuthHeaders();
        if (!headers) {
          setLoading(false);
          return; // Stop if no token is found
        }
  
        // ✅ Fix: Remove trailing slash after ID
        const response = await axios.delete(`${API_URL}${id}`, { headers });
  
        // Pass headers to axios.delete
        if (response.status === 204) {
          // 204 No Content is common for successful DELETE
          toast.success("Volunteer deleted successfully!");
          // Update the state to remove the deleted volunteer
          setVolunteers((prevVolunteers) =>
            prevVolunteers.filter((vol) => vol.id !== id)
          );
          // Re-calculate chart data to reflect changes immediately after deletion
          const today = new Date();
          const todayUTC = new Date(
            Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
          );
          const dailyCounts: {
            [date: string]: { male: number; female: number };
          } = {};
          const maleCounts: number[] = [];
          const femaleCounts: number[] = [];
  
          // Re-initialize dailyCounts for the last 6 days
          for (let i = 5; i >= 0; i--) {
            const date = new Date(todayUTC);
            date.setUTCDate(todayUTC.getUTCDate() - i);
            const formattedDate = formatDateToYYYYMMDD(date);
            dailyCounts[formattedDate] = { male: 0, female: 0 };
          }
  
          // Iterate through the *updated* volunteers list (after deletion)
          volunteers.forEach((vol: Volunteer) => {
            if (vol.created_at) {
              const volDate = new Date(vol.created_at);
              const volDateUTC = new Date(
                Date.UTC(
                  volDate.getFullYear(),
                  volDate.getMonth(),
                  volDate.getDate()
                )
              );
              const formattedVolDate = formatDateToYYYYMMDD(volDateUTC);
              if (dailyCounts[formattedVolDate]) {
                if (vol.gender?.toLowerCase() === "male") {
                  dailyCounts[formattedVolDate].male++;
                } else if (vol.gender?.toLowerCase() === "female") {
                  dailyCounts[formattedVolDate].female++;
                }
              }
            }
          });
  
          // Populate chart data arrays
          const datesInOrder = Object.keys(dailyCounts).sort();
          datesInOrder.forEach((dateKey) => {
            maleCounts.push(dailyCounts[dateKey].male);
            femaleCounts.push(dailyCounts[dateKey].female);
          });
  
          setMaleChartData(maleCounts);
          setFemaleChartData(femaleCounts);
        } else {
          window.location.reload();
        }
      } catch (error) {
        console.error("Error deleting volunteer:", error);
        // More specific error message for 401
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          toast.error(
            "Unauthorized: Please ensure you are logged in with appropriate permissions."
          );
        } else {
          toast.error("Refresh Now");
        }
      } finally {
        setLoading(false); // Stop loader
      }
    };


  // --- Handle Invite Email ---
  const handleInvite = async () => {
    if (!emails.trim()) {
      toast.error("Please enter an email");
      return;
    }

    setLoading(true); // Start loader
    try {
      // No auth header needed for this endpoint if it's publicly accessible for invites
      const response = await fetch(
        "https://portal-backend-deploy.up.railway.app/email/send-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: emails.trim() }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Email sent successfully!");
        setEmails("");
      } else {
        toast.error(data.message || "Failed to send email");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        window.location.reload();
      }
    } finally {
      setLoading(false); // Stop loader
    }
  };


//  fetch only volunteers from backend
useEffect(() => {
  const fetchVolunteers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/volunteers`)
      
      
      const data = await res.json();

      // Step 1: Filter volunteers from response (already volunteers API, so skip this if unnecessary)
      const volunteers = data;
      
      // Total Volunteers
      const totalVolunteer = volunteers.length


      // Step 2: Group by month and gender
      const monthlyCounts: { [key: number]: { male: number; female: number } } = {};

      volunteers.forEach((user: User) => {
        const date = new Date(user.created_at);
        const month = date.getMonth() + 1; // 1-based (1 = Jan, 12 = Dec)
        const gender = user.gender?.toLowerCase();

        if (!monthlyCounts[month]) {
          monthlyCounts[month] = { male: 0, female: 0 };
        }

        if (gender === "male") {
          monthlyCounts[month].male += 1;
        } else if (gender === "female") {
          monthlyCounts[month].female += 1;
        }
      });

      // Step 3: Prepare chart-friendly data
      const labels = Object.keys(monthlyCounts).map((m) => `${m}`);

      // Step 4 : Calculate Growth percenatge 
      const newDate = new Date();
      const currentMonth = newDate.getMonth() + 1; // number (1-based)
      const previousMonth = newDate.getMonth(); // number (0-based, but our months are 1-based)
      const currentMinusPrevious = (monthlyCounts[currentMonth]?.male ?? 0) + (monthlyCounts[currentMonth]?.female ?? 0)-((monthlyCounts[previousMonth]?.male ?? 0) + (monthlyCounts[previousMonth]?.female ?? 0));
      const growthPercentage = (currentMinusPrevious/previousMonth)* 100

      
      const maleData = Object.values(monthlyCounts).map((val) => val.male);
      const femaleData = Object.values(monthlyCounts).map((val) => val.female);
      

      // Step 5: Set to state (you'll use this in chartData)
      setVolunteersGraph({ labels, maleData, femaleData,totalVolunteer, growthPercentage});

    } catch (error) {
      console.error("Error fetching volunteers", error);
    } finally {
      setLoading(false);
    }
  };

  fetchVolunteers();
}, []);











  // --- Filter and Sort Logic ---
 const filteredVolunteers = volunteers
    .filter((v) => v.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) =>
      sortOrder === "newest"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  const getGradient = (ctx: CanvasRenderingContext2D, color: string) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, `${color}66`);
    gradient.addColorStop(1, `${color}11`);
    return gradient;
  };

  const chartData = {
    labels: ["00-02", "00-03", "00-04", "00-05", "00-06", "00-07"],
    datasets: [
      {
        type: "line" as const,
        label: "Male",
        data: volunteersGraph.maleData,
        borderColor: "#3B82F6",
        backgroundColor: (context: ScriptableContext<"line">) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          return chartArea ? getGradient(ctx, "#3B82F6") : "#3B82F644";
        },
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: "#3B82F6",
        pointBorderColor: "#fff",
        pointRadius: 5,
        pointHoverRadius: 8,
        fill: true,
      } as ChartDataset<"line">,
      {
        type: "line" as const,
        label: "Female",
        data: volunteersGraph.femaleData,
        borderColor: "#F472B6",
        backgroundColor: (context: ScriptableContext<"line">) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          return chartArea ? getGradient(ctx, "#F472B6") : "#F472B644";
        },
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: "#F472B6",
        pointBorderColor: "#fff",
        pointRadius: 5,
        pointHoverRadius: 8,
        fill: true,
      } as ChartDataset<"line">,
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
        display: true,
        position: "top",
        labels: {
          color: "#1F2937",
          font: { size: 14, weight: "bold" },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(31, 41, 55, 0.9)",
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 12 },
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6B7280", font: { size: 12 } },
      },
      y: {
        grid: { display: false },
        ticks: {
          color: "#6B7280",
          font: { size: 12 },
        },
        min: 0,
        max: 100,
      },
    },
  };

  const valueLabelPlugin: Plugin<"line"> = {
    id: "valueLabel",
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillStyle = "#1F2937";

      chart.data.datasets.forEach((dataset, datasetIndex) => {
        chart.getDatasetMeta(datasetIndex).data.forEach((point, index) => {
          const value = dataset.data[index] as number;
          if (value > 0) {
            ctx.fillText(value.toString(), point.x, point.y - 10);
          }
        });
      });
    },
  };


  return (
    <>
      {/* Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-opacity-10 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              VOLUNTEERS COUNT
            </h1>
            <div className="flex items-center mt-2">
              <span className="text-3xl font-bold text-gray-800">{volunteersGraph.totalVolunteer}</span>
              <span className="ml-2 text-orange-500 font-medium">+{volunteersGraph.growthPercentage}%</span>
            </div>
          </div>
        </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              VOLUNTEER GENDER DISTRIBUTION (Last 6 Days)
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
              <span>Timeline of Volunteer Joins</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Emails, comma separated"
                className="border rounded px-3 py-2 mr-4 flex-grow text-gray-800 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
              />
              <button
                onClick={handleInvite}
                disabled={loading}
                className="bg-orange-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors ring-2 ring-orange-400"
              >
                Invite
              </button>
            </div>
          </div>

          <div className="mb-4 flex justify-between items-center">
            <div className="text-sm font-medium text-gray-800">
              SORT BY:
              <select
                title="Sort By"
                className="ml-2 border rounded px-2 py-1 text-gray-800 bg-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value as "newest" | "oldest")
                }
              >
                <option value="newest">NEWEST</option>
                <option value="oldest">OLDEST</option>
              </select>
            </div>
            <div className="relative">
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
                    ROLE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                    GENDER
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                    JOINED
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {volunteers.length > 0 ? (
                  filteredVolunteers.map((v) => (
                    <tr key={v.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {v.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {v.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                        {v.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {v.gender || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {v.created_at
                          ? new Date(v.created_at).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleDelete(v.id)}
                          className="text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No volunteers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
