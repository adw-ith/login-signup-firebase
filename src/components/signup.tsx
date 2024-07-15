"use client";
import {
  auth,
  provider,
  signInWithEmailPassword,
  signUpWithEmailPassword,
} from "@/config/firebaseconfig";
import { signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

export default function Signup() {
  const router = useRouter();
  const [sl, setSl] = useState<boolean>(false);
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setconfPassword] = useState("");

  const handleFormSignup = async (e: any) => {
    e.preventDefault();
    if (password != confpassword) {
      toast.warn("password misssmatch", {
        position: "top-center",
      });
      console.log("password mismatch");

      return;
    }
    try {
      const user = await signUpWithEmailPassword(email, password);
      console.log("Successfully signed up!");
      console.log(user);
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      toast.error("Error : " + error.message, {
        position: "top-center",
      });
    }
  };

  const handleFormLogin = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithEmailPassword(email, password);
      console.log("Successfully signed in!");
    } catch (error: any) {
      console.error("Error signing in:", error.message);
      toast.error("Error : " + error.message, {
        position: "top-center",
      });
    }
  };

  const handleSignIn = async () => {
    try {
      const user = await signInWithPopup(auth, provider);
      console.log("User signed in");
      console.log(user);
    } catch (error: any) {
      console.error("Error signing in: ", error);
      toast.error("Error : " + error.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="form p-4 sm:min-w-[480px]">
      <form
        className="bg-slate-800 flex border-2 mx-auto border-slate-400 p-8 rounded-lg  flex-col text-base gap-y-4 h-full place-items-center text-white"
        onSubmit={sl ? handleFormSignup : handleFormLogin}
      >
        <div className="text-2xl pb-4">{sl ? "Signup" : "login"}</div>
        {sl && (
          <div className="flex  flex-col  w-full">
            <label htmlFor="name">Name</label>
            <input
              className="bg-slate-600 focus:bg-slate-800 focus-within:bg-slate-800 focus-visible:bg-slate-800 rounded-md h-10 p-1 border-2 border-slate-800"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className="flex flex-col  w-full">
          <label htmlFor="email">Email</label>
          <input
            className="bg-slate-600 focus:bg-slate-800 focus-within:bg-slate-800 focus-visible:bg-slate-800 rounded-md h-10 p-1 border-2 border-slate-800"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col  w-full">
          <label htmlFor="password">Password</label>
          <input
            className="bg-slate-600 focus:bg-slate-800 focus-within:bg-slate-800 focus-visible:bg-slate-800 rounded-md h-10 p-1 border-2 border-slate-800"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {sl && (
          <div className="flex flex-col  w-full">
            <label htmlFor="confirm">Confirm Password</label>
            <input
              className="bg-slate-600 focus:bg-slate-800 focus-within:bg-slate-800 focus-visible:bg-slate-800 rounded-md h-10 p-1 border-2 border-slate-800"
              type="text"
              name="confirm"
              value={confpassword}
              onChange={(e) => setconfPassword(e.target.value)}
            />
          </div>
        )}
        <button
          className="w-2/5 bg-blue-400 py-2 my-2 rounded hover:bg-blue-900 duration-300"
          type="submit"
        >
          {sl ? "signup" : "login"}
        </button>
        <p className="text-sm text-left text-slate-400 w-full">
          {sl ? "Already registered ? " : "New registration ? "}
          <span
            className="font-thin hover:text-blue-900"
            onClick={() => setSl(!sl)}
          >
            {sl ? "login" : "signup"}
          </span>
        </p>
        <div className="flex place-content-center place-items-center gap-4 py-4 mt-4">
          <div className="text-slate-300 text-base">Sign in with ? </div>
          <div
            onClick={handleSignIn}
            className="w-12 bg-slate-800 hover:bg-blue-900 duration-300 rounded-full p-2"
          >
            <Image alt="" src="/google-logo.png" width={32} height={32}></Image>
          </div>
        </div>
      </form>
    </div>
  );
}
