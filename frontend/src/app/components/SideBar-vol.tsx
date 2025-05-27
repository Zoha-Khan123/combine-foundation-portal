'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import logo from "../volunteer/assest/logo.png";
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  const pathname = usePathname();

  const handleLogout = () => {
    console.log('Logging out...');
    setIsCollapsed(true);
    localStorage.removeItem('rememberMe');
    Cookies.remove("token")
    toast.success("Logout Successfull")
    window.location.reload();
  };

  return (
    <>
      {/* Mobile Overlay with smooth transition */}
      <div 
        className={`md:hidden fixed inset-0 bg-black z-30 transition-opacity duration-300 ${
          !isCollapsed ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCollapsed(true)}
      />
      
      {/* Sidebar with improved transitions */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-orange-200 shadow-sm 
          p-6 flex flex-col z-40 transition-all duration-300 ease-in-out ${
            isCollapsed ? '-translate-x-full md:translate-x-0' : 'translate-x-0'
          }`}
      >
        {/* Logo Section */}
        <div className="mb-10 flex justify-center">
          <Image
            src={logo}
            alt="Combine Foundation Logo"
            width={160}
            height={80}
            className="object-contain"
            priority
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2">
          {[
            { href: '/volunteer/dashboard', label: 'Dashboard' },
            { href: '/volunteer/lecture', label: 'Lecture' },
            { href: '/volunteer/course', label: 'Course' },
            { href: '/volunteer/tasks', label: 'Tasks' },
            { href: '/volunteer/get-card', label: 'Get Card' },
          ].map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={`block py-3 px-4 rounded-lg transition ${
                pathname === item.href 
                  ? 'bg-orange-100 text-orange-600 font-medium' 
                  : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
              }`}
              onClick={() => setIsCollapsed(true)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="mt-auto">
          <button 
            className="w-full text-left py-3 px-4 rounded-lg transition
                      text-gray-600 hover:bg-orange-50 hover:text-orange-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;