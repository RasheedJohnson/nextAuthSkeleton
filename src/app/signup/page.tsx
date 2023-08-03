"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ripple from "../../../public/ripple.svg"
import Image from "next/image";
import logo from "../../../public/omni-logo.png"
import { toast } from "react-hot-toast";


export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  })
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");

    } catch (error: any) {
      console.log("Signup failed...", error.message)

      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2             bg-gradient-to-bl from-black to-gray-950">

      {/* <Image src={logo} className=" mb-6 w-[60px]" alt="" /> */}
      {/* <h1 className="text-2xl font-semibold">{loading ? "Processing..." : "Sign Up" }</h1> */}
      {loading ? "" :  <Image src={logo} className=" mb-6 w-[60px]" alt="" /> }
      {loading ? <Image src={ripple} alt=""/> :  <h1 className="text-2xl font-semibold">Sign up</h1> }
      <div className=" absolute w-8 h-36 bg-slate-400 opacity-20 blur-2xl mt-16 top-1/4 left-2/4"></div>
      <div className=" absolute w-36 h-16 bg-pink-300 opacity-25 blur-2xl mt-10 top-1/4 left-2/4"></div>

      <hr className="my-14 opacity-20 w-56" />
      
      <label htmlFor="username"></label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-5 focus:outline-none focus:border-gray-600 text-gray-700"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />

      <label htmlFor="email"></label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-5 focus:outline-none focus:border-gray-600 text-gray-700"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <label htmlFor="password"></label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-12 focus:outline-none focus:border-gray-600 text-gray-700"
        id="password"
        type="text"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      {/* IF BUTTON DISABLED, UNCLICKABLE DIV */}
      {!buttonDisabled ? (
        <button
          onClick={onSignup}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Signup
        </button>
      ) : (
        <div
        className="p-2 border border-gray-300 text-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Signup
        </div>
      )}
      
      <Link className="text-cyan-400" href="/login">Login</Link>
    </div>
  );
}