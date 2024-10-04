import DisplayFiles from "@/components/display";
import Logout from "@/components/logout";
import UploadForm from "@/components/upload";
import ProtectedRoute from "@/Redirects/ProtectedRoute";
import React from "react";

export default function Protected() {
  return (
    <ProtectedRoute>
      <div className="bg-slate-300 h-screen">
        <UploadForm />
        <DisplayFiles />
        <Logout></Logout>
      </div>
    </ProtectedRoute>
  );
}
