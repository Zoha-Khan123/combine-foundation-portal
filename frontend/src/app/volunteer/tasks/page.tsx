"use client";

import { useState } from "react";
import Sidebar from "../../components/SideBar-vol";
import { useRouter } from 'next/navigation';

const TaskPage = () => {
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
            TASKS
          </h1>
        </div>

        {/* Task Cards */}
        <div className="space-y-6 max-w-3xl mx-auto">
          {[1, 2, 3, 4].map((taskNum) => (
            <div 
              key={taskNum}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {taskNum === 1 ? 'FIRST' : 
                   taskNum === 2 ? 'SECOND' : 
                   taskNum === 3 ? 'THIRD' : 'FOURTH'} TASK
                </h2>
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    Task Title {taskNum}
                  </h3>
                  <p className="text-gray-600">
                    Complete the assigned volunteer activities and submit your report.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition flex-1"
                    onClick={() => router.push(`/volunteer/tasks/${taskNum}/submit`)}
                  >
                    Submit Task
                  </button>
                  <button 
                    className="px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition flex-1"
                    onClick={() => router.push(`/volunteer/tasks/${taskNum}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TaskPage;