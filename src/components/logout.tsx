"use client";

import { logout } from "@/config/firebaseconfig";
import { useState } from "react";

export default function Logout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      await logout();
      console.log("Logged out successfully");
    } catch (error: any) {
      setError(error.message);
      console.error("Error logging out:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className="px-4 rounded bg-red-500 hover:bg-transparent duration-300 border-2 border-red-500"
        onClick={handleLogout}
        disabled={loading}
      >
        Logout
      </button>
    </div>
  );
}
