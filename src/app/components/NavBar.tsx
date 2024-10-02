"use client";

import Image from "next/image";
import Link from "next/link";

export function NavBar({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (search: string) => void;
}) {
  return (
    <div className="">
      <div className="w-full h-fit  rounded-lg bg-opacity-80 backdrop-blur-xl border border-white border-opacity-30 shadow-lg py-3 px-3 ">
        <div className="flex justify-between items-center h-full ">
          <button className="">
            <Link href="/">
              <Image
                src={"/muj logo.webp"}
                alt="muj logo"
                width="150"
                height="100"
              />
            </Link>
          </button>
          <div className="flex items-center border-2 border-[#404A60] rounded-md pl-2 max-w-6xl w-full ">
            <Image
              src={"/group new.svg"}
              height={"30"}
              width={"30"}
              alt="search logo"
            />
            <input
            onChange={(e)=>{setSearch(e.target.value)}}
              type="text"
              value={search}
              className=" ring-0 focus:ring-0 shadow-none focus:outline-none bg-transparent  max-w-6xl w-full text-xl font-normal  px-3 py-1.5 focus-border-0"
              placeholder="Find items in hostel"
            />
          </div>
          <div className="flex gap-4 px-1  justify-center">
            <button className="bg-[#404A60] text-white text-xl px-6 py-1.5 rounded-full font-semibold hover:shadow-lg underline">
              LOGIN
            </button>
            <button
              type="button"
              className="text-white bg-gradient-to-r text-xl px-6 py-1.5 font-semibold from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br rounded-full   text-center hover:shadow-lg "
            >
              SELL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
