"use client"; // Add this at the top of the file

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DashboardLayout } from "./components/layouts/DashboardLayout";
import { usePathname } from "next/navigation";
import { Toaster } from 'react-hot-toast'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current pathname

  // Check if the current route is an admin page
  const isAdminPage = pathname?.startsWith("/admin/Dashboard") || pathname?.startsWith("/admin/");

  return (
    <html lang="en">
      <body
        className={`bg-[#F4F6F6] ${geistSans.variable} ${geistMono.variable} antialiased `}
      >
         <Toaster position="top-center" reverseOrder={false} />
        {isAdminPage ? (
          <DashboardLayout>{children}</DashboardLayout> // Use DashboardLayout for admin pages
        ) : (
          <>{children}</> // Default layout for other pages
        )}
      </body>
    </html>
  );
}
