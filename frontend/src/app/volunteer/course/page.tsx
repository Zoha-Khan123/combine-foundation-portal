"use client";

import { useState } from "react";
import Sidebar from "../../components/SideBar-vol";
import { useRouter } from 'next/navigation';

const CoursePage = () => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Changed from sidebarOpen
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-white">
      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-orange-600 text-white"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "Open menu" : "Close menu"}
      >
        {isCollapsed ? (
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        ) : (
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </button>

      {/* Sidebar with corrected props */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content Area */}
      <main className={`flex-1 p-4 md:p-8 transition-all duration-300 ${isCollapsed ? 'md:ml-0' : 'md:ml-64'}`}>
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8 pl-10 md:pl-0">
          <h1 className="text-2xl md:text-3xl font-bold text-orange-600">
            COURSES
          </h1>
        </div>

        {/* Course Cards */}
        <div className="space-y-6 max-w-3xl mx-auto">
          {[1, 2, 3, 4].map((courseNum) => (
            <div key={courseNum} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-block bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-2">
                    {courseNum === 1 ? 'FIRST' : 
                     courseNum === 2 ? 'SECOND' : 
                     courseNum === 3 ? 'THIRD' : 'FOURTH'} COURSE
                  </span>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">
                    Course Title {courseNum}
                  </h3>
                  <p className="text-gray-600">
                    Comprehensive training on essential volunteer skills and community engagement techniques.
                  </p>
                </div>
                <button
                  className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                  aria-label={`Expand course ${courseNum}`}
                  onClick={() => router.push(`/volunteer/course/${courseNum}`)}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CoursePage;