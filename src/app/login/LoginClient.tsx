"use client";

import { signIn } from "next-auth/react";

export default function LoginClient() {
  return (
    <div className="relative min-h-screen bg-white font-poppins">
      <div className="absolute top-0 left-0 w-full h-[260px] bg-gradient-to-br from-[#ffa8a8] to-[#ffd6a5] rounded-b-[50px] z-0" />

      <div className="px-10 pt-6 relative z-10">
        <h1 className="text-white text-3xl font-extrabold">cleaNews</h1>
        <p className="text-white text-xs italic mt-[-6px]">created by Salman</p>
      </div>

      <div className="relative z-10 mt-10 mx-auto max-w-5xl w-11/12 bg-[#f9f9fb] rounded-[25px] p-10 shadow-[0_15px_30px_rgba(0,0,0,0.1)] flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-xl">
          <h2 className="text-3xl font-extrabold text-purple-700 mb-2">
            Your Reliable News Portal:
          </h2>
          <h3 className="text-lg font-semibold italic text-black mb-6">
            "Discover the latest news in a clean, reliable format—just the way it should be."
          </h3>
          <p className="text-gray-700 mb-6">Please login to access the latest news.</p>
          <button
            onClick={() => signIn("google")}
            className="bg-[#ed3141] hover:bg-[#ff0000] text-white py-3 px-6 rounded-md font-semibold shadow-md transition"
          >
            Login with Google
          </button>
        </div>

        <div className="mt-10 md:mt-0">
          <div className="w-[250px] aspect-square bg-white border-[6px] border-[#f0e8f8] rounded-full flex items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="News Illustration"
              className="w-[70%] h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
