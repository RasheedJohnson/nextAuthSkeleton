"use client";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function ProfilePage() {
  const router = useRouter()
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

      {/* Gradient */}
      <div className=" absolute w-8 h-36 bg-slate-400 opacity-20 blur-2xl mt-16 top-1/4 left-2/4"></div>
      <div className=" absolute w-36 h-16 bg-pink-300 opacity-25 blur-2xl mt-10 top-1/4 left-2/4"></div>

      <hr className="my-14 opacity-20 w-56" />
      <h1>Profile</h1>
      <hr className="my-14 opacity-20 w-56" />
      <p>Profile Page</p>

      <hr className="my-14 opacity-20 w-56" />
      <button
          onClick={logout}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
        Logout
      </button>
    </div>
  );
}