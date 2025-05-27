'use client';

import Sidebar from "../../components/SideBar-vol";
import { useState } from "react";
import { useRouter } from 'next/navigation';

const VolunteerDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-white">
      {/* Mobile Header (fixed on small screens) */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-white shadow-sm md:hidden">
        <button
          className="p-2 rounded-md bg-orange-600 text-white"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Open menu' : 'Close menu'}
        >
          {isCollapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
        
        <h1 className="text-xl font-bold text-orange-600 md:hidden">
          DASHBOARD
        </h1>
        
        <button
          className="p-2 rounded-full hover:bg-gray-100"
          onClick={() => router.push('/volunteer/dashboard/profile')}
          aria-label="Profile"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content Area */}
      <main className={`flex-1 p-4 md:p-8 transition-all duration-300 ${isCollapsed ? 'md:ml-0' : 'md:ml-64'} mt-16 md:mt-0`}>
        {/* Dashboard Header (hidden on mobile) */}
        <div className="hidden md:flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-orange-600">
            VOLUNTEER DASHBOARD
          </h1>
          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => router.push('/volunteer/dashboard/profile')}
              aria-label="Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Upcoming Lectures Card */}
          <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <div className="bg-orange-600 px-4 py-3">
              <h2 className="text-lg font-semibold text-white">UPCOMING LECTURES</h2>
            </div>
            <div className="p-4">
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Community Engagement</h3>
                  <p className="text-sm text-gray-600 mt-1">June 15, 2023 • 2:00 PM</p>
                  <button 
                    onClick={() => router.push('/volunteer/lecture')}
                    className="mt-3 text-orange-600 hover:text-orange-700 text-sm font-medium"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Current Courses Card */}
          <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <div className="bg-orange-600 px-4 py-3">
              <h2 className="text-lg font-semibold text-white">CURRENT COURSES</h2>
            </div>
            <div className="p-4">
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Volunteering 101</span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Child Safety</span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">First Aid</span>
                  </div>
                  <button 
                    onClick={() => router.push('/volunteer/course')}
                    className="mt-3 text-orange-600 hover:text-orange-700 text-sm font-medium"
                  >
                    View All Courses →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Tasks Card */}
          <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <div className="bg-orange-600 px-4 py-3">
              <h2 className="text-lg font-semibold text-white">PENDING TASKS</h2>
            </div>
            <div className="p-4">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <input type="checkbox" className="rounded text-orange-600 mr-3" />
                  <span className="text-gray-800">Complete training module</span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="rounded text-orange-600 mr-3" />
                  <span className="text-gray-800">Submit volunteer hours</span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="rounded text-orange-600 mr-3" />
                  <span className="text-gray-800">Review safety guidelines</span>
                </li>
              </ul>
              <button 
                onClick={() => router.push('/volunteer/tasks')}
                className="mt-3 text-orange-600 hover:text-orange-700 text-sm font-medium"
              >
                View All Tasks →
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8 bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="bg-orange-600 px-4 py-3">
            <h2 className="text-lg font-semibold text-white">RECENT ACTIVITY</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-2 rounded-full mt-1">
                  <svg className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-800">Completed &quot;Introduction to Volunteering&quot; course</p>
                  <p className="text-sm text-gray-500 mt-1">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-2 rounded-full mt-1">
                  <svg className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-800">Attended &quot;Community Building&quot; lecture</p>
                  <p className="text-sm text-gray-500 mt-1">1 week ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VolunteerDashboard;