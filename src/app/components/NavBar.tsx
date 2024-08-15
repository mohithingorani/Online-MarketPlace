"use client";

import Link from "next/link";

export function NavBar() {
  return (
    <div className="p-4">
      <div className="w-full h-fit bg-green-300 rounded-lg">
        <div className="flex justify-center items-center h-full p-4 gap-4 font-medium text-xl">
          <button className="hover:text-green-600">
            <Link href="/">Home</Link>
          </button>
          <button className="hover:text-green-600">
            <Link href="/sell">Seller</Link>
          </button>
          <button className="hover:text-green-600">
            <Link href="/buy">Buyer</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
