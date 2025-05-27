import React from "react";
import Link from "next/link";
import Image from "next/image";
import CombineLogo from "./volunteer/assest/logo.png";

interface AccountOptionProps {
  title: string;
  href: string;
}

const AccountTypeSelection = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md overflow-hidden p-6 sm:p-8 md:p-10">
        {/* Welcome section with logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Image
              src={CombineLogo}
              alt="Combine Foundation Logo"
              height={160}
              width={160}
              className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40"
              priority
            />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-500 mb-2 text-center">
            Welcome to Combine Foundation
          </h1>
          <p className="text-gray-600 text-center text-sm sm:text-base">
            Select your account type to continue
          </p>
        </div>

        {/* Account options grid - no descriptions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
          <AccountOption
            title="Volunteer"
            href="/login"
          />
          <AccountOption
            title="Admin"
            href="/login"
          />
          <AccountOption
            title="Trustee"
            href="/login"
          />
        </div>
      </div>
    </div>
  );
};

const AccountOption = ({ title, href }: AccountOptionProps) => {
  return (
    <Link href={href} passHref>
      <div className="h-full p-6 sm:p-7 md:p-8 border border-gray-200 rounded-lg hover:bg-orange-500 cursor-pointer transition-colors duration-300 flex flex-col items-center justify-center text-center group">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">
          {title}
        </h2>
      </div>
    </Link>
  );
};

export default AccountTypeSelection;