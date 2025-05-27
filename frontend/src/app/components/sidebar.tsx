"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  Handshake,
  ClipboardList,
  BookOpen,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const menuItems = [
  {
    label: "Dashboard",
    path: "/trustee/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  { label: "Admins", path: "/trustee/admin", icon: <Users size={20} /> },
  {
    label: "Volunteers",
    path: "/trustee/volunteers",
    icon: <Handshake size={20} />,
  },
  {
    label: "Programs",
    path: "/trustee/programs",
    icon: <BookOpen size={20} />,
  },
  {
    label: "Beneficiaries",
    path: "/trustee/beneficiaries",
    icon: <ClipboardList size={20} />,
  },
  // { label: "Logout", path: "/", icon: <LogOut size={20} /> },
];



interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  setCollapsed,
}) => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

   const handleLogout = () => {
    Cookies.remove("token")
    toast.success("Logout Successfull")
    window.location.reload();
  };




  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const SidebarContent = () => (
    <div
      className={`h-full flex flex-col bg-white shadow-md transition-all duration-300 ${
        collapsed ? "w-[80px]" : "w-[250px]"
      }`}
    >
      {/* Logo & Toggle */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        {!collapsed && (
          <Image
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b689aca73d4a910f195fba599f1c1031158ed8ca"
            alt="Logo"
            width={120}
            height={40}
          />
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto cursor-pointer"
        >
          {collapsed ? <Menu size={24} /> : <X size={24} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center px-4 py-2 gap-3 text-sm font-medium transition-all ${
              pathname === item.path
                ? "bg-[#FF5D15] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => isMobile && setIsOpen(false)}
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}

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
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      {isMobile && (
        <header className="bg-white px-4 py-3 shadow-md flex items-center justify-between sticky top-0 z-50">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Image
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b689aca73d4a910f195fba599f1c1031158ed8ca"
            alt="Logo"
            width={100}
            height={40}
          />
        </header>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white z-40 transition-transform duration-300 ${
          isMobile
            ? isOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        }`}
      >
        {SidebarContent()}
      </aside>

      {/* Body Padding */}
      <div
        className={`${
          isMobile ? "" : collapsed ? "ml-[80px]" : "ml-[250px]"
        } transition-all duration-300`}
      >
        {/* Your page content goes here */}
      </div>


      
        
    </>
  );
};