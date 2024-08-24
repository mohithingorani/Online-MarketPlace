"use client";

import Link from "next/link";

export function NavBar() {
  return (
    <div className="p-4">
      <div className="w-full h-fit bg-gradient-to-r from-blue-900 via-purple-800 to-purple-900 rounded-lg bg-opacity-80 backdrop-blur-xl border border-white border-opacity-30 shadow-lg">
        <div className="flex justify-center items-center h-full p-4 gap-4 font-medium text-xl">
          <button className="hover:text-green-300 text-white transition-colors duration-300">
            <Link href="/">Home</Link>
          </button>
          <button className="hover:text-green-300 text-white transition-colors duration-300">
            <Link href="/sell">Seller</Link>
          </button>
          <button className="hover:text-green-300 text-white transition-colors duration-300">
            <Link href="/buy">Buyer</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
