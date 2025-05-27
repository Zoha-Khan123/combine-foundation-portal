"use client";

import { Sidebar } from "../../components/sidebar";
import React, { useState } from "react";

const programs = [
  {
    title: "Youth Empowerment",
    description:
      "Providing skill development and mentorship for young individuals.",
  },
  {
    title: "Health Awareness",
    description:
      "Organizing medical camps and health education for rural communities.",
  },
  {
    title: "Education Support",
    description:
      "Supporting underprivileged students with resources and scholarships.",
  },
  {
    title: "Women Upliftment",
    description:
      "Initiatives to empower women through training and self-help groups.",
  },
];

const ProgramsPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Our Programs
          </h1>
          <p className="text-gray-600 mb-10">
            Explore the impactful initiatives run by Combine Foundation to
            support and uplift communities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {program.title}
                </h2>
                <p className="text-gray-600">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default ProgramsPage;
