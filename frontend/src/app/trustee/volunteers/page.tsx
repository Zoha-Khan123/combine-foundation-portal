"use client";

import { Sidebar } from "../../components/sidebar";
import React, { useState, useEffect } from "react";
import axios from "axios";

// Define the interface for the volunteer data coming from the API
interface Volunteer {
  id: number;
  name: string;
  email: string; // Assuming email might be returned, useful for context
  role: string; // The property that determines if they are a volunteer
  created_at: string; // This will be used for the joined date
}

const VolunteersPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]); // State to store fetched volunteers

  // API URL for your users
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/users`;

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get(API_URL);
        const allUsers = response.data;

        // Filter only users with the role 'volunteer'
        const onlyVolunteers = allUsers.filter(
          (user: Volunteer) => user.role?.trim().toLowerCase() === "volunteer"
        );

        // Sort by created_at (newest first)
        const sortedVolunteers = onlyVolunteers.sort(
          (a: Volunteer, b: Volunteer) => {
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          }
        );

        setVolunteers(sortedVolunteers);
      } catch (error) {
        console.error("Error fetching volunteers:", error);
        // You might want to display an error message to the user here
      }
    };

    fetchVolunteers();
  }, []); // Empty dependency array means this runs once on component mount

  // Helper function to format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="text-gray-700">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className={`transition-all duration-300 p-4 sm:p-6 ${
          collapsed ? "sm:ml-[80px] ml-0" : "sm:ml-[250px] ml-0"
        }`}
      >
        <h1 className="text-2xl font-semibold mb-4">Volunteers List</h1>

        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              {/* Removed extra whitespace within <tr> and between <th> tags */}
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Joined Date</th>
                <th className="px-6 py-3">Programs Participated</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.length > 0 ? (
                volunteers.map((volunteer) => (
                  // Removed extra whitespace within <tr> and between <td> tags
                  <tr
                    key={volunteer.id}
                    className="border-b hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {volunteer.name}
                    </td>
                    <td className="px-6 py-4 text-gray-800">
                      {volunteer.email}
                    </td>
                    <td className="px-6 py-4 text-gray-800">
                      {formatDate(volunteer.created_at)}
                    </td>
                    <td className="px-6 py-4 text-gray-800">N/A</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
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
  );
};

export default VolunteersPage;