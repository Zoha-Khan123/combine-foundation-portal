"use client";

import React, { useState } from "react";
import { Sidebar } from "./sidebar";
import Image from "next/image";
import ADMIN from "../../images/ADMIN.png";
import Link from "next/link";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="w-full min-h-screen bg-[#F4F6F6]">
      {/* Header Row */}
      <div className="w-full bg-white flex items-center justify-between px-2 py-1 sm:px-6 sm:py-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-8 overflow-hidden">
          {collapsed && (
            <Image
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b689aca73d4a910f195fba599f1c1031158ed8ca"
              alt="Logo"
              width={44}
              height={44}
              className="sm:w-[40px] sm:h-[40px] lg:w-[60px] lg:h-[60px]"
            />
          )}
          <h1 className="text-[10px] sm:text-[16px] lg:text-[24px] font-semibold text-[#1A1A1A] truncate sm:max-w-none max-w-[100px] lg:max-w-full">
            ADMIN DASHBOARD - COMBINE FOUNDATION
          </h1>
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-1 sm:gap-3 lg:gap-6">
          <Link href="/admin/profile">
            <Image
              src={ADMIN}
              alt="Profile"
              width={47}
              height={40}
              className="rounded-full sm:w-[32px] sm:h-[32px] lg:w-[48px] lg:h-[48px]"
            />
          </Link>
          <span className="text-[10px] sm:text-sm lg:text-base text-[#4D4D4D] hover:text-orange-500 transition duration-300 ease-in-out transform hover:scale-110 hover:rotate-2">
            ADMIN
          </span>
        </div>
      </div>

      {/* Body with Sidebar and Main Content */}
      <div className="flex flex-wrap">
        {/* Sidebar */}
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-6 py-4 sm:py-6">{children}</main>
      </div>
    </div>
  );
};
