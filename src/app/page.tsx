import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex justify-center items-center min-h-screen  overflow-hidden">
      <div className="absolute inset-0 bg-[url('/path-to-your-crazy-background-image.jpg')] bg-cover opacity-50 sm:px-4 lg:px-0"></div>
      
      <div className="relative z-10 flex max-w-md flex-col gap-4 p-8 text-center bg-white bg-opacity-80 rounded-lg shadow-lg backdrop-filter backdrop-blur-md">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Sell Things Online
        </h1>
        <div className="text-lg text-gray-700">
          <div>
          Start selling your products today in
          </div>
          <div>
            Manipal University Jaipur
          </div>
        </div>
        <Link href="/sell">
          <div className="mt-4 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition duration-300">
            Start Selling
          </div>
        </Link>
      </div>
    </div>
  );
}
