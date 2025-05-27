"use client";
import React from "react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-white text-black">
      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 w-full">
        {/* Grid Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Total Volunteers */}
          <div className="bg-white rounded-lg border p-4 shadow-sm">
            <p className="text-sm text-gray-600">Total Volunteers</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-3xl font-bold">125</span>
              <Link href="/admin/volunteers">
                <button className="cursor-pointer bg-orange-500 text-white text-xs px-4 py-1 rounded hover:bg-orange-600">
                  VIEW
                </button>
              </Link>
            </div>
          </div>

          {/* Recent Lectures */}
          <div className="bg-white rounded-lg border p-4 shadow-sm">
            <h3 className="text-sm font-bold mb-2">RECENT LECTURES</h3>
            <div className="bg-orange-500 text-white p-2 rounded mb-2">
              <p className="text-sm font-semibold">LECTURE</p>
            </div>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          {/* Recent Tasks */}
          <div className="bg-white rounded-lg border p-4 shadow-sm">
            <h3 className="text-sm font-bold mb-2">RECENT TASKS</h3>
            <div className="bg-orange-500 text-white p-2 rounded mb-2">
              <p className="text-sm font-semibold">TASK</p>
            </div>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>

        {/* Recommended Courses */}
        <div className="mt-6 max-w-full sm:max-w-md">
          <h3 className="text-sm font-bold mb-2">RECOMMENDED COURSES</h3>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="bg-orange-500 text-white p-2 rounded mb-2">
              <p className="text-sm font-semibold">COURSE</p>
            </div>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
