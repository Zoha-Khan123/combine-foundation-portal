"use client";

import Sidebar from "../../components/SideBar-vol";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const LecturePage = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const videos = [
    {
      id: 1,
      title: "Introduction to Volunteering",
      description: "Learn the fundamentals of volunteering and community service.",
      url: "https://www.youtube.com/embed/example1",
      duration: "15:22"
    },
    {
      id: 2,
      title: "Community Engagement Basics",
      description: "Essential techniques for effective community interaction.",
      url: "https://www.youtube.com/embed/example2",
      duration: "22:45"
    },
    {
      id: 3,
      title: "Advanced Volunteer Techniques",
      description: "Take your volunteering skills to the next level.",
      url: "https://www.youtube.com/embed/example3",
      duration: "18:30"
    },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      {/* Mobile Sidebar Toggle */}
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-orange-600 text-white"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Open menu" : "Close menu"}
        >
          {isCollapsed ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
      )}

      {/* Sidebar */}
      <Sidebar isCollapsed={isMobile ? isCollapsed : false} setIsCollapsed={setIsCollapsed} />

      {/* Main Content Area with proper spacing */}
      <main className={`
        flex-1 p-4 md:p-8 
        transition-all duration-300 
        ${isMobile ? (isCollapsed ? 'ml-0 pl-16' : 'ml-64 pl-4') : 'md:ml-64'}
        max-w-full overflow-x-hidden
      `}>
        {/* Page Header with centered text and proper spacing */}
        <div className="flex justify-between items-center mb-8 relative">
          <h1 className="text-2xl md:text-3xl font-bold text-orange-600 w-full text-center md:text-left">
            LECTURE MATERIALS
          </h1>
          {!isMobile && (
            <button 
              className="p-2 rounded-full hover:bg-gray-100 absolute right-0"
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label="Toggle sidebar"
            >
              <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
        </div>

        {/* Video Lectures Section - Vertical Columns */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
            Video Lectures
          </h2>

          <div className="flex flex-col space-y-8 w-full max-w-4xl mx-auto">
            {videos.map((video) => (
              <div
                key={video.id}
                className="flex flex-col md:flex-row gap-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4"
              >
                {/* Video Frame */}
                <div className="w-full md:w-1/2 lg:w-2/5 relative aspect-w-16 aspect-h-9">
                  <iframe
                    src={video.url}
                    className="w-full h-full min-h-[200px] md:min-h-[250px]"
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </span>
                </div>
                
                {/* Video Info */}
                <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base mb-4">
                      {video.description}
                    </p>
                  </div>
                  <button
                    onClick={() => router.push(`/volunteer/lecture/${video.id}`)}
                    className="self-start md:self-end text-orange-600 hover:text-orange-700 text-sm md:text-base font-medium flex items-center"
                  >
                    View Details
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources Section */}
        <div className="w-full max-w-4xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
            Study Materials
          </h2>
          <div className="bg-orange-50 rounded-lg p-6 border border-orange-100">
            <h3 className="text-lg font-semibold text-orange-700 mb-3">Download Resources</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-orange-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-700">Volunteer Handbook.pdf</span>
                <button className="ml-auto text-orange-600 hover:text-orange-700 text-sm font-medium">
                  Download
                </button>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-orange-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-700">Safety Guidelines.docx</span>
                <button className="ml-auto text-orange-600 hover:text-orange-700 text-sm font-medium">
                  Download
                </button>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LecturePage;