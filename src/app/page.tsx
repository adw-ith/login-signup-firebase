import Signup from "@/components/signup";
import UnProtectedRoute from "@/Redirects/UnProtectedRoute";
import Image from "next/image";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <UnProtectedRoute>
      <main className="flex h-lvh bg-slate-900 min-h-screen flex-col place-content-center place-items-center">
        <Signup></Signup>
      </main>
    </UnProtectedRoute>
  );
}
