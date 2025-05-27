"use client";

import { Sidebar } from "../../components/sidebar";
import React, { useState } from "react";

const beneficiaries = [
  {
    name: "Hamza",
    location: "Karachi , Pakistan",
    story:
      "Hamza was able to complete his education through our scholarship program and now mentors others in his country.",
  },
  {
    name: "Areesha",
    location: "Karachi , Pakistan",
    story:
      "With our support, Areesha started a tailoring business and now trains other women in her community.",
  },
  {
    name: "Jibran",
    location: "Karachi , Pakistan",
    story:
      "Jibran received medical aid during a critical time and now volunteers in our health camps.",
  },
  {
    name: "Laiba",
    location: "Karachi , Pakistan",
    story:
      "Laiba received medical aid during a critical time and now volunteers in our health camps.",
  },
];

const BeneficiariesPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Our Beneficiaries
          </h1>
          <p className="text-gray-600 mb-10">
            Meet the people whose lives have been impacted by the Combine
            Foundation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {beneficiaries.map((person, index) => (
              <div
                key={index}
                className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {person.name}
                </h2>
                <p className="text-sm text-gray-500 mb-2">{person.location}</p>
                <p className="text-gray-600 text-sm">{person.story}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default BeneficiariesPage;
