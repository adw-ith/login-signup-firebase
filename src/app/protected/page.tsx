import Logout from "@/components/logout";
import ProtectedRoute from "@/Redirects/ProtectedRoute";
import React from "react";

export default function Protected() {
  return (
    <ProtectedRoute>
      <div>Protected</div>
      <Logout></Logout>
    </ProtectedRoute>
  );
}
