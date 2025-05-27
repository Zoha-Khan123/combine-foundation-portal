"use client";

import React, {useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  Handshake,
  BookOpen,
  GraduationCap,
  ClipboardList,
  ChevronsLeft,
  ChevronsRight,
  LogOut,
} from "lucide-react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

interface SidebarProps {
  collapsed: boolean; // Prop to know whether the sidebar is collapsed or not
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>; // Set the collapsed state from the parent
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  setCollapsed,
}) => {
  const currentPath = usePathname();
  const menuItems = [
    { label: "Profile", path: "/admin/profile", icon: <User size={22} /> },
    {
      label: "Volunteers",
      path: "/admin/volunteers",
      icon: <Handshake size={22} />,
    },
    {
      label: "Lectures",
      path: "/admin/lectures",
      icon: <BookOpen size={22} />,
    },
    {
      label: "Courses",
      path: "/admin/courses",
      icon: <GraduationCap size={22} />,
    },
    { label: "Tasks", path: "/admin/tasks", icon: <ClipboardList size={22} /> },
  ];

   const handleLogout = () => {
    Cookies.remove("token")
    toast.success("Logout Successfull")
    window.location.reload();
  };





  // Optional: Prevent body scroll when sidebar open
  useEffect(() => {
    if (!collapsed) {
      document.body.style.paddingLeft = "295px";
    } else {
      document.body.style.paddingLeft = "80px";
    }

    return () => {
      document.body.style.paddingLeft = "0px";
    };
  }, [collapsed]);

  return (
    <nav
      className={`fixed top-0 left-0 h-screen bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-all duration-300 z-50 ${
        collapsed ? "w-[80px]" : "w-[295px]"
      } flex flex-col`}
    >
      <div className="flex justify-end p-4">
        <button
          className="cursor-pointer"
          onClick={() => setCollapsed(!collapsed)} // Toggle collapsed state on click
        >
          {collapsed ? <ChevronsRight size={24} /> : <ChevronsLeft size={24} />}
        </button>
      </div>

      {/* Logo inside Sidebar only when it's expanded */}
      {!collapsed && (
        <div className="flex justify-center items-center px-4 pb-2">
          <Image
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b689aca73d4a910f195fba599f1c1031158ed8ca"
            alt="CF color-01"
            width={140}
            height={100}
          />
        </div>
      )}

      <div className="flex-1 flex flex-col">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center h-11 px-4 ${
              currentPath === item.path
                ? "bg-[#FF5D15] text-white"
                : "border-b border-[#E6E6E6] text-[#121212]"
            } text-xl font-medium hover:bg-[#f9f9f9] transition-all`}
          >
            <span className="mr-2">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </div>



      {/* 👇 Logout button */}
    <button
      onClick={handleLogout}
      className="flex items-center h-11 px-4 text-xl font-medium border-t border-[#E6E6E6] text-[#121212] hover:bg-[#f9f9f9] transition-all"
    >
      <span className="mr-2">
        <LogOut size={22} />
      </span>
      {!collapsed && <span>LogOut</span>}
    </button>
    </nav>
  );
};