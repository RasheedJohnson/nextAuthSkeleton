"use client";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


export default function ProfilePage() {
  const router = useRouter()
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout")
      toast.success("logout successful")
      router.push("/login")
      
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me")
    console.log(res.data);
    setData(res.data.data._id)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

      {/* Gradient */}
      <div className=" absolute w-8 h-36 bg-slate-400 opacity-20 blur-2xl mt-16 top-1/4 left-2/4"></div>
      <div className=" absolute w-36 h-16 bg-pink-300 opacity-25 blur-2xl mt-10 top-1/4 left-2/4"></div>

      <hr className="my-14 opacity-20 w-56" />
      <h1>Profile</h1>
      <hr className="my-14 opacity-20 w-56" />
      <h2 className="p-5 rounded-sm bg-purple-700">
        {data === "nothing" ? "No Data" : <Link href={`/profile/${data}`}>
          { data }
          </Link>}
      </h2>

      <hr className="my-14 opacity-20 w-56" />
      <button
          onClick={logout}
          className="p-2 border border-gray-300 rounded-sm mb-4 focus:outline-none focus:border-gray-600"
        >
        Logout
      </button>

      <button
          onClick={getUserDetails}
          className="p-2 rounded-sm mb-4 bg-purple-700"
        >
        Get User Details
      </button>
    </div>
  );
}